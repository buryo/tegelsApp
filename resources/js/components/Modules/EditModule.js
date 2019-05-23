import React, { useState, useEffect } from 'react';
import { Form, Input, Icon, message, Button, Select, Switch, Upload, Modal } from 'antd';

const options = []

const EditModule = props => {
    const [formData, setformData] = useState();

    const [errors, setErrors] = useState({})
    const [selectedModuleId, setSelectedModuleId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    const FormItem = Form.Item;
    const confirm = Modal.confirm;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    const { Option } = Select;
    const { TextArea } = Input;

    const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);

    const changeSwitch = () => {
        setformData({ ...formData, is_active: !formData.is_active })
    }

    const handleGetData = module_id => {
        if (module_id) {
            let foundModule = props.modules.find(x => x.id === parseInt(module_id));
            setSelectedModuleId(module_id);
            setformData(foundModule);
            setShowForm(true);
        }
    }

    const handleDelete = module_id => {
        confirm({
            title: 'Weet je zeker dat je deze module wilt verwijderen?',
            okText: 'Ja',
            okType: 'danger',
            cancelText: 'Nee',
            onOk() {
                //Opdracht verwijderen
                axios.get('/api/modules/delete/' + module_id)
                    .then(res => {
                        if (res.status == 200) {
                            message.success(res.data.message)
                            props.handleSetModules('delete', module_id);
                            setShowForm(false)
                            props.form.resetFields();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                const formData = new FormData();
                Object.keys(values).forEach(key => {
                    if (values[key]) {
                        if (key == 'photo_url') {
                            formData.append(key, values[key][0].originFileObj);
                        }
                        if (key == 'module_id') {
                            formData.append(key, Number(values[key]));
                        }
                        else {
                            formData.append(key, values[key]);
                        }
                    }
                })

                formData.append('_method', 'put')

                // Editing our module
                axios.post('/api/modules/' + selectedModuleId, formData)
                    .then(response => {
                        setImageUrl(undefined);
                        message.success("Successvol bewerkt!");
                        props.handleSetModules('edit', values);
                        setShowForm(false)
                        props.form.resetFields();
                    })
                    .catch(err => {
                        console.log(err);
                        // setErrors(err.response.data.errors)
                        // Object.keys(errors).forEach(function (key) {
                        //     // Rendering the error message as a pop-up message for a few seconds on the screen
                        //     message.error(errors[key]);
                        // });
                    })
            }
        });
    }

    // Checking the file extension
    const beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJPG) {
            message.error('Foto bestand type moet een JPG, JPEG of PNG zijn!');
        }
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isLt3M) {
            message.error('Foto mag niet groter zijn dan 3MB!');
        }
        if (isJPG && isLt3M) {
            getBase64(file, imageUrl => setImageUrl(imageUrl));
        }
        return false;
    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    // Checking if it's an array or not
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    // Clearing server side rendered errors
    const clearError = field => {
        if (Object.keys(errors).length > 0) {
            setErrors(delete errors[field]);
        }
    }

    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title') || errors['title'];
    const descriptionError = isFieldTouched('description') && getFieldError('description');
    const ecError = isFieldTouched('ec') && getFieldError('ec');

    const formProps = {
        action: '',
        listType: "picture-card",
        showUploadList: false,
        beforeUpload: beforeUpload,
        headers: {
            'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
        }
    }

    return (
        <div>
            <Form onSubmit={handleGetData} style={{ paddingTop: 20 }}>
                <Form.Item
                    {...formItemLayout} label="Kies opdracht">
                    {getFieldDecorator('module_id', {
                        rules: [{
                            required: true,
                            message: "Kies eerst een module."
                        }],
                    })(
                        <Select
                            placeholder="Kies een module"
                            onChange={handleGetData}
                        >
                            {   props.modules &&
                                Object.keys(props.modules).map(key => {
                                    return <Option key={props.modules[key].id} value={props.modules[key].id.toString()}>{props.modules[key].title}</Option>
                                })
                            }
                        </Select>
                    )}
                </Form.Item>
            </Form>

            {showForm ?
                <Form onSubmit={handleSubmit} style={{ paddingTop: 20 }}>
                    <FormItem
                        validateStatus={titleError ? 'error' : ''}
                        help={titleError || ''}
                        {...formItemLayout} label="Module titel">
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: "Dit veld is verplicht."
                            }, {
                                max: 30,
                                message: "De titel mag maximum 30 karakters bevatten."
                            }],
                            initialValue: formData.title
                        })(
                            <Input type="text" placeholder="Titel" onChange={() => clearError("title")} />
                        )}
                    </FormItem>
                    <FormItem
                        validateStatus={descriptionError ? 'error' : ''}
                        help={descriptionError || ''}
                        {...formItemLayout} label="Module descriptie">
                        {getFieldDecorator('description', {
                            initialValue: formData.description
                        })
                            (
                                <TextArea type="text" placeholder="Descriptie" onChange={() => clearError("description")} />
                            )}
                    </FormItem>
                    <FormItem
                        validateStatus={ecError ? 'error' : ''}
                        help={ecError || ''}
                        {...formItemLayout} label="EC punten">
                        {getFieldDecorator('ec', {
                            rules: [{
                                required: true,
                                message: "Dit veld is verplicht.."
                            }, {
                                pattern: new RegExp("^[0-9]*$"),
                                message: "EC punten kunnen alleen nummers bevatten."
                            }],
                            initialValue: formData.ec
                        })(
                            <Input type="text" placeholder="EC Punten" onChange={() => clearError("ec")} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Module activeren">
                        {getFieldDecorator('is_active', {
                            initialValue: formData.is_active,
                        })
                            (
                                <Switch
                                    checkedChildren="Ja"
                                    unCheckedChildren="Nee"
                                    defaultChecked={formData.is_active}
                                    onChange={changeSwitch}
                                />
                            )}
                    </FormItem>
                    <Form.Item
                        {...formItemLayout}
                        label="Module Foto"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('photo_url', {
                                valuePropName: 'fileList',
                                getValueFromEvent: normFile,
                            })(
                                <Upload {...formProps}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="picture" />
                                    </p>
                                    <p className="ant-upload-text">Klik of sleep een foto om te uploaden</p>
                                    {imageUrl ? <img src={imageUrl} style={{ width: '100%' }} alt="avatar" /> : null}
                                </Upload>
                            )}
                        </div>
                    </Form.Item>
                    <FormItem {...formTailLayout}>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Bewerken
                        </Button>
                    </FormItem>
                    <FormItem {...formTailLayout}>
                        <Button type="danger" onClick={() => handleDelete(selectedModuleId)}>
                            Verwijderen
                            </Button>
                    </FormItem>
                </Form> : null}
        </div>
    );
}

const WrappedForm = Form.create()(EditModule)

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};



export default WrappedForm;
