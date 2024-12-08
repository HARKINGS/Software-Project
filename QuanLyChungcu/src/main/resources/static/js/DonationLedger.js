const data = [
  {
    date: "2024-12-01",
    household: "H001",
    feeName: "Quỹ Bảo trì",
    amount: 500000,
  },
  {
    date: "2024-12-02",
    household: "H002",
    feeName: "Quỹ PCCC",
    amount: 300000,
  },
];
let filteredData = [...data];
let currentPage = 1;
const rowsPerPage = 10;

function renderTable(page) {
  const tableBody = document.querySelector("#FeeTable tbody");
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = page * rowsPerPage;

  tableBody.innerHTML = `<tr class="add-row">${
    document.querySelector(".add-row").innerHTML
  }</tr>`;
  filteredData.slice(startIndex, endIndex).forEach((item, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-index", startIndex + index);
    row.innerHTML = `
              <td>${item.date}</td>
              <td>${item.household}</td>
              <td>${item.feeName}</td>
              <td>${item.amount.toLocaleString()}</td>
              <td><button onclick="deleteRow(this)">Xóa</button></td>
            `;
    tableBody.appendChild(row);
  });

  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;
}

function filterData() {
  const nameFee = document.getElementById("nameFee").value.toLowerCase();
  const household = document
    .getElementById("id-house-hold")
    .value.toLowerCase();
  const fromDate = document.getElementById("from-date").value;
  const toDate = document.getElementById("to-date").value;

  filteredData = data.filter((item) => {
    return (
      (!nameFee || item.feeName.toLowerCase().includes(nameFee)) &&
      (!household || item.household.toLowerCase().includes(household)) &&
      (!fromDate || item.date >= fromDate) &&
      (!toDate || item.date <= toDate)
    );
  });

  currentPage = 1;
  renderTable(currentPage);
}

function addRow() {
  const date = document.getElementById("addDate").value;
  const household = document.getElementById("addHousehold").value;
  const feeName = document.getElementById("addFeeName").value;
  const amount = document.getElementById("addAmount").value;

  if (date && household && feeName && amount) {
    data.push({ date, household, feeName, amount: parseFloat(amount) });
    filterData();
  } else {
    alert("Vui lòng nhập đầy đủ thông tin!");
  }
}

function changePage(offset) {
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const newPage = currentPage + offset;
  if (newPage > 0 && newPage <= totalPages) {
    currentPage = newPage;
    renderTable(currentPage);
  }
}

function deleteRow(button) {
  const row = button.closest("tr");
  const dataIndex = parseInt(row.getAttribute("data-index"), 10);
  data.splice(dataIndex, 1);
  filterData();
}

renderTable(currentPage);
