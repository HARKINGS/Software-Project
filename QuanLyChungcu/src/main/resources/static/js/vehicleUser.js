let data = []; // Dữ liệu ban đầu
let filteredData = []; // Dữ liệu đã lọc
let currentPage = 1; // Trang hiện tại
const rowsPerPage = 10; // Số dòng mỗi trang

const newEntry = {
    householdId: 1,
    motorcycles: 2,
    cars: 3,
    amount: 500000,
    collectAmount: 300000,
    dueDate: 2024-12-10,
    paid: paid >= totalAmount,
  };

// Hiển thị bảng
function renderTable(page) {
  const tableBody = document.querySelector("#vehicleTable tbody");
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
      <td>${item.motorcycles || 0}</td>
      <td>${item.cars || 0}</td>
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