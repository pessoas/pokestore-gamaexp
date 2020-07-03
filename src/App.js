import React, {useState, useEffect} from 'react';

const baseURL = 'https://pokeapi.co/api/v2/pokemon/'


export const App = () => {
  const [pokemon, setPokemon] = useState([])
  const [pokeStats, setPokeStats] = useState()

  useEffect(() =>{
    const fetchPokemon = async (name) => {
      const response = await fetch(baseURL + name)
      const data = await response.json();
      return await data
    }

    const initialize = async (name) => {
      const poke = await fetchPokemon(name)
      setPokemon(poke)
      console.log(poke)
      const stats = poke.stats
      //console.log(stats[0].base_stat)
      setPokeStats(stats)
    }

    initialize('charmander')
  },[])

  const statList = () => {
    return (
      <ul>
        {pokeStats.map(stat => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
    )
  }

  const price = () => {
    let valorInicial = 0
    let soma = pokeStats.reduce((acumulator, valorAtual) =>acumulator + valorAtual.base_stat, valorInicial)
    return (
      <p>R$: {soma}</p>
    )
  }

  const card = () => {
    return (
      <div>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.sprites ? pokemon.sprites.front_default : ''} alt="pokemon" />
        {pokeStats ? statList() : ''}
        {pokeStats ? price() : ''}
      </div>
    )
  }


  return (
    card()
  );
}

export default App;
