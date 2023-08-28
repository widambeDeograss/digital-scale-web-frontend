import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/AuthSlice";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
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
import { useQuery } from "@apollo/client";
import { corporates } from "../../app/Query";
import { allFarmers } from "../../app/Query";
import { type } from "os";
import { useNavigate } from "react-router-dom";

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

const { Column, ColumnGroup } = Table;
const Farmers = () => {
  const { Title, Text } = Typography;
  const currentUser = JSON.parse(useSelector(selectCurrentUser));
  const [societyData, setsocietyData] = useState<societyDataType>();
  const [FarmersData, setFarmersData] = useState<farmerListType>();
  const onChange = (e: any) => console.log(`radio checked:${e.target.value}`);
  const { data, loading, error } = useQuery(corporates);
  const { data: farmers } = useQuery(allFarmers);
  const [reverse, setReverse] = useState(false);
  const [role, setrole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const { role } = currentUser.user;
      setrole(role);
      console.log(role);
      setFarmersData(farmers?.farmers);
      if (role === "A_2") {
        const society = data?.corporateSocieties.find(
          (soc: any) => soc.admin.id === currentUser.user.id
        );
        setsocietyData(society);
      }
      // Check if role is defined here
    } else {
      console.log("User data is not available yet");
    }
  }, [currentUser]);

  console.log(farmers?.farmers);

  if (societyData?.farmersSet.length === 0) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
          marginLeft: "46%",
        }}
        description={
          <span>
            No <a href="#API">Farmers in your corporate</a> at the moment
          </span>
        }
      >
        <Button
          type="primary"
          onClick={() => navigate("/addfarmer_to_society")}
        >
          Add Farmers Now
        </Button>
      </Empty>
    );
  }
  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
        {role === "A_1" && (
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="ALL Farmers Registered"
            extra={
              <>
                <Radio.Group onChange={onChange} defaultValue="a">
                  <Radio.Button value="a">REPORT</Radio.Button>
                  {/* <Button 
                  onClick={() => navigate("/addfarmer_to_society")}
                  >Add</Button> */}
                </Radio.Group>
              </>
            }
          >
            <div className="table-responsive">
              <Table dataSource={farmers?.farmers}>
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
          )}
           {role === "A_2" && (
              <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={societyData?.name + " Farmers"}
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">REPORT</Radio.Button>
                    <Radio.Button value="b"
                     onClick={() => navigate("/addfarmer_to_society")}
                    >Add</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table dataSource={societyData?.farmersSet}>
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
                    title="Email"
                    dataIndex="farmer"
                    key="farmer.id"
                    render={(farmer) => <div>{farmer?.email} </div>}
                  />
                  <Column
                    title="Date Joined"
                    dataIndex="farmer"
                    key="farmer.id"
                    render={(farmer) => <div>{farmer?.createdAt} </div>}
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
           )}
        </Col>
      </Row>
    </div>
  );
};

export default Farmers;
