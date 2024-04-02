"use client";
import React, { FunctionComponent, useState } from "react";
import "./style.css";
import ContinueLearningCard from "@/components/cards/continue-learning-card";
import PlayIcon from "@/public/images/play.svg";
import RefreshIcon from "@/public/images/refresh.svg";
import CLImage from "@/public/images/CL-image.svg";

interface HomeContinueLearningSectionProps {}

const HomeContinueLearningSection: FunctionComponent<
  HomeContinueLearningSectionProps
> = () => {
  const [viewMoreClicked, setViewMoreClicked] = useState(false);

  const handleViewMoreClick = () => {
    setViewMoreClicked(!viewMoreClicked);
  };

  return (
    <section className="home-continue-learning-main-section">
      <div className="home-continue-learning-header-section">
        <h3 className="home-continue-learning-text">Continue Learning</h3>
        <button
          className="home-continue-learning-view-more-text"
          onClick={handleViewMoreClick}
        >
          {viewMoreClicked ? "View Less" : "View More"}
        </button>
      </div>
      <div className="home-continue-learning-card-section">
        <ContinueLearningCard
          imageUrl={CLImage}
          percentage={30}
          imageUrl1={PlayIcon}
          course_code="Course Code BO1"
          course_name="Business Etiquette"
          course_time="30 mins"
          course_percentage={30}
          progress_count={3}
          total_progress_count={4}
          imageUrl2={RefreshIcon}
        />
        {viewMoreClicked && (
          <>
            <ContinueLearningCard
              imageUrl={CLImage}
              percentage={70}
              imageUrl1={PlayIcon}
              course_code="Course Code BO1"
              course_name="Business Etiquette"
              course_time="30 mins"
              course_percentage={70}
              progress_count={3}
              total_progress_count={4}
              imageUrl2={RefreshIcon}
            />
            <ContinueLearningCard
              imageUrl={CLImage}
              percentage={90}
              imageUrl1={PlayIcon}
              course_code="Course Code BO1"
              course_name="Business Etiquette"
              course_time="30 mins"
              course_percentage={90}
              progress_count={3}
              total_progress_count={4}
              imageUrl2={RefreshIcon}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default HomeContinueLearningSection;
