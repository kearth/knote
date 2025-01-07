import React from "react";
import "./Welcome.css"
import WelcomeImg from "../assets/images/welcome.png"
import { FaPlusSquare } from "react-icons/fa";

function Welcome() {
    return (
        <div className="welcome">
            <div>
                <h1>Welcome to Knote!</h1>
                <img className="welcome-img" src={WelcomeImg} alt="knote logo" />
                <p>Start by creating a new file or selecting an existing one.</p>
                <div className="sidebar-icon">
                    <FaPlusSquare size={24} title="新建" />
                </div>
            </div>
        </div>
    );
}

export default Welcome;