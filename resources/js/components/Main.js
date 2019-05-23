import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, HashRouter, Redirect, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { Menu, Icon, Layout } from 'antd';
import Modules from './Modules/Tiles';
import Assignments from './Assignments/Assignments';
import Settings from './Settings/Settings';
const { Header, Sider, Content } = Layout;
import styles from "./Main.css"
import Dashboard from './Dashboard/Dashboard';
import { PrivateRoute } from "./helpers/PrivateRoute"
import UserProvider from './UserProvider';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideMenu extends Component {
    _isMounted = false;

    state = {
        user: null,
        userRole: null,
        loading: true,
    }


    componentDidMount() {
        this._isMounted = true;

        axios.get('/api/user/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        user: response.data,
                        userRole: response.data.user_role,
                        loading: false,
                    });
                    this.UserRole = this.state.userRole;
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // left menu selected state automatically converted according to url
    menuAutoSelect() {
        let key = window.location.hash.split('/')[1];
        if (key == '' || !key) {
            key = 'dashboard';
        }
        return new Array(key);
    }

    render() {
        return (
            <HashRouter>
                {
                    this.state.loading !== true &&

                    <Layout className="layout" theme="light">
                        <Sider collapsible theme="light">
                            <div className="layout_logo">
                                <img src="/images/windlogo.png" />
                            </div>
                            <Menu
                                theme="light"
                                defaultSelectedKeys={this.menuAutoSelect()}
                            >
                                <Menu.Item key="dashboard">
                                    <Link to="/">
                                        <Icon type="dashboard" />
                                        <span>Dashboard</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="modules">
                                    <Link to="/modules">
                                        <Icon type="appstore" />
                                        <span>Modulen</span>
                                    </Link>
                                </Menu.Item>
                                {
                                    this.state.userRole == 1 &&

                                    <Menu.Item key="settings">
                                        <Link to="/settings/modules">
                                            <Icon type="setting" />
                                            <span>Instellingen</span>
                                        </Link>
                                    </Menu.Item>
                                }
                                <Menu.Item key="logout">
                                    <a href="/logout">
                                        <Icon type="logout" />
                                        <span>Uitloggen</span>
                                    </a>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content className="layout__content">
                                <Switch>
                                    <Route path="/" exact>
                                        <UserProvider>
                                            <Dashboard />
                                        </UserProvider>
                                    </Route>
                                    <Route path="/modules" exact component={Modules} />
                                    <Route path="/modules/:id" exact component={Assignments} />
                                    <PrivateRoute userRole={this.state.userRole} path="/settings" exact component={Settings} />
                                    <PrivateRoute userRole={this.state.userRole} path="/settings/:module" exact component={Settings} />
                                    <PrivateRoute userRole={this.state.userRole} path="/settings/create/module" exact component={Settings} />
                                    <PrivateRoute userRole={this.state.userRole} path="/settings/update/:id" exact component={Settings} />
                                    <Redirect to="/" />
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                }
            </HashRouter >
        );
    }
}

if (document.getElementById('side-menu')) {
    ReactDOM.render(<SideMenu />, document.getElementById('side-menu'));
}