import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Signout = () => {
  const navigate = useNavigate();
  const [loggedout, Setloggedout] = useState(false);

  fetch(`http://localhost:5000/user/signout`, {
    method: "GET",
    headers: { "content-Type": "application/json" },
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("user");
        console.log("removed user from storage");
        Setloggedout(true);
      } else if (res.status === 400) navigate("/signin");
    })
    .catch((e) => console.log(e));

  return (
    <>
      {!loggedout && (
        <div className="loaderContainer">
          <div className="loader1"></div>
        </div>
      )}
    </>
  );
};
export default Signout;
