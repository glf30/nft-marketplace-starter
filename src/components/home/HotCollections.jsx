import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

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
    const getHotCollections = async () => {
      const res = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      const { data } = res;

      setHotCollections([...data]);
    };

    getHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {hotCollections.length > 0
              ? hotCollections.map((collection, index) => (
                  <HotCollectionCard key={index} collection={collection} />
                ))
              : new Array(4)
                  .fill(0)
                  .map((collection, index) => (
                    <SkeletonHotCollectionCard
                      key={index}
                      collection={collection}
                    />
                  ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

const HotCollectionCard = ({ collection }) => {
  return (
    <div className="hc-card">
      <div className="nft_coll">
        <div className="nft_wrap">
          <Link to={`/item-details/${collection.nftId}`}>
            <img src={collection.nftImage} className="lazy img-fluid" alt="" />
          </Link>
        </div>
        <div className="nft_coll_pp">
          <Link to={`/author/${collection.authorId}`}>
            <img className="lazy pp-coll" src={collection.authorImage} alt="" />
          </Link>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <Link to="/explore">
            <h4>{collection.title}</h4>
          </Link>
          <span>ERC-{collection.code}</span>
        </div>
      </div>
    </div>
  );
};

const SkeletonHotCollectionCard = () => {
  return (
    <div className="hc-card">
      <div className="nft_coll">
        <div
          className="skeleton-box lazy img-fluid"
          style={{
            width: "100%",
            height: "190px",
            borderRadius: "0.5rem 0.5rem 0px 0px",
          }}
        ></div>
        <div className="nft_coll_pp">
          <div>
            <div
              className="skeleton-box"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            ></div>
          </div>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <div>
            <h4
              className="skeleton-box"
              style={{ width: "96px", height: "16px", margin: "0px" }}
            ></h4>
          </div>
          <span
            className="skeleton-box"
            style={{ width: "60px", height: "16px" }}
          ></span>
        </div>
      </div>
    </div>
  );
};
