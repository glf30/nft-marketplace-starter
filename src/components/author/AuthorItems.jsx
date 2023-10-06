import React from "react";
import axios from "axios";
import { ItemsCard, SkeletonItemsCard } from "../cards/ItemsCard";

const AuthorItems = ({items}) => {

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
        {items.length > 0
        ? items.map((item, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
