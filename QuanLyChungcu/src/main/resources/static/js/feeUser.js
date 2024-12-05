// Dữ liệu mẫu về khoản thu
      const fees = [
        {
          id:"01",
          household:"HK12345",
          type:"Mua ghế đá",
          amount:"100000",
          date:"21/10/2024",
          status:"Chưa thanh toán",
        },
        {
          id:"37",
          household:"HK12345",
          type:"Xây vỉa hè",
          amount:"100000",
          date:"19/04/2024",
          status:"Chưa thanh toán",
        },
        {
          id:"69",
          household:"HK12345",
          type:"Độ bô xe cứu thương",
          amount:"500000",
          date:"27/02/2025",
          status:"Chưa thanh toán",
        },
        {
          id:"122",
          household:"HK12345",
          type:"Quỹ khuyến học",
          amount:"10000",
          date:"11/11/2024",
          status:"Đã thanh toán",
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
          row.insertCell(0).textContent = fee.id;
          row.insertCell(1).textContent = fee.household;
          row.insertCell(2).textContent = fee.type; 
          row.insertCell(3).textContent = fee.amount;
          row.insertCell(4).textContent = fee.date;
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

      // Hiển thị trang đầu tiên khi tải trang
      window.onload = () => changePage(0);