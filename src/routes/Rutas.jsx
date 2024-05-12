import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Favoritos from '../views/Favoritos'
import Flags from '../views/Flags'

const Rutas = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Flags/>}>
                <Route path='/favourites' element={<Favoritos/>}/>  
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Rutas