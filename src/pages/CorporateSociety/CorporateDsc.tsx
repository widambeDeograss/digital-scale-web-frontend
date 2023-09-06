import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useMutation, gql, useQuery } from "@apollo/client";
import {corporates} from "../../app/Query";

type societyDataType = {
  id:String,
  name:String,
  district:String,
  region:String,
  farmersSet:Array<any>,
  corporatecropsSet:Array<any>
}
const CorporateDsc = () => {
  const {state} =useLocation()
  const cop_id = state?.copId
  const [societyData, setsocietyData] = useState<societyDataType>();
  const [isLoading, setisLoading] = useState(false);
  const {data, loading, error} = useQuery(corporates);
  const params = useParams();


  useEffect(() => {
    async function loadData() {
      if (cop_id) {
        // window.location.reload()
          const society =  await data?.corporateSocieties.find((soc:any) =>
              soc.id === cop_id
          )
          setsocietyData(society)
        // Check if role is defined here
      }
      else {
        console.log("Corporate data is not available yet");
      }
    }
    loadData()

  }, [cop_id])

  console.log(societyData);

  console.log(cop_id);
  return (
    <div>CorporateDsc</div>
  )
}

export default CorporateDsc
