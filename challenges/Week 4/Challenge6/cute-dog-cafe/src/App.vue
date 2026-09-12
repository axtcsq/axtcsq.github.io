<script setup>

import { ref } from 'vue';

const dogs = ref([
    { name: 'healthy', age: 3 },
    { name: 'smiley', age: 7 },
    { name: 'happy', age: 1 }
]);

const dogName = ref('');
const dogAge = ref('');

function addDog() {
    // TODO:
    // 1. Check that dogName and dogAge are not empty
    //  ref() requires the use of .value to access/change its variables
    if (dogName.value && dogAge.value) {
        
        // 2. Add a new dog object to the dogs array
        dogs.value.push(
            {
                name: dogName.value,
                age: dogAge.value
            }
        );
    }

    // 3. Clear dogName
    dogName.value = "";

    // 4. Clear dogAge
    dogAge.value = "";
}

</script>

<template>

    <h1>🐶 Welcome to Krazy Dog Café!</h1>

    <hr>

    <h2>Our Current Dogs</h2>

    <!-- TODO:
         Display the dogs as an ordered list.

         Example:
         Healthy is 3 years old
         Smiley is 7 years old
         Happy is 1 year old

         Remember:
         - Capitalize the first character of the dog's name.
         - Use "year" when age is 1.
         - Use "years" for all other ages.
    -->
    <ol>
        <!-- Iterates through each object (dog) of all dogs (dogs array) -->
        <li v-for="element of dogs">
            <!-- String Slicing: Take the first letter & uppercase it + add the remaining elements of the name starting from Index 1 -->
            <!-- Ternary Operator: If more than 1 year old, use "years" else use "year" -->
            {{ element.name[0].toUpperCase() + element.name.slice(1)}} is {{ element.age }} {{ element.age > 1 ? "years" : "year" }} old
        </li>
    </ol>

    <hr>

    <h2>Add a Dog</h2>

    <!-- TODO:
         Create inputs for:
         1. Dog Name
         2. Dog Age
    -->
    Dog Name:
    <input type="text" v-model="dogName">

    <br>

    Dog Age:
    <input type="text" v-model="dogAge">

    <!-- TODO:
         Create an Add Dog button.
         When clicked, call addDog().
    -->
         <button @click="addDog()">Add Dog</button>
</template>


<style scoped>
    h1 {
        background-color: lightyellow;
    }

    input {
        margin: 5px;
    }

    button {
        margin: 5px;
    }
</style>