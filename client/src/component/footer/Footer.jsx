import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Footer = (props) => {
  return (
    <Fragment>
      <section className="py-0">
        <div className="container">
          <hr className="hr__transparant w-100 m-0" />
          <div className="row py-5">
            <div className="order-sm-1 order-12 col-sm-4 col-md-6 my-sm-auto text-center text-sm-left mt-4">
              <h5 className="m-0 font__size--16 text__16-1024 semi-bold color__white">
                ©2021 - NFT PRINT
              </h5>
            </div>
            <div className="order-1 order-sm-12 col-sm-8 col-md-6 my-auto text-center text-sm-right">
              <div className="d-sm-flex align-items-center justify-content-center justify-content-sm-end">
                <NavLink
                  to="/privacy"
                  className="m-0 font__size--16 text__16-1024 d-block semi-bold color__white mb-3 mb-sm-0 mr-sm-4"
                >
                  Privacy Policy
                </NavLink>
                <NavLink
                  to="/terms"
                  className="m-0 font__size--16 text__16-1024 d-block semi-bold color__white"
                >
                  Terms and Conditions
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Footer;
