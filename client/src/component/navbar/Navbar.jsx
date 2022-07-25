import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { disconnectWallet } from "../../actions/walletActions";

const Navbar = (props) => {

  const [menuStatus, setmenuStatus] = useState(false);

  const logout = () => {
    props.disconnectWallet()
    props.history.push("/");
  }

  return (
    <Fragment>
      <div
        className={
          "navbar__nft position-relative z-3 " +
          (props.type === "canvas"
            ? null
            : props.type === "home"
            ? "bg__transparent border-0"
            : "bg__black")
        }
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <NavLink
              to="/"
              className={"brand " + (props.type === "canvas" ? null : "ml-0")}
            >
              <img
                src={"../../images/NFT PRINT.png"}
                alt=""
              />
            </NavLink>
            {props.type === "canvas" ? null : (
              <div className="d-md-flex d-none justify-content-center align-items-center">
                <a href="https://twitter.com/nftprinter" className="opacity__5 hover mr-4" target="_blank" rel="noreferrer">
                  <img
                    src={"../../images/Frame.png"}
                    alt=""
                  />
                </a>
                <a href="https://www.instagram.com/nftprinter/" className="opacity__5 hover"  target="_blank" rel="noreferrer">
                  <img
                    src={"../../images/Frame (1).png"}
                    alt=""
                  />
                </a>
              </div>
            )}
            <div
              className={
                "wrapper__sidebar-wrap text-center text-md-left " +
                (menuStatus ? "active" : null)
              }
            >
              <div className="position-relative pt-5 pt-md-0">
                <img
                  src={"../../images/cancel.png"}
                  alt=""
                  className="pointer wrapper__close d-block d-md-none"
                  onClick={() => setmenuStatus(!menuStatus)}
                />

                {props.type === "canvas" ? null : (
                  <div className="d-md-none d-block justify-content-center align-items-center mb-4">
                    <a href="#!" className="opacity__5 hover mr-4">
                      <img
                        src={"../../images/Frame.png"}
                        alt=""
                      />
                    </a>
                    <a href="#!" className="opacity__5 hover ">
                      <img
                        src={"../../images/Frame (1).png"}
                        alt=""
                      />
                    </a>
                  </div>
                )}
                { props.wallet.isSigned ? (
                  <div onClick={logout} className="btn__logout pointer d-inline-block font__size--14 text__14-1024 semi-bold color__pink">
                    Logout
                  </div>
                ) : (
                  <div
                    onClick={props.toogleModal}
                    className="btn__login pointer d-inline-block font__size--14 text__14-1024 semi-bold color__white"
                  >
                    Connect
                  </div>
                )}
              </div>
            </div>
            <img
              src={"../../images/sdas.png"}
              className="pointer d-block d-md-none"
              alt=""
              onClick={() => setmenuStatus(!menuStatus)}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, {disconnectWallet})(withRouter(Navbar));
