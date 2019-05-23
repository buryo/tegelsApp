import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';

import CreateModule from '../Modules/CreateModule';
import EditModule from '../Modules/EditModule';

const SettingsModules = () => {
    const TabPane = Tabs.TabPane;

    const [modules, setModules] = useState(null);

    useEffect(() => {
        axios.get('/api/modules/')
            .then(res => {
                setModules(res.data.data);
            })
    }, {})

    const handleSetModules = (action, editedModule) => {
        if (action === 'edit') {
            let foundModule = modules.find(x => x.id === Number(editedModule['module_id']));
            let foundIndex = modules.findIndex(x => x.id == Number(editedModule['module_id']));
            let newModule = { ...foundModule }

            Object.keys(editedModule).forEach(key => {
                if (key === 'module_id') {
                    return newModule['id'] = Number(editedModule[key]);
                }
                if (key === 'photo_url' && !editedModule['photo_url']) {
                    return newModule['photo_url'] = foundModule['photo_url'];
                }
                return newModule[key] = editedModule[key];
            })

            let newModules = [...modules]
            newModules[foundIndex] = newModule;

            setModules(newModules)


            console.log(newModule);
            console.log(newModules);
            console.log(modules);
        } else if (action === 'create') {

            let newModule = {}

            Object.keys(editedModule).forEach(key => {
                if (key === 'is_active') {
                    return newModule[key] = editedModule[key] ? true : false;
                }
                if (key === 'id') {
                    return newModule[key] = editedModule[key];
                }
                return newModule[key] = editedModule[key];
            })
            const allModules = [...modules, newModule];
            setModules(allModules)
        }
        else {
            let newModules = modules.filter(x => {
                return x.id !== Number(editedModule);
            });

            setModules(newModules)
        }
    }

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Aanmaken" key="1">
                <CreateModule handleSetModules={handleSetModules} />
            </TabPane>
            <TabPane tab="Aanpassen" key="2">
                <EditModule handleSetModules={handleSetModules} modules={modules} />
            </TabPane>
        </Tabs>
    );
}

export default SettingsModules;