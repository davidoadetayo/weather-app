// https://api.weatherapi.com/v1/current.json?key=f25d025a0ad6492fb33184119251809&q=Lagos&aqi=no

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".location p");
const dateandTimeField = document.querySelector(".time span");
const conditionField = document.querySelector(".condition p");
const conditionIcon = document.querySelector("p.icon");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);

let target = "Lagos";

const fetchResults = async (targetLocation) => {
  let url = `https://api.weatherapi.com/v1/current.json?key=f25d025a0ad6492fb33184119251809&q=${targetLocation}&aqi=no`;

  const res = await fetch(url);

  const data = await res.json();

  console.log(data);

  let locationName = data.location.name;
  let time = data.location.localtime;
  let temp_c = data.current.temp_c;
  let condition = data.current.condition.text;
    let icon = data.current.condition.icon

  updateDetaiils(temp_c, locationName, time, condition, icon);
};

function updateDetaiils(temp_c, locationName, time, condition, icon) {
  let splitDate = time.split(" ")[0];

  let splitTime = time.split(" ")[1];

  let currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerText = temp_c + "°C";
  locationField.innerText = locationName;
  dateandTimeField.innerText = `${splitTime} ${currentDay} ${splitDate}`;
  conditionField.innerText = condition;
  conditionIcon.innerHTML = `<img src="https:${icon}" alt="weather icon">`
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}
