import React, { Component } from "react";
import CampaignContract from "./contracts/Campaign.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import "../node_modules/jquery/dist/jquery.min";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";

import famine from "./tucker-tangeman-9aAr_EFqYdc-unsplash.jpg";

class App extends Component {
  state = { ready: false, funds : null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.deployedNetwork = CampaignContract.networks[this.networkId];
      
      this.instance = new this.web3.eth.Contract(
        CampaignContract.abi,
        this.deployedNetwork && this.deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ ready : true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  inputChange = (event) => {
    const target = event.target;
    this.setState({
      funds : target.value
    });
  }

  contribute = async() => {
    var funds = this.state.funds.toString();

     await this.instance.methods.donate().send({from: this.accounts[0] , value: this.web3.utils.toWei(funds, 'finney')});
  }
  

  render() {
    if (!this.state.ready) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
       <div className="bg-white">
       <h1>Donate for famine in Africa</h1>
        <img src={famine} className="image"/>
        <br/><br/>
        <p>“To fight famine feed their needs. To fight frustration feed their wants.”</p>
        <small>― Stephen Inoue </small><br/>
        <label for="value">Value (in finney or milli (1 ether = 1000 finney))</label>
        <input id="value" value={this.state.funds} onChange={this.inputChange}/>
        <br/>
        <button className="btn btn-primary px-5 mb-5" onClick={this.contribute}>Contribute</button>
       </div>
      </div>
    );
  }
}

export default App;
