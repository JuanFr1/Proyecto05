let plot = (data) => {
  const ctx = document.getElementById('myChart2');
  const dataset = {
    labels: data.hourly.time, /* ETIQUETA DE DATOS */
    datasets: [{
        label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
        data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
  };
  const config = {
    type: 'line',
    data: dataset,
  };
  const chart = new Chart(ctx, config)

  const ctx2 = document.getElementById('myChart3');
  const dataset2 = {
    labels: data.daily.time, /* ETIQUETA DE DATOS */
    datasets: [{
        label: 'Índice de UV Máximo', /* ETIQUETA DEL GRÁFICO */
        data: data.daily.uv_index_max, /* ARREGLO DE DATOS */
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
  };
  const config2 = {
    type: 'bar',
    data: dataset2,
  };
  const chart2 = new Chart(ctx2, config2)
  

}

let load = (data) => {
  let timezone = data['timezone']
  let timezone_abbreviation = data['timezone_abbreviation']
  let elevation = data['elevation']
  let latitude = data['latitude']
  let longitude = data['longitude']
  let time_format = data['hourly_units']['time']
  let unidad = data['hourly_units']['temperature_2m']

  let timezoneHTML = document.getElementById('timezone')
  let timezone_abbreviationHTML = document.getElementById('timezone_abbreviation')
  let elevationHTML = document.getElementById('elevation')
  let latitudeHTML = document.getElementById('latitude')
  let longitudeHTML = document.getElementById('longitude')
  let time_formatHTML = document.getElementById('time_format')
  let unidadHTML = document.getElementById('unidad')

  timezoneHTML.textContent = timezone
  elevationHTML.textContent = elevation
  latitudeHTML.textContent = latitude
  longitudeHTML.textContent = longitude
  time_formatHTML.textContent = time_format  
  //timezone_abbreviationHTML.textContent = timezone_abbreviation
  unidadHTML.textContent = unidad


  console.log(data);
  plot(data);
}

let loadInocar = () => {
  let URL = 'https://cors-anywhere.herokuapp.com/https://www.inocar.mil.ec/mareas/consultan.php';

  fetch(URL)
 	.then(response => response.text())
    .then(data => {
       const parser = new DOMParser();
       const xml = parser.parseFromString(data, "text/html");
       let contenedorMareas = xml.getElementsByClassName('container-fluid')[0];
       let contenedorHTML = document.getElementById('table-container');
       contenedorHTML.innerHTML = contenedorMareas.innerHTML;

       console.log(xml);
    })
    .catch(console.error);

}

(
    function () {
        let meteo = localStorage.getItem('meteo');
        if(meteo == null) {
          let URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=uv_index_max&past_days=7&timezone=Asia%2FTokyo';
          fetch( URL )
          .then(response => response.json())
          .then(data => {
            load(data)
            /* GUARDAR DATA EN MEMORIA */
          localStorage.setItem("meteo", JSON.stringify(data))
          })
          .catch(console.error);
          
        } else {
          /* CARGAR DATA EN MEMORIA */
          load(JSON.parse(meteo))
        }
        loadInocar();  
    }
  )();