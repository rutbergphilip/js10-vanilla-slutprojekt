/*------------------------------*/
/*       Fetching the API       */
/*------------------------------*/

async function getRandomBeerData() {
    // Declaring and getting the API
    const request = await fetch('https://api.punkapi.com/v2/beers/random')
    const response = await request.json()
    return response
};

/*---------------------------------*/
/*       Random Beer On Load       */
/*---------------------------------*/

function fetchBeerInfo() {
    getRandomBeerData().then(beers => {
        // Randomizing beers and putting it inside a variable
        const randomBeer = beers[0]

        // Display the fetched random beer on page load
        document.querySelector(".image-bord").src = randomBeer.image_url
        document.querySelector("h2").innerText = randomBeer.name

        // Display the fetched random beer info on modal
        document.querySelector(".title").innerText = randomBeer.name

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<h4>Description</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p-description")).innerText = randomBeer.description

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Alcohol by volume</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = randomBeer.abv

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Volume</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = `${randomBeer.volume.value} ${randomBeer.volume.unit}`

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Ingredients</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = getIngredients(randomBeer.ingredients.malt)

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Hops</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = getIngredients(randomBeer.ingredients.hops)

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Food pairing</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = randomBeer.food_pairing

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Brewers tips</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = randomBeer.brewers_tips

        document.querySelector(".modal-image").src = randomBeer.image_url
    })
}
fetchBeerInfo()

// Function for clearing the old beer info
function clearBeerInfo() {
    document.querySelector(".title").innerText = ""
    document.querySelector(".modal-body").innerText = ""
}

// Clearing the old beer info on button click before randomizing and fetching new information
document.querySelector(".randomize-beer").addEventListener('click', clearBeerInfo)

// Function for fetching a new beer and printing the data
function randomizeBeer() {
    document.querySelector(".randomize-beer").addEventListener('click', fetchBeerInfo)
}
randomizeBeer()

/*--------------------*/
/*       Navbar       */
/*--------------------*/

// Style for open navbar
function openNav() {
    document.querySelector(".sidenav").style.width = "250px";
    document.querySelector("nav").style.marginLeft = "0";
}

// Style for closed navbar
function closeNav() {
    document.querySelector(".sidenav").style.width = "0";
    document.querySelector("nav").style.marginLeft = "0";
}

// Adding listeners to the nav buttons
document.querySelector("nav").addEventListener('click', openNav)
document.querySelector(".nav1").addEventListener('click', openNav)

document.querySelector(".closebtn").addEventListener('click', closeNav)

/*-------------------------*/
/*     Page navigation     */
/*-------------------------*/

// Declaring the wrappers and pages
const wrapHome = document.querySelector(".wrap-home")
const wrapSearch = document.querySelector(".wrap-search")
const beerWiki = document.querySelector(".beer-wiki")
const searchPage = document.querySelector(".search-page")

// Setting which page should be default on load
wrapHome.classList.add("active")
wrapSearch.classList.remove("active")

// Clicking on the Search Page hides the Beer Wiki section
searchPage.addEventListener('click', () => {
    wrapHome.classList.add("active")
    wrapSearch.classList.remove("active")

    closeNav()
})

// Clicking on the Beer Wiki hides the Search Page section
beerWiki.addEventListener('click', () => {
    wrapHome.classList.remove("active")
    wrapSearch.classList.add("active")

    closeNav()
})

/*---------------------*/
/*     Search Page     */
/*---------------------*/

// Function for grabbing the name search API + the user input
async function getBeerDataOnSearch(userInput) {
    let req = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${userInput}`)
    let res = await req.json()

    return res
}

function fetchClickedBeerInfo() {
    getBeerDataOnSearch().then(beer => {
        // Randomizing beers and putting it inside a variable
        const clickedBeer = beer.target.dataset

        // Display the fetched random beer on page load
        document.querySelector(".image-bord").src = randomBeer.image_url
        document.querySelector("h2").innerText = randomBeer.name

        // Display the fetched random beer info on modal
        document.querySelector(".title").innerText = randomBeer.name

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<h4>Description</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p-description")).innerText = randomBeer.description

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Alcohol by volume</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = randomBeer.abv

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Volume</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = `${randomBeer.volume.value} ${randomBeer.volume.unit}`

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Ingredients</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = getIngredients(randomBeer.ingredients.malt)

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Hops</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = getIngredients(randomBeer.ingredients.hops)

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Food pairing</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = randomBeer.food_pairing

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Brewers tips</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = randomBeer.brewers_tips

        document.querySelector(".modal-image").src = randomBeer.image_url
    })
}
fetchClickedBeerInfo()

// Declaring the search btn
const searchBtn = document.querySelector(".search-beer")
const inputBox = document.querySelector("input")
let searchBeerResult = []

async function searchResult() {
    clearNav()
        // Declaring the user input value
    const userInput = document.querySelector("input").value.toLowerCase()
    console.log(userInput)

    // Wait for the results on user input
    searchBeerResult = await getBeerDataOnSearch(userInput)
    console.log(searchBeerResult)

    // Calculating the number of pages necessary based on the result
    const numberOfPages = Math.ceil(searchBeerResult.length / 10)
    creatNav(numberOfPages)

    // Sending in 1 because we want to see the first batch of beers on the result array
    // Putting a 2 would show us everything on page 2
    renderData(1)
}

function renderData(pageNumber) {
    // Declaring the <ul>
    const nameOfUl = document.querySelector(".search-result")
    nameOfUl.innerHTML = ""

    const startIndex = (pageNumber - 1) * 10
    let endIndex

    if (pageNumber * 10 > searchBeerResult.length) {
        endIndex = searchBeerResult.length
    } else {
        endIndex = pageNumber * 10
    }

    // Loop through and add the beers to the list
    for (let i = startIndex; i < endIndex; i++) {
        addItemToUl(searchBeerResult[i], nameOfUl)
    }
}


// Function to create the navbar for search page result navigation
function creatNav(pageNumber) {
    // For loop will help us create a button for each page necessary
    for (let n = 0; n < pageNumber; n++) {
        const nav = document.querySelector(".page-buttons")
        const btn = document.createElement("button")

        // Setting the button name to n + 1, showing the page number on the buttons starting from 1
        btn.href = "#"
        btn.innerText = n + 1

        btn.addEventListener('click', changePages)

        nav.append(btn)
    }
}

// Listener to the search button and the inputbox, when clicked, the previous search results should be wiped and the new result should be showcased
searchBtn.addEventListener('click', () => {
    clearBeer()
    searchResult()
})

inputBox.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        clearBeer()
        searchResult()
    }
})

/*--------------------*/
/*        Modal       */
/*--------------------*/

// Declaring the modal targets for open and close, as well as the overlay
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

// Break out the modal buttons to target the links inside search page easier
const modalCallback = event => {
    const modal = document.querySelector(event.target.dataset.modalTarget)
    openModal(modal)
}

openModalButtons.forEach(button => {
    button.addEventListener('click', modalCallback)
})

// Targeting all 'active' overlays for closing on click outside the modal body
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

// Add listener to the modal, looking for the closest modal with class modal
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

// Open Modal function, adding active to the modal body and overlay
function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

// Close Modal function, adding active to the modal body and overlay
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

/*-----------------------*/
/*       Functions       */
/*-----------------------*/

// Function to format and get the ingredients information
function getIngredients(ingredients) {
    let ingredientsInfo = ""

    ingredients.forEach(ing => {
        ingredientsInfo += `${ing.name} ${ing.amount.value} ${ing.amount.unit}\n`
    })

    return ingredientsInfo
}

// Prevent form from refreshing the page
function preventDefault(event) {
    event.preventDefault();
}

function clearNav() {
    // Clearing the navbar 
    const nav = document.querySelector(".page-buttons")
    nav.innerHTML = ""
}

function changePages(e) {
    // Changing pages based on the clicked page button
    const num = e.target.innerText
    console.log(num)

    renderData(num)
}

function clearBeer() {
    // Clearing the beer results
    const nameOfUl = document.querySelector(".search-result")
    nameOfUl.innerHTML = ""
}

function addItemToUl(item, nameOfUl) {
    // Creating the <li> and <a> format to add to the <ul>
    const listItem = document.createElement('li')
    const listAnchor = document.createElement('a')

    listItem.append(listAnchor)
    listAnchor.href = '#'
    listAnchor.setAttribute('data-modal-target', '#modal')
    listAnchor.addEventListener('click', modalCallback)
    listAnchor.innerHTML = item.name

    nameOfUl.append(listItem)
}