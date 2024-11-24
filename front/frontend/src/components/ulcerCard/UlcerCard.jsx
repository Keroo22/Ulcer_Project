/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AppContext } from "../../pages/context/Context";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const UlcerCard = ({ ulcer, getUlcers }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useContext(AppContext);

  async function handleAddDegree(id, degree) {
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
              getUlcers();
            } else {
              toast.error("Error");
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
  }

  return isLoading ? (
    <div className="loader-container">
      <span className="loader"></span>
    </div>
  ) : (
    <div>
      <img
        src={`${url}/image/${ulcer.image}`}
        alt={`${ulcer.userName}'s ulcer`}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <p>{ulcer.userName}</p>
      {Array.from({ length: 4 }, (arr, i) => {
        return (
          <button key={i} onClick={() => handleAddDegree(ulcer._id, i + 1)}>
            {i + 1}
          </button>
        );
      })}
    </div>
  );
};

export default UlcerCard;
