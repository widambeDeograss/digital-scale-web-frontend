import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Input, message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { allCrops, addCrops } from "../app/Query";
import Select from "react-select";

type modalType = {
  openMOdal:any,
  handleCancel:any,
  corporate:any,
  corporateCropList:any  
}

const CropsAddModal = ({ openMOdal, handleCancel,corporate, corporateCropList }:modalType) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [role, setrole] = useState();
    const [crops, setcrops] = useState([]);
    const [modalText, setModalText] = useState("Content of the modal");
    const [addCrop, { data, loading }] = useMutation(addCrops);
    const [errorMsg, setErrorMsg] = useState<String>();
  
   
    useEffect(() => {
        async function loadData () {
      };
      loadData()
    }, [])
    

  
    const onFinish = async (values:any) => {
      setConfirmLoading(true);
    
  
      try {
    
        console.log(values);
      
        const response =  await addCrop({ variables: {
            name:values.name,
            priceperkg:values.priceperKg,
            moisturePercentage:values.moisturePercentage
         }});
         console.log(response);
         
         const { error, success } = response.data.addCrops
  
          if (success) {
            //NOTIFACTION
            message.success("crop added successfully")
            window.location.reload()
      } else{
        setErrorMsg(error?.validationErrors[0].messages[0]);
      }
    
    }catch (error) {
        message.warning("failed to add role try again lated");
      }
      setConfirmLoading(false);
    }

  return (
    <div>
      <Modal
        title="Add crops"
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
          
                   <Form.Item
                    className="username "
                    label="Crop name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input crop name!",
                      },
                    ]}
                  >
                    <Input placeholder="Crop name"/>
                  </Form.Item>
                  <Form.Item
                    className="username "
                    label="Price per Kg"
                    name="priceperKg"
                    rules={[
                      {
                        required: true,
                        message: "Please input price!",
                      },
                    ]}
                  >
                    <Input placeholder="Price per kg" type="decimal"/>
                  </Form.Item>
                  <Form.Item
                    className="username "
                    label="Moisture percentage"
                    name="moisturePercentage"
                    rules={[
                      {
                        required: true,
                        message: "Please input moisturePercentage!",
                      },
                    ]}
                  >
                    <Input placeholder="moisturePercentage" type="decimal"/>
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

export default CropsAddModal