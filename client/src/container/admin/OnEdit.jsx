import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import validator from "validator";

import CompleteModal from "../../component/modal/CompleteModal";
import Input from "../../component/input/input";
import Navbar from "../../component/navbar/Navbar";
import Leftbar from "./Leftbar"

const isEmpty = require("is-empty");
const serverURL = require("../../config.js").serverURL;

const OnEdit = (props) => {
    const [data, setData] = useState({});
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [errs_email, setErr_email] = useState("");
    const [modalComplete, setModalComplete] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
    });
    const [modal, setModal] = useState(false);
  
    const toogleModal = () => {
        setModal(!modal);
    };

    const toogleCompleteModal = () => {
        setModalComplete(!modalComplete);
      }
    
    useEffect(() => {
        const data = {
            id: props.match.params.id
        }
        axios
            .post(serverURL + "/checkout/getbyid", data)
            .then(res => {
                setData(res.data[0]);
                setFirstname(res.data[0].firstname);
                setLastname(res.data[0].lastname);
                setEmail(res.data[0].email);
                setAddress(res.data[0].address);
                setCity(res.data[0].city);
                setState(res.data[0].state);
                setCountry(res.data[0].country);
                setZipcode(res.data[0].zipcode);
            })
            .catch(err =>{
              console.log(err);
            });
    }, []);
    
    const handleZipcodeInputKeyDown = e => {
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
    
    const handleZipcodeInputKeyUp = e => {
        // set state of zipcode
        setZipcode(e.target.value);
        setErrors({
            ...errors,
            zipcode: ""
        })
    };
    
    const handleZipcodeInputPaste = e => {
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
        setZipcode(newContent);
    };

    const onBlur = (e) => {
        if ( e.target.name === "email" ) {
          if (!validator.isEmail(e.target.value)) {
            setErr_email("Enter valid Email");
          }
          else {
            setErr_email("");
          }
        }
    }

    const onSave = () => {
        let isSave = true;
        let t_data = data;
        t_data.firstname = firstname;
        t_data.lastname = lastname;
        t_data.email = email;
        t_data.address = address;
        t_data.city = city;
        t_data.state = state;
        t_data.country = country;
        t_data.zipcode = zipcode;
        const errors = { email: "", firstname: "", lastname: "", address: "", city: "", state: "", country: "", zipcode: "" }
        if (isEmpty(t_data.firstname)) {
          errors.firstname = "Firstname is required"
          isSave = false
        }
        if (isEmpty(t_data.lastname)) {
          errors.lastname = "Lastname is required"
          isSave = false
        }
        if (isEmpty(t_data.email)) {
          errors.email = "Email is required"
          isSave = false
        }
        if (isEmpty(t_data.address)) {
          errors.address = "Address is required"
          isSave = false
        }
        if (isEmpty(t_data.city)) {
          errors.city = "City is required"
          isSave = false
        }
        if (isEmpty(t_data.state)) {
          errors.state = "State is required"
          isSave = false
        }
        if (isEmpty(t_data.zipcode)) {
          errors.zipcode = "Zipcode is required"
          isSave = false
        }
        if (isEmpty(t_data.country)) {
          errors.country = "Country is required"
          isSave = false
        }
        if (!isEmpty(errs_email)) {
          isSave = false
        }
        setErrors(errors);
        if (isSave === false) {
          return;
        }
        axios
            .post(serverURL + "/checkout/updateInfo", t_data)
            .then(res => {
                setModalComplete(!modalComplete);
                // console.log("update success");
            })
            .catch(err =>
                console.log(err)
            );
    }

     return (
        <Fragment>
            <div className="overflow-hidden bg__black min-height-100 position-relative">
                <Navbar toogleModal={toogleModal} type="canvas" />
                <CompleteModal toogleModal={toogleCompleteModal} modal={modalComplete} title="Save has been completed" content="Your Save has been completed. Lorem ipsum dolor sit amet, corsectetur adipiscing elit, sed do elusmod tempor incididunt ut et dolore magna aliqua."></CompleteModal>
                <div className="d-lg-flex wrapper__canvas ">
                    <Leftbar activeItem={2}></Leftbar>
                    <div className="content">
                        <div className="container position-relative z-2 mb-4">
                            <div className="d-flex align-items-center">
                                <img
                                src={"../../images/sadas.png"}
                                alt=""
                                />
                                    <Link className="semi-bold font__size--16 text__16-1024 color__white ml-2" to={"/orders/product/" + props.match.params.id}> Back to order detail </Link>
                            </div>
                            <hr className="hr__transparant" />
                            <div className="row align-items-center">
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
                                            value={firstname}
                                            onChange={(e) => {setFirstname(e.target.value); setErrors({...errors, firstname: ""})}}
                                            name="firstname"
                                            />
                                            {
                                            errors.firstname === "" ? "" : <span className="font__size--14 text-red ml-1"> {errors.firstname} </span>
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
                                            value={lastname}
                                            onChange={(e) => {setLastname(e.target.value); setErrors({...errors, lastname: ""})}}
                                            name="lastname"
                                            />
                                            {
                                            errors.lastname === "" ? "" : <span className="font__size--14 text-red ml-1"> {errors.lastname} </span>
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
                                            onBlur={(e) => onBlur(e)}
                                            className="form-control input__checkout semi-bold font__size--14 text__14-1024 color__white"
                                            placeholder="Eg. johndoe@gmail.com"
                                            value={email}
                                            onChange={(e) => {setEmail(e.target.value); setErrors({...errors, email: ""})}}
                                            name="email"
                                        />
                                        {
                                            errs_email === "" ? "" : <span className="font__size--14 text-red ml-1">Invalid Email</span>
                                        }
                                        {
                                            errors.email === "" ? "" : <span className="font__size--14 text-red ml-1"> {errors.email} </span>
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
                                            value={address}
                                            onChange={(e) => {setAddress(e.target.value); setErrors({...errors, address: ""})}}
                                            name="address"
                                            />
                                            {
                                            errors.address === "" ? "" : <span className="font__size--14 text-red ml-1"> {errors.address} </span>
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
                                            value={city}
                                            onChange={(e) => {setCity(e.target.value); setErrors({...errors, city: ""})}}
                                            name="city"
                                            />
                                            {
                                            errors.city === "" ? "" : <span className="font__size--14 text-red ml-1"> {errors.city} </span>
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
                                            value={state}
                                            onChange={(e) => {setState(e.target.value); setErrors({...errors, state: ""})}}
                                            name="state"
                                            />
                                            {
                                                errors.state === "" ? "" : <span className="font__size--14 text-red ml-1"> {errors.state} </span>
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
                                            value={country}
                                            onChange={(e) => {setCountry(e.target.value); setErrors({...errors, country: ""})}}
                                            name="country"
                                            />
                                            {
                                            errors.country === "" ? "" : <span className="font__size--14 text-red ml-1"> {errors.country} </span>
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
                                            onKeyDown={e => handleZipcodeInputKeyDown(e)}
                                            onKeyUp={e => handleZipcodeInputKeyUp(e)}
                                            onPaste={e => handleZipcodeInputPaste(e)}
                                            pattern="\d*"
                                            className="form-control input__checkout semi-bold font__size--14 text__14-1024 color__white"
                                            placeholder="Eg. 82210"
                                            value={zipcode}
                                            name="zipcode"
                                            />
                                            {
                                            errors.zipcode === "" ? "" : <span className="font__size--14 text-red ml-1"> {errors.zipcode} </span>
                                            }
                                        </div>
                                    </div>
                                    <hr className="hr__transparant" />
                                    <div onClick={onSave} className="btn btn__white mt-3 bold font__size--14 text__14-1024 w-40 shadow float-right">
                                        Save Changes
                                    </div>
                                    <div className="btn btn__white mt-3 bold font__size--14 text__14-1024 w-40 shadow float-right mr-4">
                                        Cancel
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, {})(withRouter(OnEdit));