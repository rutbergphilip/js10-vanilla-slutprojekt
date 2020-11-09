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

// function getMalt(malt) {
//     let maltInfo = ""

//     malt.forEach(m => {
//         maltInfo += m.name + "\n"
//     })

//     return maltInfo
// }

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

function fetchBeerinfo() {
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
        document.querySelector(".modal-body").appendChild(document.createElement("p")).innerText = randomBeer.volume.value + " " + randomBeer.volume.unit

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
fetchBeerinfo()

// function clearBeerInfo() {
//     document.querySelector(".title").removeChild()
//     document.querySelector(".modal-body").forEach(child => {
//         child.removeChild(document.querySelectorAll("p"))
//     })
// }
// document.querySelector(".randomize-beer").addEventListener('click', clearBeerInfo)

function clearBeerInfo() {
    document.querySelector(".title").innerText = ""
    document.querySelector(".modal-body").innerText = ""
}

document.querySelector(".randomize-beer").addEventListener('click', clearBeerInfo)

function randomizeBeer() {
    clearBeerInfo()
    document.querySelector(".randomize-beer").addEventListener('click', fetchBeerinfo)
}
randomizeBeer()

// getBeerData().then(beers => {
//     // Randomizing beers and putting it inside a variable
//     const randomBeer = beers[0]

//     // Display the fetched random beer on page load
//     document.querySelector(".image-bord").src = randomBeer.image_url
//     document.querySelector("h2").innerText = randomBeer.name
// })


/*--------------------*/
/*       Navbar       */
/*--------------------*/

function openNav() {
    document.querySelector(".sidenav").style.width = "250px";
    document.querySelector(".nav").style.marginLeft = "250px";
}

function closeNav() {
    document.querySelector(".sidenav").style.width = "0";
    document.querySelector(".nav").style.marginLeft = "0";
}

document.querySelector(".nav").addEventListener('click', openNav)
document.querySelector(".closebtn").addEventListener('click', closeNav)

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