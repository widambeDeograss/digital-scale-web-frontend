import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Form,
  Input,
  App,
  Button,
  Timeline,
  Radio,
} from "antd";
import Select from "react-select";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import { Colors } from "../../constants/Colors";
import { selectCurrentUser } from "../../app/AuthSlice";
import { useSelector } from "react-redux";
import { useMutation, gql, useQuery } from "@apollo/client";
import {
  allUsers,
  AddFarmer,
  corporates,
  createSociety,
} from "../../app/Query";
import { useNavigate } from "react-router-dom";

type societyDataType = {
  id: String;
  name: String;
  district: String;
  region: String;
};

const AddSociety = () => {
  const { Title, Text } = Typography;
  const currentUser = JSON.parse(useSelector(selectCurrentUser));
  const [societyData, setsocietyData] = useState<societyDataType>();
  const [errorMsg, setErrorMsg] = useState<String>();
  const onChange = (e: any) => console.log(`radio checked:${e.target.value}`);
  const [isloading, setisloading] = useState(false);
  const { data: users, loading: loadingusers, error } = useQuery(allUsers);
  const [addSoc, { data, loading }] = useMutation(createSociety);
  const { data: corporate } = useQuery(corporates);
  const [usersToselect, setusersToselect] = useState([]);
  const [role, setrole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      if (users) {
        const { role } = currentUser.user;

        const arr: any = [];
        users?.users.map((user: any) => {
          if (user.role === "A_3") {
            return arr.push({ value: user.email, label: user.fullName });
          }
        });
        setusersToselect(arr);

        if (role === "A_2") {
          const society = corporate?.corporateSocieties.find(
            (soc: any) => soc.admin.id === currentUser.user.id
          );
          setsocietyData(society);
        }
        // Check if role is defined here
      } else {
        console.log("User data is not available yet");
      }
    }
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    setisloading(true);
    try {
      console.log(values);

      const response = await addSoc({
        variables: {
          admin: values.admin.value,
          name: values.name,
          region: values.region,
          district: values.district,
        },
      });
      console.log(response);

      const { error, success } = response.data;

      if (success) {
        //NOTIFACTION
        navigate("/all_corporates");
      } else {
        setErrorMsg(error?.validationErrors[0].messages[0]);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    }
    setisloading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Card
        bordered={false}
        className=" h-full"
        title="Add a corporate society"
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="row-col"
        >
          {errorMsg && (
            <h3 className="text-lg text-red-800 text-center whitespace-pre-wrap">
              {errorMsg}!!
            </h3>
          )}
          <Form.Item
            className="username"
            label="Admin"
            name="admin"
            rules={[
              {
                required: true,
                message: "Please input admin name!",
              },
            ]}
          >
            <Select
              placeholder="Select an individual"
              name="admin"
              options={usersToselect}
              // isMulti
            />
          </Form.Item>

          <Form.Item
            className="username "
            label="Corporate name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Corporate name!",
              },
            ]}
          >
            <Input placeholder="Corporate name" />
          </Form.Item>
          <Form.Item
            className="username "
            label="Region"
            name="region"
            rules={[
              {
                required: true,
                message: "Please input your region!",
              },
            ]}
          >
            <Input placeholder="region" />
          </Form.Item>
          <Form.Item
            className="username "
            label="District"
            name="district"
            rules={[
              {
                required: true,
                message: "Please input district!",
              },
            ]}
          >
            <Input placeholder="district" />
          </Form.Item>
          <Form.Item>
            {isloading ? (
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                loading
              >
                adding corporate...
              </Button>
            ) : (
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Add corporate
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddSociety;
