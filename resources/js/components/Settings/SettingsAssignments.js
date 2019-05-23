import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';

import CreateAssignment from '../Assignments/CreateAssignment';
import EditAssignment from '../Assignments/EditAssignment';

const TabPane = Tabs.TabPane;

const SettingsAssignments = props => {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Aanmaken" key="1">
                <CreateAssignment />
            </TabPane>
            <TabPane tab="Aanpassen" key="2">
                <EditAssignment />
            </TabPane>
        </Tabs>
    );
}


export default SettingsAssignments