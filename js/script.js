//226207d91fd5c91572421f69de1892e9  -- API KEY
// d6923e7a2a6f4109b7c3d3c1bbf86eab -- API DO PROJETO PROF
const apiKey = "226207d91fd5c91572421f69de1892e9";
var country = "";
var apiCountryUrl = `https://flagsapi.com/`
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");


const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#coutry");
const humidityElement = document.querySelector("#value-humidity");
const windElement = document.querySelector("#value-wind");
const descriptionElement = document.querySelector("#description");

const weatherContainer = document.querySelector("#weather-data");

const messageError = document.querySelector(".container_error");

//Events
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const city = cityInput.value;

    if (!city) {
        alert('Informe a cidade')
        return
    }

    showWeatherData(city)
})


const getWeatherData = async(city) =>{
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiURL);
    const data = await res.json();
    debugger
    
    return data;
}

const showWeatherData = async (city) =>{
   const dataReturn = await getWeatherData(city)

   if(dataReturn.cod == 200)
   {
       weatherContainer.classList.remove("hide")
       messageError.classList.add("error")
   }
    else{
        weatherContainer.classList.add("hide")
        messageError.classList.remove("error")
        return
    }


   cityElement.innerHTML = dataReturn.name;
   tempElement.innerHTML = parseInt(dataReturn.main.temp);
   descriptionElement.innerHTML = dataReturn.weather[0].description;
   countryElement.setAttribute("src", `${apiCountryUrl}${dataReturn.sys.country}/shiny/64.png`);
   humidityElement.innerText = `${dataReturn.main.humidity}%`;
   windElement.innerText = `${dataReturn.wind.speed}Km/h`
}