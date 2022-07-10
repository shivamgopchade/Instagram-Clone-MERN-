import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Signin_form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");

  const b = document.querySelector(".signin_button");

  const HandleChange = (e) => {
    const name = e.target.name;

    if (name === "username") Setusername(e.target.value);
    if (name === "password") Setpassword(e.target.value);

    if (password.length >= 5) {
      b.disabled = false;
      b.style.cursor = "pointer";
      b.style.opacity = "1";
    } else {
      b.disabled = true;
      b.style.cursor = "default";
      b.style.opacity = "0.6";
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    console.log("in submit");
    try {
      const res = await fetch("http://localhost:5000/user/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/post");
      } else {
        const doc = document.querySelector(".notify");
        doc.innerHTML = data.error;
      }
    } catch (error) {
      const doc = document.querySelector(".notify");
      doc.innerHTML = error.message;
    }
  };
  return (
    <div className="container">
      <div className="signin_container">
        <img
          src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
          alt="instagram"
          style={{ marginBottom: "30px", marginTop: "30px" }}
        />
        <div className="signin_form_container">
          <input
            className="signin_input"
            type="text"
            placeholder="Phone number, username, or email"
            name="username"
            onChange={HandleChange}
            maxLength={75}
            autoComplete="new-password"
            required={true}
          />
          <input
            required={true}
            className="signin_input"
            type="password"
            placeholder="Password"
            name="password"
            onChange={HandleChange}
            minLength={6}
            autoComplete="new-password"
          />

          <button
            type="submit"
            method="POST"
            className="signin_button"
            onClick={HandleSubmit}
          >
            Log In
          </button>
        </div>
        <div className="notify"></div>
      </div>
      <div className="signin_register">
        Dont have an account?
        <a href="/signup" style={{ color: "#0095F6", textDecoration: "none" }}>
          <span
            style={{ fontWeight: "bold", color: "#0095F6", marginLeft: "5px" }}
          >
            Sign up
          </span>
        </a>
      </div>
    </div>
  );
};

export default Signin_form;
