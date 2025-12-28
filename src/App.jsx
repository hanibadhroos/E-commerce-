import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'
import './Style.css'
import { CartProvider } from './context/CartContext'
import Cart from './Pages/Cart'
import { FavoriteProvider } from './context/FavoritesContext'
import Favorites from './Pages/Favorites'
import { SearchProvider } from './context/SearchContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {path: "/", element: <Home/>},
      {path: "/product/:id", element: <ProductDetails/>},
      {path: "/cart", element: <Cart/>},
      {path:"/favorites", element: <Favorites/>}
    ]
  }
])
export default function App(){
  return(
    <CartProvider>
      <FavoriteProvider>
        <SearchProvider>
          <RouterProvider router={router}/>
        </SearchProvider>
      </FavoriteProvider>
    </CartProvider>
  )
}
