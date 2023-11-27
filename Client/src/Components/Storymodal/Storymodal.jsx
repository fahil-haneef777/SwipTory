import React, { useContext, useEffect, useState } from "react";
import style from "./Storymodal.module.css";
import like from "../../assets/love.png";
import share from "../../assets/share.png";
import bookmark from "../../assets/bookmark.png";
import next from "../../assets/next.png";
import previous from "../../assets/previous.png";
import close from "../../assets/close.png";
import AllContext from "../../Context/Context";
import axios from "axios";

function Storymodal({ onclickstory }) {
  const { slidedata, currentindex, setcurrentindex } = useContext(AllContext);
  const [slideInfo, setslideInfo] = useState([]);
  

  const handlenext = () => {
    setcurrentindex((previousindex) => (previousindex + 1) % slidedata.length);
  };

  const handleprevious = () => {
    setcurrentindex(
      (prevIndex) => (prevIndex - 1 + slidedata.length) % slidedata.length
    );
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/slide/${slidedata[currentindex]._id}`)
      .then((res) => {
        console.log(res.data);
        setslideInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlelike = () => {
    axios
      .put(
        `http://localhost:3000/slide/likes/${slidedata[currentindex]._id}`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className={style.overlay}>
        {" "}
        <img
          src={previous}
          className={style.previous}
          alt="previous"
          onClick={handleprevious}
        />
        <img
          src={next}
          className={style.next}
          alt="next"
          onClick={handlenext}
        />
      </div>

      <div className={style.modelcontent}>
        <div>
          <div className={style.story}>
            {slidedata && slidedata.length > 0 && (
              <img src={slidedata[currentindex].imageUrl} alt="story" />
            )}

            <div>
              <img src={share} className={style.share} alt="previous" />
              <img
                src={like}
                className={style.like}
                alt="like"
                onClick={handlelike}
              />
              <img src={bookmark} className={style.bookmark} alt="bookmark" />
              <img
                src={close}
                className={style.close}
                alt="close"
                onClick={onclickstory}
              />
              {slideInfo && slideInfo.likes && (
                <p className={style.likecount}>{slideInfo.likes.length}</p>
              )}
            </div>
            <div className={style.storyheading}>
              <h2>{slidedata[currentindex].heading}</h2>
              <h4>{slidedata[currentindex].description}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Storymodal;
