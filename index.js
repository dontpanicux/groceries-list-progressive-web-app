import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js'

//🔥 Firebase app settings  database URL + initialize app

const appSettings = {
    //URL to the 'main' Friebase DB specific ref is defined later
    databaseURL: 'https://groceries-app-scrimba-default-rtdb.firebaseio.com/'
}

//initialize our app with Firebase
const app = initializeApp(appSettings)

// db var
const database = getDatabase(app)

// set the ref for our specific 'place' / location in the DB
const shoppingListInDB = ref(database, 'shoppingList')
console.log(shoppingListInDB)

// Global Vars

const groceryInputField = document.getElementById('grocery-input-field')
    // console.log(groceryInputField)
const addToCartBtn = document.getElementById('add-to-cart-btn')
    // console.log(addToCartBtn)

// Core functions / interactivity

// add an event listen to our Add to Cart CTA
addToCartBtn.addEventListener('click', function(){
    //console.log('clicked the Add to Cart CTA')
    let currentInputValue = groceryInputField.value
        // console.log(currentInputValue)
    
    // Give the event listener a function that takes our input value & adds (pushes) that value to our ShoppingList DB
    push(shoppingListInDB, currentInputValue)
    console.log(shoppingListInDB)
    console.log(database)

    clearInputField()
})

// clear input field once input value is captured
function clearInputField(){
    groceryInputField.value = ''
}