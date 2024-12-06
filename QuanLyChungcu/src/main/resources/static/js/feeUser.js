// Dữ liệu mẫu về khoản thu
      const fees = [
        {
          date:"21/10/2024",
          household:"HK12345",
          type:"Mua ghế đá",
          total:"100.000 VND",
          paid:"100.000 VND",
          status:"Hoàn tất",
        },
        {
          date:"13/4/2026",
          household:"HK12345",
          type:"Buôn người",
          total:"100.000.000 VND",
          paid:"0 VND",
          status:"Chưa thanh toán",
        },
      ];

      let currentPage = 1;
      const itemsPerPage = 6; // Hiển thị 6 dân cư mỗi trang

      // Hàm cập nhật bảng dân cư
      function updateFeesTable(fees) {
        const tableBody = document
          .getElementById("feeTable")
          .getElementsByTagName("tbody")[0];
        tableBody.innerHTML = ""; // Xóa các dòng cũ trong bảng

        fees.forEach((fee) => {
          const row = tableBody.insertRow();
          row.insertCell(0).textContent = fee.date;
          row.insertCell(1).textContent = fee.household;
          row.insertCell(2).textContent = fee.type; 
          row.insertCell(3).textContent = fee.total;
          row.insertCell(4).textContent = fee.paid;
          row.insertCell(5).textContent = fee.status;
        });
      }

      // Hàm phân trang
      function changePage(direction) {
        const totalPages = Math.ceil(fees.length / itemsPerPage);
        currentPage += direction;


        if (currentPage < 1) {
          currentPage = 1;
        } else if (currentPage > totalPages) {
          currentPage = totalPages;
        }

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageFees = fees.slice(start, end);

        updateFeesTable(pageFees);

        // Cập nhật số trang
        document.getElementById(
          "pageNumber"
        ).textContent = `Page ${currentPage}`;

        // Kiểm tra nút phân trang
        document.getElementById("prevPage").disabled = currentPage === 1;
        document.getElementById("nextPage").disabled =
          currentPage === totalPages;
      }

      function init(){
        changePage(0);
      }