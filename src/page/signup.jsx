import { Fragment, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import axios from "axios";
import { server } from "../App";
import { toast } from "react-toastify";
import { Spin } from "antd";
const title = "Register Now";
const btnText = "Get Started Now";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = location?.state;
  const [userData, setUserData] = useState({
    Name: "",
    UserName: "",
    Email: "",
    Password: "",
  });
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUserData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (!type) {
      navigate("/signUpas");
    }
    let { Name, UserName, Email, Password } = userData;
    if (!Name || !UserName || !Email || !Password) {
      toast("Please fill out your details", { type: "warning" });
      return;
    }
    if (UserName.length < 3) {
      alert("Please enter atleast 3 characters");
      return;
    }
    if (Password.length < 6) {
      alert("Password must be atleast 6 characters");
      return;
    }
    if (Password !== cPassword) {
      toast("Password does't match!", { type: "warning" });
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${server}auth/signup`,
        { ...userData, Type: type || "student" },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 201) {
        if (type === "college") {
          toast(`Welcome ${res.data.user.Name}`, { type: "success" });
          setIsLoading(false);
          navigate("/admin");
        } else {
          toast(`Welcome ${res.data.user.Name}`, { type: "success" });
          setIsLoading(false);
          navigate("/");
        }
        // alert("Welcome ",res.data.user.UserName);
      }
    } catch (err) {
      console.log(err);
      toast(err.response.data.Messege);
      setIsLoading(false);
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper" style={{ marginTop: "100px" }}>
            <h3 className="title">{title}</h3>
            <form className="account-form" onSubmit={handleSignUp}>
              <div className="form-group">
                <input
                  type="text"
                  name="Name"
                  placeholder={
                    type === "student" ? "Full Name" : "College Name"
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="UserName"
                  placeholder="User Name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <button className="lab-btn">
                  {isLoading ? (
                    <span>
                      <Spin /> Signing up...
                    </span>
                  ) : (
                    <span>Sign up</span>
                  )}
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Are you a member? <Link to="/login">Login</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default SignupPage;
