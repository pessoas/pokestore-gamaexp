import React from 'react'

const CartCard = ({ cart, total, handleCart }) => {

  return (
    <div className='card'>
      <div className='card-body'>
        <h4>CARRINHO</h4>
            <ul className='list-group'>
              {cart.map((item) => 
              <li key={item.name} className='list-group-item'>{item.name} x{item.quantity}: {item.value}</li>)}
            </ul>
            <p>TOTAL R$: {total},00</p>
            <button 
              className='btn btn-primary' 
              onClick={() => handleCart()}
            >
              Finalizar compra
            </button>
      </div>
    </div>
  )
}

export default CartCard