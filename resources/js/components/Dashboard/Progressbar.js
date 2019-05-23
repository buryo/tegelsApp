import React from "react";
import { Progress } from "antd";
import "./dashboard.css";
import { Divider } from "antd";

const Progressbar = props => {
    return (
        <div className="progress-container">
            <div className="avatar-box" />
            <div className="progressbar">
                <Divider orientation="left">{props.firstName} {props.lastName}</Divider>

                <Progress
                    strokeColor={{
                        from: "#a3e6a5",
                        to: "#22d40d"
                    }}
                    percent={props.percent}
                    status="success"
                    strokeWidth={20}
                    showInfo={false}
                />
            </div>
        </div>
    );
};

export default Progressbar;
