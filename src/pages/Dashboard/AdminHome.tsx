import React, { useState, useEffect } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { Colors } from "../../constants/Colors";
import { selectCurrentUser } from "../../app/AuthSlice";
import { useSelector } from "react-redux";
import { useMutation, gql, useQuery } from "@apollo/client";
import {
  corporates,
  corporateSellsStats,
  adminMonthlyStats,
  admStats,
  meCorporate,
} from "../../app/Query";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { type } from "os";

const dollor = [
  <svg
    width="22"
    height="22"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
      fill="#fff"
    ></path>
    <path
      d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
      fill="#fff"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
      fill="#fff"
    ></path>
  </svg>,
];
const profile = [
  <svg
    width="22"
    height="22"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
      fill="#fff"
    ></path>
    <path
      d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
      fill="#fff"
    ></path>
    <path
      d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
      fill="#fff"
    ></path>
    <path
      d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
      fill="#fff"
    ></path>
  </svg>,
];
const heart = [<img src={require("../../assets/imgs/wheat-sack.png")}></img>];
const cart = [<img src={require("../../assets/imgs/plant (1).png")}></img>];

type societyDataType = {
  id: String;
  name: String;
  district: String;
  region: String;
  farmersSet: Array<any>;
  corporatecropsSet: Array<any>;
  admin: any;
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
const AdminHome = () => {
  const { Title, Text } = Typography;
  const currentUser = useSelector(selectCurrentUser);
  const [userData, setuserData] = useState<userType>(currentUser?.user);
  const [societyData, setsocietyData] = useState<societyDataType>();
  const { data, loading, error } = useQuery(corporates);
  const { data: chartData, loading: loadcharts } =
    useQuery(corporateSellsStats);
  const { data: chartDataLine } = useQuery(adminMonthlyStats);
  const { data: stats } = useQuery(admStats);
  const [reverse, setReverse] = useState(false);
  const [role, setrole] = useState("");
  const navigate = useNavigate();
  const { loading: loadcorporate, data: meCorporateSociety } = useQuery(
    meCorporate,
    {
      variables: { id: societyData?.id },
    }
  );

  const count = [
    {
      today: "Monthly Sales",
      title: stats?.admStatCounts?.monthSales,
      persent: "+30%",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "No Farmers",
      title: stats?.admStatCounts?.farmers,
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Crops sold in Kgs",
      title: stats?.admStatCounts?.cropsKgs,
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "No Crops",
      title: stats?.admStatCounts?.crops,
      icon: cart,
      bnb: "bnb2",
    },
  ];


  useEffect(() => {
    async function loadData() {
      if (currentUser) {
        await setuserData(currentUser.user);
      }
    }
    loadData();
  }, [currentUser]);

  useEffect(() => {
    if (userData === undefined) {
      // Perform the refresh action here
      window.location.reload();
    }
  }, [currentUser]);

  useEffect(() => {
    async function loadData() {
      if (userData) {
        const role = await userData.role;
        setrole(role);
        const cachedData = sessionStorage.getItem(`societyData_${currentUser.user.id}`);
        
        if (cachedData) {
          setsocietyData(JSON.parse(cachedData));
        } else if (role === "A_2") {
          const society = await data?.corporateSocieties.find((soc: any) => soc.admin.id === currentUser.user.id);
          setsocietyData(society);
          sessionStorage.setItem(`societyData_${currentUser.user.id}`, JSON.stringify(society));
        }
      } else if (role === "A_3") {
        navigate("/farmers_dashboard");
      } else {
        console.log("User data is not available yet");
      }
    }
  
    loadData();
  }, [currentUser, userData]);
  
  // useEffect(() => {
  //   async function loadData() {
  //     if (userData) {
  //       // window.location.reload()
  //       const role = await userData.role;
  //       setrole(role);
  //       const cachedData = sessionStorage.getItem(
  //         `societyData_${currentUser.user.id}`
  //       );
  //       if (cachedData) {
  //         setsocietyData(JSON.parse(cachedData));
  //         setrole(role);
  //         return;
  //       } 
  //       if (role === "A_2") {
  //         console.log("-----------------------");
         
  //         const society = await data?.corporateSocieties.find(
  //           (soc: any) => soc.admin.id === currentUser.user.id
  //         );
          
  //         setsocietyData(society);
  //         sessionStorage.setItem(
  //           `societyData_${currentUser.user.id}`,
  //           JSON.stringify(society)
  //         );
  //       }

  //       // Check if role is defined here
  //     } else if (role === "A_3") {
  //       navigate("/farmers_dashboard");
  //     } else {
  //       console.log("User data is not available yet");
  //     }
  //   }
  //   loadData();
  // }, [currentUser, userData, societyData]);

  // Prepare data for the chart
  const chartOptions: ApexCharts.ApexOptions = {
    xaxis: {
      categories: chartData?.corporateSells?.map(
        (item: { crop: any }) => item.crop
      ),
    },
  };

  // Define series data as an array of any[]
  const chartSeries: any[] = chartData?.corporateSells?.reduce(
    (
      series: { name: any; data: number[] }[],
      item: { name: any; percentage: string }
    ) => {
      const existingSeries = series.find((s) => s.name === item.name);
      if (existingSeries) {
        existingSeries?.data.push(parseFloat(item.percentage));
      } else {
        series.push({
          name: item.name,
          data: [parseFloat(item.percentage)],
        });
      }
      return series;
    },
    []
  );

  const chartOptionsCorporate: ApexCharts.ApexOptions = {
    xaxis: {
      categories: meCorporateSociety?.meCorporateCropSells?.map(
        (item: { crop: any }) => item.crop
      ),
    },
  };

  // Define series data as an array of any[]
  const chartSeriesCorporate: any[] =
    meCorporateSociety?.meCorporateCropSells?.reduce(
      (
        series: { name: any; data: number[] }[],
        item: { name: any; percentage: string }
      ) => {
        const existingSeries = series.find((s) => s.name === item.name);
        if (existingSeries) {
          existingSeries?.data.push(parseFloat(item.percentage));
        } else {
          series.push({
            name: item.name,
            data: [parseFloat(item.percentage)],
          });
        }
        return series;
      },
      []
    );

  // Prepare data for the line chart
  const chartOptionsline = {
    xaxis: {
      categories: chartDataLine?.calculateMonthlyPercentage?.map(
        (item: { month: any }) => item.month
      ),
    },
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return parseInt(value).toString(); // Convert to integer and then to string
        },
      },
    },
  };

  const chartSeriesline = [
    {
      name: "Percentage",
      data: chartDataLine?.calculateMonthlyPercentage?.map(
        (item: { percentage: any }) => item.percentage
      ),
    },
  ];

  if (loadcharts || loadcorporate) {
    return <h1>Loading.....</h1>;
  }
  // @ts-ignore
  return (
    <div>
      <div className="layout-content">
        {role === "A_1" && (
          <Row className="rowgap-vbox" gutter={[24, 0]}>
            {count.map((c, index) => (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={6}
                className="mb-24"
              >
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>{c.today}</span>
                        <h4  className="text-lg">
                          {c.title} <small className={c.bnb}></small>
                        </h4>
                      </Col>
                      <Col xs={6}>
                        <div
                          className="icon-box  p-3 "
                          style={{ background: Colors.primary }}
                        >
                          {" "}
                          <span className="icon">{c.icon}</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        {role === "A_2" && (
          <div>
            <h1 className=" font-bold md:text-2xl sm:text-lg">
              {societyData?.name}
            </h1>
            <h3 className=" font-light md:text-sm sm:text-xs ">
              Mkoa: {societyData?.region}
            </h3>
            <h3 className=" font-light md:text-sm sm:text-xs mb-2">
              Wilaya: {societyData?.district}
            </h3>
            <h3 className=" font-bold md:text-sm sm:text-xs mb-2">
              Admin: {societyData?.admin?.fullName} || Phone:{" "}
              {societyData?.admin?.phoneNumber}
            </h3>
            <hr />
            <Row className="rowgap-vbox mt-2" gutter={[24, 0]}>
              <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>No of Farmers </span>
                        <Title level={3}>
                          {societyData?.farmersSet?.length}
                        </Title>
                      </Col>
                      <Col xs={6}>
                        <div
                          className="icon-box  p-3 "
                          style={{ background: Colors.primary }}
                        >
                          {" "}
                          <span className="icon">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              key={0}
                            >
                              <path
                                d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
                                fill="#fff"
                              ></path>
                              <path
                                d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
                                fill="#fff"
                              ></path>
                              <path
                                d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
                                fill="#fff"
                              ></path>
                              <path
                                d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
                                fill="#fff"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>No of Crops </span>
                        <Title level={3}>
                          {societyData?.corporatecropsSet?.length}
                        </Title>
                      </Col>
                      <Col xs={6}>
                        <div
                          className="icon-box  p-3 "
                          style={{ background: Colors.primary }}
                        >
                          {" "}
                          <span className="icon">
                          <img src={require("../../assets/imgs/plant (1).png")}></img>
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>

            <div className="mt-10">
              <Card title="Crop sales statistics">
                <ReactApexChart
                  options={chartOptionsCorporate}
                  series={chartSeriesCorporate}
                  type="bar"
                  height={300}
                />
              </Card>
            </div>
          </div>
        )}
      </div>
      {role === "A_1" && (
        <Card title="Crop sales statistics">
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={300}
          />
        </Card>
      )}
      {role === "A_1" && (
        <Card title="Crop sales Liquidity" className="mt-10">
          <ReactApexChart
            options={chartOptionsline}
            series={chartSeriesline}
            type="line"
            height={300}
          />
        </Card>
      )}
    </div>
  );
};

export default AdminHome;
