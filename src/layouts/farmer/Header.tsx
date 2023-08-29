import React, {useState, useEffect} from "react";
import { Image, Avatar } from "antd";
import {
  SearchOutlined,
  StarOutlined,
  LogoutOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { selectCurrentUser } from "../../app/AuthSlice";
import { useSelector } from "react-redux";

type userType = {
  email:String,
  firstName:String,
  fullName:String,
  id:String,
  phoneNumber:String,
  role:any,
  username:String,
  }

export const HeaderLs = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [userData, setuserData] = useState<userType>(currentUser?.user);

  useEffect(() => {
    if (currentUser) {
      setuserData(currentUser?.user)
    } else {
      console.log("User data is not available yet");
    }
  }, [currentUser, userData]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl  font-extrabold tracking-widest text-white">
            {" "}
            e-Mzani
          </h1>
          <p className="text-base"> A bluetooth anabled digital scale</p>
        </div>
        <div className="p-2">
          <ul className="flex">
            <li className="flex flex-col items-center p-2 border-l-[1px] border-indigo-200 ">
              <Avatar size={30}>W</Avatar>
              <span className="text-sm">{userData?.email}</span>
              <span className="text-sm">{userData?.fullName}</span>
            </li>
            <li className="border-l-2 ">
              <div className="flex flex-row p-2 cursor-pointer ml-2 border-white border-[1px] rounded-lg mt-5">
                <LogoutOutlined size={20} color="red" className="mt-1 text-white" />
                <span className="text-sm ml-2 text-white">Log out</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="brand">
        {/* <Image
          width={200}
          className="absolute"
          src={require("../../assets/imgs/0e74885f117dba7f47a17d22b933fcc6-removebg-preview (1).png")}
        /> */}
        <div>
          <div className="flex flex-col mb-52">
            {" "}
            <span
              className="text-3xl font-bold"
              style={{ color: "white" }}
            ></span>
            <span
              className="text-lg font-bold"
              style={{ color: "white" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};
