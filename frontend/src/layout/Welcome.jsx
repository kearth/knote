import React from "react";
import "./Welcome.css"
import WelcomeImg from "../assets/images/welcome.png"
import { FaPlusSquare } from "react-icons/fa";

function Welcome({ setWelcome }) {
    // 设置状态
    return (
        <div className="welcome">
            <div>
                <h1>Welcome to Knote!</h1>
                <img className="welcome-img" src={WelcomeImg} alt="knote logo" />
                <p>Start by creating a new file.</p>
                <div className="sidebar-icon">
                    <FaPlusSquare size={24} title="新建" onClick={setWelcome} />
                </div>
            </div>
        </div>
    );
}

export default Welcome;