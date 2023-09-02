import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
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
  Row,
  Col,
  Image,
  Switch,
  Layout,
} from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { useMutation, gql } from "@apollo/client";
import { login } from "../../app/Query";
import { log } from "console";
import { loginAuth } from "../../app/AuthSlice";
import { useNavigate, Link } from "react-router-dom";

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

  // function onChange() {
  //   console.log(`switch to ${checked}`);
  // }

  const onFinish = async (values: FieldType) => {
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
    <div>
      <div className="w-full">
        <Layout.Content className="signin">
          <Row gutter={[24, 0]} justify="space-around" className="">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
              style={{ padding: 30 }}
              className="my-auto border-gray-100  border-r-2 shadow-lg  rounded-lg mt-10"
            >
              <div className="">
                <h1 className="text-xl font-bold">e-Mzani</h1>
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
                  className="username "
                  label="Email"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" type="email" />
                </Form.Item>

                <Form.Item
                  className="username h-10"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password className="h-10"/>
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center mt-10"
                  valuePropName="checked"
                >
                  <Switch
                    defaultChecked
                    style={{ backgroundColor: Colors.primary }}
                  />
                  Remember me
                </Form.Item>

                <Form.Item>
                  {loading ? (
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                      loading
                    >
                      Signing in...
                    </Button>
                  ) : (
                    <Button
                      style={{ width: "100%" }}
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
            </Col>
          </Row>
        </Layout.Content>
      </div>

      {/* </Col>
            </Row> */}
    </div>
  );
}
