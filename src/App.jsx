import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Collection from './pages/Collection'
import Nfts from './pages/Nfts'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Collection />} />
      <Route path="/nft" element={<Nfts />} />
    </Routes>
    </>
  )
}

export default App
