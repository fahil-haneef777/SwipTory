import React, { useEffect, useState, useContext } from "react";
import style from "./Editjob.module.css";
import closeicon from "../../assets/closeicon.png";
import axios from "axios";
import AllContext from "../../Context/Context";


function Editjob({ onclickedit }) {
  const { postid } = useContext(AllContext);
  const [slides, setslides] = useState([
    { heading: "", description: "", imageUrl: "", category: "" },
    { heading: "", description: "", imageUrl: "", category: "" },
    { heading: "", description: "", imageUrl: "", category: "" },
  ]);
  const [posts, setposts] = useState([
    { heading: "", description: "", imageUrl: "", category: "" },
    { heading: "", description: "", imageUrl: "", category: "" },
    { heading: "", description: "", imageUrl: "", category: "" },
  ]);
  const [activeslide, setactiveslide] = useState(1);
  const [error, seterror] = useState("");

  const handleinputchange = (field, value) => {
    const updatedSlide = { ...slides[activeslide - 1], [field]: value };
    const updatedWholeSlide = [...slides];
    updatedWholeSlide[activeslide - 1] = updatedSlide;
    setslides(updatedWholeSlide);
  };
  const handlePostData = async () => {
    console.log(slides);
    const error = slides.some(
      (slide) =>
        slide.heading === "" ||
        slide.description === "" ||
        slide.imageUrl === "" ||
        slide.category === ""
    );
    if (error) {
      return seterror("Please fill all the fields of each slides !");
    }
    seterror("");

    axios
      .put(
        `http://localhost:3000/edit/${postid}`,
        { slides: slides },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        onclickedit();
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(slides);
  };
  const handlenextbutton = () => {
    if (activeslide >= slides.length) {
      setactiveslide(slides.length);
    } else {
      setactiveslide(activeslide + 1);
    }
  };
  const handlepreviousbutton = () => {
    if (activeslide <= 1) {
      setactiveslide(1);
    } else {
      setactiveslide(activeslide - 1);
    }
  };

  const handleAddSlide = () => {
    if (slides.length < 6) {
      const newSlides = {
        heading: "",
        description: "",
        imageUrl: "",
        category: "",
      };
      setslides([...slides, newSlides]);
    }
  };

  const handleDeleteSlide = (index) => {
    const updatedSlide = [...slides];
    updatedSlide.splice(index, 1);
    setslides(updatedSlide);
  };
  useEffect(() => {
    if (slides.length === 6) {
      return seterror("Maximum 6 slides are allowed");
    } else {
      seterror("");
    }
  }, [slides.length]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${postid}`)
      .then((res) => {
        console.log(res.data.post.slides);
        setslides(res.data.post.slides);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className={style.overlay} onClick={onclickedit}></div>
      <div className={style.modelcontent}>
        <div className={style.slidecontainer}>
          {slides.map((slide, index) => {
            return (
              <div key={index}>
                <div
                  className={`${style.slidebox} ${
                    index + 1 === activeslide ? style.active : ""
                  }`}
                  onClick={() => setactiveslide(index + 1)}
                >
                  Slide {index + 1}{" "}
                </div>
                <p>
                  {slides.length > 3 && index + 1 > 3 && (
                    <img
                      className={style.closeicon}
                      alt="close icon"
                      src={closeicon}
                      onClick={() => handleDeleteSlide(index)}
                    />
                  )}
                </p>
              </div>
            );
          })}
          {slides.length < 6 ? (
            <button className={style.addbutton} onClick={handleAddSlide}>
              Add+{" "}
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          <img
            className={style.boxcloseicon}
            alt="close icon"
            src={closeicon}
            onClick={onclickedit}
          />
        </div>

        {slides.map((slide, index) => (
          <div
            key={index + 1}
            className={`${style.inputfield} ${
              index + 1 === activeslide ? "" : style.hidden
            }`}
          >
            {index + 1 === activeslide && (
              <>
                <div className={style.inputdesign}>
                  <label htmlFor="Heading">Heading:</label>
                  <input
                    id="Heading"
                    type="text"
                    placeholder="Your heading"
                    value={slide.heading}
                    onChange={(e) => {
                      handleinputchange("heading", e.target.value);
                    }}
                  />
                </div>
                <div className={style.inputdesign}>
                  <label htmlFor="description">Description:</label>
                  <input
                    id="description"
                    type="text"
                    placeholder="Story description"
                    value={slide.description}
                    onChange={(e) => {
                      handleinputchange("description", e.target.value);
                    }}
                  />
                </div>
                <div className={style.inputdesign}>
                  <label htmlFor="imageurl">ImageUrl:</label>
                  <input
                    id="imageurl"
                    type="text"
                    placeholder="Add Image Url"
                    value={slide.imageUrl}
                    onChange={(e) => {
                      handleinputchange("imageUrl", e.target.value);
                    }}
                  />
                </div>
                <div className={style.inputdesign}>
                  <label htmlFor="category">category:</label>
                  <select
                    id="category"
                    placeholder="Select category"
                    value={slide.category}
                    onChange={(e) => {
                      handleinputchange("category", e.target.value);
                    }}
                  >
                    <option hidden>Select</option>
                    <option value="Food">Food</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Travel">Travel</option>
                    <option value="Movies">Movies</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </>
            )}
          </div>
        ))}
        <div className={style.button}>
          <button
            className={style.previousbutton}
            onClick={handlepreviousbutton}
          >
            Previous
          </button>
          <button className={style.nextbutton} onClick={handlenextbutton}>
            Next
          </button>
          <button className={style.postbutton} onClick={handlePostData}>
            Update
          </button>
          <p className={style.errormessage}>{error}</p>
        </div>
      </div>
    </div>
  );
}

export default Editjob;
