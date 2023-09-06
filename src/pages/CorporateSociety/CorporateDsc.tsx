import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useMutation, gql, useQuery } from "@apollo/client";
import {corporates, meCorporate} from "../../app/Query";
import {Card, Col, Row, Typography} from "antd";
import {Colors} from "../../constants/Colors";
import ReactApexChart from "react-apexcharts";

type societyDataType = {
  id:String,
  name:String,
  district:String,
  region:String,
  farmersSet:Array<any>,
  corporatecropsSet:Array<any>
  admin:any
}
const CorporateDsc = () => {
  const { Title, Text } = Typography;
  const {state} =useLocation()
  const cop_id = state?.copId
  const [societyData, setsocietyData] = useState<societyDataType>();
  const [isLoading, setisLoading] = useState(false);
  const {data, loading, error} = useQuery(corporates);
  const { loading:loadcorporate, data:meCorporateSociety } = useQuery(meCorporate, {
    variables: { id: cop_id},
  });

  useEffect(() => {
    async function loadData() {
      setisLoading(true);
      if (cop_id) {
        // Attempt to retrieve the data from a previous session or cache.
        const cachedData = sessionStorage.getItem(`societyData_${cop_id}`);
        if (cachedData) {
          setsocietyData(JSON.parse(cachedData));
          setisLoading(false);
          return;
        }

        // If data is not cached, fetch it and then set it in the state.
        const society = await data?.corporateSocieties.find((soc: any) => soc.id === cop_id);
        if (society) {
          setsocietyData(society);
          // Cache the data for future use.
          sessionStorage.setItem(`societyData_${cop_id}`, JSON.stringify(society));
        }
        setisLoading(false);
      } else {
        console.log("Corporate data is not available yet");
      }
    }

    loadData();
  }, [cop_id, data]);

  console.log(societyData);
  console.log(meCorporateSociety)
  console.log(cop_id);
  if (loadcorporate  || isLoading){
    return (
        <h1>loading.....</h1>
    )
  }

  const chartOptionsCorporate: ApexCharts.ApexOptions = {
    xaxis: {
      categories: meCorporateSociety?.meCorporateCropSells?.map((item: { crop: any; }) => item.crop),
    },
  };

  // Define series data as an array of any[]
  const chartSeriesCorporate: any[] = meCorporateSociety?.meCorporateCropSells?.reduce((series: { name: any; data: number[]; }[], item: { name: any; percentage: string; }) => {
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
  }, []);
  return (
      <div>
        <h1 className=" font-bold md:text-2xl sm:text-lg">{societyData?.name}</h1>
        <h3 className=" font-light md:text-sm sm:text-xs ">Mkoa: {societyData?.region}</h3>
        <h3 className=" font-light md:text-sm sm:text-xs mb-2">Wilaya: {societyData?.district}</h3>
        <h3 className=" font-bold md:text-sm sm:text-xs mb-2">Admin: {societyData?.admin?.fullName}   ||  Phone: {societyData?.admin?.phoneNumber}</h3>
        <hr/>
        <Row className="rowgap-vbox mt-2" gutter={[24, 0]}>
          <Col
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
                    <span>No of Farmers </span>
                    <Title level={3}>
                      {societyData?.farmersSet?.length}
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box  p-3 " style={{background:Colors.primary}}> <span className="icon">
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
                            </span></div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col
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
                    <span>No of Crops </span>
                    <Title level={3}>
                      {societyData?.corporatecropsSet?.length}
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box  p-3 " style={{background:Colors.primary}}> <span className="icon">
 <svg
     width="22"
     height="22"
     viewBox="0 0 20 20"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     key={0}
 >
    <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
    ></path>
  </svg>
                            </span></div>
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
  )
}

export default CorporateDsc
