import React, {useState, useEffect} from 'react';

import Card from './components/Card';

const baseURL = 'https://pokeapi.co/api/v2/pokemon/'


export const App = () => {
  const [allPokemon, setAllPokemon] = useState([])

  useEffect(() =>{
    
    const initialize = async (poke) => {
      const response = await fetch(poke.url)
      const pokemon = await response.json()
      //console.log(pokem)
      
      return pokemon
    }

    const fetchAll = async () => {
      const response = await fetch(`${baseURL}?limit=20`)
      const listaPokemon = await response.json()
      //console.log(listaPokemon)
      listaPokemon.results.map(async element => {
        let nextPokemon = await initialize(element)
        setAllPokemon(allPokemon => [...allPokemon, nextPokemon])
      });
      
    }

    fetchAll()
  },[])

  //allPokemon ? console.log(allPokemon) : console.log('')
  return (
    <div>
      {allPokemon.map((pokemon) =>
        <Card pokemon={pokemon} pokeStats={pokemon.stats} key={pokemon.name}/>
      )}
    </div>
  );
}

export default App;
