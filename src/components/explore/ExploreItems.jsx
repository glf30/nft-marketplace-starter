import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ItemsCard, SkeletonItemsCard } from "../cards/ItemsCard";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [displaySize, setDisplaySize] = useState(8);

  useEffect(() => {
    const getItems = async () => {
      const res = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      const { data } = res;

      setItems([...data]);
    };

    getItems();
  }, []);

  const handleShowMore = () => {
    setDisplaySize(displaySize + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.length > 0
        ? items.slice(0, displaySize).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ItemsCard item={item} key={index} />
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <SkeletonItemsCard key={index} />
            </div>
          ))}
      <div className="col-md-12 text-center">
        {displaySize < items.length && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleShowMore}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
