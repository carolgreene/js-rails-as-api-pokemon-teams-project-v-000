const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchPokemons() {
  fetch(POKEMONS_URL)
 .then((res) => res.json()) 
 .then(results => { 
    results.data.forEach(poke => {
      console.log(poke)
    })
  })
}

function fetchTrainers() {
  fetch(TRAINERS_URL) 
  .then((res) => res.json())
  .then(results => {
    results.data.forEach(trainer => {
      console.log(trainer)
    })
  })
}