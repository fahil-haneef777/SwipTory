import React, { useEffect, useState, useContext } from "react";
import TopNavbar from "../../Components/TopNavbar/TopNavbar";
import style from "./Bookmark.module.css";
import AllContext from "../../Context/Context";
import axios from "axios";
import Storymodal from "../../Components/Storymodal/Storymodal";
function Bookmark() {
  const [showStory, setshowStory] = useState(false);
  const [bookData, setbookData] = useState([]);
  const [allmax, setallmax] = useState(4);
  const {
    active,
    setactive,
    loggedin,
    postid,
    setpostid,
    slidedata,
    setslidedata,
    currentindex,
    setcurrentindex,
    shareData,
    setshareData,
  } = useContext(AllContext);

  const handleseemore = () => {
    setmaxstory(Infinity);
  };

  const handleseeless = () => {
    setmaxstory(4);
  };
  const handleStory = (data, index) => {
    setshowStory(!showStory);
    setslidedata(data);
    setcurrentindex(index);
  };

  const onclickstory = () => {
    setshowStory(!showStory);
  };
  
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKENDURL}/showbookmarks`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setbookData(res.data.bookmarks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(bookData)
  return (
    <>
      <TopNavbar />
      {showStory ? <Storymodal onclickstory={onclickstory} /> : ""}
      <div className={style.Story}>
        <div>
          <div>
            <h2 className={style.Mainheading}>Your Bookmarks</h2>{" "}
            <div className={style.TopStoriesFood}>
              {bookData.length > 0 &&
                bookData.slice(0, allmax.Travel).map((slide, index) => (
                  <div
                    className={style.story}
                    key={index}
                    onClick={() => handleStory(bookData, index)}
                  >
                    <img src={slide.imageUrl} alt="storyimage" />
                    <div className={style.storyheading}>
                      <h2>{bookData[index].heading}</h2>
                      <h4>{bookData[index].description}</h4>
                    </div>
                  </div>
                ))}
              {bookData.length === 0 && (
                <div className={style.nostories}>No Stories Available </div>
              )}
            </div>
            {(allmax === 4) & (bookData.length > 4) ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleseemore()}
              >
                See more
              </button>
            ) : allmax > 4 ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleseeless()}
              >
                See less
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookmark;
