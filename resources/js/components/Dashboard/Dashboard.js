import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Progressbar from "./Progressbar";
import { Spin } from "antd";
import MineProgress from "./MineProgress";
import { UserCredits } from "../UserProvider";
import ShopMenu from "../Shop/ShopMenu";
import Avatar from './Avatar'

const Dashboard = () => {

    const [users, setUsers] = useState(null);
    const [totalAssignments, setTotalAssignments] = useState(null);
    const [rankedUsers, setRankedUsers] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/api/dashboard/", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => {
                setUsers(response.data.data)
                setTotalAssignments(response.data.totalAssignments)
                setLoading(false)
            })
            .catch(err => console.log(err));
    }, [])

    const handleProgressCount = (users) => {
        setRankedUsers(users.map(user => {
            return <li>{user.firstname}</li>
        }))

        // var dummy = document.querySelectorAll(".ant-progress-inner");
        // let nodeDummy = [...dummy];
        // nodeDummy.map(item => {
        //     return (item.innerHTML += `<span class='ant-progress-inner-text'>
        //      ${this.state.usersAssignments} / ${
        //         this.state.assignmentsCount
        //         }</span>`);
        // });
    };

    // Map throught the state users array and append them to the Progressbar component
    // let dummyComponent = this.state.user.map(() => {
    //     return (
    //         <Progressbar
    //             key={this.state.users.id}
    //             studentName={this.state.users.firstName}
    //         />
    //     );
    // });


    if (loading) {
        return (
            <Spin
                style={{ margin: '100px 45%' }}
                size="large"
            />
        )
    } else {
        return (
            <UserCredits.Consumer>
                {user => (
                    <React.Fragment>
                        <div className="dashboard-header">
                            <div className="dashboard-title">
                                <h1>🏆 Top 10 ranking</h1>
                            </div>
                            <div className="dashboard-avatar">
                                <Avatar avatar={user.avatar}/>
                            </div>
                        </div>

                        <div className="dashboard-ranking">
                            {
                                users &&
                                users.map(user => <Progressbar key={user.id} percent={user.percent} firstName={user.firstname} lastName={user.lastname} />)
                            }
                        </div>
                        <div className="mine-progress">
                            <MineProgress percent={81} />
                        </div>
                        <div className="shop">
                            <ShopMenu credits={user.credits} />
                        </div>
                    </React.Fragment>
                )}
            </UserCredits.Consumer>
        );
    }
}

export default Dashboard;