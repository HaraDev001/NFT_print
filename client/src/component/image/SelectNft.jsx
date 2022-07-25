import React, { Fragment } from "react";

const SelectNft = (props) => {
  return (
    <Fragment>
      <div
        className={
          "nft__wrap position-relative mx-auto " +
          (props.selected === props.id ? "select" : null)
        }
      >
        <img
          src={"../../images/Rectangle 27.png"}
          alt=""
          className="frame"
        />
        <div
          className="position-relative pointer z-2"
          onClick={(e) => props.OnSelect(props.id)}
        >
          <img
            src={props.img_url}
            alt={props.img_url}
          />
          <div className="desc">
            <h5 className="semi-bold mb-0 font__size--16 text__16-1024 color__white text-center">
              {props.img_name}
            </h5>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SelectNft;
