import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import './Collection.css'
function Collection() {

    const[cryptos,setCryptos]=useState(null);
   
    useEffect(()=>{

    axios.get('http://127.0.0.1:3500/top-cryptos')
    .then(res=>setCryptos(res.data))
    .catch(error=>console.error('Error in fetcing Crypto Data',error))
    },[])
    console.log("Cryptos",cryptos)

    return (
   
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
                 <TableCell align='right'><img src={row.logo} width="30px" /> </TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.total_volume}</TableCell>
              <TableCell align="right">{row.market_cap_usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
    )
}

export default Collection;


/*

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const cryptos = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cryptos.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
*/