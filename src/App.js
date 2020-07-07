import React, {useState, useEffect} from 'react';

import Card from './components/Card';

const baseURL = 'https://pokeapi.co/api/v2/pokemon/'


export const App = () => {
  const [allPokemon, setAllPokemon] = useState([])
  const [total, setTotal] = useState(0)
  const [cart, setcart] = useState([])

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

  const handleClick = async(pokemon) => {
    let valorInicial = 0
    let soma = pokemon.stats.reduce((acumulator, valorAtual) => acumulator + valorAtual.base_stat, valorInicial)
    soma += total
    setTotal(soma)
    
    let index = cart.findIndex(item => item.name === pokemon.name)

    if(index !== -1){
      cart[index].quantity++
    }else{
      let newItem = {
        name: pokemon.name,
        quantity: 1
      }
      setcart(cart => [...cart, newItem])
    }

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
          <li key={item.name}>{item.name} x{item.quantity}</li>)}
        </ul>
        <p>TOTAL R$: {total},00</p>
        <button onClick={() => handlecart()}>Finalizar compra</button>
      </div>
      
      {allPokemon.map((pokemon) =>
        <div key={pokemon.name}>
          <Card pokemon={pokemon} pokeStats={pokemon.stats}/>
          <button onClick={() => handleClick(pokemon)}>Comprar</button>
        </div>
      )}
    </div>
  );
}

export default App;
