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
          ID: data.idCard,
          phone: data.phoneNumber,
          relation: data.relationship
        };

        // Gọi hàm để hiển thị thông tin
        fillInfo();
      } catch (error) {
        console.error('Error fetching resident info:', error);
      }
    }

    // Gọi hàm fetch khi trang load
    window.onload = fetchResidentInfo;

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