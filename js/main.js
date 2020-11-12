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

let randomBeer

function fetchBeerInfo() {
    getRandomBeerData().then(beers => {
        // Randomizing beers and putting it inside a variable
        randomBeer = beers[0]

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
async function getBeerDataOnSearch(userInput, page) {
    let req = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${userInput}&per_page=80&page=${page}`)
    let res = await req.json()

    return res
}

// Declaring the search btn
const searchBtn = document.querySelector(".search-beer")
const inputBox = document.querySelector("input")
let searchBeerResult = []

// Creating a variable used to store the amount of pages necessary for the pagination function later
let numberOfPages

async function searchResult() {

    // Declaring the user input value
    const userInput = document.querySelector("input").value.toLowerCase()

    let page = 1
    while (page != 0) {
        // Creating a variable to store the result so we can add it or stop the loop
        let auxSearchResult = await getBeerDataOnSearch(userInput, page)
            // If the result length is greater than 0, we want to add the temporary variable to the "main" array
        if (auxSearchResult.length > 0) {
            searchBeerResult = searchBeerResult.concat(auxSearchResult)
            page++
        } else {
            page = 0
        }
    }

    // Calculating the number of pages necessary based on the result
    numberOfPages = Math.ceil(searchBeerResult.length / 10)
    document.querySelector(".total-page").innerHTML = numberOfPages

    // Sending in 1 because we want to see the first batch of beers on the result array
    // Putting a 2 would show us everything on page 2
    renderData(1)
}

// Declaring the buttons for previous and next
const btnPrevious = document.querySelector(".previous")
const btnNext = document.querySelector(".next")

// Adding listeners to the buttons and calling the functions for previous and next page
btnPrevious.addEventListener('click', previousPage)
btnNext.addEventListener('click', nextPage)

// Function for the next page button
function nextPage() {
    //Declaring the current page paragraph
    let currentPage = document.querySelector("p .current-page")
    let pageNum = currentPage.innerHTML

    if (pageNum < numberOfPages) {
        pageNum++
    } else {
        pageNum = 1
    }
    renderData(pageNum)
    currentPage.innerHTML = pageNum
}

// Function for the nexprevious page button
function previousPage() {
    //Declaring the current page paragraph
    let currentPage = document.querySelector("p .current-page")
    let pageNum = currentPage.innerHTML

    if (pageNum > 1) {
        pageNum--
    } else {
        pageNum = numberOfPages
    }
    renderData(pageNum)
    currentPage.innerHTML = pageNum
}

function renderData(pageNumber) {
    // Declaring the <ul>
    const nameOfUl = document.querySelector(".search-result")
    nameOfUl.innerHTML = ""

    const startIndex = (pageNumber - 1) * 10
    let endIndex

    // Multiply the amount of pages by maximum allowed items per page (10)
    // If this is greater than searchBeerResult.length we want to put the endIndex as the total result length
    if (pageNumber * 10 > searchBeerResult.length) {
        endIndex = searchBeerResult.length
    } else {
        endIndex = pageNumber * 10
    }

    // Loop through and add the beers to the list
    for (let i = startIndex; i < endIndex; i++) {
        addItemToUl(searchBeerResult[i], i, nameOfUl)
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
    const beerIndex = event.target.innerText.split(' - ')
    let selectedBeer

    // isNaN verifies if the first position of the array is a number, and if it is it means that comes from the search page
    if (!isNaN(beerIndex[0])) {
        // Getting the beer index through the name
        selectedBeer = searchBeerResult[beerIndex[0] - 1]
    } else {
        selectedBeer = randomBeer
    }
    console.log(selectedBeer)

    // Targeting the clicked beer to the modal
    const modal = document.querySelector(event.target.dataset.modalTarget)

    buildModalBeerData(selectedBeer)

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

function addItemToUl(item, indexOnArray, nameOfUl) {
    // Creating the <li> and <a> format to add to the <ul>
    const listItem = document.createElement('li')
    const listAnchor = document.createElement('a')

    listItem.append(listAnchor)
    listAnchor.href = '#'
    listAnchor.setAttribute('data-modal-target', '#modal')
    listAnchor.innerHTML = `${indexOnArray+1} - ${item.name}`
    listAnchor.addEventListener('click', modalCallback)

    nameOfUl.append(listItem)
}

function buildModalBeerData(selectedBeer) {
    // Clear the previous beer info before showing the new
    clearBeerInfo()

    document.querySelector(".title").innerText = selectedBeer.name

    document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<h4>Description</h4>"
    document.querySelector(".modal-body").appendChild(document.createElement("p-description")).innerText = selectedBeer.description

    document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Alcohol by volume</h4>"
    document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = selectedBeer.abv

    document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Volume</h4>"
    document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = `${selectedBeer.volume.value} ${selectedBeer.volume.unit}`

    document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Ingredients</h4>"
    document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = getIngredients(selectedBeer.ingredients.malt)

    document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Hops</h4>"
    document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = getIngredients(selectedBeer.ingredients.hops)

    document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Food pairing</h4>"
    document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = selectedBeer.food_pairing

    document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<br><h4>Brewers tips</h4>"
    document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = selectedBeer.brewers_tips

    document.querySelector(".modal-image").src = selectedBeer.image_url
}