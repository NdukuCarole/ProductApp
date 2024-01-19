import React, { useState } from "react";
// import "./styles.css";
// import FacebookLogin from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from 'react-router-dom';

import { login } from "../../redux/actions/authActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  // const [data, setData] = useState({});
  // const [picture, setPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn, error } = useSelector((state) => state);

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(username, password));
  };

  // const responseFacebook = (response) => {
  //   console.log(response);
  //   setData(response);
  //   setPicture(response.picture.data.url);
  //   if (response.accessToken) {
  //     setLogin(true);
  //   } else {
  //     setLogin(false);
  //   }
  // };

  React.useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn)
      history.push('/dashboard');
    }
  }, [isLoggedIn, history])

  return (
    <div className="login-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Login Here</h3>

        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button onClick={handleLogin}>
          {" "}
          {isLoading ? "Logging in..." : "Log In"}
        </button>
        <div className="social">
          {/* <div class="go">
            <i class="fab fa-google"></i>Sign In Google
          </div>
          <div class="fb">
            <i class="fab fa-facebook"></i>Sign In Facebook
          </div> */}

          {/* <FacebookLogin
            appId="339549065583499"
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={responseFacebook}
            icon="fa-facebook"
          /> */}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
