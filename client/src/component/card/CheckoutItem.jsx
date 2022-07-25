import React, { Fragment, useState } from "react";

const CheckoutItem = (props) => {
  const [count, setCount] = useState(1);
  const countCounterPlus = () => {
    setCount(count + 1);
  };
  const countCounterMin = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <Fragment>
      <div className="wrapper__item-nft mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={props.url}
              alt=""
              className="preview"
            />
            <div className="ml-3">
              <h5 className="color__white font__size--20 text__20-1024 lh-2 bold">
                NFT Canvas: 12x12
              </h5>
              <p className="m-0 normal font__size--16 text__16-1024 color__white opacity__4">
                { props.name }
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <h5 className="semi-bold font__size--20 text__20-1024 d-none d-sm-block color__white m-0">
              QTY:{" "}
            </h5>
            <div className="wrapper__count-item d-flex align-items-center ml-3">
              <div
                className="point pointer flex-shrink-0"
                onClick={() => countCounterMin()}
              >
                <img src={"../../images/sfddss.png"} alt="" />
              </div>
              <div className="semi-bold font__size--20 text__20-1024 color__white mx-3">
                {count}
              </div>
              <div
                className="point pointer flex-shrink-0"
                onClick={() => countCounterPlus()}
              >
                <img src={"../../images/sadsadsad.png"} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h5 className="m-0 normal color__white font__size--16 text__16-1024">
            0.0205 ETH x 1
          </h5>
          <h5 className="m-0 normal color__white font__size--16 text__16-1024">
            { 0.0205 * count } ETH
          </h5>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckoutItem;
