import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import "../css/SignupPage.css";

const URL = process.env.REACT_APP_API_URL;

const SignupForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { storeToken, isLoggedIn, authenticateUser } = useContext(AuthContext);

  const [user, setUser] = useState({
    dr_forename: "",
    dr_surname: "",
    title: "",
    specialty: "",
    hospital: "",
    years_expirience: "",
    phone_number: "",
    password: "",
    reenteredPassword: "",
    email_address: "",
  });

  const handleChange = (e) => {
    setUser((oldUser) => {
      return { ...oldUser, [e.target.name]: e.target.value };
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${URL}/auth/${isSignUp ? 'doctorSignup' : 'doctorLogin'}`, user)
    .then(response => {
      if(!isSignUp){
        storeToken(response.data.authToken)
        authenticateUser();
      }
      navigate('/');
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setError(errorDescription);
    })
  };
  if(!isLoggedIn){
    return (
      <form className="sign-up-form">

        <p className="error">{error}</p>
        <div
          style={{ display: `${isSignUp ? "block" : "none"}` }}
          className="input-field"
        >
          <input
            type="text"
            name="dr_forename"
            placeholder="First name"
            value={user.dr_forename}
            onChange={handleChange}
          />
        </div>
        <div
          style={{ display: `${isSignUp ? "block" : "none"}` }}
          className="input-field"
        >
          <input
            type="text"
            name="dr_surname"
            placeholder="Last name"
            value={user.dr_surname}
            onChange={handleChange}
          />
        </div>
        <div
          style={{ display: `${isSignUp ? "block" : "none"}` }}
          className="input-field"
        >
          <input
            type="text"
            name="title"
            placeholder="Mr./Ms./Mrs."
            value={user.title}
            onChange={handleChange}
          />
        </div>
        <div
          style={{ display: `${isSignUp ? "block" : "none"}` }}
          className="input-field"
        >
          <input
            type="text"
            name="specialty"
            placeholder="Specialty"
            value={user.specialty}
            onChange={handleChange}
          />
        </div>
        <div
          style={{ display: `${isSignUp ? "block" : "none"}` }}
          className="input-field"
        >
          <input
            type="text"
            name="hospital"
            placeholder="Hospital"
            value={user.hospital}
            onChange={handleChange}
          />
        </div>
        <div
          style={{ display: `${isSignUp ? "block" : "none"}` }}
          className="input-field"
        >
          <input
            type="text"
            name="years_expirience"
            placeholder="Years of Experience"
            value={user.years_expirience}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="email_address"
            placeholder="Email"
            value={user.email_address}
            onChange={handleChange}
          />
        </div>
        <div
          style={{ display: `${isSignUp ? "block" : "none"}` }}
          className="input-field"
        >
          <input
            type="text"
            name="phone_number"
            placeholder="Phone number"
            value={user.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div
          style={{ display: `${isSignUp ? "block" : "none"}` }}
          className="input-field"
        >
          <input
            type="password"
            name="reenteredPassword"
            placeholder="Re-enter password"
            value={user.reenteredPassword}
            onChange={handleChange}
          />
        </div>
        <div className="submit-field">
          <input
            type="button"
            value={`${isSignUp ? "Sign up" : "Sign in"}`}
            onClick={handleSubmit}
          />
        </div>
        <p>
          {isSignUp ? `Already have an account?` : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignUp((oldIsSignUp) => !oldIsSignUp)}>
            {isSignUp ? "Sign in" : "Sign up"}
          </span>
        </p>
        { error && <p className="error-message">{error}</p> }
      </form>
    );
  }else if(isLoggedIn){
    return (
      <form className="sign-up-form">
        <p>Already logged in!</p>
      </form>
    )
  }
}

const DoctorSignupPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="signup-form-container">
      {isLoggedIn &&
        <h1 style={{ color: "#635bff" }}>Welcome back Doctor!</h1>
      }{!isLoggedIn &&
        <>
          <h1 style={{ color: "#635bff" }}>Sign up to be a doctor at TeleCure!</h1>
          <SignupForm />
        </>
      }
    </div>
  );
};

export default DoctorSignupPage;
