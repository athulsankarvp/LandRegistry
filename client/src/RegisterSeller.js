import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FormFile,FormGroup, FormControl, Button, Spinner } from 'react-bootstrap'
import LandContract from "./artifacts/Land.json"
import getWeb3 from "./getWeb3"
import ipfs from './ipfs';
import {Buffer} from 'buffer';

class RegisterSeller extends Component {
    constructor(props) {
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            name: '',
            age: '',
            aadharNumber: '',
            panNumber: '',
            landsOwned: '',
            isVerified: false,
            buffer: null,
            document: '',
        }
        this.captureDoc = this.captureDoc.bind(this);
        this.addDoc = this.addDoc.bind(this);
    }

    componentDidMount = async () => {
        //For refreshing page only once
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        try {
            //Get network provider and web3 instance
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LandContract.networks[networkId];
            const instance = new web3.eth.Contract(
                LandContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });


        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract.`,
            );
            console.error(error);
        }
    };

    //IPFS document upload 
    addDoc = async () => {
        await ipfs.add(this.state.buffer, (error, result) => {
            if (error) {
                console.log(error);
            }
            else{
                console.log('IPFS upload success');
            }
            // alert(result[0].hash)
            this.setState({ document: result[0].hash });
            console.log('document:', this.state.document);
        })
    }
    //Seller Registration
    RegisterSeller = async () => {
        this.addDoc();
        await new Promise(resolve => setTimeout(resolve, 10000));
        if (this.state.name == '' || this.state.age == '' || this.state.aadharNumber == '' || this.state.panNumber == '' || this.state.landsOwned == '') {
            alert("All the fields are compulsory!");
        } else if (!Number(this.state.aadharNumber) || this.state.aadharNumber.length != 12) {
            alert("Aadhar Number should be 12 digits long!");
        } else if (this.state.panNumber.length != 10) {
            alert("Pan Number should be a 10 digit unique number!");
        } else if (!Number(this.state.age) || this.state.age < 21) {
            alert("Your age must be a number");
        } else {
            await this.state.LandInstance.methods.registerSeller(
                this.state.name,
                this.state.age,
                this.state.aadharNumber,
                this.state.panNumber,
                this.state.landsOwned, 
                this.state.document)
                .send({
                    from: this.state.account,
                    gas: 2100000
                }).then(response => {
                    alert("Registration Successfull");
                    this.props.history.push("/");
                    // window.location.replace ("/");
                });

            //Reload
            window.location.reload(false);
        }
    }

    updateName = event => (
        this.setState({ name: event.target.value })
    )
    updateAge = event => (
        this.setState({ age: event.target.value })
    )
    updateAadhar = event => (
        this.setState({ aadharNumber: event.target.value })
    )
    updatePan = event => (
        this.setState({ panNumber: event.target.value })
    )
    updateOwnedLands = event => (
        this.setState({ landsOwned: event.target.value })
    )
    captureDoc(event) {
        event.preventDefault()
        const files = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(files)
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
        }
        console.log('Capture Document')
      }

    render() {
        if (!this.state.web3) {
            return (
                <div className="bodyC">
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <div>
                                <div>
                                    <h1>
                                        <Spinner animation="border" variant="success" />
                                    </h1>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            );
        }

            return (
                <div className="bodyC">
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <div className="App">
    
                                <div>
                                    <div>
                                        <h1 style={{ color: "black", textAlign:"center"}}>
                                            Seller Registration
                                        </h1>
                                    </div>
                                </div>

                            <div className="form">
                                <FormGroup>
                                    <div className="form-label">
                                        Enter Name --
                      </div>
                                    <div className="form-input">
                                        <FormControl
                                            input='text'
                                            value={this.state.name}
                                            onChange={this.updateName}
                                        />
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <div className="form-label">
                                        Enter Age --
                      </div>
                                    <div className="form-input">
                                        <FormControl
                                            input='text'
                                            value={this.state.age}
                                            onChange={this.updateAge}
                                        />
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <div className="form-label">
                                        Enter Aadhar No --
                      </div>
                                    <div className="form-input">
                                        <FormControl
                                            input='text'
                                            value={this.state.aadharNumber}
                                            onChange={this.updateAadhar}
                                        />
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <div className="form-label">
                                        Enter Pan no --
                      </div>
                                    <div className="form-input">
                                        <FormControl
                                            input='text'
                                            value={this.state.panNumber}
                                            onChange={this.updatePan}
                                        />
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <div className="form-label">
                                        Enter Owned Lands --
                      </div>
                                    <div className="form-input">
                                        <FormControl
                                            input='text'
                                            value={this.state.landsOwned}
                                            onChange={this.updateOwnedLands}
                                        />
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label>Add your Aadhar Card (PDF Format)</label>
                                    <FormFile
                                        id="File2"
                                        onChange={this.captureDoc}
                                    />
                                </FormGroup>

                                <Button onClick={this.RegisterSeller} className="btn-primary" style={{margin:"10px 0px 0px 0px" }}>
                                    Register Seller
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default RegisterSeller;