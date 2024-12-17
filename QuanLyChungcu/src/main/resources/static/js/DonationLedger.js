document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/admin/contribution", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Không thể tải danh sách đóng góp. Vui lòng thử lại sau.");
        }

        const contributions = await response.json(); // Lấy dữ liệu JSON từ phản hồi
        data = contributions; // Cập nhật danh sách đóng góp
        filteredData = data; // Cập nhật dữ liệu lọc
        renderTable(currentPage); // Hiển thị bảng với phân trang
    } catch (error) {
        console.error("Đã xảy ra lỗi khi tải dữ liệu:", error);
        alert("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    }
});

let data = []; // Dữ liệu lấy từ API
let filteredData = []; // Dữ liệu sau khi lọc
let currentPage = 1; // Trang hiện tại
const rowsPerPage = 10; // Số dòng mỗi trang

function renderTable(page) {
    const tableBody = document.querySelector("#FeeTable tbody");
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = page * rowsPerPage;

    tableBody.innerHTML = `
        <tr class="add-row">
            <td><input type="date" id="addDate" class="input" placeholder="Ngày" /></td>
            <td><input type="text" id="addHousehold" class="input" placeholder="Mã hộ" /></td>
            <td><input type="text" id="addFeeName" class="input" placeholder="Tên khoản phí" /></td>
            <td><input type="number" id="addAmount" class="input" placeholder="Số tiền" /></td>
            <td><button id="addButton" onclick="addRow()">+</button></td>
        </tr>
    `;

    filteredData.slice(startIndex, endIndex).forEach((item) => {
        tableBody.innerHTML += `
            <tr data-contribution-id="${item.contributionId}">
                <td>${item.dateContributed}</td>
                <td>${item.householdId}</td>
                <td>${item.contributionType}</td>
                <td>${item.amount.toLocaleString()}</td>
                <td>
                    <button onclick="deleteRow(${item.contributionId})">Xóa</button>
                </td>
            </tr>
        `;
    });

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    document.getElementById("pageNumber").textContent = `Page ${currentPage} of ${totalPages}`;
}

function removeAccents(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function filterData() {
  const nameFee = document.getElementById("nameFee").value.toLowerCase();
  const household = document.getElementById("id-house-hold").value.toLowerCase();
  const fromDate = document.getElementById("from-date").value;
  const toDate = document.getElementById("to-date").value;

  filteredData = data.filter((item) => {
    const dateMatch = 
      (!fromDate || Date.parse(item.dateContributed) >= Date.parse(fromDate)) &&
      (!toDate || Date.parse(item.dateContributed) <= Date.parse(toDate));

    // Chuyển householdId thành chuỗi để so sánh
    const householdMatch = !household || item.householdId.toString().toLowerCase().includes(household);

    return (
      (!nameFee || removeAccents(item.contributionType).toLowerCase().includes(nameFee)) && householdMatch && dateMatch
    );
  });

  currentPage = 1;  // Reset trang về đầu sau khi lọc
  renderTable(currentPage);
}


function addRow() {
  const date = document.getElementById("addDate").value;
  const household = document.getElementById("addHousehold").value;
  const feeName = document.getElementById("addFeeName").value;
  const amount = document.getElementById("addAmount").value;

  if (date && household && feeName && amount) {
    const newContribution = {
      dateContributed: date,
      householdId: household,
      contributionType: feeName,
      amount: parseFloat(amount),
    };

    fetch("/admin/contribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContribution),
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Không thể thêm đóng góp. Vui lòng thử lại.");
        }
        return response.json();
      })
      .then(() => {
        // Tạo một mảng mới với phần tử mới thêm vào
        data = data.concat({
            contributionId: newContribution.contributionId,
            dateContributed: newContribution.dateContributed,
            householdId: newContribution.householdId,
            contributionType: newContribution.contributionType,
            amount: newContribution.amount,
          });
        filterData(); // Cập nhật bảng
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi thêm đóng góp:", error);
        alert("Không thể thêm đóng góp. Vui lòng thử lại sau.");
      });
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

function deleteRow(contributionId) {
    // Xác nhận với người dùng trước khi xóa
    if (confirm("Bạn có chắc chắn muốn xóa bản ghi này?")) {
        // Gửi yêu cầu DELETE để xóa bản ghi
        fetch("/admin/contribution/" + contributionId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (response.status !== 204) {
                 throw new Error("Không thể xóa đóng góp. Vui lòng thử lại.");
            }
            // Không cần gọi response.json() vì status 204 không có nội dung
            // Xóa bản ghi khỏi dữ liệu trong mảng
                 data = data.filter(item => item.contributionId !== contributionId);
                 filterData(); // Cập nhật lại bảng sau khi xóa
                 alert("Đóng góp đã được xóa.");
        })
        .catch((error) => {
                 console.error("Lỗi khi xóa đóng góp:", error);
                 alert("Không thể xóa đóng góp. Vui lòng thử lại.");
        });
    }
}


renderTable(currentPage);
