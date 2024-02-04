import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayErr, setdisplayErr] = useState(false);
  const history = useHistory();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setemailErr("This field is required");
    } else if (!validateEmail(e.target.value)) {
      setemailErr("Please enter a valid email format");
    } else {
      setemailErr("");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordErr("This field is required");
    } else if (e.target.value.length < 8) {
      setPasswordErr("Password must contain at least 8 characters");
    } else {
      setPasswordErr("");
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const submitLogin = (e) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const user = allUsers.find(
        (user) => user.Email === email && user.Password === password
    );
    if (user) {
        history.push("/ProductList");
    } else {
        if (!displayErr) {
            setemailErr("Invalid Email");
            setPasswordErr("Invalid Password");
            setdisplayErr(true);
        }
    }
};
  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="col-md-6 shadow p-3 mb-5 bg-white rounded">
        <h3 className="text-center"
        style={{ color: 'transparent', backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)', WebkitBackgroundClip: 'text' }}>
        Login Form</h3>
            <form>
                <div className="mb-3">
                    <label className="form-label col-12 text-start">Email Address</label>
                    <input
                    type="text"
                    className="form-control col-12"
                    value={email}
                    onChange={handleEmailChange}/>
                    {emailErr && <p className="text-danger text-start">{emailErr}</p>}
                </div>
                <div className="mb-3">
                    <label className="form-label col-12 text-start">Password</label>
                    <div className="d-flex col-12">
                        <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={handlePasswordChange}/>
                        <button
                        type="button"
                        className="btn btn-outline-secondary border-0"
                        onClick={handleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {passwordErr && <p className="text-danger text-start">{passwordErr}</p>}
                </div>
                <button
                className="btn btn-primary col-12"
                type="submit"
                onClick={submitLogin}
                style={{
                    backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)',
                    color: '#fff',
                    border: 'none',}}>
                Login
            </button>
            <div>
              Don't have an account? 
              <Link style={{ color: 'transparent', backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)', WebkitBackgroundClip: 'text' }} 
              to="/SignUp"><b>Sign Up</b></Link>
            </div>
            </form>
        </div>
       </div>
    </>
  );
}

export default LogIn;
