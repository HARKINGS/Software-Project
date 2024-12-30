Chương trình Quản lý chung cư BlueMoon
Hướng dẫn cài đặt
Để sử dụng phần mềm, bạn cần có môi trường chạy Java. Dưới đây là các yêu cầu và hướng dẫn cài đặt:

Yêu cầu phần mềm
MySQL Connector
XAMPP

Yêu cầu phần cứng
Không yêu cầu cấu hình phần cứng cao, chỉ cần máy tính có khả năng chạy phần mềm.
Hướng dẫn chi tiết các bước cài đặt
Tải về SSMS: Tải SSMS
Chỉnh sửa class DatabaseConnection:
Mở package Models.
Chỉnh sửa hàm khởi tạo của class để phù hợp với mật khẩu trong ứng dụng SSMS.
Load file pom.xml: Đảm bảo tất cả các thư viện cần thiết được tải về.
Nhập cơ sở dữ liệu:
Lấy file QuanlydancuV11.bacpac để import vào cơ sở dữ liệu trong ứng dụng SSMS.
Chạy chương trình:
Chạy class App để khởi động chương trình.
Đối tượng và phạm vi sử dụng
Đối tượng sử dụng
Quản lý thu phí
Quản lý dân cư
Những đối tượng muốn quản lý thu phí cho chung cư BlueMoon.
Phạm vi sử dụng
Dành cho quản lý dân cư và quản lý thu phí.
Hướng dẫn sử dụng phần mềm
Phần mềm hỗ trợ quản lý dân cư và quản lý thu phí trong chung cư BlueMoon với 4 chức năng chính:

Quản lý nhân khẩu
Quản lý hộ khẩu
Quản lý khoản phí
Quản lý nộp tiền
Chức năng chi tiết
Mỗi chức năng quản lý nhân khẩu, hộ khẩu, khoản phí đều có các chức năng con:

Thêm
Sửa
Xóa
Tìm kiếm thông tin
Quản lý nộp tiền không có chức năng sửa.

Cách sử dụng
Để sử dụng chức năng nào, hãy nhấn trực tiếp vào chức năng đó và thực hiện theo hướng dẫn.
