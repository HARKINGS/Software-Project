      let contributions = [];
      let infoHousehold;

      let currentPage = 1;
      const itemsPerPage = 5; 


//-----------------------------------------------------------------------------------//

      // Hàm cập nhật bảng dân cư
      function updateFeesTable(contributions) {
        const tableBody = document
          .getElementById("contributionTable")
          .getElementsByTagName("tbody")[0];
        tableBody.innerHTML = ""; 

        contributions.forEach((contribution) => {
          const row = tableBody.insertRow();
          row.insertCell(0).textContent = contribution.contributionId;
          row.insertCell(1).textContent = contribution.contributionType;
          row.insertCell(2).textContent = contribution.amount.toLocaleString() + " VND"; 
          row.insertCell(3).textContent = contribution.dateContributed.split("-").reverse().join("-");
        });
      }

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
        const pageFees = contributions.slice(start, end);

        updateFeesTable(pageFees);

        document.getElementById(
          "pageNumber"
        ).textContent = `Trang ${currentPage}`;

        document.getElementById("prevPage").disabled = currentPage === 1;
        document.getElementById("nextPage").disabled =
          currentPage === totalPages;
      }

      function showInfoHousehold(){
        document.getElementById('householdNum').innerHTML= "Thông tin đóng góp của căn hộ: " + infoHousehold.householdNumber;
      }
//-----------------------------------------------------------------------------------//
      async function fetchContributionList() {
      try {
        const response = await fetch('/user/getListContribution');

        if (!response.ok) {
          throw new Error(`Lỗi HTTP! Mã trạng thái: ${response.status}`);
        }

        const data = await response.json();
        contributions = data; 

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
    init();
});

function init(){
  fetchContributionList();
  fetchInfoHousehold();
}