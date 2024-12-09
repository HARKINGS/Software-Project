document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/admin/Users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Không thể tải danh sách người dùng. Vui lòng thử lại sau.");
        }

        const users = await response.json(); // Lấy dữ liệu JSON từ phản hồi
        accounts = users; // Cập nhật danh sách tài khoản
        renderTable(accounts); // Hiển thị bảng
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
            <td><input type="text" id="addResidentId" class="input" placeholder="Mã cư dân" /></td>
            <td><button onclick="addRow()">Thêm</button></td>
        </tr>
    `;

    data.forEach((account, index) => {
            tbody.innerHTML += `
                <tr data-id="${account.id}">
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

function addRow() {
    const username = document.getElementById("addUsername").value.trim();
    const password = document.getElementById("addPassword").value.trim();
    const residentId = document.getElementById("addResidentId").value.trim();
    const role = "USER";

    if (username && password && residentId) {
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
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Không thể tạo người dùng mới. Vui lòng thử lại sau.");
        }

        const newUser = await response.json();
        accounts.push(newUser);
        renderTable(accounts);

        // Xóa dữ liệu nhập liệu
        document.getElementById("addUsername").value = "";
        document.getElementById("addPassword").value = "";
        document.getElementById("addResidentId").value = "";
    } catch (error) {
        alert("Không thể tạo người dùng mới. Vui lòng thử lại sau.");
    }
}

async function deleteRow(index) {
    const id = accounts[index].id;
    console.log("ID:", id);

    if (!id) {
        alert("ID không hợp lệ!");
        return;
    }

    try {
        const response = await fetch(`/admin/Users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Không thể xóa người dùng. Vui lòng thử lại sau.");
        }

        accounts.splice(index, 1);
        renderTable(accounts);
    } catch (error) {
        console.error("Đã xảy ra lỗi khi xóa người dùng:", error);
        alert("Không thể xóa người dùng. Vui lòng thử lại sau.");
    }
}

function editRow(index) {
    const row = document.querySelectorAll("#AccountTable tbody tr")[index + 1]; // +1 vì hàng đầu tiên là form thêm
    const account = accounts[index];

    row.innerHTML = `
        <td><input type="text" value="${account.username}" class="input edit-username" /></td>
        <td><input type="password" value="${account.password}" class="input edit-password" /></td>
        <td><input type="text" value="${account.residentId}" class="input edit-residentId" /></td>
        <td>
            <button onclick="saveRow(${index})">Lưu</button>
            <button onclick="cancelEdit()">Hủy</button>
        </td>
    `;
}

async function saveRow(index) {
    const row = document.querySelectorAll("#AccountTable tbody tr")[index + 1];
    const newUsername = row.querySelector(".edit-username").value.trim();
    const newPassword = row.querySelector(".edit-password").value.trim();
    const newResidentId = row.querySelector(".edit-residentId").value.trim();

    if (newUsername && newPassword && newResidentId) {
        try {
            const updatedUser = {
                username: newUsername,
                password: newPassword,
                roel: "USER",
                residentId: newResidentId,
            };

            const response = await fetch(`/admin/Users/${accounts[index].id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error("Không thể cập nhật người dùng. Vui lòng thử lại sau.");
            }

            const newUser = await response.json();
            accounts[index] = newUser;
            renderTable(accounts);
        } catch (error) {
            console.error("Đã xảy ra lỗi khi cập nhật người dùng:", error);
            alert("Không thể cập nhật người dùng. Vui lòng thử lại sau.");
        }
    } else {
        alert("Vui lòng điền đầy đủ thông tin!");
    }
}

function cancelEdit() {
    renderTable(accounts);
}

function filterData() {
    const nameFilter = document
        .getElementById("nameAccount")
        .value.toLowerCase();
    const userIDFilter = document
        .getElementById("userID")
        .value.toLowerCase();

    const filteredData = accounts.filter((account) => {
        const usernameMatch = nameFilter === '' || account.username?.toLowerCase().includes(nameFilter);
        const residentIdMatch = userIDFilter === '' || account.residentId?.toLowerCase().includes(userIDFilter);
        return usernameMatch && residentIdMatch;
    });

    renderTable(filteredData);
}
