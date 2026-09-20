<!-- Logic, Interacting with External APIs -->
<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import axios from 'axios'

  onMounted(() => {
    fetchAllWeather()
  })

  async function fetchAllWeather() {
    await Promise.all(
      members.value.map((m) => fetchWeather(m))
    )
  }

  async function fetchWeather(member) {
    // Retrieve the API key from the .env file
    // "Get my OpenWeather API key from the environment file and store it in a variable called API_KEY."
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

    // Construct the OpenWeatherMap API URL
    // encodeURIComponent() converts text into a URL-safe format so special characters like spaces and & do not break the URL.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(member.city)}&units=metric&appid=${API_KEY}`
    
    try {
      // Wait for Axios to receive a response from the API
      const response = await axios.get(url)
      
      // Store the temperature returned by the API
      member.temp = Math.round(response.data.main.temp)
      
      // No error occurred
      member.tempError = false

    } catch (error) {
      // Display the error in the browser console
      console.error('Weather fetch failed:', error)
      
      // No temperature is available
      member.temp = undefined
      
      // Remember that an error occurred
      member.tempError = true
    }
  }

  // JavaScript Variables
  const group = "HUNTRIX"
  const query = ref ("")
  const selectedMember = ref(null)

  function showProfile(member) {
    // DIY Task 1:
    // Check if the clicked member is already selected
    if (selectedMember.value && selectedMember.value.id === member.id) {
      // Clicking the same member again: deselect them & hides the profile
      selectedMember.value = null

    // Otherwise, clicking a different member would select them and show their profile
    } else {
      selectedMember.value = member
    }
  }

  // DIY Task 2:
  // Watch for changes to the search query
  watch(query, () => {
    // Clear the selected member when the search changes
    selectedMember.value = null
  })

  // Array of Objects (In the future, the data comes from API)
  const members = ref([
    {
      id: 1,
      name: 'Rumi',
      role: 'Leader, Vocal',
      img: '/photos/rumi.jpg',
      profile: [
        'Zodiac Sign: Aries',
        'Chinese Zodiac Sign: Goat',
        'Oldest of the three members in HUNTRIX',
        'Taekwondo Black Belt',
        'Loves cats',
        'Her favorite ramen flavor is Spicy Chicken.'
      ],
      city: 'Seoul',
      temp: undefined,
      tempError: false
    },
    {
      id: 2,
      name: 'Mira',
      role: 'Rapper',
      img: '/photos/mira.jpg',
      profile: [
        'Zodiac Sign: Taurus',
        'Chinese Zodiac Sign: Monkey',
        'Dancing since 4 years old',
        'Choreography for most of HUNTRIX songs',
        'Mira can play drums',
        'Her favorite ramen flavor is roast beef.'
      ],
      city: 'Los Angeles',
      temp: undefined,
      tempError: false
    },
    {
      id: 3,
      name: 'Zoey',
      role: 'Dancer',
      img: '/photos/zoey.jpg',
      profile: [
        'Zodiac Sign: Sagittarius',
        'Chinese Zodiac Sign: Rooster',
        'Her hobbies are drawing and skateboarding.',
        'She can play the bass',
        "Wrote most of HUNTRIX songs' rap parts",
        'Her favorite ramen flavor is pork with soy sauce.'
      ],
      city: 'Moscow',
      temp: undefined,
      tempError: false
    }
  ])

const filteredMembers = computed (() => {
  console.log("Computed Property filteredMembers")

  // Royal Task #4
  // Step 1
    // Clean up the query
    // " r " --> "r" trim it
    // lowercase it
  const cleanedQuery = query.value.trim().toLowerCase();

  // Step 2
    // If the query string is empty, return all members of HUNTRIX (members)
  if (!cleanedQuery) {
    return members.value;
  }

  // Else
  // Step 3
    // Create a new Array that only includes matching members (member objects)
    // Filtered version of members Array - matching the query
  return members.value.filter((person) =>
    person.name.toLowerCase().includes(cleanedQuery)
  )
})

const words = ref(["Life", "is", "Good"])
const otherWords = ref(["I", "feel", "like", "dying"])
// Underlying data frequently changes
// Stock high/low, crypto

// Slow moving data

function joinedWords() {
  // "Life is Good"
  // Royal Task #3
  console.log("Function joinedWords()")
  return words.value.join(" ")
}

// Computed Property
const joinedOtherWords = computed( () => {
  // Essentially like a function
  // embody some logic just like joinedWords()
  console.log("Computed Property joinedOtherWords")
  return otherWords.value.join(' ') // Data Property Value
  // "joinedOtherWords": "I feel like dying" is stored in browser cache
})

</script>

<!-- View, Content -->
<template>
  <main class="container">
      <h1>{{ group }} Member Explorer</h1>

      <!-- Users keys in a search term "r", we're to update <ol> to show only matching members. 
        - Rumi
        - Mira
        (DO NOT SHOW Zoey cause her name does not contain "r")
      -->
      <p>
        Search: <input type="text" v-model="query">
      </p>

      <!-- Provide visual feedback for user on how many matches the search or when there's no match -->
      <p>
        Results:
        {{ filteredMembers.length }} of {{ members.length }}
      </p>

      <p v-if="filteredMembers.length === 0">
        No members found for "{{ query }}"
      </p>

      <!-- Royal Task #1
       Each list item is a Huntrix member
       Name - Role
      -->
      <ol v-else>
        <!-- v-bind:key="m.id" -->
        <li v-for="person of filteredMembers" :key="person.id">
          <button 
            :class="{active: selectedMember && selectedMember.id === person.id}"
            @click="showProfile(person)">
            {{ person.name }} - {{ person.role }}
          </button>
          <br>

          <!-- Royal Task #2
            Dynamically render each instance of <img's> src to correctly show the member's photo
            v_bind:src / :src (shortform)
          -->
          <img v-bind:src="person.img" v-bind:title="person.name" width="100px">

          <p class="city-temp">
            <strong>{{ person.city }}</strong>

            <span v-if="person.tempError">
              - N/A
            </span>

            <span v-else-if="person.temp === undefined">
              - Loading...
            </span>

            <span v-else>
              - {{ person.temp }}°C
            </span>
          </p>
        </li>
      </ol>

      <!-- Profile section -->
      <section v-if="selectedMember" class="profile">
        <h2>{{ selectedMember.name }}'s Profile</h2>
        
        <ul>
          <li
            v-for="(info, idx) in selectedMember.profile" :key="idx">
            {{ info }}
          </li>
        </ul>
      </section>

      <!-- <hr>
      <h2>Function Calls vs. Computed Property References</h2>

      <h3>Function Call 1: {{ joinedWords() }}</h3>
      <h3>Function Call 2: {{ joinedWords() }}</h3>
      <h3>Function Call 3: {{ joinedWords() }}</h3>

      <h3>Computed Property reference 1: {{ joinedOtherWords }}</h3>
      <h3>Computed Property reference 2: {{ joinedOtherWords }}</h3>
      <h3>Computed Property reference 3: {{ joinedOtherWords }}</h3> -->

  </main>
</template>

<!-- CSS -->
<style scoped>
  .container {
    max-width: 700px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: Arial, Helvetica, sans-serif;
  }

  .active {
    background-color: purple;
    color: white;
  }

  .city-temp {
    margin: 0.25rem 0 1rem;
    font-size: 0.9rem;
    color: #666;
  }
</style>