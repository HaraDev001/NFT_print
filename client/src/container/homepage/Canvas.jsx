import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";

import Size from "../../component/card/Size";
import Navbar from "../../component/navbar/Navbar";
import Sidebar from "../../component/sidebar/Sidebar";
import Connect from "../../component/modal/Connect";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const axios = require("axios").default;

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      modal: false,
      arts: [],
      selected: 0,
      selectedSize: "12x12",
    };
  }

  setSelectedSize = (val) => {
    this.setState({
      selectedSize: val
    })
  }

  setSelected = (val) => {
    this.setState({
      selected: val
    })
  }

  toogleModal = () => {
    this.setState({
      modal: !this.state.modal,
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
          <Navbar toogleModal={this.toogleModal} type="canvas" />
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
            <div className="d-lg-flex container wrapper__canvas ">
              <Sidebar setSelected={this.setSelected} selected={this.state.selected} arts={this.state.arts}></Sidebar>
              <div className="content">
                <div className="container container__canvas">
                  <h5 className="bold font__size--24 text__24-1024 color__white mb-4 mt-1">
                    Canvas
                  </h5>
                  <div className="row">
                    <div className="col-md-7 col-xl-8 mb-4 mb-md-0">
                      <div
                        className="wrapper__wall-nft d-flex justify-content-center align-items-center"
                        style={{
                          backgroundImage: "url('./../images/Rectangle 29.png')",
                        }}
                      >
                        <div className="wrapper__image-nft position-relative">
                          <img
                            src={"../../images/Vector.png"}
                            className="verify"
                            alt=""
                          />
                          <img src={this.state.arts[this.state.selected].image_thumbnail_url} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 col-xl-4">
                      <div className="wrapper__detail-nft d-flex flex-wrap w-100 h-100 ">
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0 medium font__size--18 text__18-1024 color__white opacity__7">
                              NFT Name:
                            </h5>
                            <h5 className="mb-0 bold font__size--18 text__18-1024 color__white">
                              { this.state.arts[this.state.selected].name }
                            </h5>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0 medium font__size--18 text__18-1024 color__white opacity__7">
                                Creator:
                            </h5>
                            <div className="d-flex align-items-center bold font__size--18 text__18-1024 color__white">
                              <img
                                src={this.state.arts[this.state.selected].creator.profile_img_url}
                                className="profile__nft mr-2"
                                alt=""
                              />
                              <span>
                              { this.state.arts[this.state.selected].creator.user.username }</span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0 medium font__size--18 text__18-1024 color__white opacity__7">
                              Size:
                            </h5>
                            <Size setSelectedSize={this.setSelectedSize} selectedSize={this.state.selectedSize}></Size>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0 medium font__size--18 text__18-1024 color__white opacity__7">
                              Price:
                            </h5>
                            <div className="bold font__size--18 text__18-1024 color__white">
                              .0113 ETH
                            </div>
                          </div>
                        </div>
                        <NavLink
                          to={"/checkout/" + this.state.selected + "/" + this.state.selectedSize}
                          className="bold w-100 font__size--14 text__14-1024 color__black shadow btn btn__white w-100 align-self-end"
                        >
                          Checkout
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default connect(mapStateToProps, {})(withRouter(Canvas));
