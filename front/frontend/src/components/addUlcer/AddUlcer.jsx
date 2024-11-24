import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../pages/context/Context";
import axios from "axios";
import "./AddUlcer.css"; // Ensure the CSS file exists
import { Link } from "react-router-dom";

const AddUlcer = ({ setIsLoading }) => {
  const [image, setImage] = useState(null); // Holds the preview image URL
  const [file, setFile] = useState(null); // Holds the actual file
  const [imageName, setImageName] = useState(""); // Holds the file name
  const { url, profileData } = useContext(AppContext);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size < 2000000) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result); // Preview image
          setFile(selectedFile); // Store file for upload
          setImageName(selectedFile.name); // File name for overlay
        };
        reader.readAsDataURL(selectedFile);
      } else {
        toast.error("Image size must be less than 2MB");
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Image is required");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userName", profileData.userName);

    try {
      const res = await axios.post(`${url}/ulcer/add`, formData, {
        withCredentials: true,
      });

      console.log("Upload response:", res);

      if (res.data.success) {
        toast.success("Ulcer added successfully");
        setImage(null); // Reset image preview
        setFile(null); // Reset file
        setImageName(""); // Reset image name
      } else {
        toast.error(`Error uploading image: ${res.data.message}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading image");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className="add-ulcer-container">
      <div className="container">
        <input
          type="file"
          id="file-input"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <div className={`img-area ${image ? "active" : ""}`} data-img={imageName}>
          {image ? (
            <img src={image} alt="Preview" />
          ) : (
            <>
              <i className="bx bxs-cloud-upload icon"></i>
              <h3>Upload Image</h3>
              <p>
                Image size must be less than <span>2MB</span>
              </p>
            </>
          )}
        </div>

        <button className="select-image" onClick={triggerFileInput}>
          Select Image
        </button>
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
        <Link to="/list" className="my-ulcers-link">
          My Ulcers
        </Link>
      </div>
    </div>
  );
};

export default AddUlcer;
