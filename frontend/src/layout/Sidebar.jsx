import React from "react";
import { FaFolder, FaSearch, FaCog } from "react-icons/fa"; // 使用 react-icons 库
import avatarImage from "../assets/images/def_avator_01.png";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            {/* 头像 */}
            <div className="profile">
                <img src={avatarImage} alt="Avatar" className="avatar" />
            </div>
            {/* 上方空间 */}
            <div className="sidebar-icon">
                <FaFolder size={24} title="资源管理器" />
            </div>
            <div className="sidebar-icon">
                <FaSearch size={24} title="搜索" />
            </div>
            {/* 中间留空 */}
            <div className="spacer"></div>
            {/* 下方空间 */}
            <div className="sidebar-icon">
                <FaCog size={24} title="管理设置" />
            </div>
        </div>
    );
}

export default Sidebar;
