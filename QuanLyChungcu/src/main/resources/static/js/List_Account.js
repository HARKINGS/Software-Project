document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Gọi API để lấy danh sách người dùng
        const response = await fetch("/admin/Users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Không thể tải danh sách người dùng. Vui lòng thử lại sau.");
        }

        const users = await response.json(); // Lấy dữ liệu JSON từ phản hồi

        // Cập nhật danh sách tài khoản
        accounts = users;

        // Khởi tạo bảng với dữ liệu lấy từ API
        renderTable(accounts);
    } catch (error) {
        console.error("Đã xảy ra lỗi khi tải dữ liệu:", error);
        alert("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    }
});

let accounts = []; // Khởi tạo danh sách tài khoản từ API

function renderTable(data) {
    const tbody = document.querySelector("#AccountTable tbody");
    tbody.innerHTML = `
        <tr class="add-row">
            <td><input type="text" id="addUsername" class="input" placeholder="Tên tài khoản" /></td>
            <td><input type="password" id="addPassword" class="input" placeholder="Mật khẩu" /></td>
            <td><input type="text" id="addUserID" class="input" placeholder="Mã cư dân" /></td>
            <td><button onclick="addRow()">Thêm</button></td>
        </tr>
    `;

    data.forEach((account, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${account.username}</td>
                <td>${account.password}</td>
                <td>${account.residentId}</td>
                <td>
                    <button onclick="deleteRow(${index})">Xóa</button>
                    <button onclick="editRow(${index})">Sửa</button>
                </td>
            </tr>
        `;
    });
}

function filterData() {
    const nameFilter = document
        .getElementById("nameAccount")
        .value.toLowerCase();
    const userIDFilter = document
        .getElementById("userID")
        .value.toLowerCase();

    const filteredData = accounts.filter(
            (account) =>
                (account.username?.toLowerCase().includes(nameFilter) || '') &&
                (account.userID?.toLowerCase().includes(userIDFilter) || '')
        );

    renderTable(filteredData);
}

function addRow() {
    const username = document.getElementById("addUsername").value.trim();
    const password = document.getElementById("addPassword").value.trim();
    const role = "USER";
    const residentId = document.getElementById("addUserID").value.trim();

    if (username && password && userID) {
        createUser({ username, password, role, residentId });
    } else {
        alert("Vui lòng điền đầy đủ thông tin!");
    }
}

async function createUser(user) {
    try {
        const response = await fetch("/admin/Users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Không thể tạo người dùng mới. Vui lòng thử lại sau.");
        }

        const newUser = await response.json(); // Nhận lại dữ liệu người dùng mới từ API
        accounts.push(newUser); // Cập nhật danh sách tài khoản
                renderTable(accounts); // Hiển thị lại bảng

                // Xóa dữ liệu trong các ô nhập liệu
                document.getElementById("addUsername").value = "";
                document.getElementById("addPassword").value = "";
                document.getElementById("addUserID").value = "";
    } catch (error) {
        console.error("Đã xảy ra lỗi khi tạo người dùng mới:", error);
        alert("Không thể tạo người dùng mới. Vui lòng thử lại sau.");
    }
}

function deleteRow(index) {
    accounts.splice(index, 1);
    renderTable(accounts);
}

function editRow(index) {
    const row = document.querySelectorAll("#AccountTable tbody tr")[
        index + 1
    ]; // +1 vì hàng đầu tiên là form thêm tài khoản
    const account = accounts[index];

    // Chuyển các ô thành input để chỉnh sửa
    row.innerHTML = `
        <td><input type="text" value="${account.username}" class="input edit-username" /></td>
        <td><input type="password" value="${account.password}" class="input edit-password" /></td>
        <td><input type="text" value="${account.userID}" class="input edit-userID" /></td>
        <td>
            <button onclick="saveRow(${index})">Lưu</button>
            <button onclick="cancelEdit(${index})">Hủy</button>
        </td>
    `;
}

function saveRow(index) {
    const row = document.querySelectorAll("#AccountTable tbody tr")[
        index + 1
    ];
    const newUsername = row.querySelector(".edit-username").value.trim();
    const newPassword = row.querySelector(".edit-password").value.trim();
    const newUserID = row.querySelector(".edit-userID").value.trim();

    if (newUsername && newPassword && newUserID) {
        accounts[index] = {
            username: newUsername,
            password: newPassword,
            userID: newUserID,
        };
        renderTable(accounts);
    } else {
        alert("Vui lòng điền đầy đủ thông tin!");
    }
}

function cancelEdit(index) {
    renderTable(accounts); // Khôi phục bảng về trạng thái ban đầu
}
