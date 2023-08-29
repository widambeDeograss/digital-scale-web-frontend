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
  Progress,
  Button,
  Avatar,
  Typography,
  Empty,
  Tag,
  Space,
  Modal,
  Popconfirm,
} from "antd";
import { corporates } from "../../app/Query";
import { allCropSales } from "../../app/Query";
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
  const [FarmersData, setFarmersData] = useState<farmerListType>();
  const onChange = (e: any) => console.log(`radio checked:${e.target.value}`);
  const { data, loading, error } = useQuery(corporates);
  const { data: sales } = useQuery(allCropSales);
  console.log(sales);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Main>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-4/5 bg-transparent ">
            <div className="w-full h-0.5 bg-indigo-500"></div>
            <div className="flex justify-between p-4">
              <div>
                <h6 className="font-bold">
                  Order Date :{" "}
                  <span className="text-sm font-medium"> 12/12/2022</span>
                </h6>
                <h6 className="font-bold">
                  Order ID :{" "}
                  <span className="text-sm font-medium"> 12/12/2022</span>
                </h6>
              </div>
              <div className="w-40">
                <address className="text-sm">
                  <span className="font-bold"> Billed To : </span>
                  Joe Smith 795 Folsom Ave San Francisco, CA 94107 P: (123)
                  456-7890
                </address>
              </div>
              <div className="w-40">
                <address className="text-sm">
                  <span className="font-bold">Ship To :</span>
                  Joe doe 800 Folsom Ave San Francisco, CA 94107 P: +
                  111-456-7890
                </address>
              </div>
              <div></div>
            </div>
            <div className="">
              <div className="border-b border-gray-200 shadow">
                <Card
                  bordered={false}
                  className="criclebox tablespace mb-24"
                  title="ALL Farmers Registered"
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
                    <Table dataSource={sales?.cropSalesList}>
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
                <div className="text-4xl italic text-indigo-500">AAA</div>
              </div>
            </div>
            <div className="w-full h-0.5 bg-indigo-500"></div>

            <div className="p-4">
              <div className="flex items-center justify-center">
                Thank you very much for doing business with us.
              </div>
              <div className="flex items-end justify-end space-x-3">
                <button className="px-4 py-2 text-sm text-green-600 bg-green-100">
                  Print
                </button>
                <button className="px-4 py-2 text-sm text-blue-600 bg-blue-100">
                  Save
                </button>
                <button className="px-4 py-2 text-sm text-red-600 bg-red-100">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

      
      </Main>
    </div>
  );
};

export default FarmerDashboard;
