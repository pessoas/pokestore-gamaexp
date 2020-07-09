import React, {useState, useEffect} from 'react';

import PokemonCard from './components/PokemonCard';
import CartCard from './components/CartCard'
import Pagination from './components/Pagination'

const baseURL = 'https://pokeapi.co/api/v2/pokemon/'


export const App = () => {
  const [allPokemon, setAllPokemon] = useState([])
  const [total, setTotal] = useState(0)
  const [cart, setcart] = useState([])

  const [itemsPerPage] = useState(15)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() =>{
    
    const initialize = async (poke) => {
      const response = await fetch(poke.url)
      const pokemon = await response.json()
      //console.log(pokem)
      
      return pokemon
    }

    const fetchAll = async () => {
      const response = await fetch(`${baseURL}?limit=151`)
      const listaPokemon = await response.json()
      console.log(listaPokemon)
      listaPokemon.results.map(async element => {
        let nextPokemon = await initialize(element)
        setAllPokemon(allPokemon => [...allPokemon, nextPokemon])
      });
      
    }

    fetchAll()
  },[])

//pagination
  const indexOfLastPokemon = currentPage * itemsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage
  const currentPokemons = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

//Handle buttons
  const handleClick = async(pokemon) => {
    let valorInicial = 0
    let soma = pokemon.stats.reduce((acumulator, valorAtual) => acumulator + valorAtual.base_stat, valorInicial)
    
    let index = cart.findIndex(item => item.name === pokemon.name)

    if(index !== -1){
      cart[index].quantity++
      cart[index].value += soma
    }else{
      let newItem = {
        name: pokemon.name,
        quantity: 1,
        value: soma
      }
      setcart(cart => [...cart, newItem])
    }
    soma += total
    setTotal(soma)
    //setcart(cart => [...cart, pokemon.name])
  }

  const handleCart = async() => {
    setTotal(0)
    setcart([])
    return(
      window.alert("Obrigado pela compra!!!")
    )
  }

  //allPokemon ? console.log(allPokemon) : console.log('')
  return (
    <div className='container-fluid mt-4'>
      <h1 className='text-primary m-3'>Kanto PokeStore</h1>
      <div className='row'>
        <div className='col-md-8'>
          <div className='row'>
            {currentPokemons.map((pokemon) =>
                <PokemonCard pokemon={pokemon} pokeStats={pokemon.stats} addToCart={handleClick} key={pokemon.name}/>
            )}
          </div>
        </div>
        <div className='col-md-2'>
          <CartCard cart={cart} total={total} handleCart={handleCart} />
        </div>
      </div>
      <Pagination 
        itemsPerPage={itemsPerPage} 
        totalPokemons={allPokemon.length} 
        paginate={paginate}
      />
    </div>
  );
}

export default App;
