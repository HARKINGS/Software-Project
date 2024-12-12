let data = [];

let listHousehold = []; 

let currentPage = 1;
const rowsPerPage = 10;

// Hàm chuyển đổi chuỗi tiếng Việt có dấu thành không dấu
function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

//Tìm kiếm thông tin
function searchData() {
  const maHoKhau = document.getElementById("ma-ho-khau").value.toLowerCase();
  const chuHo = document.getElementById("chu-ho").value.toLowerCase();
  const soCanHo = document.getElementById("so-can-ho").value.toLowerCase();

  const filteredData = data.filter((item) => {
    return (
      String(item.code).toLowerCase().includes(maHoKhau) &&
      removeAccents(item.name).toLowerCase().includes(removeAccents(chuHo)) &&
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
    row.addEventListener("click", () => showHouseholdDetail(item));

    const deleteButton = row.querySelector(".delete-btn");
    
    //_____XOÁ HỘ KHẨU_____
    deleteButton.addEventListener("click", async (event) => {
      if (confirm("Bạn có chắc muốn xóa hộ khẩu này không?")) {
      fetch("/admin/household/" + item.code, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        if (response.status !== 204) {
          throw new Error("Không thể xóa hộ khẩu. Vui lòng thử lại.");
        }
      })
      .then(() => {
        alert("Xóa hộ khẩu thành công!");
        readData();
      })
      .catch(error => {
        console.error("Đã xảy ra lỗi khi xóa hộ khẩu:", error);
        alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
      });
    }
    if(event) { event.stopPropagation();  } 
    });

    tableBody.appendChild(row);
  });
  // Thêm sự kiện click vào hàng
  updatePagination(filteredData.length);
}

// ______THÔNG TIN CHI TIẾT HỘ KHẨU_________
let isModalOpen = false; // Biến kiểm tra trạng thái modal


async function showHouseholdDetail(household){
  fetch("/admin/resident", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Không thể get list resident");
        }
        return response.json();
      })
      .then( returnData =>{
        let listResident = returnData;
        household.members.length = 0;
        for(var i = 0; i < listResident.length; i++){
          if(listResident[i].householdId === household.code){
            household.members.push(listResident[i]);
          }
        }
      })
      .then( () =>{
        showModal(household);
      })
      .catch(error => {
        console.error("Đã xảy ra lỗi khi hien thi", error);
        alert("Đã xảy ra lỗi khi hien thi");
      });
}


function showModal(household) {
  const modal = document.getElementById("houseHoldModal");
  const modalDetails = document.getElementById("modalDetails");

  // Cập nhật thông tin vào modal
  modalDetails.innerHTML = `
      <div class = information-household>
        <div class="basic-details">
            <div class="detail-row">
              <span class="label">Mã hộ khẩu:</span>
              <input class="value" value="${household.code}" disabled/>
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
                    <td>${member.residentId}</td>
                    <td>${member.name}</td>
                    <td>${member.dateOfBirth}</td>
                    <td>${member.cccd}</td>
                    <td>${member.gender}</td>
                    <td>${member.relationship}</td>
                    <td>${member.phoneNumber}</td>
                    <td>${member.temporary}</td>
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

  if (event) {
    event.stopPropagation();
  }
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

// //_____TÁCH HỘ KHẨU__________
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

//----------------------------------------------------------------//

async function readData(){
  fetch("/admin/household", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Không thể get list houshold");
        }
        return response.json();
      })
      .then( returnData =>{
        listHousehold = returnData;
        data.length = 0;
        for(var i = 0; i < listHousehold.length; i++){
          let newHouseData ={
            code: listHousehold[i].householdId,
            name: listHousehold[i].chuHo.name,
            apartment: listHousehold[i].householdNumber,
            phone: listHousehold[i].chuHo.phoneNumber,
            area: listHousehold[i].apartmentSize,
            members:[],
            numHouse : listHousehold[i].householdNumber,
          }
          data.push(newHouseData);
        }
        console.log("data is: ");
        console.log(data);
        displayData(data);
      })
      .catch(error => {
        console.error("Đã xảy ra lỗi khi hiển thị", error);
        alert("Đã xảy ra lỗi khi hien thi");
      });
}


document.addEventListener("DOMContentLoaded",async () => {
  readData();

  document.getElementById("addHouseholdForm").addEventListener('submit', async function (event) {
        event.preventDefault(); // Ngăn hành động mặc định của form

        const nameInput = document.getElementById('nameHost').value;
        const dobInput = document.getElementById('birthday').value;
        const genderInput = document.getElementById('gender').value;
        const cccdInput = document.getElementById('CCCD').value;
        const phoneNumInput = document.getElementById('SDT').value;
        const addressInput = document.getElementById('Addr').value;
        const tmpInput = document.getElementById('temp').value;
        const areaInput = document.getElementById('Area').value;

        // Kiểm tra dữ liệu hợp lệ
        if (
          !nameInput ||
          !dobInput ||
          !genderInput ||
          !cccdInput ||
          !phoneNumInput||
          !addressInput||
          !tmpInput||
          !areaInput
        ) {
          alert("Vui lòng nhập đầy đủ và chính xác thông tin!");
          return;
        }

        const newHousehold ={
          householdNumber:addressInput,
          apartmentSize: areaInput,
          chuHo:{
            name: nameInput,
            dateOfBirth: dobInput,
            cccd: cccdInput,
            gender: genderInput,
            phoneNumber: phoneNumInput,
            temporary: tmpInput
          }
        };

           console.log("Sending data to API:", newHousehold);

          fetch("/admin/household", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(newHousehold),
            })
              .then(response => {
              if (response.status !== 201) {
                throw new Error("Không thể thêm ");
              }
            })
            .then(returnedData => {
              readData();
              alert("Thêm thành công!");
            })
            .catch(error => {
              console.error("Đã xảy ra lỗi khi thêm ", error);
              alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
            });
    });

    document.getElementById("moveHouseholdForm").addEventListener('submit', async function (event) {
        event.preventDefault(); // Ngăn hành động mặc định của form

        const IdHouseInput = document.getElementById('id-house').value;
        const newHHNumInput = document.getElementById('newHouseholdNumber').value;

        // Kiểm tra dữ liệu hợp lệ
        if (
          !IdHouseInput ||
          !newHHNumInput 
        ) {
          alert("Vui lòng nhập đầy đủ và chính xác thông tin!");
          return;
        }

          fetch("/admin/household/moveHousehold?id=" + IdHouseInput + "&moveHouseholdNumber=" +  newHHNumInput, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
            })
              .then(response => {
              if (response.status !== 200) {
                throw new Error("Không thể chuyển hộ khẩu ");
              }
            })
            .then(returnedData => {
              readData();
              alert("Chuyển thành công!");
              exitMoveForm();
            })
            .catch(error => {
              console.error("Đã xảy ra lỗi khi chuyển ", error);
              alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
            });
    });
});