import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Collection from './pages/Collection';
import Nfts from './pages/Nfts';
import CardDetail from './pages/CardDetail';
import Login from './pages/Login';
import NFTCardDetail from './pages/CardDetailN';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nft" element={<Nfts />} />
        <Route path='/collect' element={<Collection />} />
        <Route path='/collect/:symbol' element={<CardDetail />} />
        <Route path='/nft/:rank' element={<NFTCardDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
