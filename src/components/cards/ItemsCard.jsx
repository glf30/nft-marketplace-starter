import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const NewItemsCard = ({ item }) => {
  const [countdown, setCountdown] = useState({hours: 0, minutes: 0, seconds: 0});

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = calculateCountdown();
      setCountdown(newCountdown);

      if (newCountdown.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    //used for cleanup when countdown finishes
    return () => clearInterval(interval);
  }, [countdown]);

  const calculateCountdown = () => {
    const time = new Date(item.expiryDate - Date.now());
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();

    return {
      hours,
      minutes,
      seconds,
    };
  };

  return (
    <div className="new-item">
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to="/author"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator: Monica Lucas"
          >
            <img className="lazy" src={item.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {!!item.expiryDate && (
          <div className="de_countdown">{`${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}</div>
        )}

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Link to="/item-details">
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{item.title}</h4>
          </Link>
          <div className="nft__item_price">{item.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonNewItemsCard = () => {
  return (
    <div className="new-item">
      <div className="nft__item">
        <div className="author_list_pp">
          <div
            className="skeleton-box"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          ></div>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft__item_wrap">
          <div
            className="skeleton-box"
            style={{
              width: "100%",
              height: "101%",
            }}
          ></div>
        </div>
        <div className="nft__item_info">
          <div>
            <h4
              className="skeleton-box"
              style={{
                margin: "8px 0px 0px 0px",
                width: "60%",
                height: "25px",
              }}
            ></h4>
          </div>
          <div
            className="skeleton-box"
            style={{
              width: "40%",
              height: "20px",
            }}
          ></div>
        </div>
        <div className="nft__item_like">
          <div></div>
          <div
            className="skeleton-box"
            style={{
              width: "30px",
              height: "15px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
