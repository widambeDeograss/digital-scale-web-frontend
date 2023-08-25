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
import { allUsers, AddFarmer, corporates } from "../../app/Query";
import { useNavigate } from "react-router-dom";


type societyDataType = {
    id:String,
    name:String,
    district:String,
    region:String,
  }

const AddFarmers = () => {
    const { Title, Text } = Typography;
    const currentUser = JSON.parse(useSelector(selectCurrentUser));
    const [societyData, setsocietyData] = useState<societyDataType>();
    const [errorMsg, setErrorMsg] = useState<String>();
    const onChange = (e:any) => console.log(`radio checked:${e.target.value}`);
    const [isloading, setisloading] = useState(false);
    const {data:users, loading:loadingusers, error} = useQuery(allUsers);
    const [addFarmer, { data, loading }] = useMutation(AddFarmer);
    const {data:corporate} = useQuery(corporates);
    const [usersToselect, setusersToselect] = useState([])
    const [role, setrole] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
        async function loadData () {
        if (currentUser) {
            const { role } = currentUser.user;
           
            const arr:any = [];
            users?.users.map((user:any) => {
                if (user.role === "A_3") {
              return arr.push({ value: user.phoneNumber, label: user.fullName });
                }
            });
            setusersToselect(arr)
    
            if (role === "A_2") {
            const society =   corporate?.corporateSocieties.find((soc:any) => 
                 soc.admin.id === currentUser.user.id
            )
            setsocietyData(society)
            }
             // Check if role is defined here
          } else {
            console.log("User data is not available yet");
          }
      };
      loadData()
    }, [])
    

    
    const onFinish = async (values:any) => {
        setisloading(true);
        try {
      console.log(values);
      
        const response =  await addFarmer({ variables: {
            farmerPhone:values.farmerPhone.value,
            society:societyData?.name
         }});
         console.log(response);
         
         const { error, success } = response.data
  
          if (success) {
            //NOTIFACTION
            navigate("/farmers")
          } else {   
            setErrorMsg("something went wrong try again later!");
          }
    
        } catch (error:any) {
    
          setErrorMsg(error.message);
        }
        setisloading(false);
      };
    
      const onFinishFailed = (errorInfo:any) => {
        console.log("Failed:", errorInfo);
      };
  
  
  return (
    <div>
          <Card bordered={false} className=" h-full" title={societyData?.name + " Add Farmers"}>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="farmer"
                name="farmerPhone"
                rules={[
                  {
                    required: true,
                    message: "Please input farmer name!",
                  },
                ]}
              >
               
            <Select
              placeholder="Select an individual"
              name="farmerPhone"
              options={usersToselect}
              // isMulti
            />
              </Form.Item>
           

              <Form.Item>
                {isloading ? (
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    loading
                  >
                    adding Farmer...
                  </Button>
                ) : (
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Add Farmer
                  </Button>
                )}
              </Form.Item>
            </Form>

          </Card>
    </div>
  )
}

export default AddFarmers