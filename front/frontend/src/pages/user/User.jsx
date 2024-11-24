import React, { useState } from "react";
import AddUlcer from "../../components/AddUlcer/AddUlcer"; // Adjust path as needed
import "./user.css";  // Assuming the CSS file is in the same folder as User.jsx

const User = () => {
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <div className="loader-container">
      <span className="loader"></span>
    </div>
  ) : (
    <div className="user-page">
      <h1>User Page</h1>
      <AddUlcer setIsLoading={setIsLoading} />
      
    </div>
  );
};

export default User;
