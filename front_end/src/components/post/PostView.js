import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import PostDetailModal from "../modals/PostDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import {
  getPosts,
  likePost,
  dislikePost,
  deletePost,
} from "../../store/reducers/PostReducers/post";
import {
  addComment,
  getComments,
  deleteComment,
} from "../../store/reducers/CommentReducers/comment";

const Post = () => {
  const navigate = useNavigate();
  const [toggle, Settoggle] = useState(true);
  const [showComment, SetshowComment] = useState(false);
  const [comment, Setcomment] = useState("");
  const [post, Setpost] = useState({});
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")).user;
  let post_comments = [];
  useEffect(() => {
    //console.log("rendering");
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.post);
  const loading = useSelector((state) => state.post.loading);
  const HandleLike = (id) => {
    posts.data.map((post) => {
      if (post._id === id) {
        if (!post.likes.find((users) => users === user))
          dispatch(likePost({ id, user }));
      }
      return post;
    });

    //const posts = useSelector((state) => state.post);
  };
  post_comments = useSelector((state) => state.comment.comments);
  //console.log("post comments is", post_comments);

  const Addcomment = (post_id) => {
    //console.log(comment);
    if (comment.length) {
      const body = {
        comment: comment,
        user: user._id,
        post: post_id,
        username: user.username,
      };
      dispatch(addComment({ body }));
    }
  };

  const HandleCommentDelete = (comment) => {
    console.log(comment);
    dispatch(deleteComment({ comment }));
  };
  const HandleComment = (post_id) => {
    //console.log("in handle comment", post_id);
    const requiredPost = posts["data"].filter((_post) => _post._id === post_id);
    Setpost(requiredPost[0]);
    dispatch(getComments({ post_id }));
    SetshowComment(true);
  };

  const HandleCustomLike = (id) => {
    for (let i = 0; i < posts.data.length; i++) {
      if (
        posts.data[i]._id === id &&
        posts.data[i].likes.find((users) => {
          //console.log(users === user._id);
          return users === user._id;
        })
      ) {
        //console.log("disliking");
        const doc = document.getElementById(id + "heart");
        // doc.setAttribute("color", "#262626");
        // doc.setAttribute("fill", "#262626");
        // doc.setAttribute("stroke", "#262626");
        return HandleDisLike(id);
      }
    }
    //console.log("liking");
    const doc = document.getElementById(id + "heart");
    // doc.setAttribute("color", "red");
    // doc.setAttribute("fill", "red");
    // doc.setAttribute("stroke", "red");
    //console.log(doc);
    return dispatch(likePost({ id, user }));
  };
  const HandleDisLike = (id) => {
    dispatch(dislikePost({ id, user }));
    //const posts = useSelector((state) => state.post);
  };

  const HandleDelete = (id) => {
    //console.log("id", id);
    dispatch(deletePost({ id }));
  };

  const HandleDropdown = (id) => {
    const d = document.getElementById(id);
    if (toggle === false) {
      d.style.visibility = "hidden";
      Settoggle("true");
    } else {
      d.style.visibility = "visible";
      Settoggle(false);
    }
  };

  console.log(posts);
  return (
    <>
      <Navbar />
      {!loading && (
        <div className="Posts">
          {posts["data"].map((post) => {
            return (
              <>
                <PostCard
                  post={post}
                  HandleDelete={HandleDelete}
                  HandleLike={HandleLike}
                  HandleDropdown={HandleDropdown}
                  HandleCustomLike={HandleCustomLike}
                  HandleComment={HandleComment}
                  key={post._id}
                  user_id={user._id}
                  username={user.username}
                />
              </>
            );
          })}
          <PostDetailModal
            title="Comments"
            onClose={() => {
              SetshowComment(false);
              Setcomment("");
            }}
            show={showComment}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  src={post.post_img}
                  alt="post image"
                  style={{ height: "470px" }}
                />
                <div>
                  <FontAwesomeIcon icon={faHeart} />{" "}
                  {post.likes ? post.likes.length : 0}
                  <br />
                  <FontAwesomeIcon icon={faComment} />{" "}
                  {post_comments ? post_comments.length : 0}
                </div>
              </div>
              <Comment
                post={post}
                Setcomment={Setcomment}
                Addcomment={Addcomment}
                comments={post_comments}
                HandleCommentDelete={HandleCommentDelete}
                username={user.username}
              />
            </div>
          </PostDetailModal>
        </div>
      )}
      {loading && (
        <div className="loaderContainer">
          <div className="loader1"></div>
        </div>
      )}
    </>
  );
};

export default Post;
