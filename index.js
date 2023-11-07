import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js'

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
const shoppingListInDB = ref(database, "shoppingList")
// console.log(shoppingListInDB)


// Global Vars

const groceryInputField = document.getElementById('grocery-input-field')
    // console.log(groceryInputField)
const addToCartBtn = document.getElementById('add-to-cart-btn')
    // console.log(addToCartBtn)
const currentShoppingList = document.getElementById('shopping-list-el')

// Core functions / interactivity


// add an event listen to our Add to Cart CTA
addToCartBtn.addEventListener('click', function(){
    
    //console.log('clicked the Add to Cart CTA')
    let currentInputValue = groceryInputField.value

    // Give the event listener a function that takes our input value & adds (pushes) that value to our ShoppingList DB
    push(shoppingListInDB, currentInputValue)
    
    // clear our input field so that a user can add more items
    clearInputField()

    // take currentInputValue and add it to shopplist in DB + UI
        // addToShoppingList(currentInputValue)
})

//onValue function -- reading data in shoppingListInDB
onValue(shoppingListInDB, function(snapshot){
    //clear the current page
    clearCurrentShoppingList()
    
    //store the key value pairs from the DB in separate usable Vars
    let shoppingListValues = Object.values(snapshot.val())
    // console.log(shoppingListValues)
    
    let shoppingListKeys = Object.keys(snapshot.val())
    //console.log(shoppingListKey)
     
    //iterate over the shoppingListValues array --> add items to UI
    for ( let i = 0; i < shoppingListValues.length; i ++ ){
        let currentShoppingListItem = shoppingListValues[i]
        // currentShoppingList.innerHTML += `<li>${currentShoppingListItem}</li>`
        addToShoppingList(currentShoppingListItem)
    }
})

// clear input field once input value is captured
function clearInputField(){
    groceryInputField.value = ''
}

// clear currentShoppingList before updating the DB via OnValue()
function clearCurrentShoppingList(){
    currentShoppingList.innerHTML = ''
}

//
function addToShoppingList(inputValue){
    
    //create a new li with currentInputValue as the content
    const newListItem = document.createElement('li')
    newListItem.textContent = inputValue
    
    //append new li to currentShoppingList
    currentShoppingList.append(newListItem)
}