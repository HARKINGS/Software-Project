let currentPage = 1;
const itemsPerPage = 5; // Hiển thị 5 dân cư mỗi trang

const residents = [
  {
    residentID: "R001",
    name: "Nguyễn Văn A",
    cccd: "123456789012",
    household: "HK12345",
    room: "101",
  },
  {
    residentID: "R002",
    name: "Trần Thị B",
    cccd: "987654321098",
    household: "HK67890",
    room: "102",
  },
  {
    residentID: "R003",
    name: "Lê Quang C",
    cccd: "567890123456",
    household: "HK54321",
    room: "103",
  },
  {
    residentID: "R004",
    name: "Nguyễn Văn A",
    cccd: "123456789012",
    household: "HK12345",
    room: "101",
  },
  {
    residentID: "R005",
    name: "Trần Thị B",
    cccd: "987654321098",
    household: "HK67890",
    room: "102",
  },
  {
    residentID: "R006",
    name: "Lê Quang C",
    cccd: "567890123456",
    household: "HK54321",
    room: "103",
  },
  {
    residentID: "R007",
    name: "Nguyễn Văn A",
    cccd: "123456789012",
    household: "HK12345",
    room: "101",
  },
  {
    residentID: "R007",
    name: "Trần Thị B",
    cccd: "987654321098",
    household: "HK67890",
    room: "102",
  },
  {
    residentID: "R008",
    name: "Lê Quang C",
    cccd: "567890123456",
    household: "HK54321",
    room: "103",
  },
  {
    residentID: "R009",
    name: "Nguyễn Văn A",
    cccd: "123456789012",
    household: "HK12345",
    room: "101",
  },
  {
    residentID: "R010",
    name: "Trần Thị B",
    cccd: "987654321098",
    household: "HK67890",
    room: "102",
  },
  {
    residentID: "R011",
    name: "Lê Quang C",
    cccd: "567890123456",
    household: "HK54321",
    room: "103",
  },
];

// _____HÀM PHÂN TRANG_____
function changePage(direction) {
  const totalPages = Math.ceil(residents.length / itemsPerPage);
  currentPage += direction;

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageResidents = residents.slice(start, end);

  updateResidentTable(pageResidents);

  // Cập nhật số trang
  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;

  // Kiểm tra nút phân trang
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// _______THÊM DÂN CƯ__________
const addResButton = document.getElementById("Btn-addRes"); // Nút "Thêm dân cư"
const layer = document.querySelector(".layer"); // Lớp "layer"
const submitButton = document.querySelector(".submit-btn"); // Nút đăng ký (hoặc nút đóng tùy bạn)

//hàm hiện form đăng ký
function toggleLayerVisibility(show) {
  if (show) {
    // Hiện layer
    layer.style.display = "block";
    layer.style.position = "fixed";
    layer.style.top = "50%";
    layer.style.left = "50%";
    layer.style.transform = "translate(-50%, -50%)";
    layer.style.zIndex = "1000"; // Đảm bảo layer nổi trên các phần tử khác
    layer.style.backgroundColor = "white"; // Đặt màu nền
    layer.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
  } else {
    // Ẩn layer
    layer.style.display = "none";
  }
}

// Hiển thị layer khi nhấn vào nút "Thêm dân cư"
addResButton.addEventListener("click", () => toggleLayerVisibility(true));

// Ẩn layer khi nhấn nút đăng ký hoặc bên ngoài
submitButton.addEventListener("click", () => toggleLayerVisibility(false));
window.addEventListener("click", (event) => {
  if (!layer.contains(event.target) && event.target !== addResButton) {
    exitAddResident();
  }
});

//hàm thoát đăng ký
function exitAddResident() {
  const layer = document.querySelector(".layer");
  layer.style.display = "none";

  // Reset form về trạng thái ban đầu
  const inputs = document.querySelectorAll(".layer input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

// Hàm cập nhật bảng dân cư
function updateResidentTable(residents) {
  const tableBody = document
    .getElementById("residentTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Xóa các dòng cũ trong bảng

  residents.forEach((resident) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = resident.residentID; // Mã cư dân
    row.insertCell(1).textContent = resident.name;
    row.insertCell(2).textContent = "Ngày sinh"; // Thay bằng giá trị thực tế
    row.insertCell(3).textContent = resident.cccd;
    row.insertCell(4).textContent = "Giới tính"; // Thay bằng giá trị thực tế
    row.insertCell(5).textContent = "Số điện thoại"; // Thay bằng giá trị thực tế
    row.insertCell(6).textContent = resident.household;
    row.insertCell(7).textContent = resident.room;
    row.insertCell(8).textContent = "Trạng thái"; // Thay bằng giá trị thực tế

    // Thêm ô chứa nút xóa vào cuối mỗi dòng
    const deleteCell = row.insertCell(9);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Xóa";
    deleteButton.classList.add("delete-btn"); // Thêm lớp CSS cho nút xóa (nếu cần)
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Ngừng sự kiện click từ nút xóa
      deleteResident(resident.residentID); // Thực hiện xóa
    });

    // Thêm nút xóa vào ô
    deleteCell.appendChild(deleteButton);

    // Thêm sự kiện click vào hàng
    row.style.cursor = "pointer";
    row.addEventListener("click", () => showModal(resident));
  });
}

// Hàm xóa cư dân
function deleteResident(residentID) {
  // Xóa cư dân khỏi danh sách
  const index = residents.findIndex(
    (resident) => resident.residentID === residentID
  );
  if (index !== -1) {
    residents.splice(index, 1); // Xóa phần tử khỏi mảng
  }

  // Cập nhật lại bảng và phân trang
  const totalPages = Math.ceil(residents.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages; // Điều chỉnh lại trang nếu số lượng trang thay đổi
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  updateResidentTable(residents.slice(start, end));

  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Hàm tìm kiếm theo tên
function searchName() {
  const nameInput = document.getElementById("nameInput").value.toLowerCase();
  const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(nameInput)
  );
  updateResidentTable(filteredResidents);
}

// Hàm tìm kiếm theo CCCD
function searchCCCD() {
  const cccdInput = document.getElementById("cccdInput").value.toLowerCase();
  const filteredResidents = residents.filter((resident) =>
    resident.cccd.includes(cccdInput)
  );
  updateResidentTable(filteredResidents);
}

// Hàm tìm kiếm theo số hộ khẩu
function searchHousehold() {
  const householdInput = document
    .getElementById("householdInput")
    .value.toLowerCase();
  const filteredResidents = residents.filter((resident) =>
    resident.household.includes(householdInput)
  );
  updateResidentTable(filteredResidents);
}

// Hàm tìm kiếm theo số phòng
function searchRoom() {
  const roomInput = document.getElementById("roomInput").value.toLowerCase();
  const filteredResidents = residents.filter((resident) =>
    resident.room.includes(roomInput)
  );
  updateResidentTable(filteredResidents);
}

let isModalOpen = false; // Biến kiểm tra trạng thái modal

// Hiển thị modal với thông tin cư dân
function showModal(resident) {
  const modal = document.getElementById("residentModal");
  const modalDetails = document.getElementById("modalDetails");

  // Cập nhật thông tin vào modal
  modalDetails.innerHTML = `
    <div class = "box1">
      <div class = "InformationUser">
        <div class="basic-details">
          <div class="detail-row">
            <span class="label">Họ và tên:</span>
            <input class="value" id="editName" value="${resident.name}" />
          </div>
          <div class="detail-row">
            <span class="label">Ngày sinh:</span>
            <input class="value" id="editBirthdate" value="Ngày sinh" /> <!-- Thay bằng dữ liệu thực -->
          </div>
          <div class="detail-row">
            <span class="label">Giới tính:</span>
            <input class="value" id="editGender" value="Giới tính" /> <!-- Thay bằng dữ liệu thực -->
          </div>
          <div class="detail-row">
            <span class="label">Số CCCD:</span>
            <input class="value" id="editCCCD" value="${resident.cccd}" />
          </div>
          <div class="detail-row">
            <span class="label">Số điện thoại:</span>
            <input class="value" id="editPhone" value="Số điện thoại" /> <!-- Thay bằng dữ liệu thực -->
          </div>
          <div class="detail-row">
            <span class="label">Số hộ khẩu:</span>
            <input class="value" id="editHousehold" value="${resident.household}" />
          </div>
        </div>

        <div class="account-details">
          <div class="detail-row">
            <span class="label">Số phòng:</span>
            <input class="value" id="editRoom" value="${resident.room}" />
          </div>
          <div class="detail-row">
            <span class="label">Trạng thái:</span>
            <input class="value" id="editState" value="Thường trú" />
          </div>
          <div class="detail-row">
            <span class="label">Tên đăng nhập:</span>
            <input class="value" id="editUsername" value="ngobakha@gmail.com" />
          </div>
          <div class="detail-row">
            <span class="label">Mật khẩu:</span>
            <input class="value" id="editPassword" type="password" value="********" />
          </div>
          <div class="detail-row">
            <span class="label">Quan hệ với hộ:</span>
            <input class="value" id="editRelation" value="Chủ hộ / Con chủ hộ" />
          </div>
        </div>
      </div>
      <div class="modal-actions">
          <button onclick="saveChanges()">Lưu</button>
          <button onclick="closeModal()">Hủy</button>
        </div>
    </div>  
  `;

  // Hiển thị modal
  modal.style.display = "block";
  isModalOpen = true; // Modal đã được mở

  event.stopPropagation();
}

function saveChanges() {
  const updatedResident = {
    name: document.getElementById("editName").value,
    birthdate: document.getElementById("editBirthdate").value,
    gender: document.getElementById("editGender").value,
    cccd: document.getElementById("editCCCD").value,
    phone: document.getElementById("editPhone").value,
    household: document.getElementById("editHousehold").value,
    room: document.getElementById("editRoom").value,
    role: document.getElementById("editState").value,
    username: document.getElementById("editUsername").value,
    password: document.getElementById("editPassword").value,
    relation: document.getElementById("editRelation").value,
  };

  // Gửi dữ liệu cập nhật đến backend
  fetch("/api/update-resident", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedResident),
  })
    .then((response) => {
      if (response.ok) {
        alert("Cập nhật thành công!");
        closeModal();
      } else {
        alert("Cập nhật thất bại!");
      }
    })
    .catch((error) => {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra khi gửi dữ liệu!");
    });
}

// Lắng nghe sự kiện click trên toàn bộ window
window.addEventListener("click", (event) => {
  const modal = document.getElementById("residentModal");

  // Chỉ đóng modal nếu nó đang hiển thị
  if (isModalOpen && !modal.contains(event.target)) {
    closeModal(); // Đóng modal
  }
});

// Đóng modal
function closeModal() {
  const modal = document.getElementById("residentModal");
  modal.style.display = "none";
  isModalOpen = false; // Modal đã đóng
}

// Hiển thị trang đầu tiên khi tải trang
window.onload = () => changePage(0);
