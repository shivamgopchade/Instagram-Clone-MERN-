import img from "../../static/images/default.png";
import { useNavigate } from "react-router-dom";
import Postoptions from "./Postoptions";

const PostCard = ({
  post,
  HandleDelete,
  HandleLike,
  HandleCustomLike,
  HandleDropdown,
  user_id,
  username,
  SavePost,
  HandleComment,
}) => {
  const likes = post.likes;
  const navigate = useNavigate();
  const liked = post.likes.find((users) => {
    //console.log(users === user_id);
    return users === user_id;
  });
  let profile_image = post.profile_image ? post.profile_image : img;
  //console.log("post.profile:", post.profile);
  return (
    <div className="post-container">
      <div className="post-profile" style={{ position: "relative" }}>
        <div className="info" style={{ fontSize: "14px" }}>
          <img
            src={profile_image}
            alt="profile"
            style={{
              height: "40px",
              width: "40px",
              marginRight: "5px",
              borderRadius: "50%",
            }}
          />
          {post.user && (
            <a
              href={"/profile/" + post.user}
              style={{ textDecoration: "none", color: "black" }}
            >
              {post.username}
            </a>
          )}
          {!post.user && post.username}
        </div>
        <div
          className="edit-container"
          style={{ position: "absolute", right: "-40px", top: "10px" }}
        >
          <div className="postedit" onClick={() => HandleDropdown(post._id)}>
            ...
          </div>

          <div
            className="editpost-drop-down"
            id={post._id}
            style={{ fontSize: "14px" }}
          >
            {post.username === username && (
              <>
                <div
                  className="edit"
                  onClick={() => navigate(`/EditPost/${post._id}`)}
                >
                  EDIT
                </div>
                <div className="delete" onClick={() => HandleDelete(post._id)}>
                  DELETE
                </div>
              </>
            )}
            <div className="save" onClick={() => SavePost(post._id)}>
              SAVE
            </div>
          </div>
        </div>
      </div>
      <div className="post-media" onDoubleClick={() => HandleLike(post._id)}>
        <img src={post.post_img} alt="post" style={{ width: "470px" }} />
      </div>
      <div className="post-options">
        <Postoptions
          liked={liked}
          id={post._id}
          HandleCustomLike={HandleCustomLike}
        />
      </div>
      <div className="caption" style={{ fontSize: "14px" }}>
        <span style={{ fontWeight: "500" }}>
          {likes.length} likes
          <br />
          <b>{post.username}</b>
        </span>
        <pre style={{ fontFamily: "sans-serif" }}>{post.caption}</pre>
      </div>
      <div className="comments" style={{ fontSize: "14px" }}>
        <button
          onClick={() => HandleComment(post._id)}
          style={{ cursor: "pointer" }}
        >
          See comments
        </button>
      </div>
    </div>
  );
};

export default PostCard;
