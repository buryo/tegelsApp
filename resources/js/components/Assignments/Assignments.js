import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Spin } from "antd";
import Assignment from './Assignment'
import assignmentStyles from "./Assignments.css";

export default class Assignments extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.match.params.id,
            moduleTitle: null,
            moduleDescription: null,
            assignments: [],
            loading: true,
            modules: null,
            finishedAssignmentsByUser: null,
        }
    }

    componentDidMount(props) {
        axios.get('/api/user/assignments/')
            .then(res => {
                this.setState({ finishedAssignmentsByUser: res.data[0].assignments })
            });

        axios.get('/api/modules/' + this.state.id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                this.setState({
                    moduleTitle: response.data.title,
                    moduleDescription: response.data.description,
                    assignments: response.data.data.assignments,
                    loading: false,
                });
            });
    }

    render() {
        const { assignments } = this.state;

        if (this.state.loading) {
            return (
                <Spin
                    style={{ margin: '100px 45%' }}
                    size="large"
                />
            )
        } else {
            return (
                <div style={{ padding: 50 }}>
                    {assignments.map(item => {
                        if (this.state.finishedAssignmentsByUser.find(assignment => item.id === assignment.id)) {
                            return <Assignment key={item.id} id={item.id} title={item.title} description={item.description} checked={true} changeStatus={this.doSomethingWithTheStatus} />
                        } else {
                            return <Assignment key={item.id} id={item.id} title={item.title} description={item.description} checked={false} changeStatus={this.doSomethingWithTheStatus} />
                        }
                    })}
                </div>
            );
        }
    }

    doSomethingWithTheStatus = (id) => {
        let finishedAssignments = [...this.state.finishedAssignmentsByUser]
        var obj = { "id": id }
        finishedAssignments.push(obj);
        this.setState({ finishedAssignmentsByUser: finishedAssignments });
        console.log(this.state.finishedAssignmentsByUser);
    }
}


