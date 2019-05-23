import React, { Component } from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

export default class SettingsStudents extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="Aanmaken (dit gedeelte komt later)" key="1">
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Overzicht" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        );
    }
}