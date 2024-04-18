
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import './Collection.css';
import { Button } from '@mui/material';

function Collection() {
  const [cryptos, setCryptos] = useState(null);
    const navigate=useNavigate();
  useEffect(() => {
    axios.get('http://127.0.0.1:3500/top-cryptos')
      .then(res => setCryptos(res.data))
      .catch(error => console.error('Error in fetching Crypto Data', error));
  }, []);

  function handleRouting(){
    navigate("/nft");
  }

  return (
    <>
  <button onClick={(e)=>handleRouting(e)}>
                MovetoNFTs
              </button>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
       
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell align='right'>Symbol </TableCell>
            <TableCell align="right">Name&nbsp;(g)</TableCell>
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
              <Link to={`/collect/${row.symbol}`}>
                  <img src={row.logo} alt={row.name} width="30px" />
                </Link>
              </TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.total_volume}</TableCell>
              <TableCell align="right">{row.market_cap_usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default Collection;
