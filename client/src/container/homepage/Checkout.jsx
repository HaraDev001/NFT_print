import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { ABI, contractAddress } from "../../config.json";
import validator from "validator";
import SweetAlert from 'sweetalert2-react';

import Navbar from "../../component/navbar/Navbar";
import Connect from "../../component/modal/Connect";
import CompleteModal from "../../component/modal/CompleteModal";
import Input from "../../component/input/input";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
require('dotenv').config()
const axios = require("axios").default;
const serverURL = require("../../config.js").serverURL;
const isEmpty = require("is-empty");

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal_complete: false,
      arts: [],
      count: 1,
      price: 0.0205,
      cost: 0.0205,
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      alertShow: false,
      nft_name: "",
      nft_creator: "",
      errs_email: "",
      isAgree: false,
      errors: {
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
      }
    };
  }

  countCounterPlus = () => {
    this.setState({
      count: this.state.count + 1,
      cost: (this.state.price * (this.state.count + 1)).toFixed(3)
    })
  };

  countCounterMin = () => {
    if (this.state.count > 1) {
      this.setState({
        count: this.state.count - 1,
        cost: ( this.state.price * (this.state.count - 1) ).toFixed(3)
      })
    }
  };

  toogleModal = () => {
    this.setState({
      modal: !this.state.modal,
      arts: [],
    });
  };

  componentDidMount() {
    this.getArts();
  }

  getArts = async () => {
    let arts_temp = [];
    let res = {};
    let step = 50;
    let i = 0
    do {
      try {
        res = await axios.request({
          method: 'GET',
          // owner=${walletAddress}&
          // asset_contract_address=${contractAddress}&
          url: `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${i * step}&limit=${(i+1) * step}&owner=${this.props.wallet.walletAddress}`
        })
        arts_temp = arts_temp.concat(res.data.assets);
        i++;
      } catch(e) {
        console.log(e)
        continue;
      }
    } while(res.data.assets.length === 50);
    this.setState({
      arts: arts_temp
    });
  }

  toogleCompleteModal = () => {
    this.setState({
      modal_complete: !this.state.modal_complete
    })
  }

  onPay = async () => {
    let isPay = true;
    const data = {
      image_url: this.state.arts[this.props.match.params.id].image_thumbnail_url,
      count: this.state.count,
      size: this.props.match.params.size,
      pay: this.state.cost,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipcode: this.state.zipcode,
    }
    const errors = { email: "", firstname: "", lastname: "", address: "", city: "", state: "", country: "", zipcode: "" }
    if (isEmpty(data.firstname)) {
      errors.firstname = "Firstname is required"
      isPay = false
    }
    if (isEmpty(data.lastname)) {
      errors.lastname = "Lastname is required"
      isPay = false
    }
    if (isEmpty(data.email)) {
      errors.email = "Email is required"
      isPay = false
    }
    if (isEmpty(data.address)) {
      errors.address = "Address is required"
      isPay = false
    }
    if (isEmpty(data.city)) {
      errors.city = "City is required"
      isPay = false
    }
    if (isEmpty(data.state)) {
      errors.state = "State is required"
      isPay = false
    }
    if (isEmpty(data.zipcode)) {
      errors.zipcode = "Zipcode is required"
      isPay = false
    }
    if (isEmpty(data.country)) {
      errors.country = "Country is required"
      isPay = false
    }
    if (!isEmpty(this.state.errs_email)) {
      isPay = false
    }
    this.setState({errors: errors})
    if (isPay === false) {
      return;
    }
    
    // data.transactionLink = "https://ropsten.etherscan.io/tx/0x77ca12cdb1222d2dc68cb601f4c34b552eb2f57d9ef9d30448c3d93899a5717e";
    // data.price = parseFloat(data.pay ) * 4000;
    // data.nft_name = this.state.arts[this.props.match.params.id].name;
    // data.nft_creator = this.state.arts[this.props.match.params.id].creator.user.username;
    // axios
    //   .post(serverURL + "/checkout/saveInfo", data)
    //   .then(res => {
    //     // console.log(res.data)
    //   })
    //   .catch(err =>
    //     console.log(err)
    //  );
    // return;
    const payContract = new window.web3.eth.Contract(ABI, contractAddress)
    const amountToSend = window.web3.utils.toWei(this.state.cost.toString(), "ether")
    try {
        const pay = await payContract.methods.pay(process.env.REACT_APP_OWNER_CONTACT).send({from: this.props.wallet.walletAddress, value: amountToSend});
        this.toogleCompleteModal();
        data.transactionLink = "https://" + this.props.wallet.netType + ".etherscan.io/tx/" + pay.transactionHash;
        data.price = parseFloat(data.pay ) * 4000;
        data.nft_name = this.state.arts[this.props.match.params.id].name;
        data.nft_creator = this.state.arts[this.props.match.params.id].creator.user.username;
        axios
          .post(serverURL + "/checkout/saveInfo", data)
          .then(res => {
            // console.log(res.data)
          })
          .catch(err =>
            console.log(err)
         );
    } catch(e) {
        console.log(e)
    }
    return true;
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
      errors:{
        ...this.state.errors,
        [e.target.name]: "",
      },
    })
  }

  onBlur = (e) => {
    if ( e.target.name === "email" ) {
      if (!validator.isEmail(e.target.value)) {
        this.setState({
          errs_email: "Enter valid Email"
        })
      }
      else {
        this.setState({
          errs_email: ""
        })
      }
    }
  }

  onCheck = () => {
    this.setState({
      isAgree : !this.state.isAgree
    });
  }

  handleZipcodeInputKeyDown = e => {
    // this is called as soon as we get input from the user
    // we don't want to allow them the access to input past 5 digits
    // so we block on keyDown
    // (it never gets to keyUp, which actually updates the state)

    // restrict to 5 digits only
    // but allow backspace and arrow
    var key = e.which ? e.which : e.keyCode;
    if ( e.target.value.length >= 5 && key !== 8 && key !== 46 && key !== 37 && key !== 39) {
      e.preventDefault();
    }
    if ( (key >= 48 && key <= 59) || (key >= 96 && key <= 105) ) {
    }
    else if ( key !== 8 && key !== 46 && key !== 37 && key !== 39) {
      e.preventDefault();
    }
  };

  handleZipcodeInputKeyUp = e => {
    // set state of zipcode
    this.setState({
      zipcode: e.target.value,
      errors:{
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };

  handleZipcodeInputPaste = e => {
    // test value: 123as8aa2129
    e.preventDefault();

    // get pasted content
    let pasteText = e.clipboardData.getData("text/plain");
    // only allow integers
    pasteText = pasteText.replace(/[^0-9]/g, "");
    // add to current input value (target)
    let newContent = e.target.value + pasteText;
    // only allow 5 digits total
    newContent = newContent.substring(0, 5);
    // set new value of input
    e.target.value = newContent;
    // set new state of zipcode
    this.setState({
      zipCode: newContent
    });
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>NFT PRINT</title>
          <meta name="title" content="NFT PRINT" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="NFT PRINT" />
        </Helmet>

        <div className="overflow-hidden bg__black min-height-100 position-relative">
          <Connect toogleModal={this.toogleModal} modal={this.state.modal} />
          <CompleteModal toogleModal={this.toogleCompleteModal} modal={this.state.modal_complete} title="Order has been completed" content="Your order has been completed. Lorem ipsum dolor sit amet, corsectetur adipiscing elit, sed do elusmod tempor incididunt ut et dolore magna aliqua."></CompleteModal>
          <Navbar toogleModal={this.toogleModal} />
          <img
            src={"../../images/Group 16.png"}
            className="path__1"
            alt=""
          />
          {
            this.state.arts.length === 0 ? 
            
            <div className="d-lg-flex container wrapper__canvas load-position">
              <Loader
                type="Rings"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={5000} 
              />
            </div>
            :
            <div className="container position-relative z-2 mb-4">
              <div className="d-flex align-items-center">
                <img
                  src={"../../images/sadas.png"}
                  alt=""
                />
                <Link className="semi-bold font__size--16 text__16-1024 color__white ml-2" to="/canvas"> Go Back </Link>
              </div>
              <hr className="hr__transparant" />
              <div className="row">
                <div className="col-lg-6 mb-4 mb-lg-0">
                  <h3 className="semi-bold color__white font__size--24 text__24-1024 mb-4">
                    Checkout
                  </h3>
                  {/* ------------------------------- Check out start -------------------------------*/}
                  <div className="wrapper__item-nft mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img
                          src={this.state.arts[this.props.match.params.id].image_thumbnail_url}
                          alt=""
                          className="preview"
                        />
                        <div className="ml-3">
                          <h5 className="color__white font__size--20 text__20-1024 lh-2 bold">
                            NFT Canvas: { this.props.match.params.size }
                          </h5>
                          <p className="m-0 normal font__size--16 text__16-1024 color__white opacity__4">
                            { this.state.arts[this.props.match.params.id].name }
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <h5 className="semi-bold font__size--20 text__20-1024 d-none d-sm-block color__white m-0">
                          QTY:{" "}
                        </h5>
                        <div className="wrapper__count-item d-flex align-items-center ml-3">
                          <div
                            className="point pointer flex-shrink-0"
                            onClick={() => this.countCounterMin()}
                          >
                            <img src={"../../images/sfddss.png"} alt="" />
                          </div>
                          <div className="semi-bold font__size--20 text__20-1024 color__white mx-3">
                            {this.state.count}
                          </div>
                          <div
                            className="point pointer flex-shrink-0"
                            onClick={() => this.countCounterPlus()}
                          >
                            <img src={"../../images/sadsadsad.png"} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <h5 className="m-0 normal color__white font__size--16 text__16-1024">
                        { this.state.price } ETH x { this.state.count}
                      </h5>
                      <h5 className="m-0 normal color__white font__size--16 text__16-1024">
                        { this.state.cost } ETH
                      </h5>
                    </div>
                  </div>
                  {/* ------------------------------- Check out end-------------------------------*/}
                  <hr className="hr__transparant" />
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="m-0 normal color__white font__size--16 text__16-1024">
                      You will pay
                    </h5>
                    <h5 className="m-0 bold color__green font__size--24 text__24-1024">
                      { this.state.cost }ETH
                    </h5>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="wrapper__form-checkout">
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label
                          htmlFor=""
                          className="semi-bold font__size--14 text__14-1024 color__white mb-2"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control input__checkout semi-bold font__size--14 text__14-1024 color__white"
                          placeholder="Eg. John"
                          value={this.state.firstname}
                          onChange={(e) => this.onChange(e)}
                          name="firstname"
                        />
                        {
                          this.state.errors.firstname === "" ? "" : <span className="font__size--14 text-red ml-1"> {this.state.errors.firstname} </span>
                        }
                      </div>
                      <div className="form-group col-sm-6">
                        <label
                          htmlFor=""
                          className="semi-bold font__size--14 text__14-1024 color__white mb-2"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control input__checkout semi-bold font__size--14 text__14-1024 color__white"
                          placeholder="Eg.Doe"
                          value={this.state.lastname}
                          onChange={(e) => this.onChange(e)}
                          name="lastname"
                        />
                        {
                          this.state.errors.lastname === "" ? "" : <span className="font__size--14 text-red ml-1"> {this.state.errors.lastname} </span>
                        }
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor=""
                        className="semi-bold font__size--14 text__14-1024 color__white mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        onBlur={(e) => this.onBlur(e)}
                        className="form-control input__checkout semi-bold font__size--14 text__14-1024 color__white"
                        placeholder="Eg. johndoe@gmail.com"
                        value={this.state.email}
                        onChange={(e) => this.onChange(e)}
                        name="email"
                      />
                      {
                        this.state.errs_email === "" ? "" : <span className="font__size--14 text-red ml-1">Invalid Email</span>
                      }
                      {
                        this.state.errors.email === "" ? "" : <span className="font__size--14 text-red ml-1"> {this.state.errors.email} </span>
                      }
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-8">
                        <label
                          htmlFor=""
                          className="semi-bold font__size--14 text__14-1024 color__white mb-2"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control input__checkout semi-bold font__size--14 text__14-1024 color__white"
                          placeholder="Eg. 12210 NFT Street"
                          value={this.state.address}
                          onChange={(e) => this.onChange(e)}
                          name="address"
                        />
                        {
                          this.state.errors.address === "" ? "" : <span className="font__size--14 text-red ml-1"> {this.state.errors.address} </span>
                        }
                      </div>
                      <div className="form-group col-sm-4">
                        <label
                          htmlFor=""
                          className="semi-bold font__size--14 text__14-1024 color__white mb-2"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control input__checkout semi-bold font__size--14 text__14-1024 color__white"
                          placeholder="Eg. San Diego"
                          value={this.state.city}
                          onChange={(e) => this.onChange(e)}
                          name="city"
                        />
                        {
                          this.state.errors.city === "" ? "" : <span className="font__size--14 text-red ml-1"> {this.state.errors.city} </span>
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-4">
                        <label
                          htmlFor=""
                          className="semi-bold font__size--14 text__14-1024 color__white mb-2"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          className="form-control input__checkout semi-bold font__size--14 text__14-1024 color__white"
                          placeholder="Eg. California"
                          value={this.state.state}
                          onChange={(e) => this.onChange(e)}
                          name="state"
                        />
                        {
                          this.state.errors.state === "" ? "" : <span className="font__size--14 text-red ml-1"> {this.state.errors.state} </span>
                        }
                      </div>
                      <div className="form-group col-sm-4">
                        <label
                          htmlFor=""
                          className="semi-bold font__size--14 text__14-1024 color__white mb-2"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          className="form-control input__checkout semi-bold font__size--14 text__14-1024 color__white"
                          placeholder="Eg. United States"
                          value={this.state.country}
                          onChange={(e) => this.onChange(e)}
                          name="country"
                        />
                        {
                          this.state.errors.country === "" ? "" : <span className="font__size--14 text-red ml-1"> {this.state.errors.country} </span>
                        }
                      </div>
                      <div className="form-group col-sm-4">
                        <label
                          htmlFor=""
                          className="semi-bold font__size--14 text__14-1024 color__white mb-2"
                        >
                          Zip Code
                        </label>
                        <Input
                          inputmode="numeric"
                          onKeyDown={e => this.handleZipcodeInputKeyDown(e)}
                          onKeyUp={e => this.handleZipcodeInputKeyUp(e)}
                          onPaste={e => this.handleZipcodeInputPaste(e)}
                          pattern="\d*"
                          className="form-control input__checkout semi-bold font__size--14 text__14-1024 color__white"
                          placeholder="Eg. 82210"
                          value={this.state.zipcode}
                          name="zipcode"
                        />
                        {
                          this.state.errors.zipcode === "" ? "" : <span className="font__size--14 text-red ml-1"> {this.state.errors.zipcode} </span>
                        }
                      </div>
                    </div>
                    <div className="position-relative wrapper__box-terms d-flex align-items-center">
                      <input type="checkbox" id="terms" name="terms" onClick={this.onCheck}/>
                      <label htmlFor="terms" className="box mr-2 mb-0"></label>
                      <label
                        htmlFor="terms"
                        className="semi-bold font__size--14 text__14-1024 color__white m-0"
                      >
                        I agree to the{" "}
                        <a href="#!" className="color__blue">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                    {
                      this.state.isAgree === false ? (
                        <button onClick={this.onPay} className="btn btn__white mt-3 bold font__size--14 text__14-1024 w-100 shadow" disabled>
                          Pay
                        </button>
                      ) : (
                        <button onClick={this.onPay} className="btn btn__white mt-3 bold font__size--14 text__14-1024 w-100 shadow">
                          Pay
                        </button>
                      )
                    }
                    
                  </div>
                </div>
              </div>
              <SweetAlert
                show={this.state.alertShow}
                title="Error: Invalid Email"
                onConfirm={() => this.setState({ alertShow: false })}
              />
            </div>
          }
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, {})(withRouter(Checkout));