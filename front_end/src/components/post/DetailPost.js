import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
const DetailPost = () => {
  const navigate = useNavigate();
  const [Postdata, Setdata] = useState(null);
  const { id } = useParams();
  console.log(id);

  const HandleDelete = (id) => {
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
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (res.status === 200) Setdata(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      {Postdata && (
        <div>
          <h2>{Postdata.caption}</h2>{" "}
          <img src={Postdata.post_img} alt="post image" />
          <button type="submit" onClick={() => HandleDelete(Postdata._id)}>
            Delete Post
          </button>
        </div>
      )}
      {!Postdata && <h2>No posts</h2>}
    </>
  );
};

export default DetailPost;
