import React from "react";

const NoDataFound = ({ text }) => {
  return (
    <div className="flex justify-center mt-10">
      <h2 className="font-sans text-xl">{text}</h2>
    </div>
  );
};

export default NoDataFound;
