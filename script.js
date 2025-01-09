class Weather {
  constructor(data) {
    this.location = data.resolvedAddress;
    this.description = data.description;
    this.feelsLike = data.currentConditions.feelslike;
    this.currentTemperature = data.currentConditions.feelslike;
    this.currentConditions = data.currentConditions.conditions;
    this.icon = data.currentConditions.icon;
  }
}

const searchInput = document.getElementById("search");
const button = document.getElementById("submit");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  res = await getInfo(searchInput.value);
  if (res == "0") {
    result.textContent = "0";
  } else {
    currWeather = new Weather(res);
    localStorage.setItem("weather", JSON.stringify(currWeather));
    createCard(currWeather);
    await displayGiphyImage(currWeather.currentConditions + " weather");
  }
});

function createCard(weather) {
  //Accepts Weather object
  const result = document.getElementById("result"); //Append to here
  result.innerHTML = ""; //Reset the html
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  const d = new Date();
  const dayOfWeek = document.createElement("h3");
  dayOfWeek.setAttribute("id", "day");
  dayOfWeek.textContent = weekday[d.getDay()];

  const month = document.createElement("h3");
  month.setAttribute("id", "month");
  month.textContent = months[d.getMonth()] + " " + d.getDate();
  const img = document.createElement("img");
  img.setAttribute("id", "img");

  const tempF = document.createElement("h3");
  tempF.setAttribute("id", "temp");
  tempF.textContent = weather.currentTemperature;

  const condition = document.createElement("h3");
  condition.setAttribute("id", "condition");
  condition.textContent = weather.currentConditions;

  card.appendChild(dayOfWeek);
  card.appendChild(month);
  card.appendChild(img);
  card.appendChild(tempF);
  card.appendChild(condition);
  result.appendChild(card);
}

async function getInfo(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=8UDUGUZXJW85LAEPJ35CENSTW&contentType=json`;
  try {
    const response = await fetch(url, { mode: "cors" });
    const text = await response.json(); //.json() is an async function, using here not to cause lag to the browser
    return text;
  } catch (err) {
    return "0";
  }
}

async function displayGiphyImage(search) {
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=zWj4OOUybyP8xoYmYOpivph7HplwFqTQ&s=${search}`;
  console.log(search);
  try {
    const response = await fetch(url, { mode: "cors" });
    const text = await response.json(); //.json() is an async function, using here not to cause lag to the browser
    console.log(text);
    const src = text.data.images.downsized.url;
    const img = document.getElementById("img");
    img.setAttribute("src", src);
  } catch (err) {
    return "0";
  }
}

weather = JSON.parse(localStorage.getItem("weather"));
console.log(weather);
createCard(weather);

x = displayGiphyImage("Overcast");
