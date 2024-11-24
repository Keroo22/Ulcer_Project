/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AppContext } from "../context/Context";
import UserUlcer from "../../components/userUlcer/UserUlcer";
import "./UserUlcers.css"; // Add styling for consistency if needed

const UserUlcers = () => {
  const { url } = useContext(AppContext);
  const [ulcers, setUlcers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePreview, setActivePreview] = useState(null);

  // Fetch user's ulcers
  const fetchUlcers = async () => {
    try {
      const response = await axios.get(`${url}/ulcer/userUlcers`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUlcers(response.data.data);
      } else {
        throw new Error("Failed to fetch ulcers");
      }
    } catch (error) {
      toast.error("Error fetching ulcers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUlcers();
  }, []);

  const handleUlcerClick = (id) => {
    setActivePreview(id);
  };

  const handleClosePreview = () => {
    setActivePreview(null);
  };

  return (
    <div className="container">
      <h3 className="title">My Ulcers</h3>

      {/* Loader */}
      {isLoading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}

      {/* Ulcers List */}
      {!isLoading && ulcers.length > 0 && (
        <div className="products-container">
          {ulcers.map((ulcer) => (
            <div
              key={ulcer._id}
              className="product"
              onClick={() => handleUlcerClick(ulcer._id)}
            >
              <h3>{ulcer.location || "Ulcer"}</h3>
              <UserUlcer ulcer={ulcer} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && ulcers.length === 0 && <h1>No Ulcers Found</h1>}

      {/* Ulcer Preview */}
      {activePreview && (
        <div className="products-preview">
          {ulcers.map(
            (ulcer) =>
              ulcer._id === activePreview && (
                <div key={ulcer._id} className="preview active">
                  <h3>Ulcer Details</h3>
                  <UserUlcer ulcer={ulcer} />

                  {/* Refresh and Close Buttons */}
                  <div className="buttons">
                    <button className="refresh" onClick={fetchUlcers}>
                      Refresh
                    </button>
                    <button className="close" onClick={handleClosePreview}>
                      Close
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default UserUlcers;