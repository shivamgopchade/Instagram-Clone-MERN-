import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import CropImage from "./CropImage";
import PostCreateModal from "../modals/PostCreateModal";
import image from "../../static/images/insta_png.png";

const CreatePost = (props) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")).user;
  const [showCreate, SetshowCreate] = useState(false);
  const [file, Setfile] = useState("");
  const [caption, Setcaption] = useState("");
  //console.log("in create post", user.username);

  const HandleChange = (e) => {
    const name = e.target.name;

    if (name === "caption") Setcaption(e.target.value);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const res = await fetch("http://localhost:5000/post/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        username: user.username,
        post_img: file,
        caption: caption,
      }),
      credentials: "include",
    });

    const data = await res.json();
    //console.log(data);
    if (res.status === 200) navigate("/post");
    else console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="create-post-bg">
        <img src={image} alt="" style={{ height: "10rem" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "200px",
        }}
      >
        <button className="glow-on-hover" onClick={() => SetshowCreate(true)}>
          Add Post
        </button>
      </div>

      <PostCreateModal
        title="Create Post"
        onClose={() => SetshowCreate(false)}
        show={showCreate}
        HandleSubmit={HandleSubmit}
      >
        <CropImage
          HandleChange={HandleChange}
          HandleSubmit={HandleSubmit}
          Setfile={Setfile}
        />
      </PostCreateModal>
    </>
  );
};

export default CreatePost;
