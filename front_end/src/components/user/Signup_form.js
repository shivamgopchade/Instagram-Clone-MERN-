import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup_form = () => {
  const navigate = useNavigate();
  const [username, Setusername] = useState("");
  const [name, Setname] = useState("");
  const [password, Setpassword] = useState("");
  const [email, Setemail] = useState("");
  const [age, Setage] = useState(0);
  const [dob, Setdob] = useState(null);
  const b = document.querySelector(".signin_button");

  const HandleChange = (e) => {
    const name = e.target.name;
    if (name === "name") Setname(e.target.value);
    if (name === "username") Setusername(e.target.value);
    if (name === "password") Setpassword(e.target.value);
    if (name === "email") Setemail(e.target.value);
    if (name === "age") Setage(e.target.value);
    if (name === "birthday") {
      console.log(dob);
      Setdob(e.target.value);
    }
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

    //console.log("dob", dob);

    const res = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        age: age,
        password: password,
        email: email,
        dob: dob,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 200) {
      console.log(data);
      navigate("/signin");
    } else {
      //console.log(data.error);
      if (data.error.code === 11000) {
        if (data.error.keyPattern.username)
          console.log("username already taken.Try another one");
        if (data.error.keyPattern.email) console.log("email already exists");
      }
      if (data.error.errors.age) console.log("Age must be more than 18");
      if (data.error.password)
        console.log("Password length must be more than 6");
    }
  };
  return (
    <div className="SignupForm">
      <div className="container">
        <div
          className="signin_container"
          style={{ height: "500px", width: "340px" }}
        >
          <img
            src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
            alt="instagram"
            style={{ marginBottom: "15px", marginTop: "30px" }}
          />
          <span
            style={{
              textAlign: "center",
              fontWeight: "500",
              fontSize: "17px",
              color: "#8E8E8E",
              width: "280px",
            }}
          >
            Sign up to see photos and videos from your friends.
          </span>
          <div className="signin_form_container">
            <input
              className="signin_input"
              type="text"
              placeholder="Mobile number or Email"
              name="email"
              onChange={HandleChange}
              autoComplete="off"
              required={true}
            />
            <input
              className="signin_input"
              type="text"
              placeholder="Username"
              name="username"
              onChange={HandleChange}
              autoComplete="nope"
              required={true}
            />
            <input
              className="signin_input"
              type="text"
              placeholder="name"
              name="name"
              onChange={HandleChange}
              autoComplete="off"
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
            <input
              type="date"
              className="signin_input"
              name="birthday"
              required={true}
              placeholder="dob"
              style={{ marginBottom: "10px" }}
              onChange={HandleChange}
              autoComplete="off"
            ></input>
            <input
              required={true}
              className="signin_input"
              type="number"
              placeholder="Age"
              name="age"
              onChange={HandleChange}
              min={18}
              style={{ marginBottom: "10px" }}
              autoComplete="off"
            />
            <span
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "#8E8E8E",
                width: "280px",
              }}
            >
              People who use our service may have uploaded your contact
              information to Instagram.
              <br />
              <a
                href="https://www.facebook.com/help/instagram/261704639352628"
                className="terms-a"
                style={{ textDecoration: "none", color: "#8E8E8E" }}
              >
                Learn More
              </a>
              <br />
              <br />
              By signing up, you agree to our
              <a
                href="https://help.instagram.com/581066165581870"
                className="terms-a"
                style={{ textDecoration: "none", color: "#8E8E8E" }}
              >
                {" "}
                Terms
              </a>{" "}
              ,{" "}
              <a
                href="https://help.instagram.com/519522125107875"
                className="terms-a"
                style={{ textDecoration: "none", color: "#8E8E8E" }}
              >
                Data Policy{" "}
              </a>
              and{" "}
              <a
                href="https://www.instagram.com/legal/cookies/"
                className="terms-a"
                style={{ textDecoration: "none", color: "#8E8E8E" }}
              >
                Cookies Policy{" "}
              </a>
              .
              <br />
              <br />
            </span>

            <button
              type="submit"
              method="POST"
              className="signin_button"
              onClick={HandleSubmit}
            >
              Sign Up
            </button>
          </div>
          <div className="notify"></div>
        </div>
        <div
          className="signin_register"
          style={{ height: "70px", padding: "10px 0px", width: "360px" }}
        >
          Have an account?
          <a
            href="/signin"
            style={{ color: "#0095F6", textDecoration: "none" }}
          >
            <span
              style={{
                fontWeight: "bold",
                color: "#0095F6",
                marginLeft: "5px",
              }}
            >
              Log in
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup_form;
