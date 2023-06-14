(
    function () {
        let URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&windspeed_unit=mph&forecast_days=14&start_date=2023-06-21&end_date=2023-06-23&timezone=America%2FSao_Paulo';
        fetch( URL )
          .then(response => response.json())
          .then(data => {
            let timezone = data['timezone']
            let timezone_abbreviation = data['timezone_abbreviation']

            let timezoneHTML = document.getElementById('timezone')
            let timezone_abbreviationHTML = document.getElementById('timezone_abbreviation')

            timezoneHTML.textContent = timezone

            let unidad = data['hourly_units']['temperature_2m']
            let unidadHTML = document.getElementById('Unidad')
            unidadHTML.textContent = unidad


            console.log(data);
          })
          .catch(console.error);
    }
  )();