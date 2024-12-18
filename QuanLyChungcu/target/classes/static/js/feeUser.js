      let fees = [];
      let infoHousehold;

      let currentPage = 1;
      const itemsPerPage = 5; 


//-----------------------------------------------------------------------------------//

      // Hàm cập nhật bảng dân cư
      function updateFeesTable(fees) {
        const tableBody = document
          .getElementById("feeTable")
          .getElementsByTagName("tbody")[0];
        tableBody.innerHTML = ""; 

        fees.forEach((fee) => {
          const row = tableBody.insertRow();
          row.insertCell(0).textContent = fee.feeId;
          row.insertCell(1).textContent = fee.feeType;
          row.insertCell(2).textContent = fee.amount.toLocaleString() + " VND"; 
          row.insertCell(3).textContent = fee.collectAmount.toLocaleString() + " VND";
          row.insertCell(4).textContent = fee.dueDate.split("-").reverse().join("-");
          row.insertCell(5).textContent = (fee.paid) ? "Hoàn tất" : "Chưa thanh toán";
        });
      }

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

        document.getElementById(
          "pageNumber"
        ).textContent = `Trang ${currentPage}`;

        document.getElementById("prevPage").disabled = currentPage === 1;
        document.getElementById("nextPage").disabled =
          currentPage === totalPages;
      }

      function showInfoHousehold(){
        document.getElementById('householdNum').innerHTML= "Thông tin thu phí của căn hộ: " + infoHousehold.householdNumber;
      }
//-----------------------------------------------------------------------------------//
      async function fetchFeeList() {
      try {
        const response = await fetch('/user/getListFee');

        if (!response.ok) {
          throw new Error("Lỗi HTTP! Mã trạng thái: ${response.status}");
        }

        const data = await response.json();
        fees = data; 

        changePage(0); 

      } catch (error) {
        console.error('Lỗi khi tải thông tin dân cư:', error);
      }
    }

      async function fetchInfoHousehold() {
      try {
        const response = await fetch('/user/getInfoHousehold');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        infoHousehold = data;
        showInfoHousehold();

      } catch (error) {
        console.error('Error fetching resident info:', error);
      }
    }

//-----------------------------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
    console.log("loading");
    init();
    console.log("done");
});

function init(){
  fetchFeeList();
  fetchInfoHousehold();
}