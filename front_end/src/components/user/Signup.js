import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup_form from "./Signup_form";

const Signup = () => {
  return (
    <div className="Signup-container">
      <Signup_form />
    </div>
  );
};

export default Signup;
