/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AppContext } from "../../pages/context/Context";
import "./Doctor.css"; // Use this for consistent styling

const Doctor = () => {
  const { url } = useContext(AppContext);
  const [ulcers, setUlcers] = useState([]);
  const [activePreview, setActivePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all ulcers
  const fetchUlcers = async () => {
    try {
      const response = await axios.get(`${url}/ulcer/all`);
      if (response.data.success) {
        setUlcers(response.data.data.filter((ulcer) => !ulcer.isDegreeSpecified));
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

  const handleLevelClick = (level) => {
    if (activePreview) {
      handleAddDegree(activePreview, level);
    }
  };

  // Handle adding degree to the ulcer
  const handleAddDegree = async (id, degree) => {
    setIsLoading(true);
    Swal.fire({
      title: "Are you sure of your answer?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${url}/ulcer/specifyDegree`,
            { id, degree },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            if (res.data.success) {
              toast.success("Your degree added successfully");
              fetchUlcers(); // Refresh the ulcer list after degree is added
              handleClosePreview(); // Close the preview after degree is assigned
            } else {
              toast.error("Error adding degree");
            }
          })
          .catch(() => {
            toast.error("Error");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    });
  };

  return (
    <div className="container">
      <h3 className="title">Doctor's Ulcer Dashboard</h3>

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
              <img
                src={`${url}/image/${ulcer.image}`}
                alt={ulcer.location || "Ulcer"}
              />
              <h3>{ulcer.location || "Ulcer"}</h3>
              <div className="price">Status: {ulcer.status || "Pending"}</div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && ulcers.length === 0 && <h1>No Ulcers Found</h1>}

      {/* Ulcer Preview */}
      {activePreview && (
        <div style={{width:"10%"}} className="products-preview">
          {ulcers.map(
            (ulcer) =>
              ulcer._id === activePreview && (
                <div  key={ulcer._id} className="preview active">
                  <h3>Ulcer Details</h3>

                  {/* Level Buttons */}
                  <div className="level-buttons">
                    <button onClick={() => handleLevelClick(1)}>Level 1</button>
                    <button onClick={() => handleLevelClick(2)}>Level 2</button>
                    <button onClick={() => handleLevelClick(3)}>Level 3</button>
                    <button onClick={() => handleLevelClick(4)}>Level 4</button>
                  </div>

                  <img
                    src={`${url}/image/${ulcer.image}`}
                    alt={ulcer.location}
                  />
                  <h3>{ulcer.location || "Unknown Location"}</h3>
                  <p>
                    <strong>Description:</strong> {ulcer.description || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {ulcer.status || "Pending"}
                  </p>

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

export default Doctor;
