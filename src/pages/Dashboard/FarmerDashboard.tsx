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
import ReceiptModal from "../../components/ReceiptModal";

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
type   receiptData ={
  id: string;
  quantityInKg: string;
  totalPay: string;
  saledate: string;
  cropSold: {
    crop: {
      name: string;
      priceperkg: string;
      moisturePercentage: string;
    };
    corporate: {
      name: string;
      region: string;
      district: string;
    };
  };
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
  const [modalVisible, setModalVisible] = useState(false);
  const [receiptToView, setReceiptToView] = useState<receiptData | null>()

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    if (userData === undefined) {
      // Perform the refresh action here
      window.location.reload();
    }
  }, [currentUser]); // This effect depends on the 'role' variable

  // Simulate setting the role to undefined after a delay
  setTimeout(() => {

  }, 5000);

  const openReceiptModal = () => {
    setModalVisible(true);
  };

  const closeReceiptModal = () => {
    setModalVisible(false);
  };
  const viewReceipt = async (id:String) => {
    const rscdata = await data?.farmerCropSale.find((soc: any) => soc.id === id);
    setReceiptToView(rscdata);
    openReceiptModal()
    console.log(receiptToView)
  }

  if (loading) {
    return <h1>loading...</h1>;
  }

  console.log(data);

  // @ts-ignore
  // @ts-ignore
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
                        <Typography.Text className="mt-1 mr-2 font-extrabold">Filter:</Typography.Text>
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
                      <Column title="Receipt id" dataIndex="id" key="id" />
                      <Column
                        title="Crop sold"
                        dataIndex="cropSold"
                        key="cropSold"
                        render={(crop) => <div>{crop?.crop.name} </div>}
                      />
                      <Column
                        title="PriceperKg in Tzs"
                        dataIndex="cropSold"
                        key="cropSold"
                        render={(crop) => <div>{crop?.crop.priceperkg} </div>}
                      />
                      <Column
                          title="Moisture percentage"
                          dataIndex="cropSold"
                          key="cropSold"
                          render={(crop) => <div>{crop?.crop.moisturePercentage} </div>}
                      />
                          <Column title="Date" dataIndex="saledate" key="id" />
                      <Column title="Quantity in Kgs" dataIndex="quantityInKg" key="id" />
                      <Column title="Pay out in Tzs" dataIndex="totalPay" key="id" />
                      <Column
                          dataIndex="id" key="id"
                          title="Corporate Society"
                        render={(id) =>  <Button
                        onClick={() => {

                          viewReceipt(id)
                        }}
                          >View</Button>}
                      />

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
                    You have to be registered in a corporate to use the scale.
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

          <ReceiptModal visible={modalVisible} onCancel={closeReceiptModal} receiptData={receiptToView} />
          </div>
        </div>
      </Main>
    </div>
  );
};

export default FarmerDashboard;
