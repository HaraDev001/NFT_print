import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Navbar from "../../component/navbar/Navbar";
import Leftbar from "./Leftbar"
import { getDayFormatFrom } from "./RevenueFunc";

const serverURL = require("../../config.js").serverURL;

const Product = (props) => {
    const [modal, setModal] = useState(false);
    const [art, setArt] = useState({});
  
    const toogleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        const data = {
            id: props.match.params.id
        }
        axios
            .post(serverURL + "/checkout/getbyid", data)
            .then(res => {
                setArt(res.data[0]);
            })
            .catch(err =>{
              console.log(err);
            });
    }, []);

     return (
        <Fragment>
            <div className="overflow-hidden bg__black min-height-100 position-relative">
                <Navbar toogleModal={toogleModal} type="canvas" />
                <div className="d-lg-flex wrapper__canvas ">
                <Leftbar activeItem={2}></Leftbar>
                    <div className="content">
                        <div className="container position-relative z-2 mb-4">
                            <div className="d-flex align-items-center">
                                <img
                                src={"../../images/sadas.png"}
                                alt=""
                                />
                                <Link className="semi-bold font__size--16 text__16-1024 color__white ml-2" to="/orders"> orders </Link>
                            </div>
                            <hr className="hr__transparant" />
                            <div className="row">
                                <div className="overflow-hidden mr-3" style={{width: "200px"}}>
                                    <label className="text-white ml-3 font__size--28 text-center show_oneline" >#{ art._id }&nbsp;
                                    </label>
                                </div>
                                <p className="text-grey">Date:&nbsp;</p> <p className="text-white">&nbsp;{ getDayFormatFrom(new Date(art.date)) } EDT</p>
                            </div>
                            <div className="row mt-2">
                                {/* ------------------------------------------------ Product start------------------------------------------------ */}
                                <div className="col-lg-8 mb-2">
                                    <div className="wrapper__form-checkout">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label className="text-white font__size--24">Product&nbsp;</label>
                                                <select className="float-right">
                                                    <option value="volvo">Unfulfilled</option>
                                                    <option value="saab">Fulfilled</option>
                                                </select>
                                                <p className="text-grey font__size--14 float-right">Fulfillment status:&nbsp;</p>
                                            </div>
                                        </div>
                                        <div className="row d-flex align-items-center mb-4 mt-2">
                                            <div className="col-md-6 d-flex align-items-center">
                                                <img
                                                    src={art.image_url}
                                                    alt=""
                                                    className="preview__img rounded"
                                                />
                                                <div className="ml-3 align-items-center">
                                                    <span className="color__white font__size--16 text__20-1024 lh-2 bold">
                                                        NFT Canvas: 12 * 12
                                                    </span>
                                                    <br></br>
                                                    <p className="text-grey font__size--14">{ art.nft_name }</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3 d-flex align-items-center">
                                                <div className="ml-3 align-items-center">
                                                    <span className="color__white font__size--16 text__20-1024 lh-2 bold">
                                                    { art.count }
                                                    </span>
                                                    <br></br>
                                                    <p className="text-grey font__size--14">Quantity</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3 d-flex align-items-center">
                                                <div className="ml-3 align-items-center">
                                                    <span className="color__white font__size--16 text__20-1024 lh-2 bold">
                                                        { art.pay } ETH
                                                    </span>
                                                    <br></br>
                                                    <p className="text-grey font__size--14">Price</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="hr__transparant mb-4" />
                                        
                                        <div className="row d-flex align-items-center mb-4">
                                            <div className="col-md-4 d-flex align-items-center">
                                                <div className="ml-3 align-items-center">
                                                    <span className="color__white font__size--16 text__20-1024 lh-2 bold">
                                                        { art.nft_name }
                                                    </span>
                                                    <br></br>
                                                    <p className="text-grey font__size--14">NFT Name</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 d-flex align-items-center">
                                                <div className="ml-3 align-items-center overflow-hidden">
                                                    <a className="font__size--16 text__20-1024 lh-2 bold show_oneline" rel="noreferrer" href={art.image_url} target="_blank">
                                                        { art.image_url }
                                                    </a>
                                                    <p className="text-grey font__size--14">NFT Image Link</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 d-flex align-items-center">
                                                <div className="ml-3 align-items-center overflow-hidden">
                                                    <a className="font__size--16 text__20-1024 lh-2 bold show_oneline" rel="noreferrer" href={art.transactionLink} target="_blank">
                                                        { art.transactionLink }
                                                    </a>
                                                    <p className="text-grey font__size--14">Transaction Link</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex mx-2">
                                            <div className="form-control total__checkout semi-bold font__size--14 text__14-1024 color__white">
                                                <span className="font__size--13">Total:</span>
                                                <span className="float-right font__size--16 text-green">{art.pay} ETH </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ------------------------------------------------ Product end------------------------------------------------ */}

                                {/* ------------------------------------------------ EditData start------------------------------------------------ */}
                                <div className="col-lg-4">
                                <div className="wrapper__form-checkout">
                                    <div className="row">
                                        <div className="form-group col-sm-12">
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 text-grey mb-2"
                                            >
                                                Customer:
                                            </label>
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 color__white mb-2 float-right"
                                            >
                                                { art.firstname + ' ' + art.lastname }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-sm-12">
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 text-grey mb-2"
                                            >
                                                Name:
                                            </label>
                                            <label
                                                htmlFor=""
                                                className="semi-bold font__size--14 text__14-1024 color__white mb-2 float-right"
                                            >
                                                { art.firstname + ' ' + art.lastname }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-sm-12">
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 text-grey mb-2"
                                            >
                                                Email:
                                            </label>
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 color__white mb-2 float-right"
                                            >
                                                { art.email }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-sm-12">
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 text-grey mb-2"
                                            >
                                                Address:
                                            </label>
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 color__white mb-2 float-right"
                                            >
                                                { art.address }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-sm-12">
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 text-grey mb-2"
                                            >
                                                City:
                                            </label>
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 color__white mb-2 float-right"
                                            >
                                                { art.city }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-sm-12">
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 text-grey mb-2"
                                            >
                                                State:
                                            </label>
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 color__white mb-2 float-right"
                                            >
                                                { art.state }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-sm-12">
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 text-grey mb-2"
                                            >
                                                Country:
                                            </label>
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 color__white mb-2 float-right"
                                            >
                                                { art.country }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-sm-12">
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 text-grey mb-2"
                                            >
                                                Zip Code:
                                            </label>
                                            <label
                                            htmlFor=""
                                            className="semi-bold font__size--14 text__14-1024 color__white mb-2 float-right"
                                            >
                                                { art.zipcode }
                                            </label>
                                        </div>
                                    </div>
                                    <Link to={"/orders/onedit/" + props.match.params.id}>
                                        <div className="btn btn__white mt-3 bold font__size--14 text__14-1024 w-100 shadow">
                                                Edit Data
                                        </div>
                                    </Link>
                                </div>
                                </div>
                                {/* ------------------------------------------------ EditData end------------------------------------------------ */}
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

export default connect(mapStateToProps, {})(withRouter(Product));