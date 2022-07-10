import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Home = () => {
  //console.log("in home", user_state);
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user);
  return (
    <>
      <Navbar user={user} />
      This is home page
    </>
  );
};

export default Home;
