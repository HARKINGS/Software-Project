// Dữ liệu mẫu về khoản thu
      const contributions = [
        {
          date:"21/10/2024",
          household:"HK12345",
          type:"Mua ghế đá",
          amount:"100.000 NDT",
        },
        {
          household:"HK12345",
          type:"Xây vỉa hè",
          amount:"100.000 NDT",
          date:"19/04/2024",
        },
        {
          household:"HK12345",
          type:"Độ bô xe cứu thương",
          amount:"500.000 NDT",
          date:"27/02/2025",
        },
        {
          household:"HK12345",
          type:"Quỹ khuyến học",
          amount:"10.000 NDT",
          date:"11/11/2024",
        },
      ];

      let currentPage = 1;
      const itemsPerPage = 6; // Hiển thị 6 dân cư mỗi trang

      // Hàm cập nhật bảng dân cư
      function updateContributionsTable(contributions) {
        const tableBody = document
          .getElementById("contributionTable")
          .getElementsByTagName("tbody")[0];
        tableBody.innerHTML = ""; // Xóa các dòng cũ trong bảng

        contributions.forEach((contribution) => {
          const row = tableBody.insertRow();
          row.insertCell(0).textContent = contribution.date;
          row.insertCell(1).textContent = contribution.household;
          row.insertCell(2).textContent = contribution.type; 
          row.insertCell(3).textContent = contribution.amount;
        });
      }

      // Hàm phân trang
      function changePage(direction) {
        const totalPages = Math.ceil(contributions.length / itemsPerPage);
        currentPage += direction;


        if (currentPage < 1) {
          currentPage = 1;
        } else if (currentPage > totalPages) {
          currentPage = totalPages;
        }

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageContributions = contributions.slice(start, end);

        updateContributionsTable(pageContributions);

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