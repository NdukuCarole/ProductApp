import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useState, useEffect } from "react";
import axios from "axios";

// Component for Google Authentication
export default function GoogleAuth({responseGoogle, className}) {
    // State to hold user information and user profile
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    // Function to handle Google login
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            // Set user information when login is successful
            localStorage.setItem("token", codeResponse.access_token);
            setUser(codeResponse);
            console.log("code",codeResponse)
            // responseGoogle(codeResponse)
            window.location.reload();
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    // Effect to fetch user profile information after successful login
    useEffect(() => {
        if (user) {
            console.log(user)
        }
    }, [user]);

    // Effect to log profile information to the console when it changes
    useEffect(() => {
        console.log(profile);
    }, [profile]);

    // Function to log out the user from Google and reset the profile
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    // Render Google Sign In button
    return (
            <div  
                className={className}
                onClick={() => login()}
            >
                Google Sign In
            </div>
       
    );
}
