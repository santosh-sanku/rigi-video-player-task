import React, { useState, useEffect } from "react";
import "./videoCard.css";
import Modal from "react-modal";
import ReactPlayer from "react-player";

const getWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const getCustomStyles = () => {
  if (typeof window !== "undefined") {
    const screenWidth = window.innerWidth;

    // For smaller screens
    if (screenWidth <= 768) {
      return {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          height: "auto",
          width: "90%",
          maxWidth: "420px",
          overflow: "auto",
        },
      };
    }
  }

  // Default styles for larger screens
  return {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "520px",
      width: "820px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
    },
  };
};

const VideoCard = ({ profile, onDelete }) => {
  const { id, title, subtitle, description, thumb, sources } = profile;

  const [liked, setLiked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customStyles = getCustomStyles();

  const handleModalOpen = (card) => {
    setModalIsOpen(true);
    setSelectedCard(card);
    setPlaybackRate(1);
  };

  const handleClickDelete = () => {
    onDelete(id);
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const trimmedDescription = description.slice(0, 350);

  return (
    <>
      <div className="profile-card">
        <div className="profile-image">
          <img src={thumb} alt={title} />
        </div>

        <div className="profile-info">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <p>{trimmedDescription}</p>
        </div>

        <div className="profile-actions">
          <span
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <i className={`fas fa-heart ${liked ? "liked" : ""}`}></i>
          </span>

          <span className="edit-button" onClick={() => handleModalOpen(id)}>
            <i class="fa-solid fa-play"></i>
          </span>

          <span className="delete-button" onClick={handleClickDelete}>
            <i className="fa-solid fa-trash"></i>
          </span>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="modal-container">
          <div className="modal-head">
            <p>{title}</p>

            <button
              className="modal-cross"
              style={{ marginRight: "10px" }}
              onClick={() => {
                setModalIsOpen(false);
                setSelectedCard(null);
              }}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <ReactPlayer
            controls
            width="650px"
            height="330px"
            playing
            playbackRate={playbackRate}
            url={sources}
          />

          <div className="modal-footer">
            <button onClick={() => setPlaybackRate(0.5)}>x0.5</button>
            <button onClick={() => setPlaybackRate(1)}>x1</button>
            <button onClick={() => setPlaybackRate(2)}>x2</button>
            <button onClick={() => setPlaybackRate(5)}>x5</button>
            <button onClick={() => setPlaybackRate(10)}>x10</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VideoCard;
