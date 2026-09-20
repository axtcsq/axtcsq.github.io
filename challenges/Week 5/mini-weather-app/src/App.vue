<script setup>
  import { ref } from 'vue' // reactive variables whose values can change
  import axios from 'axios' // Axios will take care of how to make API calls

  // Env variable
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

  // Reactive variable
  const myCity = ref ("Pyongyang")
  let myTemp = ref (null)

  async function checkWeather() {
    console.log("[START] checkWeather for:", myCity.value)

    // Special string
    // Template Literal String
    // encodeURLComponent() --> convert str into URL compatible string
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(myCity.value)}&units=metric&appid=${API_KEY}`
    console.log(url);

    try {
      // Axios asynchronously
      const response = await axios.get(url) // API endpoint URL | 3rd Party Service, latency
      // I AM GONNA WAIT until you get back

      // Before I do line 24, I need to wait for Axios to give me the actual response
      // NOT JUST A PROMISE
      console.log(response.data.main.temp) // Temperature (C)

      // ADD YOUR CODE HERE
      // Note: Need set .value cause you use ref()
      // We use .toFixed(1) to get 1 d.p. format
      myTemp.value = response.data.main.temp.toFixed(1)
      console.log("Math.ToFixed:", myTemp.value)

    } catch (error) {
      console.log("Weather API call failed", error)
    }

    console.log("[END] checkWeather")
  }
</script>

<template>
  <h1>Mini Weather App</h1>

  City: <input type="text" v-model="myCity">

  <br><br>
  <button @click="checkWeather()">
    Get Temperature (Celsius)
  </button>

  <!-- Royal Task #5 
    25.74
    -- convert into 25.7 
  -->
  <h2>Temperature in Celsius: {{  myTemp  }}</h2>

  <!-- Royal Task #6 
    temp > 25, display "hot.jpg"
      Singapore
    temp <= 25 > 9, display "okay.jpg" 
      San Francisco
    temp <= 9, display "cold.jpg"
      Yakutsk
  -->

  <!-- Task is default shouldnt show cold weather until button is pressed
    We use null check to achieve this 
  -->
  <div v-if="myTemp !== null">
    <div v-if="myTemp > 25">
      <img src="/weather_photos/hot.jpg">
    </div>

    <div v-else-if="myTemp > 9">
      <img src="/weather_photos/okay.jpg">
    </div>

    <div v-else>
      <img src="/weather_photos/cold.jpg">
    </div>
  </div>

</template>

<style scoped></style>