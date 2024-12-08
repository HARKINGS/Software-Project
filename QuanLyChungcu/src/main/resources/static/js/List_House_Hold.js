const data = [
  // Dữ liệu mẫu
  {
    code: "HK001",
    name: "Nguyễn Văn A",
    apartment: "101",
    phone: "0912345678",
    area: "60m²",
    members: [
      {
        idRes: "CD101",
        name: "Nguyễn Văn B",
        birthdate: "1990-05-10",
        idNumber: "123456789",
        gender: "Nam",
        relationship: "Con",
        phone: "0912345678",
        status: "Cư trú",
      },
      {
        idRes: "CD102",
        name: "Nguyễn Thị C",
        birthdate: "1985-02-25",
        idNumber: "987654321",
        gender: "Nữ",
        relationship: "Vợ",
        phone: "0987654321",
        status: "Cư trú",
      },
    ],
  },
  {
    code: "HK002",
    name: "Trần Thị C",
    apartment: "102",
    phone: "0987654321",
    area: "72m²",
  },
  {
    code: "HK004",
    name: "Trần Thị B",
    apartment: "105",
    phone: "0987654321",
    area: "72m²",
  },
  {
    code: "HK003",
    name: "Trần Thị D",
    apartment: "102",
    phone: "0987654321",
    area: "72m²",
  },
  {
    code: "HK003",
    name: "Trần Thị E",
    apartment: "102",
    phone: "0987654311",
    area: "72m²",
  },
  {
    code: "HK003",
    name: "Trần Thị F",
    apartment: "102",
    phone: "0987654321",
    area: "72m²",
  },
  {
    code: "HK003",
    name: "Trần Thị G",
    apartment: "102",
    phone: "0987654321",
    area: "72m²",
  },
  {
    code: "HK003",
    name: "Trần Thị H",
    apartment: "102",
    phone: "0987654321",
    area: "72m²",
  },
  {
    code: "HK003",
    name: "Trần Thị I",
    apartment: "102",
    phone: "0987654321",
    area: "72m²",
  },
  // Thêm dữ liệu nếu cần
];

let currentPage = 1;
const rowsPerPage = 5;

//Tìm kiếm thông tin
function searchData() {
  const maHoKhau = document.getElementById("ma-ho-khau").value.toLowerCase();
  const chuHo = document.getElementById("chu-ho").value.toLowerCase();
  const soCanHo = document.getElementById("so-can-ho").value.toLowerCase();

  const filteredData = data.filter((item) => {
    return (
      item.code.toLowerCase().includes(maHoKhau) &&
      item.name.toLowerCase().includes(chuHo) &&
      item.apartment.toLowerCase().includes(soCanHo)
    );
  });

  displayData(filteredData);
}

//Hiển thị thông tin
function displayData(filteredData) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = currentPage * rowsPerPage;
  const currentData = filteredData.slice(start, end);

  currentData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.code}</td>
        <td>${item.name}</td>
        <td>${item.apartment}</td>
        <td>${item.phone}</td>
        <td>${item.area}</td>
        <td><button class="delete-btn">Xóa</button></td>
      `;
    row.style.cursor = "pointer";
    row.addEventListener("click", () => showModal(item));

    const deleteButton = row.querySelector(".delete-btn");
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Ngừng sự kiện click của dòng (không mở modal)
      deleteHousehold(item); // Gọi hàm xóa với đối tượng hộ khẩu
    });

    tableBody.appendChild(row);
  });
  // Thêm sự kiện click vào hàng
  updatePagination(filteredData.length);
}

// Xóa hộ khẩu
function deleteHousehold(household) {
  // Tìm chỉ mục của hộ khẩu trong mảng dữ liệu
  const index = data.findIndex((item) => item.code === household.code);
  if (index !== -1) {
    // Xóa hộ khẩu khỏi mảng
    data.splice(index, 1);

    // Cập nhật lại hiển thị dữ liệu
    searchData(); // Hoặc gọi displayData(filteredData) nếu bạn đã lọc dữ liệu
  }
}

// ______THÔNG TIN CHI TIẾT HỘ KHẨU_________
let isModalOpen = false; // Biến kiểm tra trạng thái modal

function showModal(household) {
  const modal = document.getElementById("houseHoldModal");
  const modalDetails = document.getElementById("modalDetails");

  // Cập nhật thông tin vào modal
  modalDetails.innerHTML = `
      <div class = information-household>
        <div class="basic-details">
            <div class="detail-row">
              <span class="label">Mã hộ khẩu:</span>
              <input class="value" value="${household.idhouse}" disabled/>
            </div>
            <div class="detail-row">
              <span class="label">Số căn hộ:</span>
              <input class="value" id="editNumbehouse" value="${
                household.numHouse
              }" disabled/>
            </div>
            <div class="detail-row">
              <span class="label">Diện tích:</span>
              <input class="value" id="editArea" value="${
                household.area
              }" disabled/>
            </div>
        </div>
        <h1>Danh sách thành viên của hộ:</h1>
        <table>
            <thead>
                <tr>
                    <th>Mã cư dân</th>
                    <th>Tên dân cư</th>
                    <th>Ngày sinh</th>
                    <th>Số CCCD</th>
                    <th>Giới tính</th>
                    <th>Quan hệ với chủ hộ</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                ${household.members
                  .map(
                    (member) => `
                  <tr>
                    <td>${member.idRes}</td>
                    <td>${member.name}</td>
                    <td>${member.birthdate}</td>
                    <td>${member.idNumber}</td>
                    <td>${member.gender}</td>
                    <td>${member.relationship}</td>
                    <td>${member.phone}</td>
                    <td>${member.status}</td>
                  </tr>
                `
                  )
                  .join("")}
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
  const modal = document.getElementById("houseHoldModal");

  // Chỉ đóng modal nếu nó đang hiển thị
  if (isModalOpen && !modal.contains(event.target)) {
    closeModal(); // Đóng modal
  }
});

// Đóng modal
function closeModal() {
  const modal = document.getElementById("houseHoldModal");
  modal.style.display = "none";
  isModalOpen = false; // Modal đã đóng
}

//Cập nhật phân trang
function updatePagination(filteredDataLength) {
  const totalPages = Math.ceil(filteredDataLength / rowsPerPage);
  document.getElementById(
    "pageNumber"
  ).innerText = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    searchData();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    searchData();
  }
});

//_____CHUYỂN HỘ KHẨU_____
const showMoveButton = document.getElementById("moveBtn");
const moveHouseHold = document.querySelector(".moveHouseHold");

showMoveButton.addEventListener("click", (event) => {
  moveHouseHold.style.display = "block"; // Hiển thị form
  event.stopPropagation(); // Ngừng sự kiện click lan truyền để không đóng form
});

function exitMoveForm() {
  moveHouseHold.style.display = "none"; // Đảm bảo đóng đúng phần tử form

  // Reset form về trạng thái ban đầu
  const inputs = document.querySelectorAll(".moveHouseHold input");
  inputs.forEach((input) => {
    input.value = ""; // Xóa các giá trị trong input
  });
}

window.addEventListener("click", (event) => {
  // Kiểm tra nếu click ra ngoài form và không click vào nút hiển thị
  if (
    !moveHouseHold.contains(event.target) &&
    event.target !== showMoveButton
  ) {
    exitMoveForm(); // Đóng form
  }
});

const householdData = [
  {
    code: "HK001",
    name: "Nguyễn Văn A",
    apartment: "101",
    phone: "0912345678",
    area: "60m²",
    cccd: "123456789012",
  },
  {
    code: "HK002",
    name: "Trần Thị C",
    apartment: "102",
    phone: "0987654321",
    area: "72m²",
    cccd: "234567890123",
  },
  // Thêm dữ liệu hộ khẩu khác nếu cần
];

// Hàm cập nhật thông tin dựa trên mã hộ khẩu
function fillInfoBasedOnHousehold() {
  const houseCode = document.getElementById("id-house").value;
  const household = householdData.find((item) => item.code === houseCode);

  if (household) {
    document.getElementById("name-host").value = household.name;
    document.getElementById("addr-now").value = household.apartment;
    document.getElementById("cccd").value = household.cccd;
  } else {
    // Nếu không tìm thấy hộ khẩu, xóa thông tin cũ
    document.getElementById("name-host").value = "";
    document.getElementById("addr-now").value = "";
    document.getElementById("cccd").value = "";
  }
}

//_____THÊM HỘ KHẨU___________
const showAddButton = document.getElementById("addBtn");
const addHouse = document.querySelector(".addHouse");

showAddButton.addEventListener("click", (event) => {
  addHouse.style.display = "block"; // Hiển thị form
  event.stopPropagation(); // Ngừng sự kiện click lan truyền để không đóng form
});

function exitAddHouse() {
  addHouse.style.display = "none"; // Đảm bảo đóng đúng phần tử form

  // Reset form về trạng thái ban đầu
  const inputs = document.querySelectorAll(".addHouse input");
  inputs.forEach((input) => {
    input.value = ""; // Xóa các giá trị trong input
  });
}

window.addEventListener("click", (event) => {
  // Kiểm tra nếu click ra ngoài form và không click vào nút hiển thị
  if (!addHouse.contains(event.target) && event.target !== showAddButton) {
    exitAddHouse(); // Đóng form
  }
});

//_____TÁCH HỘ KHẨU__________
const showSplitButton = document.getElementById("splitBtn");
const splitHouse = document.getElementById("splitHouse");

// Hiển thị form khi bấm nút
showSplitButton.addEventListener("click", (event) => {
  splitHouse.style.display = "block"; // Hiển thị form
  event.stopPropagation(); // Ngừng sự kiện click lan truyền để không đóng form
});

// Đóng form
function exitSplitForm() {
  splitHouse.style.display = "none"; // Đóng form
  const inputs = document.querySelectorAll(".TachHoKhau input");
  inputs.forEach((input) => {
    input.value = ""; // Reset các trường nhập
  });
}

// Lắng nghe sự kiện click toàn bộ cửa sổ để đóng form khi click ra ngoài
window.addEventListener("click", (event) => {
  // Kiểm tra nếu click ra ngoài splitHouse và không click vào nút hiển thị
  if (!splitHouse.contains(event.target) && event.target !== showSplitButton) {
    exitSplitForm(); // Đóng form
  }
});

searchData();
