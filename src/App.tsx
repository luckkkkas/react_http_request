import { useEffect, useState } from 'react'
import './App.css'
import { useFetch } from './hooks/useFetch';

const url = 'http://localhost:3000/products'

function App() {
  const [products, setProducts] = useState([])
  const [price, setPrice] = useState('');
  const [name, setName] = useState<string>('');

  //resgatando dados----------------------------------------
  const {data: items, httpConfig} = useFetch(url);

//inserindo dados----------------------------------------
  const handleForm = async (e:any) =>{
    e.preventDefault();

    const product = {
      name,
      price,
    }
    httpConfig(product, "POST")
    setName('')
    setPrice('')
  }
  //removendo dados
  const handleDelete = (id) =>{
    httpConfig(id, "DELETE")
  }
  return (
    <>
     <h1>Lista de Produtos</h1>
     <ul>
      {items && items.map((product) => ( 
      <li key={product.id}>
        {product.name}- R${product.price}
        <button onClick={()=> handleDelete(product.id)}>X</button> 
      </li> ))}
     </ul>
     <hr />
     <form onSubmit={handleForm}>
      <label >
        nome:
        <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label >
        preço:
        <input type="text" name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <button>send</button>
     </form>
    </>
  )
}

export default App
