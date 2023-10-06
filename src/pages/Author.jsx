import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [author, setAuthor] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    console.log(id);
    const getItems = async () => {
      const res = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      const { data } = res;

      const modifiedData = data.nftCollection.map((nft) => {
        return { ...nft, ...data };
      });

      setItems([...modifiedData]);
      setAuthor(data);
    };

    getItems();
  }, []);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {!!author.authorImage ? (
                        <img src={author.authorImage} alt="" />
                      ) : (
                        <div
                          className="skeleton-box"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        ></div>
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {!!author.authorName ? (
                            <>{author.authorName}</>
                          ) : (
                            <div
                              className="skeleton-box"
                              style={{
                                width: "200px",
                                height: "25px",
                              }}
                            ></div>
                          )}
                          <span className="profile_username">
                            {!!author.tag ? (
                              <>@{author.tag}</>
                            ) : (
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "50%",
                                  height: "20px",
                                }}
                              ></div>
                            )}
                          </span>
                          {!!author.address ? (
                            <>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>{" "}
                            </>
                          ) : (
                            <div
                              className="skeleton-box"
                              style={{
                                width: "200px",
                                height: "20px",
                              }}
                            ></div>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {author.followers ? (
                        <>
                          {!isFollowing ? (
                            <>
                              <div className="profile_follower">
                                {author.followers} followers
                              </div>
                              <Link
                                to="#"
                                className="btn-main"
                                onClick={handleFollow}
                              >
                                Follow
                              </Link>
                            </>
                          ) : (
                            <>
                              <div className="profile_follower">
                                {author.followers + 1} followers
                              </div>
                              <Link
                                to="#"
                                className="btn-main"
                                onClick={handleFollow}
                              >
                                Unfollow
                              </Link>
                            </>
                          )}
                        </>
                      ) : (
                        <div
                          className="skeleton-box"
                          style={{
                            width: "150px",
                            height: "30px",
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={items} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
