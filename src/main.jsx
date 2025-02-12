import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout.jsx'
import { fetchProductsLoader as productLoader } from "./Components/fetchProductsLoader.jsx"
import Home from './Components/Home.jsx'
import Cart from './Components/Cart.jsx'
import ErrorPage from './Components/ErrorPage.jsx'
import Page404 from './Components/Page404.jsx'
import MobileGrid from './Components/MobileGrid.jsx'
import ProductPage from './Components/ProductPage.jsx'

let routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: productLoader,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "products",
        loader: function () {
          if(window.innerHeight >= 1024) {
            return redirect("/")
          }
          return null
        },
        element: <MobileGrid/>
      },{
        path: "product/:productID",
        element: <ProductPage/>
      }
    ]
  },
  {
    path: "*",
    element: <Page404 />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
)
