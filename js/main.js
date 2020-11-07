/* ----- Fetching the API ----- */

async function getBeerData() {
    // Declaring and getting the API
    const request = await fetch('https://api.punkapi.com/v2/beers')
    const response = await request.json()
    return response
};

//console.log(getBeerData())

/* ----- Random Beer On Load ----- */

getBeerData().then(beers => {
    // Randomizing beers and putting it inside a variable
    const randomBeer = beers[Math.floor(Math.random() * beers.length)]

    // Display the fetched random beer info
    document.querySelector(".image-bord").src = randomBeer.image_url
    document.querySelector("h2").innerText = randomBeer.name

})

/* ----- Modal ----- */

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

/* -----  ----- */