/* Place your JavaScript in this file */
var ip = "http://192.168.199.85:3000"
var fetch_url = ip + "/fetch"
var action_history_url = ip + "/action_history"
var more_data_url = ip + "/more_data"
var reset_data_url = ip + "/reset_data"
var fan_on_url = ip + "/fan_on"
var fan_off_url = ip + "/fan_off"
var light_on_url = ip + "/light_on"
var light_off_url = ip + "/light_off"
var status_url = ip + "/status"

var tempchart = document.getElementById('TemperatureChart');
var humidchart = document.getElementById('HumidityChart');
var lightchart = document.getElementById('LightChart');

var tempgauge = document.getElementById('TemperatureGauge');
var humidgauge = document.getElementById('HumidityGauge');
var lightgauge = document.getElementById('LightGauge');

var light_on = document.getElementById('Light_on');
var fan_on = document.getElementById('Fan_on');
var light_off = document.getElementById('Light_off');
var fan_off = document.getElementById('Fan_off');

var data_button = document.getElementById('databutton');
var home_button = document.getElementById('homebutton');

var home = document.getElementById('home');
var data = document.getElementById('data_base');

var id_sort = 0
var temp_sort = 0
var humid_sort = 0
var light_sort = 0
var device_id_sort = 0
var device_sort = 0
var action_sort = 0

var Temp_Chart = new Chart("TemperatureChart", {
  type: "line",
  data: {
    labels: [0],
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "white",
      borderColor: "#04AA6D",
      data: [0],
      pointRadius: 1
    }]
  },
  options: {
    legend: {display: false},
    scales: {
        xAxes: [{
            gridLines: {
            color: "rgba(255, 255, 255, 0.2)"
            },
            ticks: {
            fontColor: "white",
            fontFamily: "verdana",
            autoSkip: true,  
            callback: function(value, index, values) {
                const totalPoints = values.length;
                if (totalPoints <= 10) return value;
                else if (totalPoints <= 100 && totalPoints > 10) return index % 5 === 0 ? value : '';
                else if (totalPoints <= 300 && totalPoints > 100) return index % 10 === 0 ? value : '';
                else if (totalPoints <= 500 && totalPoints > 300) return index % 15 === 0 ? value : '';
                else if (totalPoints <= 700 && totalPoints > 500) return index % 20 === 0 ? value : '';
                else if (totalPoints <= 1000 && totalPoints > 700) return index % 25 === 0 ? value : '';
                else if (totalPoints <= 1300 && totalPoints > 1000) return index % 30 === 0 ? value : '';
                else if (totalPoints <= 1500 && totalPoints > 1300) return index % 35 === 0 ? value : '';
                else if (totalPoints <= 1700 && totalPoints > 1500) return index % 40 === 0 ? value : '';
                else if (totalPoints <= 2000 && totalPoints > 1700) return index % 45 === 0 ? value : '';
                else return index % 50 === 0 ? value : '';
            }
            }
        }],
        yAxes: [{
            ticks: {
            min: 0, 
            max:40,
            fontColor: "white",
            fontFamily: "verdana"
            },
            gridLines: {
            color: "rgba(255, 255, 255, 0.2)"
            }
        }],
    }
  }
});

var Humid_Chart = new Chart("HumidityChart", {
  type: "line",
  data: {
    labels: [0],
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "white",
      borderColor: "#04AA6D",
      data: [0],
      pointRadius: 1
    }]
  },
  options: {
    legend: {display: false},
    scales: {
        xAxes: [{
            gridLines: {
            color: "rgba(255, 255, 255, 0.2)"
            },
            ticks: {
            fontColor: "white",
            fontFamily: "verdana",
            autoSkip: true,  
            callback: function(value, index, values) {
                const totalPoints = values.length;
                if (totalPoints <= 10) return value;
                else if (totalPoints <= 100 && totalPoints > 10) return index % 5 === 0 ? value : '';
                else if (totalPoints <= 300 && totalPoints > 100) return index % 10 === 0 ? value : '';
                else if (totalPoints <= 500 && totalPoints > 300) return index % 15 === 0 ? value : '';
                else if (totalPoints <= 700 && totalPoints > 500) return index % 20 === 0 ? value : '';
                else if (totalPoints <= 1000 && totalPoints > 700) return index % 25 === 0 ? value : '';
                else if (totalPoints <= 1300 && totalPoints > 1000) return index % 30 === 0 ? value : '';
                else if (totalPoints <= 1500 && totalPoints > 1300) return index % 35 === 0 ? value : '';
                else if (totalPoints <= 1700 && totalPoints > 1500) return index % 40 === 0 ? value : '';
                else if (totalPoints <= 2000 && totalPoints > 1700) return index % 45 === 0 ? value : '';
                else return index % 50 === 0 ? value : '';
            }
            }
        }],
        yAxes: [{
            ticks: {
            min: 0, 
            max:100,
            fontColor: "white",
            fontFamily: "verdana"
            },
            gridLines: {
            color: "rgba(255, 255, 255, 0.2)"
            }
        }],
    }
  }
}); 

var Light_Chart = new Chart("LightChart", {
  type: "line",
  data: {
    labels: [0],
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "white",
      borderColor: "#04AA6D",
      data: [0],
      pointRadius: 1
    }]
  },
  options: {
    legend: {display: false},
    scales: {
        xAxes: [{
            gridLines: {
            color: "rgba(255, 255, 255, 0.2)"
            },
            ticks: {
            fontColor: "white",
            fontFamily: "verdana",
            autoSkip: true,  
            callback: function(value, index, values) {
                const totalPoints = values.length;
                if (totalPoints <= 10) return value;
                else if (totalPoints <= 100 && totalPoints > 10) return index % 5 === 0 ? value : '';
                else if (totalPoints <= 300 && totalPoints > 100) return index % 10 === 0 ? value : '';
                else if (totalPoints <= 500 && totalPoints > 300) return index % 15 === 0 ? value : '';
                else if (totalPoints <= 700 && totalPoints > 500) return index % 20 === 0 ? value : '';
                else if (totalPoints <= 1000 && totalPoints > 700) return index % 25 === 0 ? value : '';
                else if (totalPoints <= 1300 && totalPoints > 1000) return index % 30 === 0 ? value : '';
                else if (totalPoints <= 1500 && totalPoints > 1300) return index % 35 === 0 ? value : '';
                else if (totalPoints <= 1700 && totalPoints > 1500) return index % 40 === 0 ? value : '';
                else if (totalPoints <= 2000 && totalPoints > 1700) return index % 45 === 0 ? value : '';
                else return index % 50 === 0 ? value : '';
            }
            }
        }],
        yAxes: [{
            ticks: {
            min: 0, 
            max:400,
            fontColor: "white",
            fontFamily: "verdana"
            },
            gridLines: {
            color: "rgba(255, 255, 255, 0.2)"
            }
        }],
    }
  }
});

var All_Chart = new Chart("AllChart", {
  type: "line",
  data: {
      labels:[0] ,
      datasets: [{
      label: 'Temperature (°C)',
      fill: false,
      lineTension: 0,
      backgroundColor: "white",
      borderColor: "#ff0000",
      data: [0],
      pointRadius: 1
      }, {
      label: 'Humidity (%)',
      fill: false,
      lineTension: 0,
      backgroundColor: "white",
      borderColor: "#1b5ed1",
      data: [0],
      pointRadius: 1
      }, {
      label: 'Light (lx)',
      fill: false,
      lineTension: 0,
      backgroundColor: "white",
      borderColor: "#ffe100",
      data: [0],
      pointRadius: 1
      }]
  },
  options: {
      legend: {display: true},
      scales: {
          xAxes: [{
              gridLines: {
              color: "rgba(255, 255, 255, 0.2)"
              },
              ticks: {
              fontColor: "white",
              fontFamily: "verdana",
              autoSkip: true,  
              callback: function(value, index, values) {
                  const totalPoints = values.length;
                  if (totalPoints <= 10) return value;
                  else if (totalPoints <= 100 && totalPoints > 10) return index % 5 === 0 ? value : '';
                  else if (totalPoints <= 300 && totalPoints > 100) return index % 10 === 0 ? value : '';
                  else if (totalPoints <= 500 && totalPoints > 300) return index % 15 === 0 ? value : '';
                  else if (totalPoints <= 700 && totalPoints > 500) return index % 20 === 0 ? value : '';
                  else if (totalPoints <= 1000 && totalPoints > 700) return index % 25 === 0 ? value : '';
                  else if (totalPoints <= 1300 && totalPoints > 1000) return index % 30 === 0 ? value : '';
                  else if (totalPoints <= 1500 && totalPoints > 1300) return index % 35 === 0 ? value : '';
                  else if (totalPoints <= 1700 && totalPoints > 1500) return index % 40 === 0 ? value : '';
                  else if (totalPoints <= 2000 && totalPoints > 1700) return index % 45 === 0 ? value : '';
                  else return index % 50 === 0 ? value : '';
              }
              }
          }],
          yAxes: [{
              ticks: {
              min: 0, 
              max:400,
              fontColor: "white",
              fontFamily: "verdana"
              },
              gridLines: {
              color: "rgba(255, 255, 255, 0.2)"
              }
          }],
      }
  }
});

async function getData() {
  try {
    const response = await fetch(fetch_url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    var ID = [];
    var Time = [];
    var xTime = [];
    var yTemperature = [];
    var yHumidity = [];
    var yLight = [];
    for (let i = 0; i<json.length; i++)
    {
        ID[i] = json[i].id;
    }
    for (let i = 0; i<json.length; i++)
    {
        Time[i]='';
        let time = new Date(json[i].time).toLocaleString("en-US", {
            timeZone: "Asia/Ho_Chi_Minh"
        });
        for(let j = 0; j<time.length; j++){
            Time[i] = Time[i] + time[j];
        }
    }
    for (let i = 0; i<json.length; i++)
    {
        xTime[i]='';
        let time = new Date(json[i].time).toLocaleTimeString("en-US", {
            timeZone: "Asia/Ho_Chi_Minh"
        });
        for(let j = 0; j<5; j++){
            xTime[i] = xTime[i] + time[j];
        }
    }
    for (let i = 0; i<json.length; i++)
    {
        yTemperature[i] = json[i].temp;
    }

    for (let i = 0; i<json.length; i++)
    {
        yHumidity[i] = json[i].humid;
    }

    for (let i = 0; i<json.length; i++)
    {
        yLight[i] = json[i].light;
    }
    Temp_Chart.data.labels = xTime;
    Temp_Chart.data.datasets[0].data = yTemperature;
    Temp_Chart.update();
    Humid_Chart.data.labels = xTime;
    Humid_Chart.data.datasets[0].data = yHumidity;
    Humid_Chart.update();
    Light_Chart.data.labels = xTime;
    Light_Chart.data.datasets[0].data = yLight;
    Light_Chart.update();
    All_Chart.data.labels = xTime;
    All_Chart.data.datasets[0].data = yTemperature;
    All_Chart.data.datasets[1].data = yHumidity;
    All_Chart.data.datasets[2].data = yLight;
    All_Chart.update();
    gaugeTemp.set(yTemperature[json.length-1]);
    gaugeHumid.set(yHumidity[json.length-1]);
    gaugeLight.set(yLight[json.length-1]);
  } catch (error) {
    console.error(error.message);
  }
}
async function getTable() {
  try {
    const response = await fetch(fetch_url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    var ID = [];
    var Time = [];
    var xTime = [];
    var yTemperature = [];
    var yHumidity = [];
    var yLight = [];
    for (let i = 0; i<json.length; i++)
    {
        ID[i] = json[i].id;
    }
    for (let i = 0; i<json.length; i++)
    {
        Time[i]='';
        let time = new Date(json[i].time).toLocaleString("en-US", {
            timeZone: "Asia/Ho_Chi_Minh"
        });
        for(let j = 0; j<time.length; j++){
            Time[i] = Time[i] + time[j];
        }
    }
    for (let i = 0; i<json.length; i++)
    {
        xTime[i]='';
        let time = new Date(json[i].time).toLocaleTimeString("en-US", {
            timeZone: "Asia/Ho_Chi_Minh"
        });
        for(let j = 0; j<5; j++){
            xTime[i] = xTime[i] + time[j];
        }
    }
    for (let i = 0; i<json.length; i++)
    {
        yTemperature[i] = json[i].temp;
    }

    for (let i = 0; i<json.length; i++)
    {
        yHumidity[i] = json[i].humid;
    }

    for (let i = 0; i<json.length; i++)
    {
        yLight[i] = json[i].light;
    }
    var Data_tableBody = document.getElementById("Data_table").getElementsByTagName("tbody")[0];
    for (var i = 0; i < ID.length; i++) {
      var row = Data_tableBody.insertRow();
      var cell1 = row.insertCell(0);
      cell1.innerHTML = ID[i];
      var cell2 = row.insertCell(1);
      cell2.innerHTML = yTemperature[i];
      var cell3 = row.insertCell(2);
      cell3.innerHTML = yHumidity[i];
      var cell4 = row.insertCell(3);
      cell4.innerHTML = yLight[i];
      var cell5 = row.insertCell(4);
      cell5.innerHTML = Time[i];
    }
  } catch (error) {
    console.error(error.message);
  }
}
async function getHistory(){
  try {
    const response = await fetch(action_history_url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    var Device_ID =[]
    var Time = []
    var Action = []
    var Device = []
    for (let i = 0; i<json.length; i++)
    {
        Time[i]='';
        let time = new Date(json[i].time).toLocaleString("en-US", {
            timeZone: "Asia/Ho_Chi_Minh"
        });
        for(let j = 0; j<time.length; j++){
            Time[i] = Time[i] + time[j];
        }
    }
    for (let i = 0; i<json.length; i++)
    {
        Device_ID[i] = json[i].id;
    }
    for (let i = 0; i<json.length; i++)
    {
        Action[i] = json[i].action;
    }
    for (let i = 0; i<json.length; i++)
    {
        Device[i] = json[i].device;
    }
    var History_tableBody = document.getElementById("History_table").getElementsByTagName("tbody")[0];
    for (var i = 0; i < Time.length; i++) {
      var row = History_tableBody.insertRow();
      var cell0 = row.insertCell(0);
      cell0.innerHTML = Device_ID[i];
      var cell1 = row.insertCell(1);
      cell1.innerHTML = Device[i];
      var cell2 = row.insertCell(2);
      cell2.innerHTML = Action[i];
      var cell3 = row.insertCell(3);
      cell3.innerHTML = Time[i];
    }
  } catch (error) {
    console.error(error.message);
  }
}
async function getStatus(){
  try {
    const response = await fetch(status_url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const status = await response.json();
    console.log(status)
    if (status.toString() == '11' ){
      const fan_checkbox = document.getElementById("Fancheckbox");
      const light_checkbox = document.getElementById("Lightcheckbox");
      fan_checkbox.checked = false;
      light_checkbox.checked = false;
    }
    else if (status.toString() == '10'){
      const fan_checkbox = document.getElementById("Fancheckbox");
      const light_checkbox = document.getElementById("Lightcheckbox");
      fan_checkbox.checked = false;
      light_checkbox.checked = true;
    }
    else if (status.toString() == '01'){
      const fan_checkbox = document.getElementById("Fancheckbox");
      const light_checkbox = document.getElementById("Lightcheckbox");
      fan_checkbox.checked = true;
      light_checkbox.checked = false;
    }
    else if (status.toString() == '00'){
      const fan_checkbox = document.getElementById("Fancheckbox");
      const light_checkbox = document.getElementById("Lightcheckbox");
      fan_checkbox.checked = true;
      light_checkbox.checked = true;
    }
    if (document.getElementById('Lightcheckbox').checked) {
      light_off.style.display='none'
      light_on.style.display='block'
    }
    else{
      light_off.style.display='block'
      light_on.style.display='none'
    }
    if (document.getElementById('Fancheckbox').checked) {
      fan_off.style.display='none'
      fan_on.style.display='block'
    }
    else{
      fan_off.style.display='block'
      fan_on.style.display='none'
    }
  } catch (error) {
    console.error(error.message);
  }
}
getData();
getTable();
getHistory();
getStatus();

tempchart.style.display='none';
humidchart.style.display='none';
lightchart.style.display='none';

tempgauge.addEventListener("mouseover", Temperatureshowfunction);
tempgauge.addEventListener("mouseout", Temperaturehidefunction);
tempchart.addEventListener("mouseover", Temperatureshowfunction);
tempchart.addEventListener("mouseout", Temperaturehidefunction);

function Temperatureshowfunction(){
  tempgauge.style.display='none'
  tempchart.style.display='block'
}

function Temperaturehidefunction(){
  tempgauge.style.display='block'
  tempchart.style.display='none'
}

humidgauge.addEventListener("mouseover", Humidityshowfunction);
humidgauge.addEventListener("mouseout", Humidityhidefunction);
humidchart.addEventListener("mouseover", Humidityshowfunction);
humidchart.addEventListener("mouseout", Humidityhidefunction);

function Humidityshowfunction(){
  humidgauge.style.display='none'
  humidchart.style.display='block'
}

function Humidityhidefunction(){
  humidgauge.style.display='block'
  humidchart.style.display='none'
}

lightgauge.addEventListener("mouseover", Lightshowfunction);
lightgauge.addEventListener("mouseout", Lighthidefunction);
lightchart.addEventListener("mouseover", Lightshowfunction);
lightchart.addEventListener("mouseout", Lighthidefunction);

function Lightshowfunction(){
  lightgauge.style.display='none'
  lightchart.style.display='block'
}

function Lighthidefunction(){
  lightgauge.style.display='block'
  lightchart.style.display='none'
}

var Temp_opts = {
angle: -0.25,
lineWidth: 0.29,
radiusScale: 0.77,
pointer: {
  length: 0.6,
  strokeWidth: 0.035,
  color: '#000000'
},
staticLabels: {
  font: "10px verdana",  
  labels: [10, 20, 30],  
  color: "#FFFFFF",  
  fractionDigits: 0  
},
renderTicks: {
    divisions: 4,
    divWidth: 1.2,
    divLength: 0.42,
    divColor: '#000000',
    subDivisions: 5,
    subLength: 0.15,
    subWidth: 0.6,
    subColor: '#000000'
},
limitMax: 'false', 
percentColors: [[0.0, "#6FADCF"],[0.33, "#a9d70b" ], [0.66, "#f9c802"], [1.0, "#ff0000"]],
strokeColor: '#E0E0E0',
generateGradient: true
};

var gaugeTemp = new Gauge(tempgauge).setOptions(Temp_opts); 
gaugeTemp.maxValue = 40; 
gaugeTemp.setMinValue(0);  
gaugeTemp.animationSpeed = 50; 
gaugeTemp.set(29); 

var Humid_opts = {
angle: -0.25,
lineWidth: 0.29,
radiusScale: 0.77,
pointer: {
  length: 0.6,
  strokeWidth: 0.035,
  color: '#000000'
},
staticLabels: {
  font: "10px verdana",  
  labels: [20, 40, 60, 80],  
  color: "#FFFFFF",  
  fractionDigits: 0  
},
renderTicks: {
    divisions: 5,
    divWidth: 1.2,
    divLength: 0.42,
    divColor: '#000000',
    subDivisions: 4,
    subLength: 0.15,
    subWidth: 0.6,
    subColor: '#000000'
},
limitMax: 'false', 
percentColors: [[0.0, "#1bd133"],[0.33, "#1bb9d1" ], [0.66, "#1b5ed1"], [1.0, "#671bd1"]],
strokeColor: '#E0E0E0',
generateGradient: true
};

var gaugeHumid = new Gauge(humidgauge).setOptions(Humid_opts); 
gaugeHumid.maxValue = 100; 
gaugeHumid.setMinValue(0);  
gaugeHumid.animationSpeed = 50; 
gaugeHumid.set(85); 

var Light_opts = {
angle: -0.25,
lineWidth: 0.29,
radiusScale: 0.77,
pointer: {
  length: 0.6,
  strokeWidth: 0.035,
  color: '#000000'
},
staticLabels: {
  font: "10px verdana",  
  labels: [50, 100, 150, 200, 250, 300, 350],  
  color: "#FFFFFF",  
  fractionDigits: 0  
},
renderTicks: {
    divisions: 5,
    divWidth: 1.2,
    divLength: 0.42,
    divColor: '#000000',
    subDivisions: 4,
    subLength: 0.15,
    subWidth: 0.6,
    subColor: '#000000'
},
limitMax: 'false', 
percentColors: [[0.0, "#000000"],[0.33, "#9c8a05" ], [0.66, "#ffe100"], [1.0, "#ffffff"]],
strokeColor: '#E0E0E0',
generateGradient: true
};

var gaugeLight = new Gauge(lightgauge).setOptions(Light_opts); 
gaugeLight.maxValue = 400; 
gaugeLight.setMinValue(0);  
gaugeLight.animationSpeed = 50; 
gaugeLight.set(85); 

light_on.style.display='none';
fan_on.style.display='none';

document.getElementById('Lightcheckbox').addEventListener('change', Lightfunction);
document.getElementById('Fancheckbox').addEventListener('change', Fanfunction);

function Lightfunction(){
if (document.getElementById('Lightcheckbox').checked) {
  light_off.style.display='none'
  light_on.style.display='block'
  light_on_command();
}
else{
  light_off.style.display='block'
  light_on.style.display='none'
  light_off_command();
}
}

function Fanfunction(){
if (document.getElementById('Fancheckbox').checked) {
  fan_off.style.display='none'
  fan_on.style.display='block'
  fan_on_command();
}
else{
  fan_off.style.display='block'
  fan_on.style.display='none'
  fan_off_command();
}
}
async function light_on_command(){
  try{
    fetch(light_on_url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  } catch (error) {
    console.error(error.message);
  }
}
async function light_off_command(){
  try{
    fetch(light_off_url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  } catch (error) {
    console.error(error.message);
  }
}
async function fan_on_command(){
  try{
    fetch(fan_on_url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  } catch (error) {
    console.error(error.message);
  }
}
async function fan_off_command(){
  try{
    fetch(fan_off_url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  } catch (error) {
    console.error(error.message);
  }
}

data_button.classList.remove("active");

data.style.display='none';

home_button.addEventListener("click", Homeshowfunction);

function Homeshowfunction(){
home.style.display='block'
data.style.display='none'
home_button.classList.add("active");
data_button.classList.remove("active");
}

data_button.addEventListener("click", Datashowfunction);

function Datashowfunction(){
home.style.display='none'
data.style.display='block'
home_button.classList.remove("active");
data_button.classList.add("active");
}

async function More_data(){
  try{
    fetch(more_data_url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    location.reload();
  } catch (error) {
    console.error(error.message);
  }
}

async function Reset_data(){
  try{
    fetch(reset_data_url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    location.reload();
  } catch (error) {
    console.error(error.message);
  }
}

function sort_id(){
  if (id_sort == 0){
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("Data_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[0];
        y = rows[i + 1].getElementsByTagName("td")[0];
        if (x.innerHTML > y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    id_sort = 1;
  }
  else{
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("Data_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[0];
        y = rows[i + 1].getElementsByTagName("td")[0];
        if (x.innerHTML < y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    id_sort = 0;
  }
}

function sort_temp(){
  if(temp_sort == 0){
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("Data_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[1];
        y = rows[i + 1].getElementsByTagName("td")[1];
        if (x.innerHTML > y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    temp_sort = 1;
  }
  else{
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("Data_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[1];
        y = rows[i + 1].getElementsByTagName("td")[1];
        if (x.innerHTML < y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    temp_sort = 0;
  }
}

function sort_humid(){
  if(humid_sort == 0){
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("Data_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[2];
        y = rows[i + 1].getElementsByTagName("td")[2];
        if (x.innerHTML > y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    humid_sort = 1; 
  }
  else{
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("Data_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[2];
        y = rows[i + 1].getElementsByTagName("td")[2];
        if (x.innerHTML < y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    humid_sort = 0;
  }
}
function sort_light(){
  if(light_sort == 0){
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("Data_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[3];
        y = rows[i + 1].getElementsByTagName("td")[3];
        if (x.innerHTML > y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    light_sort = 1;
  } 
  else{
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("Data_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[3];
        y = rows[i + 1].getElementsByTagName("td")[3];
        if (x.innerHTML < y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    light_sort = 0;
  }
}
function sort_device_id(){
  if (device_id_sort == 0){
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("History_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[0];
        y = rows[i + 1].getElementsByTagName("td")[0];
        if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    device_id_sort = 1;
  }
  else{
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("History_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[0];
        y = rows[i + 1].getElementsByTagName("td")[0];
        if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    device_id_sort = 0;
  }
}
function sort_device(){
  if(device_sort == 0){
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("History_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[1];
        y = rows[i + 1].getElementsByTagName("td")[1];
        if (x.innerHTML > y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    device_sort = 1;
  } 
  else{
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("History_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[1];
        y = rows[i + 1].getElementsByTagName("td")[1];
        if (x.innerHTML < y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    device_sort = 0;
  }
}
function sort_action(){
  if(action_sort == 0){
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("History_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[2];
        y = rows[i + 1].getElementsByTagName("td")[2];
        if (x.innerHTML > y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    action_sort = 1;
  } 
  else{
    var rows, switching, i, x, y, shouldSwitch;
    let tbody = document.getElementById("History_table").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
      switching = false;
      rows = tbody.getElementsByTagName("tr");
      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[2];
        y = rows[i + 1].getElementsByTagName("td")[2];
        if (x.innerHTML < y.innerHTML) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    action_sort = 0;
  }
}

function Search_Data() {
  var input, filter, data_tbody, data_tr, data_id, data_temp, data_humid, data_light, data_time, i, data_Value;
  input = document.getElementById("SearchData");
  filter = input.value.toUpperCase();
  data_tbody = document.getElementById("Data_table").getElementsByTagName("tbody")[0];
  data_tr = data_tbody.getElementsByTagName("tr");
  for (i = 0; i < data_tr.length; i++) {
    data_id = data_tr[i].getElementsByTagName("td")[0];
    data_temp = data_tr[i].getElementsByTagName("td")[1];
    data_humid = data_tr[i].getElementsByTagName("td")[2];
    data_light = data_tr[i].getElementsByTagName("td")[3];
    data_time = data_tr[i].getElementsByTagName("td")[4];
    id_Value = data_id.textContent;
    temp_Value = data_temp.textContent;
    humid_Value = data_humid.textContent;
    light_Value = data_light.textContent;
    time_Value = data_time.textContent;
    if (id_Value.toUpperCase().indexOf(filter ) > -1) {
      data_tr[i].style.display = "";
    } 
    if (temp_Value.toUpperCase().indexOf(filter ) > -1){
      data_tr[i].style.display = "";
    }
    if (humid_Value.toUpperCase().indexOf(filter ) > -1){
      data_tr[i].style.display = "";
    }  
    if (light_Value.toUpperCase().indexOf(filter ) > -1){
      data_tr[i].style.display = "";
    }  
    if (time_Value.toUpperCase().indexOf(filter ) > -1){
      data_tr[i].style.display = "";
    }     
    if (id_Value.toUpperCase().indexOf(filter ) == -1 &&
        temp_Value.toUpperCase().indexOf(filter ) == -1 &&
        humid_Value.toUpperCase().indexOf(filter ) == -1 &&
        light_Value.toUpperCase().indexOf(filter ) == -1 &&
        time_Value.toUpperCase().indexOf(filter ) == -1){
          data_tr[i].style.display = "none";
    }
  }
}
function Search_History() {
  var input, filter, history_tbody, history_tr, history_id, history_device, history_action, history_time, i, history_Value;
  input = document.getElementById("SearchHistory");
  filter = input.value.toUpperCase();
  history_tbody = document.getElementById("History_table").getElementsByTagName("tbody")[0];
  history_tr = history_tbody.getElementsByTagName("tr");
  for (i = 0; i < history_tr.length; i++) {
    history_id = history_tr[i].getElementsByTagName("td")[0];  
    history_device = history_tr[i].getElementsByTagName("td")[1];
    history_action = history_tr[i].getElementsByTagName("td")[2];
    history_time = history_tr[i].getElementsByTagName("td")[3];  
    id_Value = history_id.textContent;
    device_Value = history_device.textContent;
    action_Value = history_action.textContent;
    time_Value = history_time.textContent; 
    if (id_Value.toUpperCase().indexOf(filter ) > -1) {
      history_tr[i].style.display = "";
    } 
    if (device_Value.toUpperCase().indexOf(filter ) > -1){
      history_tr[i].style.display = "";
    }
    if (action_Value.toUpperCase().indexOf(filter ) > -1){
      history_tr[i].style.display = "";
    }  
    if (time_Value.toUpperCase().indexOf(filter ) > -1){
      history_tr[i].style.display = "";
    }     
    if (id_Value.toUpperCase().indexOf(filter ) == -1 &&
        device_Value.toUpperCase().indexOf(filter ) == -1 &&
        action_Value.toUpperCase().indexOf(filter ) == -1 &&
        time_Value.toUpperCase().indexOf(filter ) == -1){
          history_tr[i].style.display = "none";
    }
  }
}
setInterval(() => {
  getData();
}, 10000);