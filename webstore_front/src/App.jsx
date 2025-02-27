import { useState } from 'react'
import "./App.css";
import { BrowserRouter } from 'react-router-dom'
import BasicRoute from './routes/BasicRoute'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ShoppingProvider } from './context/ShoppingContext';
function App() {
  const [count, setCount] = useState(0)

  return (
      <ShoppingProvider>
          <BrowserRouter>
              <BasicRoute />
          </BrowserRouter>
      </ShoppingProvider>
    
  )
}

export default App
