import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import Profile from "./components/user/Profile";
import PostView from "./components/post/PostView";
import CreatePost from "./components/post/CreatePost";
import DetailPost from "./components/post/DetailPost";
import Signout from "./components/user/Signout";
import PageNotFound from "./components/PageNotFound";
import EditPost from "./components/post/EditPost";
import AuthUser from "./auth";

function App() {
  return (
    //<Router>

    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<AuthUser />}>
        <Route path="/home" element={<Home />} />

        <Route path="/signout" element={<Signout />} />

        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="/post" element={<PostView />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/detailPost/:id" element={<DetailPost />} />
        <Route path="/EditPost/:id" element={<EditPost />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    //</Router>
  );
}
export default App;
