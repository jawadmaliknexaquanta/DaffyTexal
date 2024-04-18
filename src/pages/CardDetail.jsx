import React, { useState, useEffect } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CardDetail.css'

function CardDetail() {
  const { symbol } = useParams();
  const [crypto, setCrypto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:3500/top-cryptos/${symbol}`)
      .then(res => setCrypto(res.data))
      .catch(error => console.error('Error fetching crypto data:', error));
  }, [symbol]);

  

  function handleBack(e){
   e.preventDefault();
   console.log("clicked")
   navigate('/collect')
  }

  return (
    <div className='Card-container'>
      <h2>Coin Detail </h2>
      {crypto && (
        <div>
          <img src={crypto.logo} alt={crypto.name} wsymbolth="100px" />
          <div className='collecttab'>
          <p>Name:{crypto.name}</p>
          <p>USD Price ATH: {crypto.usd_price_ath}</p>

          <button>Buy Now</button>

          <button onClick={(e)=>{handleBack(e)}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardDetail;
