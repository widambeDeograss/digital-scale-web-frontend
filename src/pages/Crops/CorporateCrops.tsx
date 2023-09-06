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
import { selectCurrentUser } from "../../app/AuthSlice";
import { useSelector } from "react-redux";
import { useMutation, gql, useQuery } from "@apollo/client";
import { allCrops, AddFarmer, corporates } from "../../app/Query";
import { useNavigate } from "react-router-dom";
import CorporateAddCropModal from "../../components/CorporateAddCropModal";

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
    const { Title, Text } = Typography;
    const currentUser = useSelector(selectCurrentUser);
    const [societyData, setsocietyData] = useState<societyDataType>();
    const [CropsData, setCropsData] = useState<farmerListType>();
    const { data, loading, error } = useQuery(corporates);
    const { data: crops } = useQuery(allCrops);
    const [reverse, setReverse] = useState(false);
    const [openMOdal, setopenMOdal] = useState(false);
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
          setsocietyData(society);
        }
        // Check if role is defined here
      } else {
        console.log("User data is not available yet");
      }
    }, [currentUser]);

    console.log(societyData);

    if (societyData?.corporatecropsSet?.length === 0) {
      return (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
            marginLeft: "46%",
          }}
          description={
            <span>
              No <a href="#API">Crops in your corporate</a> at the moment
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
        <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={societyData?.name + ": Crops"}
              extra={
                <>
                  <Radio.Group  defaultValue="a">
                    <Radio.Button value="a">REPORT</Radio.Button>
                    <Radio.Button value="b"
                     onClick={() => setopenMOdal(true)}
                    >Add</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table dataSource={societyData?.corporatecropsSet}>
                  <Column title="Crop id" dataIndex="id" key="id" />
                  <Column
                    title="Crop"
                    dataIndex="crop"
                    key="farmer.id"
                    render={(crop) => <div>{crop?.name} </div>}
                  />
                  <Column
                    title="priceperkg"
                    dataIndex="crop"
                    key="crop.id"
                    render={(crop) => <div>{crop?.priceperkg} </div>}
                  />
                  <Column
                    title="moisturePercentage"
                    dataIndex="crop"
                    key="crop.id"
                    render={(crop) => <div>{crop?.moisturePercentage} </div>}
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
        <CorporateAddCropModal openMOdal={openMOdal} handleCancel={()=> setopenMOdal(!openMOdal)} corporate={societyData?.name} corporateCropList={societyData?.corporatecropsSet}/>
        </Row>
    </div>
  )
}

export default CorporateCrops

