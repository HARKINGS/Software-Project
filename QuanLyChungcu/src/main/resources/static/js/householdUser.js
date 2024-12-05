// Dữ liệu mẫu về dân cư
      const residents = [
        {
          name: "Nguyễn Văn A",
          cccd: "123456789012",
          household: "HK12345",
          room: "0101",
        },
        {
          name: "Trần Thị B",
          cccd: "987654321098",
          household: "HK12345",
          room: "102",
        },
        {
          name: "Lê Quang C",
          cccd: "567890123456",
          household: "HK12345",
          room: "103",
        },
        {
          name: "Nguyễn Văn A",
          cccd: "123456789012",
          household: "HK12345",
          room: "101",
        },
        {
          name: "Trần Kiều C",
          cccd: "987654321098",
          household: "HK12345",
          room: "102",
        },
        {
          name: "Sắc Tân N",
          cccd: "567890123456",
          household: "HK12345",
          room: "103",
        },
        {
          name: "Nguyễn Phong S",
          cccd: "123456789012",
          household: "HK12345",
          room: "101",
        },
        {
          name: "Trần Hàng D",
          cccd: "987654321098",
          household: "HK67890",
          room: "102",
        },
        {
          name: "Lê Mân Đ",
          cccd: "567890123456",
          household: "HK54321",
          room: "103",
        },
        {
          name: "Nguyễn Tất Đ",
          cccd: "123456789012",
          household: "HK12345",
          room: "101",
        },
        {
          name: "Trần Kiên V",
          cccd: "987654321098",
          household: "HK67890",
          room: "102",
        },
        {
          name: "Lê Đức T",
          cccd: "567890123456",
          household: "HK54321",
          room: "103",
        },
      ];

      let currentPage = 1;
      const itemsPerPage = 5; // Hiển thị 6 dân cư mỗi trang

      // Hàm cập nhật bảng dân cư
      function updateResidentTable(residents) {
        const tableBody = document
          .getElementById("residentTable")
          .getElementsByTagName("tbody")[0];
        tableBody.innerHTML = ""; // Xóa các dòng cũ trong bảng

        residents.forEach((resident) => {
          const row = tableBody.insertRow();
          row.insertCell(0).textContent =  "123456";
          row.insertCell(1).textContent = resident.name;
          row.insertCell(2).textContent = "Ngày sinh"; 
          row.insertCell(3).textContent = resident.cccd;
          row.insertCell(4).textContent = "Giới tính"; 
          row.insertCell(5).textContent = "Số điện thoại"; 
          row.insertCell(6).textContent = resident.household;
        });
      }

      // Hàm phân trang
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
        document.getElementById(
          "pageNumber"
        ).textContent = `Page ${currentPage}`;

        // Kiểm tra nút phân trang
        document.getElementById("prevPage").disabled = currentPage === 1;
        document.getElementById("nextPage").disabled =
          currentPage === totalPages;
      }
      window.onload = () => changePage(0);