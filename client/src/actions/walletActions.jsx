import Web3 from "web3";
import { CONNECT_WALLET } from "./types";

export const connectWallet = () => dispatch => {
    if (typeof window.web3 !== 'undefined') {
        // Use existing gateway
        window.web3 = new Web3(window.ethereum);

    } else {
        alert("No Ethereum interface injected into browser. Read-only access");
        return;
    }
    window.ethereum.enable()
    .then(function (accounts) {
        window.web3.eth.net.getNetworkType()
        // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
        .then((network) => {
            if(network !== "main"){   
                alert("You are on " + network+ " network. Change network to mainnet or you won't be able to do anything here")
                return;
            }
            dispatch({
                type: CONNECT_WALLET,
                payload: accounts[0], 
                netType: network
            })
        }).catch(function (err) {
            console.log(err)
        });
    })
    .catch(function (error) {
      // Handle error. Likely the user rejected the login
      console.error(error)
    })
  };

  export const disconnectWallet = () => dispatch => {
    dispatch({
        type: CONNECT_WALLET,
        payload: "",
    })
  };