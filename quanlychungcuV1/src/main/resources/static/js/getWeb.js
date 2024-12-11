function getResident(){
  console.log("1");
  window.location.href = '/user/residentUser';
}

function getHousehold(){
  console.log("2");
  window.location.href = '/user/householdUser';
}

function getFee(){
  console.log("3");
  window.location.href = '/user/feeUser';
}

function getContribution(){
  console.log("4");
  window.location.href = '/user/contributionUser';
}

function userLogout(){
  window.location.href = '/user/logout';
}