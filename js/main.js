let nameInput = document.getElementById("nameInput");
let newName ="";
async function getData(text = "cairo") {
  let myReqName = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=59b81daaa3614315b95183529230408&q=${text}`
  );
  let data = await myReqName.json();
  if (data.length == 0) {
    text = "cairo";
    if(newName.length == 0){
      newName = text;
    }
    myReqName = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=59b81daaa3614315b95183529230408&q=${newName}`
    );
    data = await myReqName.json();
  }
  else{
    newName = text;
  }
  let myReqDeg = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=59b81daaa3614315b95183529230408&q=${data[0].name}&days=7`
  );
  let dataDg = await myReqDeg.json();
  display(dataDg);
}

function getDayName(day) {
  const daysName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let mydate = new Date(day.date);
  let dayName = daysName[mydate.getDay()];
  return dayName;
}

function getStatus(day) {
  let status = day.condition.text;
  return status;
}
function getStatusImg(day) {
  let statusImg = day.condition.icon;
  return statusImg;
}

function getHighTemp(day) {
  return day.maxtemp_c;
}
function getLowTemp(day) {
  return day.mintemp_c;
}



function display(data) {
  let cityName = data.location.name;
  let days = data.forecast.forecastday.slice(0, 3);
  let mydate = new Date(days[0].date);
  let dayNumber = mydate.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[mydate.getMonth()];
  let today = new Date();
  let mainTemprature = days[0].hour[today.getHours()].temp_c;


  document.getElementById("myRow").innerHTML = `
  <div class="col-md-4">
  <div class="day-item pb-4" style="background-color: #323544; height: 100%;">
      <div class="d-flex container-fluid justify-content-between py-2"
          style="background-color: #2D303D;">
          <p class="py-0 my-0">${getDayName(days[0])}</p>
          <p class="py-0 my-0">${dayNumber + month}</p>
      </div>
      <div class="container-fluid">
          <h4 class="py-4">${cityName}</h4>
          <div class="d-flex justify-content-between">
              <p class="fa-3x fw-bolder">${mainTemprature}<sup>o</sup>C</p>
              <img src="https:${getStatusImg(
                days[0].hour[today.getHours()]
              )}" class="" alt="">
          </div>
          <p class="text-info">${getStatus(days[0].hour[today.getHours()])}</p>

          <div>
              <span class="me-3"><img src="images/icon-umberella.png" alt=""> 20%</span>
              <span class="me-3"><img src="images/icon-wind.png" alt=""> 18km/h</span>
              <span class="me-3"><img src="images/icon-compass.png" alt=""> East</span>
          </div>
      </div>

  </div>
</div>
<div class="col-md-4">
  <div class="day-item pb-4" style="background-color: #262936;height: 100%;">
      <div class="d-flex container-fluid justify-content-center py-2"
          style="background-color:#222530 ;">
          <p class="py-0 my-0">${getDayName(days[1])}</p>
      </div>
      <div class="container-fluid d-flex flex-column align-items-center py-3">
      <img src="https:${getStatusImg(days[2].day)}" class="" alt="">
      <h1 class="py-3 pb-0">${getHighTemp(days[1].day)}<sup>o</sup>C</h1>
          <h6 class="pb-3">${getLowTemp(days[1].day)}<sup>o</sup>C</h6>
          <div class="d-flex justify-content-between">
          </div>
          <p class="text-info">${getStatus(days[1].day)}</p>

      </div>

  </div>
</div>
<div class="col-md-4">
  <div class="day-item pb-4" style="background-color: #323544; height: 100%;">
      <div class="d-flex container-fluid justify-content-center py-2"
          style="background-color:#2D303D ;">
          <p class="py-0 my-0">${getDayName(days[2])}</p>
      </div>
      <div class="container-fluid d-flex flex-column align-items-center  py-3">
          <img src="https:${getStatusImg(days[2].day)}" class="" alt="">
          <h1 class="py-3 pb-0">${getHighTemp(days[2].day)}<sup>o</sup>C</h1>
          <h6 class="pb-3">${getLowTemp(days[2].day)}<sup>o</sup>C</h6>
          <div class="d-flex justify-content-between">
          </div>
          <p class="text-info">${getStatus(days[2].day)}</p>


      </div>

  </div>
</div>
  `;
}

getData();

nameInput.addEventListener("keyup", function () {
  let Countery = nameInput.value;
  if (Countery.length == 0) {
    getData();
  } else {
    getData(Countery);
  }
});




let navIcon = document.getElementById("navIcon");
console.log(navIcon)

navIcon.addEventListener("click",function(){
  let copyNav = document.getElementById("myBar")
  copyNav.style.transition = "all 2s"

 if(  copyNav.style.height == "0px"){
  
  copyNav.style.height = "auto"

 }
 else{
  copyNav.style.height = "0px"

 }
  

})
