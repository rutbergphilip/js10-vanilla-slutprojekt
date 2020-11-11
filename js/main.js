/*------------------------------*/
/*       Fetching the API       */
/*------------------------------*/

async function getBeerData() {
    // Declaring and getting the API
    const request = await fetch('https://api.punkapi.com/v2/beers/random')
    const response = await request.json()
    return response
};

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

/*---------------------------------*/
/*       Random Beer On Load       */
/*---------------------------------*/

function fetchBeerInfo() {
    getBeerData().then(beers => {
        // Randomizing beers and putting it inside a variable
        const randomBeer = beers[0]

        // Display the fetched random beer on page load
        document.querySelector(".image-bord").src = randomBeer.image_url
        document.querySelector("h2").innerText = randomBeer.name

        // Display the fetched random beer info on modal
        document.querySelector(".title").innerText = randomBeer.name

        document.querySelector(".modal-body").appendChild(document.createElement("div")).innerHTML = "<h4>Description</h4>"
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = randomBeer.description

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

        // document.querySelector(".modal-image").src = randomBeer.image_url
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

function openNav() {
    document.querySelector(".sidenav").style.width = "250px";
    document.querySelector("nav").style.marginLeft = "0";
}

function closeNav() {
    document.querySelector(".sidenav").style.width = "0";
    document.querySelector("nav").style.marginLeft = "0";
}

document.querySelector("nav").addEventListener('click', openNav)
document.querySelector(".nav1").addEventListener('click', openNav)

document.querySelector(".closebtn").addEventListener('click', closeNav)

/*-------------------------*/
/*     Page navigation     */
/*-------------------------*/

const wrapHome = document.querySelector(".wrap-home")
const wrapSearch = document.querySelector(".wrap-search")
const beerWiki = document.querySelector(".beer-wiki")
const searchPage = document.querySelector(".search-page")

wrapHome.classList.add("active")
wrapSearch.classList.remove("active")

searchPage.addEventListener('click', () => {
    wrapHome.classList.add("active")
    wrapSearch.classList.remove("active")

    closeNav()
})
beerWiki.addEventListener('click', () => {
    wrapHome.classList.remove("active")
    wrapSearch.classList.add("active")

    closeNav()
})

/*---------------------*/
/*     Search Page     */
/*---------------------*/


// Declaring the user input box
const userInput = document.querySelector("input").value

// Declaring the search btn
const searchBtn = document.querySelector(".search-beer")

// Function for grabbing the name search API + the user input
async function getBeerDataOnSearch(userInput) {
    let req = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${userInput}`)
    let res = await req.json()
    return res
}


/* ---------------------------------------------------------- */

var list = document.querySelectorAll("ul > li")

async function createResultList(userInput) {
    let beerData = await getBeerDataOnSearch(userInput)
    console.log(beerData)

    for (let i = 0; i < beerData.length; i++) {

        document.querySelector("ul").appendChild(document.createElement("li")).innerText[i] = beerData[i].name
    }
}

searchBtn.addEventListener("click", createResultList)


// // Search result list
// getBeerDataOnSearch(userInput).then(beer => {



//     searchBtn.addEventListener('click', () => {
//         console.log(beer)
//         document.querySelector("ul").appendChild(document.createElement("li")).innerText = beer.name
//     })
// })


/*--------------------*/
/*        Modal       */
/*--------------------*/

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}