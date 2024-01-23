import { signInWithGoogle } from "../../services/authService";


// authActions.js

// src/redux/actions.js
export const login = (username, password) => async (dispatch) => {
  try {
    // Simulate an asynchronous request using fetch
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.log(response)
      throw new Error(`Login failed`);
    }

    // Assuming the server returns a user object and a token upon successful login
    const { user, token } = await response.json();

    // Store the token in localStorage for session management
    localStorage.setItem('token', token);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user }
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: { error: error.message }
    });
  }
};

export const signIn = (credentials) => async (dispatch) => {
  try {
    const response = await fetch('https://fakestoreapi.com/auth/login',{mode:'cors'}, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const user = await response.json();
      
      // Assuming your authentication response contains a token
      const { token } = user;

      // Save the token to local storage
      localStorage.setItem('token', token);

      dispatch({ type: 'SIGN_IN', payload: user });
    } else {
      // Handle authentication failure, e.g., show an error message
      console.error('Authentication failed:', response.statusText);
    }
  } catch (error) {
    console.error('Normal login error:', error);
  }
};




export const signInWithGoogleAction = () => async (dispatch) => {
  try {
    const user = await signInWithGoogle();
    dispatch({ type: "SIGN_IN", payload: user });

    const { token } = user;

    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Google login error:", error);
  }
};

export const signInWithFacebook = (facebookResponse) => async (dispatch) => {
  try {
    // Assuming facebookResponse contains user data
    dispatch({ type: "SIGN_IN", payload: facebookResponse });

    // Assuming your authentication response contains a token
    const { token } = facebookResponse;

    // Save the token to local storage
    localStorage.setItem("token", token);

    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        facebookUserId: facebookResponse.id,
        // Include any other required data for your login endpoint
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login endpoint response:", data);
    } else {
      console.error("Error while logging in:", response.statusText);
    }
  } catch (error) {
    console.error("Error while logging in:", error);
  }
};




