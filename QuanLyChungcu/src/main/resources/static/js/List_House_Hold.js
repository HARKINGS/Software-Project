const data = [
  // Dữ liệu mẫu
  {
    code: "HK001",
    name: "Nguyễn Văn A",
    apartment: "101",
    phone: "0912345678",
    area: "60m²",
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
          <td><button class="action-btn">Chi tiết</button></td>
        `;
    tableBody.appendChild(row);
  });
  // Thêm sự kiện click vào hàng
  updatePagination(filteredData.length);

  row.style.cursor = "pointer";
  row.addEventListener("click", () => showModal(houseHoldModal));
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

//Điều khiển xuất hiện CHUYỂN HỘ KHẨU
function showMoveForm() {
  document.querySelector(".moveHouseHold").style.display = "block";
}

function exitMoveForm() {
  document.querySelector(".moveHouseHold").style.display = "none";

  const inputs = document.querySelectorAll(".moveHouseHold input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

//_____THÊM HỘ KHẨU___________
function showAddHouse() {
  document.querySelector(".addHouse").style.display = "block";
}

function exitAddHouse() {
  const layer = document.querySelector(".addHouse");
  layer.style.display = "none";

  // Reset form về trạng thái ban đầu
  const inputs = document.querySelectorAll(".addHouse input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

//_____TÁCH HỘ KHẨU__________
function showSplitForm() {
  document.querySelector(".TachHoKhau").style.display = "block";
}

function exitSplitForm() {
  document.querySelector(".TachHoKhau").style.display = "none";

  const inputs = document.querySelectorAll(".TachHoKhau input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

// ______THÔNG TIN CHI TIẾT HỘ KHẨU
let isModalOpen = false; // Biến kiểm tra trạng thái modal

function showModal() {
  const modal = document.getElementById("houseHoldModal");
  const modalDetails = document.getElementById("modalDetails");

  // Cập nhật thông tin vào modal
  modalDetails.innerHTML = `
        <div class = information-household>
          <div class="basic-details">
              <div class="detail-row">
                <span class="label">Mã hộ khẩu:</span>
                <input class="value" value="${household.idhouse}" />
              </div>
              <div class="detail-row">
                <span class="label">Số căn hộ:</span>
                <input class="value" id="editNumbehouse" value="${household.numHouse}" />
              </div>
              <div class="detail-row">
                <span class="label">Diện tích:</span>
                <input class="value" id="editArea" value="${household.area}" />
              </div>
          </div>
          Danh sách thành viên của hộ:
          <table>
              <thead>
                  <tr>
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
                  <!-- Dữ liệu được thêm vào đây -->
              </tbody>
          </table>
      </div>  
      `;

  // Hiển thị modal
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

searchData();
