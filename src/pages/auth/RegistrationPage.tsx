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
  Checkbox,
  Switch,
  Layout,
} from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { useMutation, gql } from "@apollo/client";
import { login, Register } from "../../app/Query";
import { useNavigate, Link } from "react-router-dom";
import { notification } from "../../app/Notifications";

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
  email?: string;
  password1?: string;
  fullName?: string;
  phoneNumber?: string;
  password2?: String;
  remember?: string;
};

export const RegistrationPage = () => {
  const [isloading, setisloading] = useState(false);
  const [userRegister, { data, loading, error }] = useMutation(Register);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<String>();
  const [sovereignty, setsovereignty] = useState("warning");
  const navigation = useNavigate();
  const { message, modal, notification } = App.useApp();

  // function onChange() {
  //   console.log(`switch to ${checked}`);
  // }

  const onFinish = async (values: FieldType) => {
    setisloading(true);
    try {
      const response = await userRegister({
        variables: {
          username: values.username,
          email: values.email,
          password1: values.password1,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          role: "3",
          password2: values.password2,
        },
      });
      //  console.log(response);

      const { error, user, token, success  } = response.data?.register;
      console.log(success);
    //   const showNotification = () => {
    //     notification.success({
    //       message: `Registration success`,
    //       description: 'You have been succesfully registered to e-Mzani!!',
    //       placement: 'topRight',
    //       type:"success"
    //     });
       
    //   };

      if (success) { 
        navigation("/login"); 
          notification.success(
            {
                message: `Registration success`,
                description: 'You have been succesfully registered to e-Mzani!!',
                placement: 'topRight',
            }
          );
         
      } else {
        setErrorMsg(error?.validationErrors[0].messages[0]);

      }
    } catch (error: any) {
     console.log(error);
     
    }
    setisloading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {/* <Row gutter={[24, 0]}>
                <Col span={6} xs={24} xl={6}>
                   
                </Col>
                <Col span={18} xs={24} xl={18} > */}
      <div className="w-full">
        <Layout.Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 8, offset: 2 }}
              md={{ span: 12 }}
              style={{ padding: 30 }}
              className="my-auto border-gray-100  border-r-2 shadow-lg rounded-lg mt-10"
            >
              <div className="">
                <h1 className="text-2xl m/font-bold">e-Mzani</h1>
                <Divider plain>
                  <span
                    style={{
                      color: "#CCC",
                      fontWeight: "normal",
                      fontSize: 14,
                    }}
                  >
                    Create account
                  </span>
                </Divider>
              </div>
              {errorMsg && (
                <h3 className="text-lg text-red-800 text-center whitespace-pre-wrap">{errorMsg}!!</h3>
              )}
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username "
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input placeholder="username" />
                </Form.Item>
                <Form.Item
                  className="username "
                  label="Email"
                  name="email"
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
                  className="username "
                  label="Full name"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="full name" />
                </Form.Item>
                <Form.Item
                  className="username "
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phoneNumber!",
                    },
                  ]}
                >
                  <Input placeholder="phone" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password1"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Repeat Password"
                  name="password2"
                  rules={[
                    {
                      required: true,
                      message: "Please input repeat password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
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
                      Signing up...
                    </Button>
                  ) : (
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      SIGN UP
                    </Button>
                  )}
                </Form.Item>
                <p className="font-semibold text-muted">
                  have an account?{" "}
                  <Link to="/login" className="text-dark font-bold">
                      Sign in
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
                    Sign up with
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
};
