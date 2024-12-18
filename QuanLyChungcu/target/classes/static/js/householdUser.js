let myResidents = [];

let currentPage = 1;
const itemsPerPage = 5; 

// Hàm cập nhật bảng dân cư
function updateResidentTable(residents) {
  const tableBody = document
    .getElementById("residentTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Xóa các dòng cũ trong bảng

  residents.forEach((resident) => {
    const row = tableBody.insertRow();
    // row.insertCell(0).textContent = resident.residentId;
    row.insertCell(0).textContent = resident.name;
    row.insertCell(1).textContent = resident.dateOfBirth.split("-").reverse().join("-"); 
    row.insertCell(2).textContent = resident.cccd;
    row.insertCell(3).textContent = resident.gender; 
    row.insertCell(4).textContent = resident.phoneNumber; 
    row.insertCell(5).textContent = resident.relationship;
    row.insertCell(6).textContent = resident.temporary;
    row.insertCell(7).textContent = resident.householdId;
  });
}

// Hàm phân trang
function changePage(direction) {
  const totalPages = Math.ceil(myResidents.length / itemsPerPage);
  currentPage += direction;

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageResidents = myResidents.slice(start, end);

  updateResidentTable(pageResidents);

  // Cập nhật số trang
  document.getElementById(
    "pageNumber"
  ).textContent = `Trang ${currentPage}`;

  // Kiểm tra nút phân trang
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled =
    currentPage === totalPages;
}

async function fetchResidentList() {
  console.log("fetching");
  try {
    const response = await fetch('/user/getListResident');

    if (!response.ok) {
      throw new Error(`Lỗi HTTP! Mã trạng thái: ${response.status}`);
    }

    const data = await response.json();
    myResidents = data; // Lưu trữ dữ liệu vào biến toàn cục myResidents

    console.log(data);
    changePage(0); // Cập nhật trang đầu tiên sau khi tải dữ liệu

  } catch (error) {
    console.error('Lỗi khi tải thông tin dân cư:', error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
    fetchResidentList();
});