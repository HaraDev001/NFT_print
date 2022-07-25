import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, wallet, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      wallet.isSigned === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  wallet: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps)(PrivateRoute);
