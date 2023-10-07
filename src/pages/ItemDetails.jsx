import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getItemDetails = async () => {
      const res = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      );
      const { data } = res;

      setItemDetails(data);
    };

    getItemDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {!!itemDetails.nftImage ? (
                  <img
                    src={itemDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                ) : (
                  <div
                    className="skeleton-box"
                    style={{
                      width: "100%",
                      height: "600px",
                    }}
                  ></div>
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {!!itemDetails.title ? (
                    <h2>
                      {itemDetails.title} #{itemDetails.tag}
                    </h2>
                  ) : (
                    <h2
                      className="skeleton-box"
                      style={{
                        width: "60%",
                        height: "40px",
                      }}
                    ></h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      {!!itemDetails.views && (
                        <>
                          <i className="fa fa-eye"></i>
                          {itemDetails.views}
                        </>
                      )}
                    </div>
                    <div className="item_info_like">
                      {!!itemDetails.likes ? (
                        <>
                          <i className="fa fa-heart"></i>
                          {itemDetails.likes}
                        </>
                      ) : (
                        <div
                          style={{
                            height: "40px",
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                  <p>{itemDetails.description}</p>
                  {!!itemDetails.description ? (
                    <p>{itemDetails.description}</p>
                  ) : (
                    <p
                      className="skeleton-box"
                      style={{
                        width: "100%",
                        height: "100px",
                      }}
                    ></p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {!!itemDetails.ownerId ? (
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              <img
                                className="lazy"
                                src={itemDetails.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <div
                              className="skeleton-box"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="author_list_info">
                          {!!itemDetails.ownerId ? (
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              {itemDetails.ownerName}
                            </Link>
                          ) : (
                            <div
                              className="skeleton-box"
                              style={{
                                width: "120px",
                                height: "20px",
                              }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {!!itemDetails.creatorId ? (
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              <img
                                className="lazy"
                                src={itemDetails.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <div
                              className="skeleton-box"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            ></div>
                          )}
                        </div>
                        <div className="author_list_info">
                          {!!itemDetails.creatorId ? (
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              {itemDetails.creatorName}
                            </Link>
                          ) : (
                            <div
                              className="skeleton-box"
                              style={{
                                width: "120px",
                                height: "20px",
                              }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {!!itemDetails.price ? (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{itemDetails.price}</span>
                        </>
                      ) : (
                        <span>
                          <div
                            className="skeleton-box"
                            style={{
                              width: "60px",
                              height: "20px",
                            }}
                          ></div>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
