// Quản lý trông giữ xe - Chung cư BlueMoon

let data = []; // Dữ liệu ban đầu
let filteredData = []; // Dữ liệu đã lọc
let currentPage = 1; // Trang hiện tại
const rowsPerPage = 10; // Số dòng mỗi trang

// Sự kiện tải trang
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Tải dữ liệu ban đầu
    const response = await fetch("/admin/parkingFee", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Không thể tải danh sách xe. Vui lòng thử lại sau.");
    }

    data = await response.json();
    filteredData = [...data];
    renderTable(currentPage);
  } catch (error) {
    console.error("Lỗi tải dữ liệu:", error);
    alert("Không thể tải dữ liệu. Vui lòng kiểm tra kết nối.");
  }
});

// Tính toán tổng số tiền
function calculateTotalAmount() {
  const numMotor = document.getElementById("numMotor").value || 0;
  const numCar = document.getElementById("numCar").value || 0;

  const totalAmount = numMotor * 70000 + numCar * 1200000;
  console.log(
    `numMotor: ${numMotor}, numCar: ${numCar}, totalAmount: ${totalAmount}`
  );
  document.getElementById("newTotal").value = totalAmount;
}

// Cập nhật trạng thái thanh toán
function updateStatus(totalAmount) {
  const paid = parseInt(document.getElementById("newPaid").value) || 0;
  const statusSpan = document.getElementById("newStatus");

  if (paid >= totalAmount) {
    statusSpan.textContent = "Hoàn tất";
    statusSpan.className = "status completed";
  } else {
    statusSpan.textContent = "Chưa hoàn tất";
    statusSpan.className = "status incomplete";
  }
}

// Thêm dòng mới
function addNewRow() {
  const houseId = document.getElementById("newHouseId").value.trim();
  const numMotor = parseInt(document.getElementById("numMotor").value) || 0;
  const numCar = parseInt(document.getElementById("numCar").value) || 0;
  const lastDate = document.getElementById("lastdate").value;
  const paid = parseInt(document.getElementById("newPaid").value) || 0;

  // Kiểm tra dữ liệu
  if (!houseId || !lastDate) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  const totalAmount = numMotor * 70000 + numCar * 1200000;
  const newEntry = {
    householdId: houseId,
    numberMotor: numMotor,
    numberCar: numCar,
    amount: totalAmount,
    collectAmount: paid,
    dueDate: lastDate,
    paid: paid >= totalAmount,
  };

  // Gửi yêu cầu thêm mới
  fetch("/admin/parkingFee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEntry),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Không thể thêm mục mới");
      }
      return response.json();
    })
    .then((addedEntry) => {
      data.push(addedEntry);
      filteredData = [...data];
      renderTable(currentPage);
      resetInputRow();
      alert("Thêm thành công!");
    })
    .catch((error) => {
      console.error("Lỗi:", error);
      alert("Không thể thêm. Vui lòng thử lại.");
    });
}

// Hiển thị bảng
function renderTable(page) {
  const tableBody = document.querySelector("#FeeTable tbody");
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = filteredData.slice(start, end);

  // Xóa dữ liệu cũ
  while (tableBody.rows.length > 1) {
    tableBody.deleteRow(1);
  }

  // Thêm dữ liệu mới
  pageData.forEach((item, index) => {
    const row = tableBody.insertRow(-1);
    row.innerHTML = `
      <td>${item.householdId}</td>
      <td>${item.numberMotor || 0}</td>
      <td>${item.numberCar || 0}</td>
      <td>${item.amount.toLocaleString()} VND</td>
      <td>${item.collectAmount.toLocaleString()} VND</td>
      <td>${item.dueDate}</td>
      <td>
        <span class="status ${item.paid ? "completed" : "incomplete"}">
          ${item.paid ? "Hoàn tất" : "Chưa hoàn tất"}
        </span>
      </td>
      <td>
        <button onclick="editRow(this)">Sửa</button>
        <button onclick="deleteRow(${start + index})">Xóa</button>
      </td>
    `;
  });

  updatePaginationButtons();
}

// Lọc kết quả
function filterResults() {
  const houseId = document.getElementById("id-house-hold").value.trim();
  const fromDate = document.getElementById("from-date").value;
  const toDate = document.getElementById("to-date").value;
  const paymentStatus = document.getElementById("payment-status").value;

  filteredData = data.filter((item) => {
    const matchHouseId = !houseId || item.householdId.includes(houseId);
    const matchFromDate =
      !fromDate || new Date(item.dueDate) >= new Date(fromDate);
    const matchToDate = !toDate || new Date(item.dueDate) <= new Date(toDate);

    let matchStatus = true;
    if (paymentStatus === "hoàn tất") {
      matchStatus = item.paid === true;
    } else if (paymentStatus === "chưa hoàn tất") {
      matchStatus = item.paid === false;
    }

    return matchHouseId && matchFromDate && matchToDate && matchStatus;
  });

  currentPage = 1;
  renderTable(currentPage);
}

function deleteRow(index) {
  // Lấy `parkingFeeId` từ dữ liệu
  const parkingFeeId = filteredData[index].parkingFeeId;

  // Hiển thị xác nhận trước khi xóa
  const confirmDelete = confirm("Bạn có chắc chắn muốn xóa mục này không?");
  if (!confirmDelete) {
    return; // Người dùng hủy thao tác xóa
  }

  // Gửi yêu cầu DELETE đến API
  fetch(`/admin/parkingFee/${parkingFeeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status !== 204) {
        throw new Error("Không thể xóa mục này. Vui lòng thử lại sau.");
      }
    })
    .then(() => {
      // Xóa mục khỏi `data` và `filteredData`
      data = data.filter((item) => item.parkingFeeId !== parkingFeeId);
      filteredData = filteredData.filter(
        (item) => item.parkingFeeId !== parkingFeeId
      );

      // Cập nhật lại bảng
      renderTable(currentPage);

      alert("Xóa thành công!");
    })
    .catch((error) => {
      console.error("Lỗi xóa dữ liệu:", error);
      alert("Không thể xóa. Vui lòng thử lại.");
    });
}


// Chuyển trang
function changePage(direction) {
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  currentPage = Math.max(1, Math.min(currentPage + direction, totalPages));
  renderTable(currentPage);
}

// Cập nhật trạng thái nút phân trang
function updatePaginationButtons() {
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Đặt trình nghe sự kiện
document
  .getElementById("numMotor")
  .addEventListener("input", calculateTotalAmount);
document
  .getElementById("numCar")
  .addEventListener("input", calculateTotalAmount);
document
  .getElementById("newPaid")
  .addEventListener("input", calculateTotalAmount);


//MODAL
let isModalOpen = false; // Biến kiểm tra trạng thái modal

function showModal(Fee) {
  const modal = document.getElementById("FeeModal");
  const modalDetails = document.getElementById("modalDetails");
  const status = Fee.paid ? "Hoàn tất" : "Chưa hoàn tất";

  // Cập nhật thông tin vào modal
  modalDetails.innerHTML = `
      <div class="payment-history">
      <div class="basic-detail">
        <div class="detail-row">
          <span class="label">Số xe ô tô:</span>
          <input class="value" value="${Fee.numCar}" disabled />
        </div>
        <div class="detail-row">
          <span class="label">Số xe ô tô:</span>
          <input class="value" value="${Fee.numMotor}" disabled />
        </div>
        <div class="detail-row">
          <span class="label">Số tiền cần thu:</span>
          <input class="value" id="totalPay" value="${Fee.amount}" disabled />
        </div>
        <div class="detail-row">
          <span class="label">Hạn thu:</span>
          <input class="value" value="${Fee.dueDate}" disabled />
        </div>
        <div class="detail-row">
          <span class="label">Trạng thái:</span>
          <input class="value" id="status-pay" value="${status}" disabled />
        </div>
      </div>
      <h1>Lịch sử các lần thu</h1>
      <table>
        <thead>
          <tr>
            <th>Mã phiếu thu</th>
            <th>Ngày đóng</th>
            <th>Số tiền đóng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>nối mã phiếu thu</td>
            <td>nối Ngày đóng</td>
            <td>nối Số tiền đóng</td>
          </tr>
        </tbody>
      </table>
    </div> 
    `;

  // Hiển thị modal
  console.log("Modal đang hiển thị");
  modal.style.display = "block";
  isModalOpen = true; // Modal đã được mở

  event.stopPropagation();
}

// Lắng nghe sự kiện click trên toàn bộ window
window.addEventListener("click", (event) => {
  const modal = document.getElementById("FeeModal");

  // Chỉ đóng modal nếu nó đang hiển thị
  if (isModalOpen && !modal.contains(event.target)) {
    closeModal(); // Đóng modal
  }
});

// Đóng modal
function closeModal() {
  const modal = document.getElementById("FeeModal");
  modal.style.display = "none";
  isModalOpen = false; // Modal đã đóng
}

function resetInputRow() {
  document.getElementById("newHouseId").value = "";
  document.getElementById("numMotor").value = "";
  document.getElementById("numCar").value = "";
  document.getElementById("lastdate").value = "";
  document.getElementById("newPaid").value = "";
  document.getElementById("newTotal").value = "";
  const statusSpan = document.getElementById("newStatus");
  statusSpan.textContent = "";
  statusSpan.className = "";
}
