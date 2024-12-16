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

  // Kiểm tra dữ liệu
  if (!Array.isArray(filteredData)) {
    console.error("filteredData không hợp lệ.");
    return;
  }

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = filteredData.slice(start, end);

  // Xóa dữ liệu cũ trong bảng
  tableBody.innerHTML = ""; // Xóa toàn bộ nội dung cũ

  // Thêm dữ liệu mới
  pageData.forEach((item, index) => {
    const formattedAmount = item.amount ? item.amount.toLocaleString() : "0";
    const formattedCollectAmount = item.collectAmount
      ? item.collectAmount.toLocaleString()
      : "0";
    const status = item.paid ? "Hoàn tất" : "Chưa hoàn tất";
    const statusClass = item.paid ? "completed" : "incomplete";

    const row = tableBody.insertRow(-1);
    row.setAttribute("data-index", start + index); // Gán data-index cho hàng

    row.innerHTML = `
      <td>${item.householdId}</td>
      <td>${item.numberMotor || 0}</td>
      <td>${item.numberCar || 0}</td>
      <td>${formattedAmount} VND</td>
      <td>
          <span>${formattedCollectAmount} VND</span>
          <input type="number" class="editPaidInput" style="display:none;" value="${
            item.collectAmount || 0
          }" />
      </td>
      <td>${item.dueDate || "N/A"}</td>
      <td>
        <span class="status ${statusClass}">${status}</span>
      </td>
      <td>
        <button onclick="editRow(this)">Sửa</button>
        <button onclick="deleteRow(${start + index})">Xóa</button>
      </td>
    `;
    row.style.cursor = "pointer";
    row.addEventListener("click", () => {
      if (event.target.tagName === "INPUT") {
        event.stopPropagation();
        return;
      }
      showModal(pageData[index]);
    });
  });

  // Cập nhật các nút phân trang
  updatePaginationButtons();
}

// Lọc kết quả
function filterResults() {
  const houseId = document.getElementById("id-house-hold").value.trim();
  const fromDate = document.getElementById("from-date").value;
  const toDate = document.getElementById("to-date").value;
  const paymentStatus = document.getElementById("payment-status").value;

  filteredData = data.filter((item) => {
    const matchHouseId = !houseId || (String(item.householdId) || "").includes(houseId); // Đảm bảo item.householdId là chuỗi
    const matchFromDate = !fromDate || new Date(item.dueDate) >= new Date(fromDate);
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
          <input class="value" value="${Fee.numberCar}" disabled />
        </div>
        <div class="detail-row">
          <span class="label">Số xe máy:</span>
          <input class="value" value="${Fee.numberMotor}" disabled />
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
        <tbody id="paymentHistoryTableBody">
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

  fetch(`/admin/historyParkingFee/${Fee.parkingFeeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Không thể tải lịch sử thu. Vui lòng thử lại sau.");
      }
      return response.json();
    })
    .then((history) => {
      const tableBody = document.getElementById("paymentHistoryTableBody");
      if (history.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3">Không có lịch sử thu.</td></tr>`;
      } else {
        tableBody.innerHTML = history
          .map(
            (item) => `
            <tr>
              <td>${item.historyFeeId}</td>
              <td>${new Date(item.ngayThu).toLocaleDateString("vi-VN")}</td>
              <td>${item.soTien.toLocaleString()} VND</td>
            </tr>`
          )
          .join("");
      }
    })
    .catch((error) => {
      console.error("Đã xảy ra lỗi khi tải lịch sử thu:", error);
      const tableBody = document.getElementById("paymentHistoryTableBody");
      tableBody.innerHTML = `<tr><td colspan="3">Không thể tải dữ liệu lịch sử thu.</td></tr>`;
    });

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

function editRow(button) {
  event.stopPropagation(); // Ngăn sự kiện click hàng
  const row = button.parentElement.parentElement;
  const index = row.getAttribute("data-index");
  const cells = row.querySelectorAll("td");
  const parkingFeeId = filteredData[index].parkingFeeId; // Lấy feeId từ đối tượng dữ liệu

  if (button.textContent === "Sửa") {
    button.textContent = "Lưu";
    cells[4].querySelector("span").style.display = "none";
    cells[4].querySelector("input").style.display = "block";
  } else {
    button.textContent = "Sửa";
    const newPaid = parseInt(cells[4].querySelector("input").value, 10);

    if (isNaN(newPaid) || newPaid < 0 || newPaid > filteredData[index].amount) {
      alert("Số tiền không hợp lệ!");
      return;
    }

    filteredData[index].paid = newPaid; // Cập nhật giá trị paid trong dữ liệu local

    // Cập nhật dữ liệu trên server với PUT request
    fetch(`/admin/parkingFee/` + parkingFeeId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parkingFeeId: parkingFeeId, // Gửi feeId cùng với dữ liệu cập nhật
        dueDate: filteredData[index].dueDate,
        householdId: filteredData[index].householdId,
        numberCar: filteredData[index].numberCar,
        numberMotor: filteredData[index].numberMotor,
        amount: filteredData[index].amount,
        collectAmount: filteredData[index].paid,
        paid: filteredData[index].paid >= filteredData[index].amount,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Không thể cập nhật khoản thu. Vui lòng thử lại.");
        }
        return response.json();
      })
      .then((updatedData) => {
        filteredData[index] = updatedData; // Cập nhật dữ liệu trả về từ server
        renderTable(currentPage); // Hiển thị lại bảng
        alert("Cập nhật khoản thu thành công!");
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi cập nhật khoản thu:", error);
        alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
      });
  }
}
