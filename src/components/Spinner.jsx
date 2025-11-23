import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-ring loading-xl 
                       border-blue-500 border-t-white border-purple-500"></span>
    </div>
  );
}

