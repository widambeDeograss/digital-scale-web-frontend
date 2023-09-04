import {

  UserOutlined,
  WeiboOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import {
    Button,
    Divider,
    Form,
    Input,
    Space,
    App,
    Layout, Checkbox,
} from "antd";
import React, {useEffect} from 'react';
import { useState } from "react";
import type { CSSProperties } from "react";
import { Colors } from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { useMutation, gql } from "@apollo/client";
import { login } from "../../app/Query";
import { loginAuth } from "../../app/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import lott from "../../assets/lotties/singing-contract.json"
import Lottie from "lottie-react";

const { Content, Sider } = Layout;


type LoginType = "phone" | "account";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function LoginPage() {
  const [loginType, setLoginType] = useState<LoginType>("phone");
  const [isloading, setisloading] = useState(false);
  const [userLogin, { data, loading, error }] = useMutation(login);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<String>();
  const [sovereignty, setsovereignty] = useState("warning");
  const navigation = useNavigate();


    useEffect(() => {

        const handleResize = () => {
            const screenWidth = window.innerWidth;
            const leftSide:any = document.querySelector('.left-side');

            if (screenWidth < 768) {
                leftSide.style.display = 'none';
            } else {
                leftSide.style.display = 'block';
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


  const onFinish = async (values: FieldType) => {
      localStorage.clear()
    setisloading(true);
    try {
      const response = await userLogin({
        variables: {
          username: values.username,
          password: values.password,
        },
      });
      //  console.log(response);

      const { error, user, token } = response.data?.login;

      if (token) {
        console.log(user);
        const localStorageUser = {
          user: user,
        };
        localStorage.setItem("user", JSON.stringify(localStorageUser));
        const userdata = { user: user, token: token };
        localStorage.setItem("token", token);
        dispatch(loginAuth({ ...userdata }));
        if (user?.role === "A_1" || user?.role === "A_2") {
          navigation("/dashboard");
        } else {
          navigation("/farmers_dashboard");
        }
      } else {
        setErrorMsg(error?.validationErrors[0].messages[0]);
      }
    } catch (error: any) {
      setsovereignty("error");
      setErrorMsg(error.message);
    }
    setisloading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (

      <Layout style={{ minHeight: '100%' }}>
          <Sider
              width={500}
              style={{
                  background: "darkgray",
                  color: '#fff',
                  padding: '20px',
                  textAlign: 'center',
                  borderTopRightRadius: '20px',
                  borderBottomRightRadius: '20px',
              }}
              className="left-side"
          >
              <Lottie
                 animationData={lott}
                  height={200}
                  width={200}
                 loop={true}
              />
              {/* Add aligned content about the digital scale */}
              <div style={{ marginTop: '20px' }}>
                  <h1>e-Mzani</h1>
                  <h3>A bluetooth enabled digital scale</h3>
                  <p>Measure everything with precision.</p>
              </div>
          </Sider>
          <Content
              style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: '20px',
                  borderBottomLeftRadius: '20px',
              }}
          >
          <div className="w-2/3">
              <div className="fl">
                  <h1 className="text-xl font-bold text-center">e-Mzani</h1>
                  <Divider plain>
                  <span
                      style={{
                          color: "#CCC",
                          fontWeight: "normal",
                          fontSize: 14,
                      }}
                  >
                    Sign in to your account
                  </span>
                  </Divider>
              </div>

              <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
              >
                  <div className="">
                      {errorMsg && (
                          <h3 className="text-lg text-red-800 text-center whitespace-pre-wrap">
                              {errorMsg}!!
                          </h3>
                      )}
                  </div>
                  <Form.Item
                      className="username"
                      label="Email"
                      name="username"
                      rules={[
                          {
                              required: true,
                              message: "Please input your email!",
                          },
                      ]}
                  >
                      <Input placeholder="Email" type="email" className="" />
                  </Form.Item>

                  <Form.Item
                      className="username"
                      label="Password"
                      name="password"
                      rules={[
                          {
                              required: true,
                              message: "Please input your password!",
                          },
                      ]}
                  >
                      <Input.Password className=""/>
                  </Form.Item>

                  <Form.Item
                      name="remember"
                      className="aligin-center mt-10"
                      valuePropName="checked"
                  >
                      <Checkbox
                          defaultChecked
                          // style={{ backgroundColor: Colors.primary }}
                      />
                      Remember me
                  </Form.Item>

                  <Form.Item>
                      {loading ? (
                          <Button
                              style={{ width: "100%", backgroundColor:Colors.primary }}
                              type="primary"
                              htmlType="submit"
                              loading
                          >
                              Signing in...
                          </Button>
                      ) : (
                          <Button
                              style={{ width: "100%", backgroundColor:Colors.primary  }}
                              type="primary"
                              htmlType="submit"
                          >
                              SIGN IN
                          </Button>
                      )}
                  </Form.Item>
                  <p className="font-semibold text-muted">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-dark font-bold">
                          Sign Up
                      </Link>
                  </p>
              </Form>
              <div
                  style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                  }}
              >
                  <Divider plain>
                  <span
                      style={{
                          color: "#CCC",
                          fontWeight: "normal",
                          fontSize: 14,
                      }}
                  >
                    Sign in with
                  </span>
                  </Divider>
                  <Space align="center" size={24}>
                      <div
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              height: 40,
                              width: 40,
                              border: "1px solid #D4D8DD",
                              borderRadius: "50%",
                          }}
                      >
                          <GoogleOutlined
                              style={{ ...iconStyles, color: "#1677FF" }}
                          />
                      </div>
                      <div
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              height: 40,
                              width: 40,
                              border: "1px solid #D4D8DD",
                              borderRadius: "50%",
                          }}
                      >
                          <UserOutlined style={{ ...iconStyles, color: "#FF6A10" }} />
                      </div>
                      <div
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              height: 40,
                              width: 40,
                              border: "1px solid #D4D8DD",
                              borderRadius: "50%",
                          }}
                      >
                          <WeiboOutlined
                              style={{ ...iconStyles, color: "#333333" }}
                          />
                      </div>
                  </Space>
              </div>
          </div>
          </Content>
      </Layout>
  );
}
