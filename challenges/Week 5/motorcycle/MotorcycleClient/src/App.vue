<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const url = 'http://127.0.0.1:8000/bookings'

const bookings = ref([]) // Reactive Variable
const name = ref('')
const selectedDay = ref('Monday')
const selectedTime = ref(800)

const days = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday'
]

const times = [800, 1000, 1200, 1400, 1600, 1800, 2000]

// Part A - READ
// HINT: axios.get(url)
async function getBookings() {
  // YOUR CODE GOES HERE
  console.log("[START] getBookings")

  try {
    // Use AXIOS to make a READ request
    const response = await axios.get(url)
    console.log(response.data) // Array of Objects

    // .value important
    bookings.value = response.data

  } catch (error) {
    console.log("Data fetch failed, ", error.message)
  }

  console.log("[END] getBookings")
}

// Part B - CREATE
// HINT: axios.post(url, {NEW_DATA})
async function addBooking() {
  // YOUR CODE GOES HERE
  console.log("[START] addBooking")

  try {
    // Use AXIOS to make a READ request
    const response = await axios.post(url, 
    {
      name: name.value, 
      day: selectedDay.value, 
      time: selectedTime.value
    }
  )

  // Refresh the page so that the new booking appears
  await getBookings()

  } catch (error) {
    console.log("Data add failed, ", error.message)
  }

  console.log("[END] addBooking")
}

// Part C - UPDATE
// HINT: axios.put(url + '/' + booking.id, {NEW_DATA})
async function updateBooking(booking) {
  // YOUR CODE GOES HERE
  console.log("[START] updateBooking")

  try {
    const response = await axios.put(url + "/" + booking.id, 
    {
      // Came from v-model form inputs
      name: booking.name, 
      day: booking.day, 
      time: booking.time
    })

    // Refresh the page so that the updated booking appears
    await getBookings()

  } catch (error) {
    console.log("Data update failed, ", error.message)
  }

  console.log("[END] updateBooking")
}

// Part D - DELETE
// HINT: axios.delete(url +'/' + id)
async function deleteBooking(id) {
  // YOUR CODE GOES HERE
  console.log("[START] deleteBooking")

  try {
    const response = await axios.delete(url + "/" + id)

    // Refresh the page so that the updated booking appears
    await getBookings()

  } catch (error) {
    console.log("Data delete failed, ", error.message)
  }

  console.log("[END] deleteBooking")
}

onMounted(() => {
  getBookings()
})
</script>

<template>
  <h1>Motorcycle Lesson Booking</h1>

  <div>
    <label for="nameInput">Name:</label>
    <input id="nameInput" type="text" v-model="name">

    <label for="daySelect">Day:</label>
    <select id="daySelect" v-model="selectedDay">
      <option v-for="day in days" :key="day" :value="day">
        {{ day }}
      </option>
    </select>

    <label for="timeSelect">Time:</label>
    <select id="timeSelect" v-model="selectedTime">
      <option v-for="time in times" :key="time" :value="time">
        {{ time }}
      </option>
    </select>

    <button @click="addBooking">Book Lesson</button>
  </div>

  <table border="1" cellpadding="6" cellspacing="0">
    <thead>
      <tr>
        <th>Name</th>
        <th>Day</th>
        <th>Time</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="booking in bookings" :key="booking.id">
        <td>
          <input type="text" v-model="booking.name">
        </td>
        <td>
          <select v-model="booking.day">
            <option v-for="day in days" :key="day" :value="day">
              {{ day }}
            </option>
          </select>
        </td>
        <td>
          <select v-model="booking.time">
            <option v-for="time in times" :key="time" :value="time">
              {{ time }}
            </option>
          </select>
        </td>
        <td>
          <button @click="updateBooking(booking)">Update</button>
          <button @click="deleteBooking(booking.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
label, input, select, button {
  margin: 5px;
}

table {
  margin-top: 15px;
}
</style>
