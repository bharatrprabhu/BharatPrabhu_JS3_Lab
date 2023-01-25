/**
 * 
 */
 
displayCity.style.display = "none";
form.addEventListener("submit", e => {
	
  e.preventDefault();
  let inputVal = input.value;

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      city.innerHTML=markup;
      displayCity.style.display = "block";
    })
    .catch(() => {
    	displayCity.style.display = "none";
      msg.textContent = "Please search for a valid city";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
  
});