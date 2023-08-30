import Main from "../../layouts/farmer/Main";
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/AuthSlice";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Select,
  message,
  Divider,
  Button,
  Avatar,
  Typography,
  Empty,
  Tag,
  Space,
  Modal,
  List,
} from "antd";
import {
  allCropSales,
  allFarmers,
  farmerCropSales,
  meFarmer,
} from "../../app/Query";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import {
  SearchOutlined,
  StarOutlined,
  LogoutOutlined,
  FacebookFilled,
} from "@ant-design/icons";

type societyDataType = {
  id: String;
  name: String;
  district: String;
  region: String;
  farmersSet: any;
};

type farmerListType = {
  id: String;
  farmer: any;
  corporateSociety: any;
};
type userType = {
  email: String;
  firstName: String;
  fullName: String;
  id: String;
  phoneNumber: String;
  role: any;
  username: String;
};

const { Column } = Table;

const FarmerDashboard = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [userData, setuserData] = useState<userType>(currentUser?.user);
  const [societyData, setsocietyData] = useState<societyDataType>();
  const [FarmersData, setFarmersData] = useState();
  const onChange = (e: any) => console.log(`radio checked:${e.target.value}`);
  const { data: sales } = useQuery(allCropSales);
  const { data: farmers } = useQuery(allFarmers);
  const { loading, error, data } = useQuery(farmerCropSales, {
    variables: { farmer: currentUser?.user?.email },
  });
  const { data: meFarmerdata } = useQuery(meFarmer, {
    variables: { farmer: currentUser?.user?.email },
  });

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {}, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  console.log(meFarmerdata);

  return (
    <div>
      <Main>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-4/5 bg-transparent ">
            <div className="w-full h-0.5 bg-blue-500 "></div>
            {/* <div className="flex justify-between"> */}
            <div className="">
              <h2 className=" text-black text-left font-bold text-3xl mt-10">
                Welcome Back!
              </h2>
              <h2 className="text-black text-left font-bold text-xl mt-1">
                {meFarmerdata?.meFarmer[0].farmer.fullName}
              </h2>
            </div>
            <Divider orientation="left">Registered Corporate societies</Divider>
            <List
              size="small"
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              bordered
              dataSource={meFarmerdata?.meFarmer}
              renderItem={(item: any) => (
                <List.Item>
                  <div className="flex flex-row justify-around "><div>{item.corporateSociety?.name}</div><div className="ml-20">Wilaya:{item.corporateSociety?.region}</div></div>
                </List.Item>
              )}
            />
            <div></div>
            {/* </div> */}
            <div className="">
              <div className="border-b border-gray-200 shadow mt-10">
                <Card
                  bordered={false}
                  className="criclebox tablespace mb-24"
                  title="All your crop sale receipts"
                  extra={
                    <>
                      <Button.Group>
                        <Button value="a">ALL</Button>
                        {/* <Radio.Button> */}
                        <Select
                          defaultValue="recent"
                          style={{ width: 90, height: "auto" }}
                          // loading
                          options={[
                            { value: "recent", label: "recent" },
                            { value: "recent", label: "recent" },
                          ]}
                        />
                        {/* </Radio.Button> */}
                      </Button.Group>
                    </>
                  }
                >
                  <div className="table-responsive">
                    <Table dataSource={data?.farmerCropSale}>
                      <Column title="Farmer id" dataIndex="id" key="id" />
                      <Column
                        title="Farmer"
                        dataIndex="farmer"
                        key="farmer.id"
                        render={(farmer) => <div>{farmer?.fullName} </div>}
                      />
                      <Column
                        title="Phone"
                        dataIndex="farmer"
                        key="farmer.id"
                        render={(farmer) => <div>{farmer?.phoneNumber} </div>}
                      />
                      <Column
                        title="Date Joined"
                        dataIndex="farmer"
                        key="farmer.id"
                        render={(farmer) => <div>{farmer?.createdAt} </div>}
                      />
                      <Column
                        title="Corporate Society"
                        dataIndex="corporateSociety"
                        key="corporateSociety.name"
                        render={(corporateSociety) => (
                          <div>{corporateSociety?.name}</div>
                        )}
                      />
                      {/* <Column
                    title="Roles"
                    dataIndex="roles"
                    key="roles"
                    render={(roles) => (
                      <>
                        {roles?.map((role) => (
                          <Tag color="blue" key={role}>
                            {role === 1 ? "admin" : "user"}
                          </Tag>
                        ))}
                      </>
                    )}
                  /> */}
                      {/* 
                  {userRoles[0] === 1 ? (
                    <Column
                      title="Actions"
                      key="action"
                      render={(_, record) => (
                        <Space size="middle">
                          <Button
                            type="dashed"
                            onClick={() => {
                              
                            }}
                          >
                            Add Role
                          </Button>

                      
                        </Space>
                      )}
                    />
                  ) : (
                    <div></div>
                  )} */}
                    </Table>
                  </div>
                </Card>
              </div>
            </div>
            <div className="flex justify-between p-4">
              <div>
                <h3 className="text-xl">Terms And Condition :</h3>
                <ul className="text-xs list-disc list-inside">
                  <li>
                    All accounts are to be paid within 7 days from receipt of
                    invoice.
                  </li>
                  <li>
                    To be paid by cheque or credit card or direct payment
                    online.
                  </li>
                  <li>
                    If account is not paid within 7 days the credits details
                    supplied.
                  </li>
                </ul>
              </div>
              <div className="p-4">
                <h3>Signature</h3>
                <div className="text-4xl italic bg-blue-500">AAA</div>
              </div>
            </div>
            <div className="w-full h-0.5 bg-blue-500"></div>


          </div>
        </div>
      </Main>
    </div>
  );
};

export default FarmerDashboard;
