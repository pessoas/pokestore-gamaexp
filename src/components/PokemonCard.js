import React from 'react'

const PokemonCard = ({ pokemon, pokeStats, addToCart }) => {

  const StatList = () => {
    return (
      <ul className='list-group'>
        {pokeStats.map(stat => (
          <li key={stat.stat.name} className='list-group-item'>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
    )
  }

  const Price = () => {
    let valorInicial = 0
    let soma = pokeStats.reduce((acumulator, valorAtual) =>acumulator + valorAtual.base_stat, valorInicial)
    return (
      <p>R$: {soma},00</p>
    )
  }

  return (
    <div className='card' style={{width: 18+'em'}}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className='card-img-top' />
      <div className='card-body'>
        <h5 className='card-title'>{pokemon.name}</h5>
        {<StatList /> }
        {<Price /> }
        <button 
          className='btn btn-primary' 
          onClick={() => addToCart(pokemon)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

export default PokemonCard