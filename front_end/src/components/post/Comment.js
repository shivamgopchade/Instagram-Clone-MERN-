import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Comment = ({
  post,
  Setcomment,
  Addcomment,
  comments,
  HandleCommentDelete,
  username,
}) => {
  //console.log(comments);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "3px",
          border: "solid",
          borderWidth: "1px",
          borderColor: "rgb(199, 199, 199)",
          width: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottom: "solid",
            borderWidth: "1px",
            borderColor: "rgb(199, 199, 199)",
            padding: "5px",
          }}
        >
          <img
            src={post.profile_image}
            alt=""
            style={{
              borderRadius: "50%",
              height: "40px",
              width: "40px",
            }}
          />
          <span
            style={{
              fontFamily: "Roboto",
              marginLeft: "5px",
              fontWeight: "bold",
            }}
          >
            {post.username}
          </span>
        </div>
        <div className="comments-container">
          {comments.length !== 0 && (
            <div className="comment-section">
              {" "}
              {comments.map((comment) => {
                return (
                  <>
                    <div className="commentBox">
                      <div className="comment-text">
                        <a
                          href={"/profile/" + comment.user}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          {comment.username}:
                        </a>
                        <br /> {comment.comment}
                      </div>

                      {username === comment.username && (
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ cursor: "pointer" }}
                          onClick={() => HandleCommentDelete(comment)}
                        />
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          )}
          {comments.length === 0 && (
            <div className="comment-section">No comments</div>
          )}

          <div className="comment-input">
            <input
              type="text"
              name="comment"
              placeholder="type comment"
              onChange={(e) => {
                Setcomment(e.target.value);
              }}
            />
            <button
              onClick={() => Addcomment(post._id)}
              style={{ cursor: "pointer" }}
            >
              add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
