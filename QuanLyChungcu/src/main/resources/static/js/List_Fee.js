const data = [
  {
    dueDate: "2023-12-15",
    houseId: "H001",
    name: "Phí vệ sinh",
    total: 50000,
    paid: 50000,
  },
  {
    dueDate: "2023-12-20",
    houseId: "H002",
    name: "Phí bảo vệ",
    total: 30000,
    paid: 20000,
  },
];

let filteredData = [...data];
let currentPage = 1;
const rowsPerPage = 10;

const tableBody = document.querySelector("#FeeTable tbody");

// Hàm hiển thị bảng với phân trang
function renderTable(page) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = filteredData.slice(start, end);
  const inputRow = document.getElementById("inputRow");

  tableBody.innerHTML = "";
  tableBody.appendChild(inputRow);

  pageData.forEach((row, index) => {
    const status = row.paid >= row.total ? "Hoàn tất" : "Chưa hoàn tất";
    const statusClass = row.paid >= row.total ? "completed" : "incomplete";

    const tr = document.createElement("tr");
    tr.setAttribute("data-index", start + index);
    tr.innerHTML = `
      <td>${row.dueDate}</td>
      <td>${row.houseId}</td>
      <td>${row.name}</td>
      <td>${row.total.toLocaleString()} VND</td>
      <td>
        <span>${row.paid.toLocaleString()} VND</span>
        <input type="number" class="editPaidInput" style="display:none;" value="${
          row.paid
        }" />
      </td>
      <td><span class="status ${statusClass}">${status}</span></td>
      <td>
        <button onclick="editRow(this)">Sửa</button>
        <button onclick="deleteRow(${start + index})">Xóa</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  document.getElementById("pageNumber").textContent = `Page ${page}`;
  updatePaginationButtons();
}

// Kiểm tra và cập nhật trạng thái nút phân trang
function updatePaginationButtons() {
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled =
    currentPage * rowsPerPage >= filteredData.length;
}

// Lọc kết quả theo các điều kiện nhập vào
function filterResults() {
  const nameFee = document.getElementById("nameFee").value.toLowerCase();
  const houseId = document.getElementById("id-house-hold").value.toLowerCase();
  const fromDateValue = document.getElementById("from-date").value;
  const toDateValue = document.getElementById("to-date").value;
  const paymentStatus = document.getElementById("payment-status").value;

  const fromDate = fromDateValue ? new Date(fromDateValue) : null;
  const toDate = toDateValue ? new Date(toDateValue) : null;

  filteredData = data.filter((item) => {
    const dueDate = new Date(item.dueDate);
    const matchesName = item.name.toLowerCase().includes(nameFee);
    const matchesHouseId = item.houseId.toLowerCase().includes(houseId);
    const matchesDate =
      (!fromDate || dueDate >= fromDate) && (!toDate || dueDate <= toDate);
    const matchesStatus =
      !paymentStatus ||
      (paymentStatus === "hoàn tất"
        ? item.paid >= item.total
        : item.paid < item.total);

    return matchesName && matchesHouseId && matchesDate && matchesStatus;
  });

  currentPage = 1; // Reset về trang đầu tiên
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

  data.push({
    dueDate: newDueDate,
    houseId: newHouseId,
    name: newName,
    total: newTotal,
    paid: newPaid,
  });

  filteredData = [...data];
  renderTable(currentPage);
  resetInputRow();
}

// Xóa một dòng
function deleteRow(index) {
  if (confirm("Bạn có chắc muốn xóa khoản thu này không?")) {
    data.splice(index, 1);
    filteredData = [...data];
    currentPage = Math.min(
      currentPage,
      Math.ceil(filteredData.length / rowsPerPage)
    );
    renderTable(currentPage);
  }
}

// Hàm chỉnh sửa hàng dữ liệu
function editRow(button) {
  const row = button.parentElement.parentElement;
  const index = row.getAttribute("data-index");
  const cells = row.querySelectorAll("td");

  if (button.textContent === "Sửa") {
    button.textContent = "Lưu";
    cells[4].querySelector("span").style.display = "none";
    cells[4].querySelector("input").style.display = "block";
  } else {
    button.textContent = "Sửa";
    const newPaid = parseInt(cells[4].querySelector("input").value, 10);

    if (isNaN(newPaid) || newPaid < 0 || newPaid > data[index].total) {
      alert("Số tiền không hợp lệ!");
      return;
    }

    data[index].paid = newPaid;
    filteredData = [...data];
    renderTable(currentPage);
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

// Hiển thị bảng lần đầu
renderTable(currentPage);
