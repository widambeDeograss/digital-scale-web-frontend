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
import { allCrops, AddFarmer, corporates, corporateBuys } from "../../app/Query";
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

  const renderDateTime = (dateString:any) => {
    const dateTime = new Date(dateString);
    return dateTime.toLocaleDateString();
  };


const { Column, ColumnGroup } = Table;
const CropSalesList = () => {
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
    const { data: buys } = useQuery(corporateBuys, {
        variables: { id: societyData?.id},
      });

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

   console.log(buys);
   

  return (
    <div>
       <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
        <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="All Crop sales"
            //   extra={
            //     <>
            //       <Radio.Group  defaultValue="a">
            //         {/* <Radio.Button value="a">REPORT</Radio.Button> */}
            //         <Radio.Button value="a"
            //          onClick={() => setopenMOdal(true)}
            //         >Add</Radio.Button>
            //       </Radio.Group>
            //     </>
            //   }
            >
              <div className="table-responsive">
                <Table dataSource={buys?.corporateSellsReceipt} sortDirections={['ascend']}>
                  <Column title="Receipt id" dataIndex="id" key="id" />
                  <Column title="Crop name" 
                  dataIndex="cropSold"
                  key="cropSold"
                  render={(crop) => <div>{crop?.crop.name} </div>}
                  />
                  <Column title="priceperkg" 
                  dataIndex="cropSold"
                  key="cropSold"
                  render={(crop) => <div>{crop?.crop.priceperkg} </div>}
                  />

                  <Column title="Farmer"
                  dataIndex="farmer"
                  key="farmer"
                  render={(farmer) => <div>{farmer?.farmer.fullName} </div>}
                  />
                  <Column title="Date" dataIndex="saledate" key="id" render={(date) => <div>{renderDateTime(date)}</div>} />
                  <Column title="Quantity" dataIndex="quantityInKg" key="quantityInKg" />
                  <Column title="Total payout" dataIndex="totalPay" key="totalPay" />
           
                 
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

export default CropSalesList

