import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NewItemsCard, SkeletonNewItemsCard } from "../cards/NewItemsCard";

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
                  <NewItemsCard item={item} key={index} />
                ))
              : new Array(4)
                  .fill(0)
                  .map((_, index) => <SkeletonNewItemsCard key={index} />)}
          </Slider>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;

// const NewItemsCard = ({ item }) => {
//   const [countdown, setCountdown] = useState({});

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newCountdown = calculateCountdown();
//       setCountdown(newCountdown);

//       if (newCountdown.total <= 0) {
//         clearInterval(interval);
//       }
//     }, 1000);

//     //used for cleanup when countdown finishes
//     return () => clearInterval(interval);
//   }, [countdown]);

//   const calculateCountdown = () => {
//     const time = new Date(item.expiryDate - Date.now());
//     const hours = time.getUTCHours();
//     const minutes = time.getUTCMinutes();
//     const seconds = time.getUTCSeconds();

//     return {
//       hours,
//       minutes,
//       seconds,
//     };
//   };

//   return (
//     <div className="new-item">
//       <div className="nft__item">
//         <div className="author_list_pp">
//           <Link
//             to="/author"
//             data-bs-toggle="tooltip"
//             data-bs-placement="top"
//             title="Creator: Monica Lucas"
//           >
//             <img className="lazy" src={item.authorImage} alt="" />
//             <i className="fa fa-check"></i>
//           </Link>
//         </div>
//         {!!item.expiryDate && (
//           <div className="de_countdown">{`${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}</div>
//         )}

//         <div className="nft__item_wrap">
//           <div className="nft__item_extra">
//             <div className="nft__item_buttons">
//               <button>Buy Now</button>
//               <div className="nft__item_share">
//                 <h4>Share</h4>
//                 <a href="" target="_blank" rel="noreferrer">
//                   <i className="fa fa-facebook fa-lg"></i>
//                 </a>
//                 <a href="" target="_blank" rel="noreferrer">
//                   <i className="fa fa-twitter fa-lg"></i>
//                 </a>
//                 <a href="">
//                   <i className="fa fa-envelope fa-lg"></i>
//                 </a>
//               </div>
//             </div>
//           </div>

//           <Link to="/item-details">
//             <img
//               src={item.nftImage}
//               className="lazy nft__item_preview"
//               alt=""
//             />
//           </Link>
//         </div>
//         <div className="nft__item_info">
//           <Link to="/item-details">
//             <h4>{item.title}</h4>
//           </Link>
//           <div className="nft__item_price">{item.price} ETH</div>
//           <div className="nft__item_like">
//             <i className="fa fa-heart"></i>
//             <span>{item.likes}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SkeletonNewItemsCard = () => {
//   return (
//     <div className="new-item">
//       <div className="nft__item">
//         <div className="author_list_pp">
//           <div
//             className="skeleton-box"
//             style={{ width: "50px", height: "50px", borderRadius: "50%" }}
//           ></div>
//           <i className="fa fa-check"></i>
//         </div>
//         <div className="nft__item_wrap">
//           <div
//             className="skeleton-box"
//             style={{
//               width: "100%",
//               height: "101%",
//             }}
//           ></div>
//         </div>
//         <div className="nft__item_info">
//           <div>
//             <h4
//               className="skeleton-box"
//               style={{
//                 margin: "8px 0px 0px 0px",
//                 width: "60%",
//                 height: "25px",
//               }}
//             ></h4>
//           </div>
//           <div
//             className="skeleton-box"
//             style={{
//               width: "40%",
//               height: "20px",
//             }}
//           ></div>
//         </div>
//         <div className="nft__item_like">
//           <div></div>
//           <div
//             className="skeleton-box"
//             style={{
//               width: "30px",
//               height: "15px",
//             }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// };
