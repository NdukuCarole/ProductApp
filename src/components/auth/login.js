import React, { useState } from "react";
import "./styles.css";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { login } from "../../redux/actions/authActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fbLogin, setfbLogin] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn, error } = useSelector((state) => state);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Handle the Google login response
  };

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    if (response.picture) {
      setPicture(response.picture.data.url);
    }
    if (response.accessToken) {
      localStorage.setItem("token", response.accessToken);
      setfbLogin(true);
    } else {
      setfbLogin(false);
    }
  };

  React.useEffect(() => {
    console.log("useEffect triggered:", isLoggedIn);
    if (isLoggedIn || localStorage.getItem("token") !== null) {
      console.log("Redirecting to /dashboard");
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

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
          <FacebookLogin
            cssClass="facebook-button"
            appId="339549065583499"
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={responseFacebook}
            icon="fa-facebook"
            size="40px"
          />
        </div>
    
        <div className="social2">
          <GoogleLogin
            className="google-login"
            clientId="1097806336705-j087fpku79nfn74j967klbtf4dbvju08.apps.googleusercontent.com"
            render={(renderProps) => (
              <button className="googleLogin" onClick={renderProps.onClick} st>Login with Google</button>
            )}
            buttonText="Sign in with Google"
            icon="fa-facebook"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
