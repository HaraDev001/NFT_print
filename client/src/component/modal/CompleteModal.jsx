import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const CompleteModal = (props) => {

  const onGotIt = () => {
    props.toogleModal();
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
            <div className="align-items-center text-center">
                <img
                    className="m-4 complete_order_image"
                    src={"../../images/confirm_.png"}
                    alt=""
                />
            </div>
            <div className="align-items-center text-center">
                <h5 className="text-white">{props.title}</h5>
            </div>
            <div className="align-items-center text-center mt-3 mx-3">
                <span className="text-grey">{props.content}</span>
            </div>
            <div className="align-items-center text-center mt-4 px-gotit mb-4">
                <div
                    onClick={onGotIt}
                    className="btn btn__white btn__gotit d-inline-block color__black semi-bold font__size--15 text__15-1024 shadow"
                    >
                    Got it
                </div>
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

export default connect(mapStateToProps,{})(withRouter(CompleteModal));