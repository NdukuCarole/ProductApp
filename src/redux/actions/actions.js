
export const login = (username, password) => async (dispatch) => {
    try {
      // Simulate an asynchronous request using fetch
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
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
  