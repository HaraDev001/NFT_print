import React, { Fragment } from "react";
import SelectNft from "../image/SelectNft";
import Slider from "react-slick";

const Sidebar = (props) => {

  const OnSelect = (e) => {
    props.setSelected(e);
  };

  const nft = [];
  for (let index = 0; index < props.arts.length; index++) {
    nft.push(
      <SelectNft key={index} id={index} OnSelect={(e) => OnSelect(e)} selected={props.selected} img_url={props.arts[index].image_thumbnail_url} img_name={props.arts[index].name}/>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 9000,
        settings: "unslick",
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows:false,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows:false,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows:false,
        },
      },
    ],
  };

  return (
    <Fragment>
      <div className="sidebar align-self-stretch">
        <h5 className="text-lg-center bold color__white mt-1 mb-3 font__size--24 text__24-1024">
          Choose NFT
        </h5>
        <Slider {...settings} className="list__nft-image">
          {nft}
        </Slider>
      </div>
    </Fragment>
  );
};

export default Sidebar;
