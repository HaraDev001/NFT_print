import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "../store.jsx";
import jwt_decode from "jwt-decode";

import { setCurrentUser, logout } from "../actions/authActions";
import setAuthToken from "../utils/setAuthToken";

import Canvas from "../container/homepage/Canvas";
import Checkout from "./homepage/Checkout";
import Home from "./homepage/Index";
import Privacy from "./homepage/Privacy";
import Terms from "./homepage/Terms";
import PrivateRoute from "../component/private-route/PrivateRoute";
import PrivateRouteAdmin from "../component/private-route/PrivateRouteAdmin";
import Admin from "./admin/Admin";
import Orders from "./admin/Orders";
import Product from "./admin/Product";
import OnEdit from "./admin/OnEdit";
import Revenue from "./admin/Revenue";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmForgotPassword from "./pages/ConfirmForgotPassword";
import NotFound from "./pages/NotFound";
// core styles
// import "./scss/volt.scss";


if (localStorage.jwtToken) {
  // Set auth token header auth
  var token = localStorage.jwtToken;
  
  // token = token.replace("Bearer ", "");
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

   // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logout());

    // Redirect to login
    window.location.href = "./signin";
  }
}
const Index = (props) => {
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Switch>
              <PrivateRouteAdmin exact path="/reset/:token" component={ConfirmForgotPassword} />
              <PrivateRouteAdmin exact path="/forgotpassword" component={ForgotPassword} />
              <PrivateRouteAdmin exact path="/resetpassword" component={ResetPassword} />
              <PrivateRouteAdmin exact path="/signup" component={SignUp} />
              <PrivateRouteAdmin exact path="/admin" component={Admin} />
              <PrivateRouteAdmin exact path="/orders" component={Orders} />
              <PrivateRouteAdmin exact path="/orders/product/:id" component={Product} />
              <PrivateRouteAdmin exact path="/orders/onedit/:id" component={OnEdit} />
              <PrivateRouteAdmin exact path="/revenue" component={Revenue} />
              <PrivateRoute exact path="/canvas" component={Canvas} />
              <PrivateRoute exact path="/checkout/:id/:size" component={Checkout} />
              <PrivateRoute exact path="/privacy" component={Privacy} />
              <PrivateRoute exact path="/terms" component={Terms} />
              <Route path="*" component={NotFound} />
            </Switch>
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default Index;
