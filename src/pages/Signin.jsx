import { useNavigate } from "react-router-dom";

import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    try{

    
    if (isConnected) {
      await disconnectAsync();
    }
    // enabling the web3 provider metamask
    const { account } = await connectAsync({
      connector: new injected(),
    });

    console.log("Account",account);

    const userData = { address: account?account:"0x69fb6a3a4a59231af4affdbcff8416ad2ca82d89", chain: 1 };
    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post(
      `http://localhost:3500/request-message`,
      userData,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const message = data.message;
    // signing the received message via metamask
    const signature = await signMessageAsync({ message });

    await axios.post(
      `http://localhost:3500/verify`,
      {
        message,
        signature,
      },
      { withCredentials: true } // set cookie from Express server
    );

    // redirect to /user
    navigate("/user");
}catch(err){
    console.error("Error connecting to Web3 provider:", err);

}
  };

  return (
    <div>
      <h3>Web3 Authentication</h3>
      <button onClick={() => handleAuth()}>Authenticate via MetaMask</button>
    </div>
  );
}