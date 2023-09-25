import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Input, message } from "antd";
import { useQuery, useMutation,  } from "@apollo/client";
import { allCrops, addCrops, editCrops } from "../app/Query";
import Select from "react-select";

type modalType = {
  openMOdal: any;
  handleCancel: any;
  crop: any;
};

const CropsEditModal = ({
  openMOdal,
  handleCancel,
  crop,
}: modalType) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [role, setrole] = useState();
  const [crops, setcrops] = useState([]);
  const [modalText, setModalText] = useState("Content of the modal");
  const [editCrop, { data, loading }] = useMutation(editCrops);
  const [errorMsg, setErrorMsg] = useState<String>();
  console.log(crop);
  
  useEffect(() => {
    async function loadData() {}
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    setConfirmLoading(true);

    try {
      console.log(values);

      const response = await editCrop({
        variables: {
          id:crop,
          name: values.name,
          priceperkg: values.priceperKg,
          moisturePercentage: values.moisturePercentage,
        },
      });
      console.log(response);

      const { error, success } = response.data.editCrops;

      if (success) {
        //NOTIFACTION
        
        window.location.reload();
        message.success("crop added successfully");
      } else {
        setErrorMsg(error?.validationErrors[0].messages[0]);
      }
    } catch (error) {
      message.warning("failed to edit crop try again lated");
    }
    setConfirmLoading(false);
  };

  return (
    <div>
      <Modal
        title={`Edit crop: ${crop}`}
        visible={openMOdal}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[<div></div>]}
      >
         <div className="">
            {errorMsg && (
              <h3 className="text-lg text-red-800 text-center whitespace-pre-wrap">
                {errorMsg}!!
              </h3>
            )}
          </div>
        <Form onFinish={onFinish}>
         

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
            <Input placeholder="Crop name" />
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
            <Input placeholder="Price per kg" type="decimal" />
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
            <Input placeholder="moisturePercentage" type="decimal" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              {confirmLoading ? "Editing crop..." : "Edit crop"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CropsEditModal;
