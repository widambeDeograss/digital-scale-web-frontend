import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Input, message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { allCrops, addCorporateCrops } from "../app/Query";
import Select from "react-select";

type modalType = {
  openMOdal:any,
  handleCancel:any,
  corporate:any,
  corporateCropList:any  
}

const CorporateAddCropModal = ({ openMOdal, handleCancel,corporate, corporateCropList }:modalType) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [role, setrole] = useState();
    const [crops, setcrops] = useState([]);
    const [modalText, setModalText] = useState("Content of the modal");
    const {data:allcrops, loading:loadingcrops, error} = useQuery(allCrops);
    const [addCrop, { data, loading }] = useMutation(addCorporateCrops);
    const [errorMsg, setErrorMsg] = useState<String>();
  
   
    useEffect(() => {
        async function loadData () {
        if (allcrops) {
             
           const {crops}:any = allcrops
            const arr:any = [];
            
            

            const cropsNotINcorporate = crops.filter((crop:any) => !corporateCropList?.includes(crop));

            cropsNotINcorporate?.map((crop:any) => {
                return arr.push({ value: crop.id, label: crop.name });
            });
            setcrops(arr)
         
             // Check if role is defined here
          } else {
            console.log("User data is not available yet");
          }
      };
      loadData()
    }, [])
    

  
    const onFinish = async (values:any) => {
      setConfirmLoading(true);
    
  
      try {
    
        console.log(values);
      
        const response =  await addCrop({ variables: {
            crop:values.crop.value,
            corporate:corporate
         }});
         console.log(response);
         
         const { error, success } = response.data.addCorporateCrops
  
          if (success) {
            //NOTIFACTION
            message.success("crop added successfully")
            window.location.reload()
      } else{
        setErrorMsg("something went wrong try again")
      }
    
    }catch (error) {
        message.warning("failed to add role try again lated");
      }
      setConfirmLoading(false);
    }

  return (
    <div>
      <Modal
        title={corporate}
        visible={openMOdal}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[<div></div>]}
      >
        <Form onFinish={onFinish}>
        <div className="">
                   {errorMsg && (
                <h3 className="text-lg text-red-800 text-center whitespace-pre-wrap">{errorMsg}!!</h3>
              )}
                   </div>
          
          <Form.Item name="crop" label="Crop" rules={[{ required: true }]}>
               
          <Select
              placeholder="Select an individual"
              name="crop"
              options={crops}
              // isMulti
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
            {confirmLoading? "Adding crop...": "Add crop"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CorporateAddCropModal