document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/admin/fee", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Không thể tải danh sách khoản thu. Vui lòng thử lại sau.");
        }

        const fees = await response.json(); // Lấy dữ liệu JSON từ phản hồi
        data = fees; // Cập nhật danh sách khoản thu
        filteredData = data; // Cập nhật dữ liệu lọc
        currentPage = 1; // Reset về trang đầu tiên sau khi tải lại dữ liệu
        renderTable(currentPage); // Hiển thị bảng với phân trang
    } catch (error) {
        console.error("Đã xảy ra lỗi khi tải dữ liệu:", error);
        alert("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    }
});

let data = []; // Dữ liệu ban đầu
let filteredData = [...data]; // Dữ liệu đã lọc
let currentPage = 1; // Trang hiện tại
const rowsPerPage = 10; // Số dòng mỗi trang
const tableBody = document.querySelector("#FeeTable tbody"); // Lấy phần thân bảng

// Hàm hiển thị bảng với phân trang
function renderTable(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filteredData.slice(start, end);
    const inputRow = document.getElementById("inputRow");

    tableBody.innerHTML = ""; // Xóa bảng hiện tại
    tableBody.appendChild(inputRow); // Thêm dòng nhập liệu (nếu có)

    pageData.forEach((row, index) => {
        const status = row.paid ? "Hoàn tất" : "Chưa hoàn tất";
        const statusClass = row.paid ? "completed" : "incomplete";

        const tr = document.createElement("tr");
        tr.setAttribute("data-index", start + index);
        tr.innerHTML = `
            <td>${row.dueDate}</td>
            <td>${row.householdId}</td>
            <td>${row.feeType}</td>
            <td>${row.amount.toLocaleString()} VND</td>
            <td>
                <span>${row.collectAmount.toLocaleString()} VND</span>
                <input type="number" class="editPaidInput" style="display:none;" value="${row.collectAmount}" />
            </td>
            <td><span class="status ${statusClass}">${status}</span></td>
            <td>
                <button onclick="editRow(this)">Sửa</button>
                <button onclick="deleteRow(${start + index})">Xóa</button>
            </td>
        `;
        tr.style.cursor = "pointer";
        tr.addEventListener("click", () => {
          if (event.target.tagName === "INPUT") {
            event.stopPropagation();
            return;
          }
          showModal(pageData[index])
        });
        tableBody.appendChild(tr);
    });

    document.getElementById("pageNumber").textContent = `Page ${page}`; // Cập nhật số trang
    updatePaginationButtons(); // Cập nhật trạng thái các nút phân trang
}

// Lọc kết quả theo các điều kiện nhập vào
function updatePaginationButtons() {
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled =
      currentPage * rowsPerPage >= filteredData.length;
}

function removeAccents(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// Lọc kết quả theo các điều kiện nhập vào
function filterResults() {
  const nameFee = document.getElementById("nameFee").value.toLowerCase();
  const houseId = document.getElementById("id-house-hold").value;
  const fromDateValue = document.getElementById("from-date").value;
  const toDateValue = document.getElementById("to-date").value;
  const paymentStatus = document.getElementById("payment-status").value;

  const fromDate = fromDateValue ? new Date(fromDateValue) : null;
  const toDate = toDateValue ? new Date(toDateValue) : null;

  // Lọc dữ liệu
  filteredData = data.filter((item) => {
    const dueDate = new Date(item.dueDate);
    // Kiểm tra mã hộ dân (giả sử item.householdId là kiểu số)
    const matchesHouseId = houseId ? item.householdId.toString().includes(houseId) : true;
    const matchesDate = (!fromDate || dueDate >= fromDate) && (!toDate || dueDate <= toDate);

    let matchesStatus = true;
    if (paymentStatus) {
      if (paymentStatus === "hoàn tất") {
        matchesStatus = item.paid === true; // Trạng thái hoàn tất (paid === true)
      } else if (paymentStatus === "chưa hoàn tất") {
        matchesStatus = item.paid === false; // Trạng thái chưa hoàn tất (paid === false)
      }
    }

    return ( (!nameFee || removeAccents(item.feeType).toLowerCase().includes(removeAccents(nameFee))) && matchesHouseId && matchesDate && matchesStatus);
  });
  console.log(filteredData);
  currentPage = 1;
  renderTable(currentPage);
}

// Thêm dòng dữ liệu mới
function addNewRow() {
  const newDueDate = document.getElementById("newDeadline").value;
  const newHouseId = document.getElementById("newHouseId").value;
  const newName = document.getElementById("newName").value;
  const newTotal = parseInt(document.getElementById("newTotal").value, 10);
  const newPaid = parseInt(document.getElementById("newPaid").value, 10);

  // Kiểm tra dữ liệu hợp lệ
  if (
    !newDueDate ||
    !newHouseId ||
    !newName ||
    isNaN(newTotal) ||
    isNaN(newPaid)
  ) {
    alert("Vui lòng nhập đầy đủ và chính xác thông tin!");
    return;
  }

  if (newTotal < 0 || newPaid < 0 || newPaid > newTotal) {
    alert("Số tiền không hợp lệ!");
    return;
  }

  const newFee = {
      dueDate: newDueDate,
      householdId: newHouseId,
      feeType: newName,
      amount: newTotal,
      collectAmount: newPaid,
      paid: newPaid >= newTotal
    };

    console.log("Dữ liệu gửi đi:", JSON.stringify(newFee));

    // Gửi yêu cầu POST để thêm dữ liệu mới vào server
    fetch("/admin/fee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFee),
    })
      .then(response => {
        if (response.status !== 201) {
          throw new Error("Không thể thêm khoản thu. Vui lòng thử lại.");
        }
        return response.json();
      })
      .then(data => {
        // Cập nhật dữ liệu với phản hồi từ server
        // Cập nhật filteredData và hiển thị lại bảng
        newFee.feeId = data.feeId;
        filteredData.push(newFee);
        renderTable(currentPage); // Hiển thị lại bảng với dữ liệu mới
        resetInputRow(); // Reset ô nhập liệu
        alert("Thêm khoản thu thành công!");
      })
      .catch(error => {
        console.error("Đã xảy ra lỗi khi thêm khoản thu:", error);
        alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
      });
}

// Xóa một dòng
function deleteRow(index) {
  event.stopPropagation(); // Ngăn sự kiện click hàng
  const feeId = filteredData[index].feeId; // Lấy feeId từ đối tượng dữ liệu

    if (confirm("Bạn có chắc muốn xóa khoản thu này không?")) {
      // Gửi yêu cầu DELETE để xóa khoản thu
      fetch("/admin/fee/" + feeId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        if (response.status !== 204) {
          throw new Error("Không thể xóa khoản thu. Vui lòng thử lại.");
        }
      })
      .then(() => {
        // Xóa khoản thu khỏi dữ liệu trong filteredData
        filteredData.splice(index, 1);
        data = [...filteredData]; // Cập nhật lại dữ liệu gốc nếu cần

        currentPage = Math.min(
          currentPage,
          Math.ceil(filteredData.length / rowsPerPage)
        );

        renderTable(currentPage); // Hiển thị lại bảng với dữ liệu sau khi xóa
        alert("Xóa khoản thu thành công!");
      })
      .catch(error => {
        console.error("Đã xảy ra lỗi khi xóa khoản thu:", error);
        alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
      });
    }
}

// Hàm chỉnh sửa hàng dữ liệu
// Hàm chỉnh sửa hàng dữ liệu
function editRow(button) {
  event.stopPropagation(); // Ngăn sự kiện click hàng
  const row = button.parentElement.parentElement;
  const index = row.getAttribute("data-index");
  const cells = row.querySelectorAll("td");
  const feeId = filteredData[index].feeId; // Lấy feeId từ đối tượng dữ liệu

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
    fetch(`/admin/fee/${feeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feeId: feeId, // Gửi feeId cùng với dữ liệu cập nhật
        dueDate: filteredData[index].dueDate,
        householdId: filteredData[index].householdId,
        feeType: filteredData[index].feeType,
        amount: filteredData[index].amount,
        collectAmount: filteredData[index].paid,
        paid: filteredData[index].paid >= filteredData[index].amount,
      }),
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error("Không thể cập nhật khoản thu. Vui lòng thử lại.");
      }
      return response.json();
    })
    .then(updatedData => {
      filteredData[index] = updatedData; // Cập nhật dữ liệu trả về từ server
      renderTable(currentPage); // Hiển thị lại bảng
      alert("Cập nhật khoản thu thành công!");
    })
    .catch(error => {
      console.error("Đã xảy ra lỗi khi cập nhật khoản thu:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
    });
  }
}

// Reset ô nhập liệu
function resetInputRow() {
  document.getElementById("newDeadline").value = "";
  document.getElementById("newHouseId").value = "";
  document.getElementById("newName").value = "";
  document.getElementById("newTotal").value = "";
  document.getElementById("newPaid").value = "";
}

// Chuyển trang
function changePage(direction) {
  currentPage += direction;
  renderTable(currentPage);
}

// DIEU KHIEN MODAL
let isModalOpen = false; // Biến kiểm tra trạng thái modal

function showModal(Fee) {
  const modal = document.getElementById("FeeModal");
  const modalDetails = document.getElementById("modalDetails");
  const status = Fee.paid ? "Hoàn tất" : "Chưa hoàn tất";

  // Hiển thị thông tin cơ bản
  modalDetails.innerHTML = `
      <div class="payment-history">
      <div class="basic-detail">
        <div class="detail-row">
          <span class="label">Tên phí thu:</span>
          <input class="value" value="${Fee.feeType}" disabled />
        </div>
        <div class="detail-row">
          <span class="label">Hạn thu:</span>
          <input class="value" value="${Fee.dueDate}" disabled />
        </div>
        <div class="detail-row">
          <span class="label">Số tiền cần thu:</span>
          <input class="value" id="totalPay" value="${Fee.amount.toLocaleString()} VND" disabled />
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
            <td colspan="3">Đang tải dữ liệu...</td>
          </tr>
        </tbody>
      </table>
    </div>
    `;

  // Hiển thị modal
  modal.style.display = "block";
  isModalOpen = true; // Modal đã được mở

  // Gửi yêu cầu API để lấy lịch sử các lần thu
  fetch(`/admin/historyFee/${Fee.feeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Không thể tải lịch sử thu. Vui lòng thử lại sau.");
      }
      return response.json();
    })
    .then(history => {
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
    .catch(error => {
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

// Hiển thị bảng lần đầu
renderTable(currentPage);
