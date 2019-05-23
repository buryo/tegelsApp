import React, { Component } from "react";
import "./dashboard.css";
import { Progress } from "antd";
import { Divider } from "antd";
import { UserCredits } from '../UserProvider';

export default class MineProgress extends Component {
    render() {
        return (
            <UserCredits.Consumer>
                {(user) => (
                    <React.Fragment>
                        <div className="progress-container">
                            <div className="small-left-avatar" />
                            <div className="mine-progress">
                                <Divider orientation="right">{user.firstname} {user.lastname}</Divider>

                                <Progress
                                    strokeColor={{
                                        from: "#a3e6a5",
                                        to: "#22d40d"
                                    }}
                                    percent={this.props.percent}
                                    status="success"
                                    strokeWidth={20}
                                    showInfo={false}
                                />
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </UserCredits.Consumer>
                );
            }
        }
