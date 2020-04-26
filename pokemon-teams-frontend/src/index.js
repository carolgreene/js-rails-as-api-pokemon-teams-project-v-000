const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function fetchTrainers() {
  fetch(TRAINERS_URL) 
  .then(res => res.json())
  .then(results => {
    results.forEach(trainer => {
      renderTrainerCard(trainer)
    })
  })
}

function renderTrainerCard(trainer) {
  let main = document.querySelector('main')
  let div = document.createElement('div')
  let p = document.createElement('p')
  let addBtn = document.createElement('button')
  let trainerUl = document.createElement('ul')

  div.setAttribute("class", "card")
  div.setAttribute("data-id", `${trainer.id}`)
  addBtn.setAttribute("data-trainer-id", `${trainer.id}`)
  trainerUl.setAttribute("data-trainer-ul", `${trainer.id}`)

  p.innerText = `${trainer.name}`  
  addBtn.innerText = "Add Pokemon"

  div.appendChild(p)
  div.appendChild(addBtn)
  div.appendChild(trainerUl)
  main.appendChild(div)

  trainer.pokemons.forEach(pokemon => {
    renderPokemon(pokemon, trainerUl)
  })

  addBtn.addEventListener("click", function(e) {
    addPokemonToTeam(trainer)  
  })
}

function addPokemonToTeam(trainer) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainer.id,
    })
  })
  .then(json => window.location.reload(true))    
  }  


function renderPokemon(pokemon, trainerUl) {
  let li = document.createElement('li')
  let releaseBtn = document.createElement('button')

  releaseBtn.setAttribute("class", "release")
  releaseBtn.setAttribute("data-pokemon-id", "pokemon.id")

  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  releaseBtn.innerText = "Release"

  li.appendChild(releaseBtn)
  trainerUl.appendChild(li)

  releaseBtn.addEventListener("click", function(e) {
    releasePokemon(pokemon)
  })
}

function releasePokemon(pokemon) {
  return fetch(`${POKEMONS_URL}/${pokemon.id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      pokemon_id: pokemon.id,
    })
  })
  .then(json => window.location.reload(true))
  
}

fetchTrainers()


