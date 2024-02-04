import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function SignUp() {
    const history = useHistory();
    const [userData, setUserData] = useState({
        Name: "",
        Email: "",
        UserName: "",
        Password: "",
        ConfirmPassword: ""
    })
    const [errors, setErrors] = useState({
        NameErr: "",
        UserNameErr: "",
        EmailErr: "",
        PasswordErr: "",
        ConfirmPasswordErr: ""
    })
    const changeData = (e) => {
        if (e.target.name == "userEmail") {
            setUserData({
                ...userData,
                Email: e.target.value
            })
            setErrors({
                ...errors,
                EmailErr: e.target.value.length == 0 ? "This field is required": 
                e.target.value = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value) && 
                "Email is invalid"
            })
        } else if (e.target.name == "userpassword") {
            setUserData({
                ...userData,
                Password: e.target.value
            })
            setErrors({
                ...errors,
                PasswordErr: e.target.value.length == 0 ? "This field is required": 
                e.target.value.length < 8 ? "Password is less than 8":
                e.target.value = !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(e.target.value) && 
                "Password must contain at least one lowercase, one uppercase, one digit, one special character, and be at least 8 characters long"
            })
        } else if (e.target.name == "userConfirmPassword") {
            setUserData({
                ...userData,
                ConfirmPassword: e.target.value
            })
            setErrors({
                ...errors,
                ConfirmPasswordErr: e.target.value.length == 0 ? "This Field is required": 
                e.target.value != userData.Password && "Password does not match"
            })
        } else if (e.target.name == "Name") {
            setUserData({
                ...userData,
                Name: e.target.value
            })
            setErrors({
                ...errors,
                NameErr: e.target.value.length == 0 && "This field is required"
            })
        }
        else if (e.target.name == "UserName") {
            setUserData({
                ...userData,
                UserName: e.target.value
            })
            setErrors({
                ...errors,
                UserNameErr: e.target.value.length == 0 ? "required User Name Field": 
                e.target.value = /\s/g.test(e.target.value) && "Username should not contain any spaces"
            })
        }
    }
    const submitUserData = (e) => {
        e.preventDefault()
        if (
            errors.NameErr ||
            errors.EmailErr ||
            errors.UserNameErr ||
            errors.PasswordErr ||
            errors.ConfirmPasswordErr
        ) {
            return;
        }
        const existingUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
        const updatedUsers = [...existingUsers, userData];
        localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
        history.push("/LogIn");
    }
    return (
        <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="m-4 p-4 bg-white rounded shadow col-6">
          <form onSubmit={submitUserData}>
            <h3
              className="text-center"
              style={{ color: 'transparent', backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)', WebkitBackgroundClip: 'text' }}>
              Signup Form
            </h3>
            <div className="mb-3">
              <label className="form-label col-12 text-start">Name</label>
              <input
                name="Name"
                className="form-control col-12"
                type="text"
                value={userData.Name}
                onChange={changeData}
              />
              <p className="text-danger text-start"> {errors.NameErr}</p>
            </div>
            <div className="mb-3">
              <label className="form-label col-12 text-start">Email Address</label>
              <input
                name="Email"
                className="form-control col-12"
                type="text"
                value={userData.Email}
                onChange={changeData}
              />
              <p className="text-danger text-start"> {errors.EmailErr}</p>
            </div>
            <div className="mb-3">
              <label className="form-label col-12 text-start">Username</label>
              <input
                name="UserName"
                className="form-control col-12"
                type="text"
                value={userData.UserName}
                onChange={changeData}
              />
              <p className="text-danger text-start"> {errors.UserNameErr}</p>
            </div>
            <div className="mb-3">
              <label className="form-label col-12 text-start">Password</label>
              <input
                name="Password"
                className="form-control col-12"
                type="password"
                value={userData.Password}
                onChange={changeData}
              />
              <p className="text-danger text-start"> {errors.PasswordErr}</p>
            </div>
            <div className="mb-3">
              <label className="form-label col-12 text-start">Confirm Password</label>
              <input
                name="ConfirmPassword"
                className="form-control col-12"
                type="password"
                value={userData.ConfirmPassword}
                onChange={changeData}
              />
              <p className="text-danger text-start"> {errors.ConfirmPasswordErr}</p>
            </div>
            <button
              className="btn btn-primary col-12"
              style={{
                backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)',
                color: '#fff',
                border: 'none'
              }}
              onClick={submitUserData}
            >
              SignUp
            </button>
            <div>
              Already have an account?
              <Link style={{ color: 'transparent', backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)', WebkitBackgroundClip: 'text' }} 
              to="/LogIn"><b>Login</b></Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default SignUp;
