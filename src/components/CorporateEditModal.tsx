import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Input, message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { allCrops, addCrops, allUsers, editSociety } from "../app/Query";
import Select from "react-select";
import { selectCurrentUser } from "../app/AuthSlice";
import { useSelector } from "react-redux";

type modalType = {
  openMOdal: any;
  handleCancel: any;
  corporate: any;
};

const CorporateEditModal = ({
  openMOdal,
  handleCancel,
  corporate,
}: modalType) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const [role, setrole] = useState();
  const [crops, setcrops] = useState([]);
  const [modalText, setModalText] = useState("Content of the modal");
  const [editSoc, { data, loading }] = useMutation(editSociety);
  const { data: users, loading: loadingusers, error } = useQuery(allUsers);
  const [errorMsg, setErrorMsg] = useState<String>();
  const [usersToselect, setusersToselect] = useState([]);
  console.log(corporate);
  
  useEffect(() => {
    async function loadData() {
      if (users) {
        const { role } = currentUser.user;

        const arr: any = [];
        users?.users.map((user: any) => {
          if (user.role === "A_3") {
            return arr.push({ value: user.email, label: user.fullName });
          }
        });
        setusersToselect(arr);

        // Check if role is defined here
      } else {
        console.log("User data is not available yet");
      }
    }
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    setConfirmLoading(true);
    try {
        console.log(corporate);
        
      console.log(values);

      const response = await editSoc({
        variables: {
            id:corporate,
          admin: values.admin.value,
          name: values.name,
          region: values.region,
          district: values.district,
        },
      });
      console.log(response);

      const { error, success } = response?.data.editCorporate;

      if (success) {
        //NOTIFACTION
        window.location.reload();
        message.success("corporate edited successfully");

      } else {
        setErrorMsg(error?.validationErrors[0].messages[0]);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    }
    setConfirmLoading(false);
  };

  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Modal
        title={`Edit Corporate: ${corporate}`}
        open={openMOdal}
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
          <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="row-col"
        >
          {errorMsg && (
            <h3 className="text-lg text-red-800 text-center whitespace-pre-wrap">
              {errorMsg}!!
            </h3>
          )}
          <Form.Item
            className="username"
            label="Admin"
            name="admin"
            rules={[
              {
                required: true,
                message: "Please input admin name!",
              },
            ]}
          >
            <Select
              placeholder="Select an individual"
              name="admin"
              options={usersToselect}
              // isMulti
            />
          </Form.Item>

          <Form.Item
            className="username "
            label="Corporate name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Corporate name!",
              },
            ]}
          >
            <Input placeholder="Corporate name" />
          </Form.Item>
          <Form.Item
            className="username "
            label="Region"
            name="region"
            rules={[
              {
                required: true,
                message: "Please input your region!",
              },
            ]}
          >
            <Input placeholder="region" />
          </Form.Item>
          <Form.Item
            className="username "
            label="District"
            name="district"
            rules={[
              {
                required: true,
                message: "Please input district!",
              },
            ]}
          >
            <Input placeholder="district" />
          </Form.Item>
          <Form.Item>
            {confirmLoading ? (
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                loading
              >
                Editing corporate...
              </Button>
            ) : (
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Edit corporate
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default CorporateEditModal;
