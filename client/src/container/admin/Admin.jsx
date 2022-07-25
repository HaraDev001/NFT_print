import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Navbar from "../../component/navbar/Navbar";
import Leftbar from "./Leftbar"
import Home from "./Home"

const Admin = (props) => {
    const [modal, setModal] = useState(false);

    const toogleModal = () => {
        setModal(!modal);
    };

    return (
        <Fragment>
            <div className="overflow-hidden bg__black min-height-100 position-relative">
                <Navbar toogleModal={toogleModal} type="canvas" />
                <div className="d-lg-flex wrapper__canvas ">
                    <Leftbar activeItem={1}></Leftbar>
                    <div className="content">
                        <Home></Home> 
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, {})(withRouter(Admin));
