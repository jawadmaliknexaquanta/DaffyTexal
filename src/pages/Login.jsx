import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Web3 from 'web3';


function Login() {
    const [isConnected, setIsConnected] = useState(false);
    const [ethBalance, setEthBalance] = useState();
    const [account, setAccount] = useState("");
    const navigate=useNavigate();
    const detectCurrentProvider = () => {
      let provider;
      if (window.ethereum) {
        provider = window.ethereum;
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else {
        console.log("Non-ethereum browser detected. You should install Metamask");
      }
      return provider;
    };
  
    const onConnect = async () => {
      try {
        const currentProvider = detectCurrentProvider();
        if (currentProvider) {
          await currentProvider.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(currentProvider);
          const userAccounts = await web3.eth.getAccounts();
          const userAccount = userAccounts[0];
          console.log("Account", userAccount);
          setAccount(userAccount);
  
          const ethBal = await web3.eth.getBalance(userAccount);
          console.log("Balance", typeof(userAccount));
          setEthBalance(ethBal.toString());
  
          setIsConnected(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const onDisconnect = () => {
      setIsConnected(false);
      setAccount("");
      setEthBalance("");
    };

    function handleCollections(e){
        e.preventDefault();
        console.log("clicked")
        navigate('/collect')
       }
  
    return (
      <div className="app">
     
        <div className="app-header">
          <h1>React dApp authentication with React, Web3.js, and Metamask</h1>
        </div>
        <div className="app-wrapper">
          {!isConnected && (
            <div>
              <button className="app-button__login" onClick={onConnect}>
                Login
              </button>
            </div>
          )}
        </div>
        {isConnected && (
          
          <div className="app-wrapper">
            <div className="app-details">
              <h2>You are connected to Metamask.</h2>
              <div className="app-balance">
             
              </div>
              <div className='app-account'>
        
              </div>
            </div>
            <div>
              <button className="app-buttons__logout" onClick={onDisconnect}>
                Disconnect
              </button>
              <button onClick={(e)=>handleCollections(e)}>
                Collections
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default Login;