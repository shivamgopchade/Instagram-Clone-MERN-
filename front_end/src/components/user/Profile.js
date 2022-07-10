import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useSelector, useDispatch } from "react-redux";
import ProfilePage from "./ProfilePage";
import { useParams } from "react-router-dom";
import { Getprofile } from "../../store/reducers/ProfileReducers/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const dispatch = useDispatch();
  const auth_user = JSON.parse(localStorage.getItem("user")).user;
  const auth_user_id = auth_user._id;
  const user_id = useParams().id;
  useEffect(() => {
    dispatch(Getprofile({ user_id }));
  }, [dispatch]);
  const profiles = useSelector((state) => state.profile.profile);
  const users = useSelector((state) => state.profile.user);
  const loading1 = useSelector((state) => state.profile.loading);
  const posts = useSelector((state) => state.post.data);
  const loading2 = useSelector((state) => state.post.loading);
  const loading = loading1 || loading2;
  //console.log(posts);
  //console.log("loading is", loading1, loading2, loading);
  return (
    <>
      <Navbar />
      {loading && (
        <div className="loaderContainer">
          <div className="loader1"></div>
        </div>
      )}
      {!loading && (
        <ProfilePage
          user={users}
          profile={profiles}
          posts={posts}
          auth_user={auth_user}
          auth_user_id={auth_user_id}
        />
      )}
    </>
  );
};

export default Profile;
