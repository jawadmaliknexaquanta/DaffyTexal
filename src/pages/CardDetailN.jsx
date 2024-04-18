import React, { useState, useEffect } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CardDetail.css'

function NFTCardDetail() {
  const { rank } = useParams();
  const [crypto, setCrypto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:3500/top-collections/${rank}`)
      .then(res => setCrypto(res.data))
      .catch(error => console.error('Error fetching crypto data:', error));
  }, [rank]);

  

  function handleBack(e){
   e.preventDefault();
   console.log("clicked")
   navigate('/nft')
  }

  return (
    <div className='Card-container'>
      <h2>Token Detail </h2>
      {crypto && (
        <div>
          <img src={crypto.collection_image} alt={crypto.name} wrankth="100px" />
          <div className='collecttab'>
          <p>Name:{crypto.collection_title}</p>
          <p>USD MarketCap: {crypto.market_cap_usd}</p>

          <button>Buy Now</button>

          <button onClick={(e)=>{handleBack(e)}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NFTCardDetail;
