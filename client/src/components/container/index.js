import React from "react";

const Container = ({ children }) => {
  return (
    <div className="container rounded mt-5 border border-dark">
      {children}
    </div>
  )
}

export default Container;