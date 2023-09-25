import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Form,
  Input,
  Radio,
  Button,
  Timeline,
  Empty,
  Table
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
import { allCrops, AddFarmer, corporates } from "../../app/Query";
import { useNavigate } from "react-router-dom";
import CorporateAddCropModal from "../../components/CorporateAddCropModal";
import CropsAddModal from "../../components/CropAddModal";
import CropsEditModal from "../../components/CropEditModal";

type farmerListType = {
    id: String;
    farmer: any;
    corporateSociety: any;
  };

  type societyDataType = {
    id: String;
    name: String;
    district: String;
    region: String;
    farmersSet: any;
    corporatecropsSet:any
  };

const { Column, ColumnGroup } = Table;
const CorporateCrops = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [societyData, setsocietyData] = useState<societyDataType>();
    const [CropsData, setCropsData] = useState<farmerListType>();
    const { data, loading, error } = useQuery(corporates);
    const { data: crops } = useQuery(allCrops);
    const [reverse, setReverse] = useState(false);
    const [openMOdal, setopenMOdal] = useState(false);
    const [openCropEdit, setopenCropEdit] = useState(false);
    const [croptoEdit, setcroptoEdit] = useState();
    const [role, setrole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      if (currentUser) {
        const { role } = currentUser.user;
        setrole(role);
        console.log(role);
        setCropsData(crops?.farmers);
        if (role === "A_2") {
          const society = data?.corporateSocieties.find(
            (soc: any) => soc.admin.id === currentUser.user.id
          );
        }
        // Check if role is defined here
      } else {
        console.log("User data is not available yet");
      }
    }, [currentUser]);



  return (
    <div>
       <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
        <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="All crops"
              extra={
                <>
                  <Radio.Group  defaultValue="a">
                    {/* <Radio.Button value="a">REPORT</Radio.Button> */}
                    <Radio.Button value="a"
                     onClick={() => setopenMOdal(true)}
                    >Add</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table dataSource={crops?.crops}>
                  <Column title="Crop id" dataIndex="id" key="id" />
                  <Column title="Crop name" dataIndex="name" key="name" />
                  <Column title="priceperkg" dataIndex="priceperkg" key="priceperkg" />

                  <Column title="moisturePercentage" dataIndex="moisturePercentage" key="moisturePercentage" />
                  <Column
                      dataIndex="id"
                      key="id"
                      render={(id) =>
                        <div>
            
                 <Button
                   onClick={ () => {
                    setcroptoEdit(id);
                    setopenCropEdit(true);
                   }}
                     type="dashed" color="danger"
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
        <CropsAddModal openMOdal={openMOdal} handleCancel={()=> setopenMOdal(!openMOdal)} corporate={societyData?.name} corporateCropList={societyData?.corporatecropsSet}/>
        <CropsEditModal openMOdal={openCropEdit} handleCancel={()=>setopenCropEdit(!openCropEdit)} crop={croptoEdit}/>
        </Row>
    </div>
  )
}

export default CorporateCrops

