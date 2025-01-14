import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = ({ loading, color = "#141414", size = 15 }) => {
  return (
    <div className="loader">
      <BeatLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default Loader;

