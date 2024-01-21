import React, { useRef } from "react";
import "../../css/LiveExam.css";

const LiveExam = () => {
  const containerRef = useRef(null);
  let highlightedElement = null;

  // Function to scroll to content
  const scrollToContent = (contentId) => {
    const container = containerRef.current;
    const contentElement = document.getElementById(contentId);

    if (highlightedElement) {
      highlightedElement.classList.remove("highlight");
    }

    if (contentElement) {
      container.scrollTop = contentElement.offsetTop - container.offsetTop;
      contentElement.classList.add("highlight");
      highlightedElement = contentElement;
    }
  };

  // Static data
  const readingData = {
    exam_type: "Reading Exam Type",
    exam_name: "Reading Exam Name",
    block_type: "Reading Block Type",
    difficulty_level: "Reading Difficulty Level",
  };

  const listeningData = {
    exam_type: "Listening Exam Type",
    exam_name: "Listening Exam Name",
    block_type: "Listening Block Type",
    difficulty_level: "Listening Difficulty Level",
  };

  // Dummy function for renderAudio and displayLeftContainer
  const renderAudio = () => {
    // Replace this with your actual implementation
    return <div>Render Audio</div>;
  };

  const displayLeftContainer = () => {
    // Replace this with your actual implementation
    return <div>Display Left Container</div>;
  };

  // Dummy data for paginationContent
  const paginationContent = ["1", "2", "3"];

  return (
    <>
      {/* Navbar */}
      <div className="lv-navbar">
        <div className="lv-navbar-title">
          <h2 style={{ color: "red" }}>IELTS</h2>
          <div className="lv-navbar-subtitle">
            <h4 style={{ marginTop: "5px", marginBottom: "5px" }}>
              Test taker ID
            </h4>
            <span>
              2 years, 11 months, 6 days, 3 hours, 40 minutes remaining
              Connected
            </span>
          </div>
        </div>
        <div className="lv-navbar-right">
          <h4>Wifi</h4>
          <h4>&#128276;</h4> {/* Notification Bell Icon */}
          <h4>&#9776;</h4> {/* Menu Icon */}
        </div>
      </div>

      {/* Static Container */}
      <div className="lv-container">
        <div className="lv-container-title">{`${
          readingData.exam_type || listeningData.exam_type
        } / ${readingData.exam_name || listeningData.exam_name} / ${
          readingData.block_type || listeningData.block_type
        } / ${
          readingData.difficulty_level || listeningData.difficulty_level
        }`}</div>
      </div>

      {/* Main Container */}
      {/* <div>{renderAudio()}</div> */}
      <div className="lv-main-container" ref={containerRef}>
        {/* Left Container */}
        <div className="lv-left-container">{displayLeftContainer()}</div>

        {/* Right Container */}
        <div className="lv-right-container" id="right-container">
          <div className="lv-box-right">
            {/* Replace the following with your actual content */}
            <p>Your content goes here.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="lv-footer">
        <div className="lv-footer-text">
          <div className="lv-part-pagination"></div>
          <div className="lv-question-pagination">
            {paginationContent.join("")}
          </div>
        </div>
        <button
          className="lv-footer-button"
          onClick={() => scrollToContent("yourContentId")}
        >
          <span className="lv-arrow">&#x2713;</span>
        </button>
      </div>
    </>
  );
};

export default LiveExam;
