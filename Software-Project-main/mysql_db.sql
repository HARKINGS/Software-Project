-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 16, 2024 lúc 02:57 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `mysql_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contributions`
--

CREATE TABLE `contributions` (
  `contribution_id` int(11) NOT NULL COMMENT 'ID khoản đóng góp (Primary Key)',
  `household_id` int(11) NOT NULL COMMENT 'ID của hộ gia đình (Foreign Key)',
  `contribution_type` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Loại đóng góp (từ thiện, quỹ biển đảo)',
  `amount` float NOT NULL COMMENT 'Số tiền đóng góp',
  `date_contributed` date NOT NULL COMMENT 'Ngày đóng góp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `fees`
--

CREATE TABLE `fees` (
  `fee_id` int(11) NOT NULL COMMENT 'ID khoản phí (Primary Key)',
  `household_id` int(11) NOT NULL COMMENT 'ID của hộ gia đình (Foreign Key)',
  `fee_type` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Loại phí (dịch vụ, quản lý, quỹ)',
  `amount` float NOT NULL COMMENT 'Số tiền cần thu',
  `due_date` date NOT NULL COMMENT 'Ngày hạn thanh toán',
  `paid` tinyint(1) NOT NULL COMMENT 'Đã thanh toán hay chưa',
  `is_mandatory` tinyint(1) NOT NULL COMMENT 'Phí bắt buộc (TRUE) hay tự nguyện (FALSE)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `household`
--

CREATE TABLE `household` (
  `household_id` int(11) NOT NULL,
  `house_number` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `owner_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `apartment_size` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `parking`
--

CREATE TABLE `parking` (
  `parking_id` int(11) NOT NULL COMMENT 'ID phí gửi xe',
  `household_id` int(11) NOT NULL COMMENT 'ID của hộ gia đình (Foreign Key)',
  `resident_id` int(11) NOT NULL COMMENT 'Tham chiếu đến bảng Resident (chủ phương tiện)',
  `vehicle_license` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Biển số xe hoặc mã phương tiện',
  `vehicle_type` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Loại xe (ô tô, xe máy)',
  `month` date NOT NULL COMMENT 'Tháng gửi xe',
  `fee_amount` float NOT NULL COMMENT 'Số tiền gửi xe',
  `paid` tinyint(1) NOT NULL COMMENT 'Trạng thái thanh toán'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `resident`
--

CREATE TABLE `resident` (
  `resident_id` int(11) NOT NULL COMMENT 'ID của nhân khẩu (Primary Key)',
  `household_id` int(11) NOT NULL COMMENT 'ID của hộ gia đình (Foreign Key)',
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Tên của nhân khẩu',
  `date_of_birth` date NOT NULL COMMENT 'Ngày sinh',
  `id_card` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Số CMND/CCCD',
  `temporary` tinyint(1) NOT NULL COMMENT 'Tạm trú (true) hay thường trú (false)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `group_id` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_stamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `create_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `username` varchar(60) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Tên đăng nhập',
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Mật khẩu đã mã hóa',
  `resident_id` int(11) NOT NULL COMMENT 'Mã dân cư',
  `create_stamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Ngày tạo tài khoản',
  `last_updated_stamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Thời gian update ms nhất'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_role`
--

CREATE TABLE `user_role` (
  `username` varchar(60) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Tên đăng nhập',
  `group_id` varchar(60) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Vai trò',
  `create_stamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `contributions`
--
ALTER TABLE `contributions`
  ADD PRIMARY KEY (`contribution_id`),
  ADD KEY `id căn hộ` (`household_id`);

--
-- Chỉ mục cho bảng `fees`
--
ALTER TABLE `fees`
  ADD PRIMARY KEY (`fee_id`),
  ADD KEY ` id căn hộ 2` (`household_id`);

--
-- Chỉ mục cho bảng `household`
--
ALTER TABLE `household`
  ADD PRIMARY KEY (`household_id`);

--
-- Chỉ mục cho bảng `parking`
--
ALTER TABLE `parking`
  ADD PRIMARY KEY (`parking_id`),
  ADD KEY `mã dân cư 1` (`resident_id`),
  ADD KEY `mã căn hộ 3` (`household_id`);

--
-- Chỉ mục cho bảng `resident`
--
ALTER TABLE `resident`
  ADD PRIMARY KEY (`resident_id`),
  ADD KEY `Mã căn hộ` (`household_id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`group_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD KEY `mã dân cư 2` (`resident_id`);

--
-- Chỉ mục cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`username`,`group_id`),
  ADD KEY `pk_group_id` (`group_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `contributions`
--
ALTER TABLE `contributions`
  MODIFY `contribution_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID khoản đóng góp (Primary Key)';

--
-- AUTO_INCREMENT cho bảng `fees`
--
ALTER TABLE `fees`
  MODIFY `fee_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID khoản phí (Primary Key)';

--
-- AUTO_INCREMENT cho bảng `household`
--
ALTER TABLE `household`
  MODIFY `household_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `parking`
--
ALTER TABLE `parking`
  MODIFY `parking_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID phí gửi xe';

--
-- AUTO_INCREMENT cho bảng `resident`
--
ALTER TABLE `resident`
  MODIFY `resident_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID của nhân khẩu (Primary Key)';

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `contributions`
--
ALTER TABLE `contributions`
  ADD CONSTRAINT `id căn hộ` FOREIGN KEY (`household_id`) REFERENCES `household` (`household_id`);

--
-- Các ràng buộc cho bảng `fees`
--
ALTER TABLE `fees`
  ADD CONSTRAINT ` id căn hộ 2` FOREIGN KEY (`household_id`) REFERENCES `household` (`household_id`);

--
-- Các ràng buộc cho bảng `parking`
--
ALTER TABLE `parking`
  ADD CONSTRAINT `mã căn hộ 3` FOREIGN KEY (`household_id`) REFERENCES `household` (`household_id`),
  ADD CONSTRAINT `mã dân cư 1` FOREIGN KEY (`resident_id`) REFERENCES `resident` (`resident_id`);

--
-- Các ràng buộc cho bảng `resident`
--
ALTER TABLE `resident`
  ADD CONSTRAINT `Mã căn hộ` FOREIGN KEY (`household_id`) REFERENCES `household` (`household_id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `mã dân cư 2` FOREIGN KEY (`resident_id`) REFERENCES `resident` (`resident_id`);

--
-- Các ràng buộc cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `pk_group_id` FOREIGN KEY (`group_id`) REFERENCES `role` (`group_id`),
  ADD CONSTRAINT `pk_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;