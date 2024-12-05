var residentInfo = {
      name:"Nam",
      birthday:"20/10/2004",
      gender:"Nữ",
      ID:"034303006768",
      phone:"0974187143",
      role:"Dân cư",
      username:"namnu@gmail.com",
      password:"namnu123",
      household:"HK0123",
      relation:"Bố chủ hộ"
    };

    function fillInfo(){
      document.getElementById('residentName').innerHTML= residentInfo.name;
      document.getElementById('residentDate').innerHTML= residentInfo.birthday;
      document.getElementById('residentGender').innerHTML= residentInfo.gender;
      document.getElementById('residentID').innerHTML= residentInfo.ID;
      document.getElementById('residentPhone').innerHTML= residentInfo.phone;
      document.getElementById('residentRole').innerHTML= residentInfo.role;
      document.getElementById('residentUsername').innerHTML= residentInfo.username;
      document.getElementById('residentPassword').innerHTML= residentInfo.password;
      document.getElementById('residentHousehold').innerHTML= residentInfo.household;
      document.getElementById('residentRelation').innerHTML= residentInfo.relation;
    }

    window.onload = () => fillInfo();

    function changePassword(){
      document.getElementById("wrapper_1").style.display = "block";
    }

    function exitChangePassword(){
      document.getElementById("wrapper_1").style.display = "none";
    }