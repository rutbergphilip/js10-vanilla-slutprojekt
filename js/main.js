/*------------------------------*/
/*       Fetching the API       */
/*------------------------------*/

async function getBeerData() {
    // Declaring and getting the API
    const request = await fetch('https://api.punkapi.com/v2/beers/random')
    const response = await request.json()
    return response
};

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

// Function for grabbing the name search API + the user input
async function getBeerDataOnSearch(userInput) {
    let req = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${userInput}`)
    let res = await req.json()

    return res
}

// Declaring the search btn
const searchBtn = document.querySelector(".search-beer")
let searchBeerResult = []

async function searchResult() {
    // Declaring the user input box
    clearNav()
    const userInput = document.querySelector("input").value.toLowerCase()
    console.log(userInput)

    searchBeerResult = await getBeerDataOnSearch(userInput)
    console.log(searchBeerResult)

    const numberOfPages = Math.ceil(searchBeerResult.length / 10)
    creatNav(numberOfPages)
        /*const saveResult = []


        for (let i = 0; i < beer.length; i++) {
            saveResult.push(beer[i])
        }*/

    //console.log(saveResult)
    renderData(1)
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]


function renderData(pageNumber) {
    const nameOfUl = document.querySelector(".search-result")
    nameOfUl.innerHTML = ""
    num = 1
    pn = num * 10

    const startIndex = (pageNumber - 1) * 10
    let endIndex

    if (pageNumber * 10 > searchBeerResult.length) {
        endIndex = searchBeerResult.length
    } else {
        endIndex = pageNumber * 10
    }

    for (let i = startIndex; i < endIndex; i++) {
        addItemToUl(searchBeerResult[i], nameOfUl)
    }

}

function creatNav(pageNumber) {
    for (let n = 0; n < pageNumber; n++) {
        const nav = document.querySelector(".pagination")
        const link = document.createElement("button")

        link.href = "#"
        link.innerText = n + 1

        link.addEventListener('click', changePages)

        nav.append(link)
    }
}

function clearNav() {
    const nav = document.querySelector(".pagination")
    nav.innerHTML = ''
}

function changePages(e) {
    const num = e.target.innerText
    console.log(num)
        //console.log(pageNumber)

    renderData(num)
}

function clearBeer() {
    const nameOfUl = document.querySelector(".search-result")
    nameOfUl.innerHTML = ""
}

function addItemToUl(item, nameOfUl) {
    const listItem = document.createElement('li');
    listItem.innerHTML = item.name;
    nameOfUl.append(listItem);
}

searchBtn.addEventListener('click', () => {
    clearBeer()
    searchResult()
})

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