import React from "react";

const Loading = ({
  currentStep,
}) => {
  return (
    <div id="loading">
      <span className="spinner"></span>

      {currentStep &&
        <p className={"step"}>{currentStep}</p>
      }
    </div>
  );
};

export default Loading;
