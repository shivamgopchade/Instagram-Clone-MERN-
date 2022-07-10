import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import profile_pic from "../../static/images/default.png";
const EditPost = () => {
  const navigate = useNavigate();
  const [Postdata, Setdata] = useState(null);
  const [caption, Setcaption] = useState("");
  const { id } = useParams();
  //console.log(id);
  const user = JSON.parse(localStorage.getItem("user")).user;

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!caption.length) Setcaption(Postdata.caption);

    const res = await fetch(`http://localhost:5000/post/updatePost/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        username: Postdata.username,
        post_img: Postdata.file,
        caption: caption,
      }),
      credentials: "include",
    });

    const data = await res.json();
    //console.log(data);
    if (res.status === 200) navigate("/post");
    else console.log(data);
  };
  const HandleChange = (e) => {
    e.preventDefault();
    Setcaption(e.target.value);
  };
  const HandleDelete = () => {
    fetch(`http://localhost:5000/post/deletePost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          console.log("post deleted successfully");
          navigate("/post");
        } else {
          console.log("post not deleted");
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetch(`http://localhost:5000/post/detailPost/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        //console.log(data);
        if (res.status === 200) Setdata(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      {Postdata && (
        <div className="CreatePost-container">
          <div className="CreatePost-form">
            <div className="fileContent">
              <img
                src={Postdata.post_img}
                alt="pic"
                style={{
                  minHeight: "470px",
                  minWidth: "470px",
                  maxHeight: "490px",
                  maxWidth: "470px",
                  marginBottom: "10px",
                }}
              />
            </div>
            <div className="PostInfo">
              <div className="user">
                <img
                  src={profile_pic}
                  alt="profile-picture"
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "100%",
                  }}
                />
                <span
                  style={{
                    marginLeft: "5px",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}
                >
                  {Postdata.username}
                </span>
              </div>
              <textarea
                name="caption"
                id="caption"
                cols="40"
                rows="10"
                placeholder="Add Caption"
                onChange={HandleChange}
              >
                {Postdata.caption}
              </textarea>

              <button onClick={HandleSubmit} type="submit" method="POST">
                UPDATE
              </button>
              <button onClick={HandleDelete} type="submit" method="POST">
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
      {!Postdata && (
        <div className="loaderContainer">
          <div className="loader1"></div>
        </div>
      )}
    </>
  );
};

export default EditPost;
