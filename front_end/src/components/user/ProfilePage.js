import ProfileCSS from "../../Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faFileImage,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import {
  addComment,
  deleteComment,
  getComments,
} from "../../store/reducers/CommentReducers/comment";
import Comment from "../post/Comment";
import ProfileEditModal from "../modals/ProfileEdit";
import { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { Updateprofile } from "../../store/reducers/ProfileReducers/profile";
import PostDetailModal from "../modals/PostDetail";
import CropProfileImage from "./cropProfilePic";
import PostCreateModal from "../modals/PostCreateModal";

const ProfilePage = (props) => {
  const profile = props.profile;
  const user = props.user;
  const auth_user = props.auth_user;
  const posts = props.posts;
  //console.log("posts in profilepage is", posts);
  const [name, Setname] = useState(profile.name);
  const [bio, Setbio] = useState(profile.bio);
  const [file, Setfile] = useState(profile.profile_image);
  const [post, Setpost] = useState({});
  const [show, Setshow] = useState(false);
  const [showPost, SetshowPost] = useState(false);
  const [showProfilePic, SetshowProfilePic] = useState(false);
  const [comment, Setcomment] = useState("");
  const dispatch = useDispatch();

  let post_comments = [];
  post_comments = useSelector((state) => state.comment.comments);
  const HandleClick = (id) => {
    const postClicked = posts.find((post) => post._id === id);
    Setpost(postClicked);
    dispatch(getComments({ post_id: id }));
    SetshowPost(true);
  };

  const Addcomment = (post_id) => {
    //console.log(comment);
    if (comment.length) {
      const body = {
        comment: comment,
        user: auth_user._id,
        post: post._id,
        username: auth_user.username,
      };
      dispatch(addComment({ body }));
    }
  };
  console.log(post);

  const HandleCommentDelete = (comment) => {
    //console.log(comment);
    dispatch(deleteComment({ comment }));
  };

  const HandleChange = (e) => {
    e.preventDefault();
    console.log("in handle");
    if (e.target.name === "name") {
      Setname(e.target.value);
      //console.log(name);
    }
    if (e.target.name === "bio") Setbio(e.target.value);
  };

  const HandleSubmit = () => {
    //console.log(bio);
    const id = profile._id;
    dispatch(Updateprofile({ id, name, bio, file }));
    Setshow(false);
  };

  let followers = 0;
  let following = 0;

  if (profile) {
    //console.log(profile);
    followers = profile.followers.size;
    following = profile.following.size;
    if (!followers) followers = 0;

    if (!following) following = 0;
  }

  //console.log"Loading is", loading);
  return (
    <>
      {profile && (
        <div className={ProfileCSS["body-contain"]}>
          <header>
            <div className={ProfileCSS["container"]}>
              <div className={ProfileCSS["profile"]}>
                <div className={ProfileCSS["profile-image"]}>
                  <img
                    src={profile.profile_image}
                    alt=""
                    style={{ height: "150px", width: "150px" }}
                  />
                </div>

                <div className={ProfileCSS["profile-user-settings"]}>
                  <h3
                    className={ProfileCSS["profile-user-name"]}
                    style={{
                      fontSize: "25px",
                      fontFamily: "Trebuchet MS",
                    }}
                  >
                    {user.username}{" "}
                  </h3>
                  {props.user._id === props.auth_user_id && (
                    <button
                      class={ProfileCSS["btn profile-settings-btn"]}
                      aria-label="profile settings"
                      onClick={() => Setshow(true)}
                      style={{
                        height: "30px",
                        width: "30px",
                        marginLeft: "10px",
                        cursor: "pointer",
                        padding: "5px",
                        borderWidth: "1px",
                        borderColor: "gray",
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                </div>
                <div class={ProfileCSS["profile-stats"]}>
                  <ul>
                    <li>
                      <span class={ProfileCSS["profile-stat-count"]}>
                        {posts.length}
                      </span>{" "}
                      posts
                    </li>
                    <li>
                      <span class={ProfileCSS["profile-stat-count"]}></span>{" "}
                      {followers} followers
                    </li>
                    <li>
                      <span class={ProfileCSS["profile-stat-count"]}></span>{" "}
                      {following} following
                    </li>
                  </ul>
                </div>

                <div class={ProfileCSS["profile-bio"]}>
                  <p>
                    <span class={ProfileCSS["profile-real-name"]}>
                      {profile.name}
                    </span>
                    <br />
                    <pre>{profile.bio}</pre>
                  </p>
                </div>
              </div>
              {/* <!-- End of profile section --> */}
            </div>
            {/* <!-- End of container --> */}
          </header>

          <main>
            <div class={ProfileCSS["container"]}>
              <div class={ProfileCSS["gallery"]}>
                {posts.length != 0 &&
                  posts.map((post) => {
                    let likes = 0;
                    let comments = 0;

                    if (post.likes) likes = post.likes.length;

                    return (
                      <div
                        class={ProfileCSS["gallery-item"]}
                        tabIndex="0"
                        onClick={() => HandleClick(post._id)}
                      >
                        <img
                          src={post.post_img}
                          class={ProfileCSS["gallery-image"]}
                          alt=""
                        />

                        <div class={ProfileCSS["gallery-item-info"]}>
                          <ul>
                            <li class={ProfileCSS["gallery-item-likes"]}>
                              <span class={ProfileCSS["visually-hidden"]}>
                                Likes:
                              </span>
                              <FontAwesomeIcon icon={faHeart} />
                              <i
                                class={ProfileCSS["fas fa-heart"]}
                                aria-hidden="true"
                              ></i>{" "}
                            </li>
                            <li class={ProfileCSS["gallery-item-comments"]}>
                              <span class={ProfileCSS["visually-hidden"]}>
                                Comments
                              </span>
                              <FontAwesomeIcon icon={faComment} />
                              <i
                                class={ProfileCSS["fas fa-comment"]}
                                aria-hidden="true"
                              ></i>{" "}
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                {posts.length == 0 && <h4>No posts yet</h4>}
              </div>
            </div>
            {/* <!-- End of gallery --> */}

            <div class="loader"></div>

            {/* <!-- End of container --> */}
          </main>

          {/* Modals */}

          <ProfileEditModal
            title="Edit profile"
            onClose={() => Setshow(false)}
            show={show}
            HandleSubmit={HandleSubmit}
          >
            <img
              src={profile.profile_image}
              alt=""
              style={{ height: "150px", width: "150px", borderRadius: "50%" }}
            />
            <br />
            <button
              className="crop-btn"
              style={{ backgroundColor: "rgb(80, 158, 213)" }}
              onClick={() => SetshowProfilePic(true)}
            >
              <FontAwesomeIcon
                icon={faFileImage}
                style={{ height: "1.5rem" }}
              />
            </button>
            <br />
            <input
              name="name"
              type="text"
              placeholder="name"
              defaultValue={profile.name}
              onChange={(e) => HandleChange(e)}
              style={{ padding: "5px" }}
            />
            <br />
            <textarea
              name="bio"
              cols="40"
              rows="10"
              onChange={(e) => HandleChange(e)}
            >
              {profile.bio}
            </textarea>
          </ProfileEditModal>

          <PostCreateModal
            title="Select Profile Picture"
            onClose={() => SetshowProfilePic(false)}
            show={showProfilePic}
            HandleSubmit={HandleSubmit}
          >
            <CropProfileImage
              Setfile={Setfile}
              closeModal={() => SetshowProfilePic(false)}
            />
          </PostCreateModal>

          <PostDetailModal
            title="Post Details"
            onClose={() => {
              Setpost({});
              SetshowPost(false);
            }}
            show={showPost}
            HandleSubmit={HandleSubmit}
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
                  {post.likes ? post.likes.length : 0}{" "}
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
                username={auth_user.username}
              />
            </div>
          </PostDetailModal>

          {/*End of modals */}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
