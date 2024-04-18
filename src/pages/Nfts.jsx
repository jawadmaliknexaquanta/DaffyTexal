import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import { Link, useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import './Collection.css'
function Nfts() {

    const[cryptos,setCryptos]=useState(null);
   const navigate=useNavigate();
    useEffect(()=>{

    axios.get('http://127.0.0.1:3500/top-collections')
    .then(res=>setCryptos(res.data))
    .catch(error=>console.error('Error in fetcing Crypto Data',error))
    },[])
    console.log("Cryptos",cryptos)

    function handleRouting(){
      navigate("/collect");
    }
  return (
    <div>

<button type="button" onClick={(e)=>handleRouting(e)}>
        Goto Collect
      </button>
          <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell align='right'>Title </TableCell>

            <TableCell align="right">Price&nbsp;(g)</TableCell>
            <TableCell align="right">Total Volume&nbsp;(g)</TableCell>
            <TableCell align="right">Market Cap&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cryptos?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                 <TableCell align='right'>
                 <Link to={`/nft/${row.rank}`}>
                  <img src={row.collection_image} alt={row.name} width="30px" />
                </Link>      </TableCell>

              <TableCell align="right">{row.collection_title}</TableCell>
              <TableCell align="right">{row.floor_price_usd}</TableCell>
              <TableCell align="right">{row.volume_usd}</TableCell>
              <TableCell align="right">{row.market_cap_usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
    </div>
  )
}

export default Nfts
