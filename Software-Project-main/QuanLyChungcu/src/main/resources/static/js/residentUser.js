var residentInfo = {
  name: "N/A",
  birthday: "N/A",
  gender: "N/A",
  ID: "N/A",
  phone: "N/A",
  relation: "N/A"
};

    // Hàm lấy dữ liệu từ API và gán vào biến residentInfo
    async function fetchResidentInfo() {
      try {
        const response = await fetch('/user/getInfo');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        // Gán dữ liệu vào biến residentInfo
        residentInfo = {
          name: data.name,
          birthday: data.dateOfBirth,
          gender: data.gender,
          ID: data.cccd,
          phone: data.phoneNumber,
          relation: data.relationship
        };

        // Gọi hàm để hiển thị thông tin
        fillInfo();
      } catch (error) {
        console.error('Error fetching resident info:', error);
      }
    }

    function fillInfo(){
      document.getElementById('residentName').innerHTML= residentInfo.name;
      document.getElementById('residentDate').innerHTML= residentInfo.birthday;
      document.getElementById('residentGender').innerHTML= residentInfo.gender;
      document.getElementById('residentID').innerHTML= residentInfo.ID;
      document.getElementById('residentPhone').innerHTML= residentInfo.phone;
      document.getElementById('residentRelation').innerHTML= residentInfo.relation;
    }

    function changePassword(){
      document.getElementById("wrapper_1").style.display = "block";
    }

    function exitChangePassword(){
      document.getElementById("wrapper_1").style.display = "none";
    }

    
document.addEventListener("DOMContentLoaded", function () {
    fetchResidentInfo();
});

document.addEventListener("DOMContentLoaded", function () {
    const changeInfoForm = document.querySelector("#changeInfoForm");

    changeInfoForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Ngăn hành động mặc định của form

        const oldPasswordInput = changeInfoForm.querySelector("input[placeholder='Nhập mật khẩu cũ']").value;
        const newPasswordInput = changeInfoForm.querySelector("input[placeholder='Nhập mật khẩu mới']").value;
        const confirmPasswordInput = changeInfoForm.querySelector("input[placeholder='Xác nhận mật khẩu mới']").value;

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp nhau không
        if (newPasswordInput !== confirmPasswordInput) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }

        try {
            const response = await fetch("/user/changePassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    oldPassword: oldPasswordInput,
                    newPassword: newPasswordInput
                })
            });

            if (!response.ok) {
                // Nếu phản hồi không thành công
                const errorData = await response.json();
                alert(errorData.message || "Đã xảy ra lỗi khi đổi mật khẩu.");
            } else {
                // Nếu thành công
                const responseData = await response.json();
                alert("Đổi mật khẩu thành công! Hãy đăng nhập lại.");
                // Điều hướng hoặc thực hiện thêm hành động khác nếu cần
                window.location.href = "/logout";
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi khi gọi API:", error);
            alert("Đã xảy ra lỗi trong quá trình xử lý.");
        }
    });
});
