import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from "react-bootstrap";
import LandContract from "./artifacts/Land.json";
import getWeb3 from "./getWeb3";
import './index.css';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            role: null,
            redirect: null,
            landInspector: '',
            seller: '',
            buyer: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount = async () => {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        try {
            //Get network provider and web3 instance
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();

            const networkId = await web3.eth.net.getId();
            console.log("Network ID ", networkId)
            const deployedNetwork = LandContract.networks[networkId];

            console.log("Deployed network address ", deployedNetwork)

            const instance = new web3.eth.Contract(
                LandContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            const currentAddress = await web3.currentProvider.selectedAddress;
            console.log("Current address :- ", currentAddress);
            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
            var seller = await this.state.LandInstance.methods.isSeller(currentAddress).call();
            console.log(seller);
            this.setState({ seller: seller });
            var buyer = await this.state.LandInstance.methods.isBuyer(currentAddress).call();
            console.log(buyer);
            this.setState({ buyer: buyer });
            var landInspector = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            console.log(landInspector);
            this.setState({ landInspector: landInspector });

        } catch (error) {
            alert(
                error,
            );
            console.error(error);
        }
    };

    handleInputChange(event) {
        this.setState({
            role: event.target.value,
            redirect: "/Register" + event.target.value
        });
    }
    submit() {
        this.props.history.push(this.state.redirect);
        window.location.reload(false);

    }

    render() {
        if (this.state.seller || this.state.buyer || this.state.landInspector) {
            return (
                <div className="bodyC">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Button href="/Seller/SellerDashboard" className="btn-primary" hidden={!this.state.seller}>Seller Dashboard</Button>
                        <Button href="/admin/dashboard" className="btn-secondary" hidden={!this.state.buyer}>Buyer Dashboard</Button>
                        <Button href="/LI/LIdashboard"className="btn-info"  hidden={!this.state.landInspector}>Land Inspector Dashboard</Button>
                    </div>
                </div>
                </div>
            );
        }

        return (
            <div className= "bodyC">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    {/* <div class="form-group" style={{ color: "black" }}>
                    <label class="control-label" for="Company" style={{ fontSize: "18px", padding: "2px" }}> </label>
                    <select id="Company" class="form-control" name="Company" onChange={this.handleInputChange}>
                        <option selected="true" disabled="disabled">Select Role</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                    </select>
                    </div>
                    <div>
                        <Button onClick={() => this.submit()} className="btn-primary" style={{ marginBottom: "10px", marginTop: "10px" }}>Register</Button>
                    </div> */}
                    <h1 style={{fontSize:"30px", padding:"10px 10px 10px 10px", textAlign:"center"}}>Select Role</h1>
                        <Button href="/RegisterBuyer" className="btn-warning" style={{float:"left", padding: "15px 40px 15px 40px", margin: "0px 20px 0px 40px"}}>Buyer</Button>
                        <Button href="/RegisterSeller" className="btn-warning" style={{float:"right", padding: "15px 40px 15px 40px", margin: "0px 40px 0px 0px"}}>Seller</Button>
                </div>
            </div>
            </div>
        );
    }
}