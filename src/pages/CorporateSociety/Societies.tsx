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
  FloatButton,
  Button,
  Avatar,
  Typography,
  Empty,
  Tag,
  Space,
  Modal,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { corporates } from "../../app/Query";
import { allFarmers } from "../../app/Query";
import { type } from "os";
import { useNavigate } from "react-router-dom";
import CorporateEditModal from "../../components/CorporateEditModal";



type societyDataType = {
  id: String;
  name: String;
  district: String;
  region: String;
  farmersSet: any;
};

const renderDateTime = (dateString:any) => {
  const dateTime = new Date(dateString);
  return dateTime.toLocaleDateString();
};

const {Column} = Table;
const Societies = () => {
  const { Title, Text } = Typography;
  const currentUser = useSelector(selectCurrentUser);
  const [societyData, setsocietyData] = useState<societyDataType>();
  const { data, loading, error } = useQuery(corporates);
  const [reverse, setReverse] = useState(false);
  const [corporateEdit, setcorporateEdit] = useState(false);
  const [coptoEdit, setcoptoEdit] = useState();
  const [role, setrole] = useState("");
  const navigate = useNavigate();
  console.log(data);


  if (loading) {
   return(
    <h1>loading....</h1>
   )
  }

  return (
    <div>
       <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
        <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="All corporate societies"
              extra={
                <>
                  <Radio.Group  defaultValue="a">
                    {/* <Radio.Button value="a">REPORT</Radio.Button> */}
                    <Radio.Button value="a"
                    onClick={() => navigate("/addCorporates")}
                    >Add</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table dataSource={data.corporateSocieties}>
                  <Column title="Corporate id" dataIndex="id" key="id" />
                  <Column title="Corporate name" dataIndex="name" key="name" />
                  <Column
                    title="Corporate admin"
                    dataIndex="admin"
                    key="admin"
                    render={(admin) => <div>{admin?.fullName} </div>}
                  />
                     <Column title="Region" dataIndex="region" key="region" />
                     <Column title="District" dataIndex="district" key="district" />
                     <Column title="createdAt" dataIndex="createdAt" key="createdAt" render={(date) => <div>{renderDateTime(date)}</div>} />
                  <Column
                      dataIndex="id"
                      key="id"
                      render={(id) =>
                        <div>
                        <Button
                   onClick={ () => navigate("/corporate_descript", {state:{
                         copId:id
                     }})}
                 >View</Button
                 >
                 <Button
                   onClick={ () => {
                    console.log(id);
                    
                    setcoptoEdit(id);
                    setcorporateEdit(true)
                   }}
                 >Edit</Button
                 >
                     </div>
                      }
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
        </Col>
        </Row>
      <CorporateEditModal openMOdal={corporateEdit} handleCancel={()=>setcorporateEdit(!corporateEdit)} corporate={coptoEdit}/>

    </div>
  )
}

export default Societies
