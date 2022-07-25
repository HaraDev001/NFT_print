import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Navbar from "../../component/navbar/Navbar";
import Connect from "../../component/modal/Connect";
import Footer from "../../component/footer/Footer";
import { connectWallet } from "../../actions/walletActions";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      goCanvas: false,
    };
  }

  toogleModal = () => {
    this.setState({
      modal: !this.state.modal,
      goCanvas: false,
    });
  };

  onCreate = () => {
    if( this.props.wallet.isSigned ) {
      this.props.history.push("/canvas")
    }
    else {
      this.setState({
        modal: !this.state.modal,
        goCanvas: true,
      });
    }
  }

  componentDidMount() {}

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
          <img
            src={"../../images/Group 6 (1).png"}
            className="path__5 opacity__2 d-none d-lg-block"
            alt=""
          />
          <img src={"../../images/Group 1.png"} className="path__9" alt="" />
          <img
            src={"../../images/Rectangle 10 (1).png"}
            className="path__12"
            alt=""
          />
          <img
            src={"../../images/Rectangle 12.png"}
            className="path__13"
            alt=""
          />
          <img
            src={"../../images/gnfhgjk.png"}
            className="path__20 d-block d-lg-none"
            alt=""
          />
          <img
            src={"../../images/gnfhgjk.png"}
            className="path__21 d-block d-lg-none"
            alt=""
          />
          <Connect toogleModal={this.toogleModal} modal={this.state.modal} goCanvas={this.state.goCanvas}/>
          <Navbar toogleModal={this.toogleModal} type="home" />
          <section className="pt-lg-4 position-relative z-2 pb-lg-0 section__header">
            <img
              src={"../../images/Framadase.png"}
              className="path__14"
              alt=""
            />
            <div className="container">
              <div className="row">
                <div className="col-lg-7 my-auto">
                  <h1 className="extra-bold font__size--70 text__70-1024 text__70-md text__70-xs wrapper__title-nft m-0">
                    #1 Trusted NFT Canvas Creators
                  </h1>
                  <h5 className="font__size--24 text__24-1024 text__24-sm normal color__white opacity__6 lh-2 my-4">
                    Turn your digital artwork into physical art in a flash
                  </h5>
                  <div
                    onClick={this.onCreate}
                    className="btn btn__white btn__create d-inline-block color__black semi-bold font__size--20 text__20-1024 shadow"
                  >
                    Create
                  </div>
                </div>
                <div className="col-md-5 d-none d-lg-block my-auto position-relative">
                  <img
                    src={"../../images/unsplash_LoLiXKJEvgE.png"}
                    className="path__3"
                    alt=""
                  />
                  <img
                    src={"../../images/unsplash_RnCPiXixooY.png"}
                    className="path__4"
                    alt=""
                  />

                  <img
                    src={"../../images/smoothcorner.png"}
                    className="path__6"
                    alt=""
                  />
                  <img
                    src={"../../images/smoothcorner.png"}
                    className="path__7"
                    alt=""
                  />
                  <img
                    src={"../../images/smoothcorner.png"}
                    className="path__8"
                    alt=""
                  />
                  <img src={"../../images/Group 19323.png"} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section className="section__get-nft">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                  <div className="d-flex align-items-center">
                    <div className="wrapper__icon flex-shrink-0">
                      <img src={"../../images/fgdfh.png"} alt="" />
                    </div>
                    <h5 className="m-0 semi-bold lh__6 font__size--20 text__20-1024 ml-3 color__white">
                      Connect your digital <br className="d-none d-xl-block" />{" "}
                      wallet
                    </h5>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                  <div className="d-flex align-items-center">
                    <div className="wrapper__icon flex-shrink-0">
                      <img src={"../../images/fh.png"} alt="" />
                    </div>
                    <h5 className="m-0 semi-bold lh__6 font__size--20 text__20-1024 ml-3 color__white">
                      Pick your NFT + blank <br className="d-none d-xl-block" />{" "}
                      printable
                    </h5>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="d-flex align-items-center">
                    <div className="wrapper__icon flex-shrink-0">
                      <img src={"../../images/Frame (2).png"} alt="" />
                    </div>
                    <h5 className="m-0 semi-bold lh__6 font__size--20 text__20-1024 ml-3 color__white">
                      Get artwork shipped <br className="d-none d-xl-block" />{" "}
                      straight to your doorstep
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="position-relative">
            <img
              src={"../../images/ssffssf.png"}
              className="path__10 d-none d-md-block"
              alt=""
            />
            <img
              src={"../../images/4.png"}
              className="path__11 d-none d-md-block"
              alt=""
            />
            <div className="container">
              <div className="text-center">
                <h1 className="extra-bold font__size--60 text__60-1024 text__60-sm text__60-xxs wrapper__title-nft m-0">
                  We work with collections
                </h1>
                <h5 className="font__size--20 text__20-1024 normal color__white opacity__6 mt-4 lh-2">
                  Are you looking to get your entire community fitted with
                  physical <br className="d-none d-md-block" /> products of
                  their unique NFTS?
                </h5>
              </div>
              <div className="row justify-content-center mt-5">
                <div className="col-lg-11">
                  <div className="wrapper__collection-group">
                    <div className="row justify-content-center">
                      <div className="col-md-6 col-lg-4 mb-3 mb-md-5 mb-lg-0">
                        <div className="text-center mt-lg-5">
                          <div className="wrapper__icon-collection mx-auto">
                            <img src={"../../images/fghfghfg.png"} alt="" />
                          </div>
                          <h5 className="bold font__size--24 text__24-1024 my-4 color__white">
                            Bulk Order
                          </h5>
                          <p className="normal font__size--16 text__16-1024 color__white opacity__6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut et dolore
                            magna aliqua.
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 mb-3 mb-md-5 mb-lg-0">
                        <div className="text-center pb-3">
                          <div className="wrapper__icon-collection mx-auto">
                            <img src={"../../images/Frame (3).png"} alt="" />
                          </div>
                          <h5 className="bold font__size--24 text__24-1024 my-4 color__white">
                            Quality Products
                          </h5>
                          <p className="normal font__size--16 text__16-1024 color__white opacity__6">
                            Our brand is built on providing quality physical
                            products from shirts to canvas to
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 mb-3 mb-md-5 mb-lg-0">
                        <div className="text-center mt-lg-5">
                          <div className="wrapper__icon-collection mx-auto">
                            <img src={"../../images/Frame (4).png"} alt="" />
                          </div>
                          <h5 className="bold font__size--24 text__24-1024 my-4 color__white">
                            Easy Solution
                          </h5>
                          <p className="normal font__size--16 text__16-1024 color__white opacity__6">
                            Get a branded landing page that allows your
                            community to send their information, and get it
                            directly shipped to there address
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <a
                        href="#!"
                        className="btn btn__white btn__collection shadow semi-bold font__size--20 text__20-1024 color__black"
                      >
                        Get in Touch
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, {connectWallet})(withRouter(Index));