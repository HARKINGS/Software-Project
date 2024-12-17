async function changePassword(event) {
  event.preventDefault(); // Ngừng hành động mặc định của form

  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Kiểm tra xem mật khẩu mới và mật khẩu xác nhận có khớp không
  if (newPassword !== confirmPassword) {
    alert("Mật khẩu mới và xác nhận mật khẩu mới không khớp!");
    return;
  }

  // Tạo đối tượng dữ liệu gửi đi
  const data = {
    oldPassword: oldPassword,
    newPassword: newPassword,
  };

  try {
    // Gửi yêu cầu PUT để đổi mật khẩu
    const response = await fetch("/admin/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Chuyển đối tượng data thành JSON
    });

    if (!response.ok) {
      throw new Error("Không thể đổi mật khẩu. Vui lòng thử lại.");
    }

    const result = await response.json();
    alert("Đổi mật khẩu thành công!");
    // Reset form sau khi thành công
    document.getElementById("userInfo").reset();
    window.location.href = '/login';

  } catch (error) {
    console.error("Đã xảy ra lỗi khi đổi mật khẩu:", error);
    alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
  }
}
