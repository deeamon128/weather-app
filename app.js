window.addEventListener("load", () => {
  let timeZone = document.querySelector('.location-timezone');
  let dateTime = document.querySelector('.date-time');
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.degree');
  let temperatureSection = document.querySelector('.temperature-degree');
  let temperatureSpan = document.querySelector('.temperature-span');
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

      var api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London?unitGroup=uk&key=E9R3A3G5GD6CPRK8S7YZBLCVB`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {conditions, icon, temp, datetime} = data.currentConditions;
          temperatureDegree.textContent = Math.floor(temp);
          temperatureDescription.textContent = conditions;
          timeZone.textContent = data.timezone;
          dateTime.textContent = datetime;

          //SET BACKGROUND AND CONTAINER DESIGN ACCORDING TO WEATHER CONDITIONS
          document.querySelector('.background').setAttribute('conditions', conditions);
          document.querySelector('.blur').setAttribute('conditions', conditions);
          document.querySelector('.container').setAttribute('conditions', conditions);
          console.log(data.currentConditions);
          
          //SET WEATHER ICON  
          icon.textContent = icon;
          setIcons(icon, document.querySelector('.icon'));
          
          //FORMULA FOR FAHRENHEIT
          let fahrenheit = (Math.floor(temp) * 1.8) + 32
          //CHANGE TEMPERATURE TO CELSIUS/FAHRENHEIT  
          temperatureSection.addEventListener('click', () =>{
            if(temperatureSpan.textContent === "C"){
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = Math.floor(fahrenheit);
              }else{
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(temp);
              }
          });
        })
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon])
  }
})
