let currentPage = 1;
const itemsPerPage = 10; // Hiển thị 5 dân cư mỗi trang

let selectedResident;
let filteredResidents = null;
let residents = [];

// _____HÀM PHÂN TRANG_____
function changePage(direction) {
  const dataToDisplay = filteredResidents || residents; // Hiển thị danh sách tìm kiếm hoặc toàn bộ danh sách
  let totalPages = Math.ceil(dataToDisplay.length / itemsPerPage);
  currentPage += direction;

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    totalPages = currentPage;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageResidents = dataToDisplay.slice(start, end);

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
function updateResidentTable(data) {
  const tableBody = document
    .getElementById("residentTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Xóa các dòng cũ trong bảng

  data.forEach((resident) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = resident.residentId; // Mã cư dân
    row.insertCell(1).textContent = resident.name;
    row.insertCell(2).textContent = resident.dateOfBirth; // Thay bằng giá trị thực tế
    row.insertCell(3).textContent = resident.cccd;
    row.insertCell(4).textContent = resident.gender; // Thay bằng giá trị thực tế
    row.insertCell(5).textContent = resident.phoneNumber; // Thay bằng giá trị thực tế
    row.insertCell(6).textContent = resident.householdId;
    row.insertCell(7).textContent = resident.temporary; // Thay bằng giá trị thực tế

    // Thêm ô chứa nút xóa vào cuối mỗi dòng
    const deleteCell = row.insertCell(8);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Xóa";
    deleteButton.classList.add("delete-btn"); // Thêm lớp CSS cho nút xóa (nếu cần)
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Ngừng sự kiện click từ nút xóa
      deleteResident(resident.residentId); // Thực hiện xóa
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
  if (confirm("Bạn có chắc muốn xóa cư dân này không?")) {
    fetch("/admin/resident/" + residentID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          alert("Xoá thành công!");
          fetchListResident();
          updateResidentTable(residents);
          changePage(0);
        } else {
          alert("Xoá thất bại!");
        }
      });
  }
}
// Hàm chuyển đổi chuỗi tiếng Việt có dấu thành không dấu
function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Hàm tìm kiếm đồng thời
function searchResidents() {
  const nameInput = document.getElementById("nameInput").value.toLowerCase();
  const cccdInput = document.getElementById("cccdInput").value.toLowerCase();
  const householdInput = document.getElementById("householdInput").value.trim();
  const temporaryInput = document.getElementById("temporaryInput").value.toLowerCase();

  // Lọc danh sách theo các tiêu chí
  filteredResidents = residents.filter((resident) => {
    const matchesName = nameInput
      ? removeAccents(resident.name).includes(removeAccents(nameInput))
      : true;
    const matchesCCCD = cccdInput
      ? resident.cccd.includes(cccdInput)
      : true;
    const matchesHousehold = householdInput
      ? String(resident.householdId).includes(householdInput)
      : true;
    const matchesTemporary = temporaryInput
      ? resident.temporary.toLowerCase().includes(temporaryInput)
      : true;


    // Chỉ giữ các đối tượng thỏa mãn tất cả các điều kiện
    return matchesName && matchesCCCD && matchesHousehold && matchesTemporary;
  });

  // Cập nhật bảng hiển thị
  updateResidentTable(filteredResidents);
   console.log("Filtered Residents:", filteredResidents);
  changePage(0);
}
//_____THÔNG TIN CHI TIẾT CƯ DÂN_____
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
            <input class="value" id="editBirthdate" value="${resident.dateOfBirth}" /> <!-- Thay bằng dữ liệu thực -->
          </div>
          <div class="detail-row">
            <span class="label">Giới tính:</span>
            <input class="value" id="editGender" value="${resident.gender}" /> <!-- Thay bằng dữ liệu thực -->
          </div>
          <div class="detail-row">
            <span class="label">Số CCCD:</span>
            <input class="value" id="editCCCD" value="${resident.cccd}" />
          </div>
        </div>

        <div class="account-details">
          <div class="detail-row">
            <span class="label">Số điện thoại:</span>
            <input class="value" id="editPhone" value="${resident.phoneNumber}" /> <!-- Thay bằng dữ liệu thực -->
          </div>
          <div class="detail-row">
            <span class="label">Số hộ khẩu:</span>
            <input class="value" id="editHousehold" value="${resident.householdId}" />
          </div>
          <div class="detail-row">
            <span class="label">Trạng thái:</span>
            <input class="value" id="editState" value="${resident.temporary}" />
          </div>
          <div class="detail-row">
            <span class="label">Quan hệ với chủ hộ:</span>
            <input class="value" id="editRelation" value="${resident.relationship}" />
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
  selectedResident = resident;
  event.stopPropagation();
}

function saveChanges() {
  const updatedResident = {
    name: document.getElementById("editName").value,
    dateOfBirth: document.getElementById("editBirthdate").value,
    gender: document.getElementById("editGender").value,
    cccd: document.getElementById("editCCCD").value,
    phoneNumber: document.getElementById("editPhone").value,
    relationship: document.getElementById("editRelation").value,
    temporary: document.getElementById("editState").value,
    householdId: document.getElementById("editHousehold").value,
  };

  // Gửi dữ liệu cập nhật đến backend
  fetch("/admin/resident/" + selectedResident.residentId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedResident),
  })
    .then((response) => {
      if (response.ok) {
        alert("Cập nhật thành công!");
        closeModal();
        fetchListResident();
        updateResidentTable(residents);
        changePage(0);
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
  selectedResident = null;
  isModalOpen = false; // Modal đã đóng
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("/admin/resident" , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Không thể get list resident from" + numericHouseholdId);
        }
        return response.json();
      })
      .then((returnData) => {
        residents = returnData; 
        changePage(0);
      })
      .then(()=>{      
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('findByHousehold')) {
        const inputValue = urlParams.get("findByHousehold"); // Get the value
        if (!inputValue) {
          console.log("No inputValue provided");
        } else {
          console.log("Input Value (Raw):", inputValue);

          const inputField = document.getElementById("householdInput");
          inputField.value = String(inputValue); // Force value to string
          console.log("Programmatically set value:", inputField.value);

          // Trigger the input event
          const event = new Event('input', { bubbles: true, cancelable: true });
          inputField.dispatchEvent(event);
          console.log("Input event triggered");
          alert("Hãy thay đổi quan hệ với chủ hộ !")
          }
        } else { console.log("No findByHousehold param");}

        })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi hien thi", error);
        alert("Đã xảy ra lỗi khi hien thi");
      });
});

document.addEventListener("DOMContentLoaded",  () => {

    document.getElementById("addResForm").addEventListener('submit', async function (event) {
        event.preventDefault(); // Ngăn hành động mặc định của form

        const nameInput = document.getElementById('nameRes').value;
        const dobInput = document.getElementById('birthday').value;
        const genderInput = document.getElementById('gender').value;
        const cccdInput = document.getElementById('CCCD').value;
        const phoneNumInput = document.getElementById('SDT').value;
        const householdIdInput = document.getElementById('IDHousehold').value;
        const relationshipInput = document.getElementById('relation').value;
        const statusInput = document.getElementById('status').value;

        // Kiểm tra dữ liệu hợp lệ
        if (
          !nameInput ||
          !dobInput ||
          !genderInput ||
          !cccdInput ||
          !phoneNumInput
        ) {
          alert("Vui lòng nhập đầy đủ và chính xác thông tin!");
          return;
        }

        const newResident ={
          name: nameInput,
          dateOfBirth: dobInput,
          cccd: cccdInput,
          gender: genderInput,
          phoneNumber: phoneNumInput,
          relationship: relationshipInput,
          temporary: statusInput,
          householdId: householdIdInput,
        };

           console.log("Sending data to API:", {
                name: nameInput,
                dateOfBirth: dobInput,
                cccd: cccdInput,
                gender: genderInput,
                phoneNumber: phoneNumInput,
                relationship: relationshipInput,
                temporary: statusInput,
                householdId: householdIdInput,
            });

          fetch("/admin/resident", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(newResident),
            })
              .then(response => {
              if (response.status !== 201) {
                throw new Error("Không thể thêm ");
              }
              return response.json();
            })
            .then(data => {
              fetchListResident();
              updateResidentTable(residents);
              changePage(0);
              exitAddResident();
              alert("Thêm thành công!");
            })
            .catch(error => {
              console.error("Đã xảy ra lỗi khi thêm ", error);
              alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
              exitAddResident();
            });
    });
});

function getQueryParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName); // Returns the value of the parameter
}

async function fetchListResident(){
  fetch("/admin/resident" , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Không thể get list resident from" + numericHouseholdId);
        }
        return response.json();
      })
      .then((returnData) => {
        residents = returnData; 
        console.log(residents);
        updateResidentTable(residents);
        changePage(0);
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi hien thi", error);
        alert("Đã xảy ra lỗi khi hien thi");
      });
}