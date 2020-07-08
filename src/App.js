import React, {useState, useEffect} from 'react';

import Card from './components/Card';

const baseURL = 'https://pokeapi.co/api/v2/pokemon/'


export const App = () => {
  const [allPokemon, setAllPokemon] = useState([])
  const [total, setTotal] = useState(0)
  const [cart, setcart] = useState([])

  const itemsPerPage = 20
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(allPokemon.length / itemsPerPage)

  function nextPage() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
  }
  function previousPage() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, maxPage))
  }
  function jump(page) {
    const pageNumber = Math.max(1, page)
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage))
  }

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return allPokemon.slice(begin, end)
  }

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

  const handlecart = async() => {
    setTotal(0)
    setcart([])
    return(
      window.alert("Obrigado pela compra!!!")
    )
  }

  //allPokemon ? console.log(allPokemon) : console.log('')
  return (
    <div>
      <div>
        <h4>CARRINHO</h4>
        <ul>
          {cart.map((item) => 
          <li key={item.name}>{item.name} x{item.quantity}: {item.value}</li>)}
        </ul>
        <p>TOTAL R$: {total},00</p>
        <button onClick={() => handlecart()}>Finalizar compra</button>
      </div>
      
      {currentData().map((pokemon) =>
        <div key={pokemon.name}>
          <Card pokemon={pokemon} pokeStats={pokemon.stats}/>
          <button onClick={() => handleClick(pokemon)}>Adicionar ao carrinho</button>
        </div>
      )}
      <div>
        <button onClick={() => nextPage()}>Anterior</button>
        <button onClick={() => previousPage()}>Proximo</button>
      </div>
    </div>
  );
}

export default App;
