import { signInWithGoogle } from "../../services/authService";
import { toast } from "react-toastify";

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`Login failed`);
    }
    const { token } = await response.json();

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {},
    });
    toast.success("Successful Login");

    localStorage.setItem("token", token);
    window.location.reload()
  } catch (error) {
    toast.error("Failed to Login");
    dispatch({
      type: "LOGIN_FAILURE",
      payload: { error: error.message },
    });
  }
};

export const logout = () => async () => {
  localStorage.removeItem("token");
  window.location.reload()
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
