import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ItemsCard, SkeletonItemsCard } from "../cards/ItemsCard";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);

  const settings = {
    dots: false,
    arrows: true,
    swipe: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getNewItems = async () => {
      const res = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      const { data } = res;

      setNewItems([...data]);
    };

    getNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <Slider {...settings}>
            {newItems.length > 0
              ? newItems.map((item, index) => (
                  <ItemsCard item={item} key={index} />
                ))
              : new Array(4)
                  .fill(0)
                  .map((_, index) => <SkeletonItemsCard key={index} />)}
          </Slider>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;