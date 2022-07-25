import React, { Fragment } from "react";

const Size = (props) => {
  const size = ["12x12", "16x16"];
  const onSelectSize = (e) => {
    props.setSelectedSize(e);
  };
  return (
    <Fragment>
      <div className="wrapper__size-nft d-flex align-items-center font__size--16 semi-bold">
        {size.map((obj, index) => {
          return (
            <div
              onClick={(e) => onSelectSize(obj)}
              className={"pointer " + (props.selectedSize === obj ? "active" : null)}
              key={index}
            >
              {obj} in
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Size;
