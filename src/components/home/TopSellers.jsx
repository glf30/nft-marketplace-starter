import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    const getTopSellers = async () => {
      const res = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      const { data } = res;

      setTopSellers([...data]);
    };

    getTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers.length > 0
                ? topSellers.map((seller, index) => (
                    <TopSellerCard seller={seller} key={index} />
                  ))
                : new Array(12)
                    .fill(0)
                    .map((_, index) => <SkeletonTopSellerCard key={index} />)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

const TopSellerCard = ({ seller }) => {
  return (
    <li
      data-aos="fade-in"
      data-aos-delay="50"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
    >
      <div className="author_list_pp">
        <Link to={`/author/${seller.authorId}`}>
          <img className="lazy pp-author" src={seller.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="author_list_info">
        <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
        <span>{seller.price} ETH</span>
      </div>
    </li>
  );
};

const SkeletonTopSellerCard = () => {
  return (
    <li>
      <div className="author_list_pp">
        <div
          className="skeleton-box"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        ></div>
        <i className="fa fa-check"></i>
      </div>
      <div className="author_list_info">
        <div
          className="skeleton-box"
          style={{
            width: "40%",
            height: "15px",
          }}
        ></div>
        <span>
          <div
            className="skeleton-box"
            style={{
              width: "20%",
              height: "15px",
            }}
          ></div>
        </span>
      </div>
    </li>
  );
};
