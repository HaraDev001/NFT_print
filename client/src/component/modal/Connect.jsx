import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { connectWallet } from "../../actions/walletActions";

const Connect = (props) => {

  const connectMetaMask = () => {
    props.connectWallet();
    props.toogleModal();
    if( props.goCanvas === true) {
      props.history.push("/canvas")
    }
  }

  return (
    <Fragment>
      <div
        className={
          "modal fade wrapper__modal-connet " + (props.modal ? "show" : null)
        }
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg__black-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="m-0 bold font__size--24 text__24-1024 color__white">
                Choose your wallet
              </h5>
              <div onClick={props.toogleModal} className="opacity__5 hover pointer">
                <img
                  src={"../../images/xzXZ.png"}
                  alt=""
                />
              </div>
            </div>
            <div onClick={connectMetaMask} className="wrapper__list-connet pointer d-sm-flex justify-content-between align-items-center">
              <div className="d-sm-flex text-center text-sm-left align-items-center">
                <div className="logo d-flex justify-content-center align-items-center mb-3 mb-sm-0 mx-auto mr-sm-3 flex-shrink-0">
                  <img
                    src={"../../images/image 3.png"}
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="bold font__size--20 text__20-1024 color__white mb-1">
                    MetaMask
                  </h5>
                  <p className="m-0 normal font__size--16 text__16-1024 color__black-4">
                    Connect to your MetaMask Wallet
                  </p>
                </div>
              </div>
              <img src={"../../images/fvfd.png"} className="d-none d-sm-block" alt="" />
            </div>
            <hr className="hr__transparant w-100 my-4" />
            <div className="wrapper__list-connet pointer d-sm-flex justify-content-between align-items-center">
              <div className="d-sm-flex text-center text-sm-left align-items-center">
                <div className="logo d-flex justify-content-center align-items-center mb-3 mb-sm-0 mx-auto mr-sm-3 flex-shrink-0">
                  <img
                    src={"../../images/image 4.png"}
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="bold font__size--20 text__20-1024 color__white mb-1">
                    WalletConnect
                  </h5>
                  <p className="m-0 normal font__size--16 text__16-1024 color__black-4">
                    Connect to your MetaMask Wallet
                  </p>
                </div>
              </div>
              <img src={"../../images/fvfd.png"} className="d-none d-sm-block" alt="" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
};
const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, {connectWallet})(withRouter(Connect));