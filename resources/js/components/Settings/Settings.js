import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Menu } from 'antd';
import { Route, Link } from 'react-router-dom';
import SettingsStudents from './SettingsStudents';
import SettingsModules from './SettingsModules';
import SettingsAssignments from './SettingsAssignments';

import IsAdmin from '../helpers/IsAdmin';

export default class Settings extends Component {
    render() {
        return (
            <div>
                <Menu
                    mode="horizontal"
                    selectedKeys={[this.props.match.params.module]}
                >
                    <Menu.Item key="modules">
                        <Link to="/settings/modules">
                            Modulen
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="assignments">
                        <Link to="/settings/assignments">
                            Opdrachten
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="students">
                        <Link to="/settings/students">
                            Studenten
                        </Link>
                    </Menu.Item>
                </Menu>

                <Route path="/settings/modules" exact component={SettingsModules} />
                <Route path="/settings/assignments" exact component={SettingsAssignments} />
                <Route path="/settings/students" exact component={SettingsStudents} />
            </div>
        );
    }
}