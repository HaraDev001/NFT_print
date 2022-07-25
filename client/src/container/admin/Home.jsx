import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/authActions";

const Revenue = (props) => {
    
     return (
        <Fragment>
            <div className="row">
                <div className="col-sm-12">
                        <span className="text-white font__size--20">Wellcome: {props.auth.user.email}</span>
                    <div onClick={props.logout} className="mr-2 float-right pointer font__size--14 text__14-1024 semi-bold color__pink">
                        SignOut
                    </div>
                    <br></br>
                    <Link to="/signup" className="mr-2 float-right pointer font__size--14 text__14-1024 semi-bold color__white">
                        Register
                    </Link>
                    <br></br>
                    <Link to="/resetpassword" className="mr-2 float-right pointer font__size--14 text__14-1024 semi-bold color__white">
                        Reset Password
                    </Link>
                    <br></br>
                    <Link to="/forgotpassword" className="mr-2 float-right pointer font__size--14 text__14-1024 semi-bold color__white">
                        Forgot Password
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};
const mapStateToProps = state => ({
  wallet: state.wallet,
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(withRouter(Revenue));
