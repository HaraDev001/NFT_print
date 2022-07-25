import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Orders = (props) => {
    
     return (
        <Fragment>
            <div className="sidebar__admin align-self-stretch" style={{height: 'auto'}}>
                <Link to='/admin'>
                    <div className={"text-center pointer p-2 " + (props.activeItem === 1 ? "activeItem" : "item") } >
                        <span>Home</span>
                    </div>
                </Link>
                <Link to='/orders'>
                    <div className={"text-center pointer p-2 " + (props.activeItem === 2 ? "activeItem" : "item") } >
                        <span>Orders</span>
                    </div>
                </Link>
                <Link to='/revenue'>
                    <div className={"text-center pointer p-2 " + (props.activeItem === 3 ? "activeItem" : "item") } >
                        <span>Revenue</span>
                    </div>
                </Link>
            </div>
        </Fragment>
    );
};
const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps, {})(withRouter(Orders));
