import React from 'react'

const Card = ({pokemon, pokeStats}) => {

  const StatList = () => {
    return (
      <ul>
        {pokeStats.map(stat => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
    )
  }

  const Price = () => {
    let valorInicial = 0
    let soma = pokeStats.reduce((acumulator, valorAtual) =>acumulator + valorAtual.base_stat, valorInicial)
    return (
      <p>R$: {soma}</p>
    )
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites ? pokemon.sprites.front_default : ''} alt={pokemon.name} />
      {pokeStats ? <StatList /> : ''}
      {pokeStats ? <Price /> : ''}
    </div>
  );
}

export default Card