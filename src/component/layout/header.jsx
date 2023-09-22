import logo from "../../assets/images/logo/logo.png";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import "./style.css";
import AuthContext from "../../context/authContext";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { server } from "../../App";
import { PiStudentDuotone } from "react-icons/pi";
import { AntDesignOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar } from 'antd';
import { Popover } from 'antd';


// import React, { useState } from "react";
import { Button, Modal } from "antd";

import studentImage from "./student.png";
import universityImage from "./university.png";

const phoneNumber = "+800-123-4567 6587";
const address = "Beverley, New York 224 USA";

let socialList = [
  {
    iconName: "icofont-facebook-messenger",
    siteLink: "#",
  },
  {
    iconName: "icofont-twitter",
    siteLink: "#",
  },
  {
    iconName: "icofont-vimeo",
    siteLink: "#",
  },
  {
    iconName: "icofont-skype",
    siteLink: "#",
  },
  {
    iconName: "icofont-rss-feed",
    siteLink: "#",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFiexd, setHeaderFiexd] = useState(false);
  const [auth, refetch, isLoading] = useContext(AuthContext);
  const { authenticated, user } = auth;
  const [type, setType] = useState("student");
  const [option, setOption] = useState("/login");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: profile, isLoading: isLoading2 } = useQuery(["profile"], async () => {
    try {
      const res = await axios.get(`${server}auth/isauth`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log(res.data.user);
        return res.data.user;
      }
      return {};
    } catch (err) {
      return {};
    }
  });
  if (isLoading) return <p>Loading...</p>;



  /* const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }; */

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {

    navigate(option, {
      state: {
        type,
      }
    });
  };

  const content = (
    <div>
      <p>
        <button>
          <NavLink to="/editProfile">Edit Profile</NavLink>
        </button>

      </p>
      <p>
        <li>

          <button className="logout-btn" onClick={() => setIsModalOpen2(true)}>
            <MdLogout />
            Log Out
          </button>
          <Modal
            style={{ top: 300 }}
            title="Confirm Logout"
            open={isModalOpen2}
            onOk={logout}
            onCancel={() => setIsModalOpen2(false)}
          >
            <p>Are you sure, you want to log out?</p>
          </Modal>
        </li>
      </p>
    </div>
  );
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFiexd(true);
    } else {
      setHeaderFiexd(false);
    }
  });

  async function logout() {
    try {
      const res = await axios.get(`${server}auth/logout`, {
        withCredentials: true,
      });
      console.log(res);
      if (res.status === 204) {
        refetch();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  // const buttonStyle = {
  //   // backgroundColor: 'red', // Customize the background color
  //   // color: 'white', // Customize the text color
  //   // border: '2px solid black', // Customize the border
  //   // // Add any other styles you want here
  //   //   borderRadius: "10px",
  //   // padding: "20px 18px",
  //   // background: "transparent",
  //   // color: "#000",
  //   // border: "1px solid #000",
  //   // marginTop: "4px",
  //   // borderRadius: "10px",
  //   // // marginRight: "20px",
  //   // padding: "12px 22px",
  //   // paddingBottom: "12px 22px",
  //   // height: "30px",
  //   // background: "#dc2f02",
  //   // color: "#fff",
  //   // marginTop: "4px",
  //   // marginLeft: "300px",

  // };

  return (
    <header
      className={`header-section ${headerFiexd ? "header-fixed fadeInUp" : ""}`}
      style={{ marginTop: "-10px" }}
    >
      <div
        className={`header-top ${socialToggle ? "open" : ""}`}
        style={{ visibility: "hidden" }}
      >
        <div className="container" >
          <div className="header-top-area">
            <ul className="lab-ul left">
              <li>
                <i className="icofont-ui-call"></i> <span>{phoneNumber}</span>
              </li>
              <li>
                <i className="icofont-location-pin"></i> {address}
              </li>
            </ul>
            <ul className="lab-ul social-icons d-flex align-items-center">
              <li>
                <p>Find us on : </p>
              </li>
              {socialList.map((val, i) => (
                <li key={i}>
                  <a href={val.siteLink}>
                    <i className={val.iconName}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="header-bottom" >
        <div className="container" style={{
          maxWidth: '100%',
          width: "100%",
          margin: '0',
          display: 'flex',

        }}>
          <div className="header-wrapper" style={{
            width: "100%",
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',

          }}>
            <div className="logo" style={{
              marginLeft: "4rem"
            }} >
              <Link to="/">
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    width: "300px",

                  }}
                />
              </Link>
            </div>
            <div className="menu-area" >
              <div className="menu" >
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li className="">
                    <NavLink to="/">Home</NavLink>
                    {/* role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="0,0" */}
                    {/* <ul className="lab-ul dropdown-menu">
                                            <li><NavLink to="/">Home One</NavLink></li>
                                            <li><NavLink to="/index-2">Home Two</NavLink></li>
                                            <li><NavLink to="/index-3">Home Three</NavLink></li>
                                            <li><NavLink to="/index-4">Home Four</NavLink></li>
                                            <li><NavLink to="/index-5">Home Five</NavLink></li>
                                            <li><NavLink to="/index-6">Home Six</NavLink></li>
                                            <li><NavLink to="/index-7">Home Seven</NavLink></li>
                                        </ul> */}
                  </li>

                  <li>
                    <NavLink to="/course">Projects</NavLink>
                  </li>


                  {/* <li className="menu-item-has-children">
                                        <a href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="0,0">Blog</a>
                                        <ul className="lab-ul dropdown-menu">
                                            <li><NavLink to="/blog">Blog Grid</NavLink></li>
                                            <li><NavLink to="/blog-2">Blog Style 2</NavLink></li>
                                            <li><NavLink to="/blog-3">Blog Style 3</NavLink></li>
                                            <li><NavLink to="/blog-single">Blog Single</NavLink></li>
                                        </ul>
                                    </li> */}

                  <li className="">
                    {/* <a href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="0,0">About</a> */}
                    {/* <ul className="lab-ul dropdown-menu">
                                            <li><NavLink to="/about">About</NavLink></li>
                                            <li><NavLink to="/team">Team</NavLink></li>
                                            <li><NavLink to="/instructor">Instructor</NavLink></li>
                                            <li><NavLink to="/shop">Shop Page</NavLink></li>
                                            <li><NavLink to="/shop-single">Shop Details Page</NavLink></li>
                                            <li><NavLink to="/cart-page">Shop Cart Page</NavLink></li>
                                            <li><NavLink to="/search-page">Search Page</NavLink></li>
                                            <li><NavLink to="/search-none">Search None</NavLink></li>
                                            <li><NavLink to="/404">404</NavLink></li>
                                        </ul> */}
                  </li>
                  <li>
                    <NavLink to="/college">College</NavLink>
                  </li>

                  <li>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>



                  {authenticated ? (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <li>
                        <Link
                          to="/addproject"
                          className="addproject md:mr sm:mr-0"
                          style={{
                            borderRadius: "8px",
                            marginRight: "40px",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "20px",
                            padding: '17px 16px'

                          }}
                        >
                          <span className="flex items-center ">
                            {" "}
                            <AiOutlinePlus
                              style={{
                                fontSize: "1.2rem",
                                marginTop: "2px",
                                marginRight: "4px",
                              }}
                            />{" "}
                            ADD PROJECT
                          </span>{" "}
                        </Link>
                      </li>

                      <li >
                      <Popover content={content}>
                        <NavLink to="/team-single">
                          
                            {
                              profile?.Pic ? <Avatar style={{ marginLeft: "1.2rem", width: "3.5rem", height: "3.5rem" }} src={profile?.Pic} /> : <Avatar style={{ marginLeft: "1.2rem" }} icon={<AntDesignOutlined />} />
                            }
                         

                        </NavLink>
                        </Popover>




                      </li>
                    </div>
                  ) : (
                    <>
                      <li>
                        {" "}
                        <button
                          onClick={() => {
                            setOption("/login");
                            showModal();
                          }}
                          style={{
                            borderRadius: "10px",
                            marginRight: "20px",
                            padding: "12px 22px",
                            background: "#dc2f02",
                            color: "#fff",
                            marginTop: "4px",
                          }}
                        >
                          <i className="icofont-user"></i> <span>LOG IN</span>{" "}
                        </button>
                      </li>
                      <li>
                        <button
                          className="signup"
                          onClick={() => {
                            setOption("/signup");
                            showModal();
                          }}
                          style={{
                            backgroundColor: "transparent",
                            color: "black",
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "12px 18px",
                            marginTop: "4px",
                            height: "47px",
                          }}
                        >
                          <i
                            className="icofont-users"
                            style={{ fontSize: "1rem", margin: "0 10px" }}
                          ></i>
                          <span>SIGN UP</span>
                        </button>
                      </li>
                    </>
                  )}
                </ul>
                <Modal
                  title="Select type"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <div>
                    <div
                      onClick={() => {
                        setType("student")
                      }}
                      className="modal_popUP bg-lime-500"
                      style={{
                        // paddingTop: "20px",
                        border: `${type === 'student' ? "1px solid grey" : ""}`,
                        borderRadius: "5px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "10px",
                        cursor: "pointer"
                      }}
                    >
                      {/* PiStudentDuotone */}
                      <PiStudentDuotone
                        // src={studentImage}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          color: "orangered",
                          // borderRadius: "50%",
                          border: "1px solid orange",
                        }}
                      ></PiStudentDuotone>
                      <div
                        style={{
                          fontSize: "20px",
                          paddingLeft: "30px",
                          paddingTop: "10px",
                        }}
                      >
                        Student
                      </div>
                    </div>

                    <div
                      className={`modal_popUP `}
                      onClick={() => setType("college")}
                      style={{
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "10px",
                        marginTop: "10px",
                        border: `${type === 'college' ? "1px solid grey" : ""}`,
                        borderRadius: "5px",
                      }}
                    >
                      <img
                        src={universityImage}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          border: "1px solid orange",
                        }}
                      ></img>
                      <div
                        style={{
                          fontSize: "20px",
                          paddingLeft: "30px",
                          paddingTop: "10px",
                        }}
                      >
                        College
                      </div>
                    </div>
                  </div>
                </Modal>
                {/*    <Drawer title="" placement="right" onClose={onClose} open={open}>
                <NavLink to="/team-single">Profile</NavLink><br/>
                <NavLink to="/editProfile">Edit Profile</NavLink><br/>
                <NavLink to="/">Home</NavLink>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Drawer> */}
              </div>
              <div
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
                onClick={() => setMenuToggle(!menuToggle)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div
                className="ellepsis-bar d-lg-none"
                onClick={() => setSocialToggle(!socialToggle)}
              >

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
