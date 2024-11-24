/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppContext } from "../../pages/context/Context";

function UserUlcer({ ulcer }) {
  const { url } = useContext(AppContext);
  return (
    <div>
      <img
        src={`${url}/image/${ulcer.image}`}
        alt={ulcer.userName}
        style={{ height: "150px", width: "150px", objectFit: "cover" }}
      />
      degree: {ulcer.degree ? ulcer.degree : "Not yet specified"}
    </div>
  );
}

export default UserUlcer;
