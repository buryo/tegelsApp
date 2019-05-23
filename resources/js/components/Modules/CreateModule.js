import React, { useState, useEffect } from 'react';
import { Form, Input, Icon, message, Upload, Button, Switch } from 'antd';
const FormItem = Form.Item;


const CreateModule = props => {
    const [state, setState] = useState({
        formData: {
            is_active: true,
        }
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        // To disabled submit button at the beginning.
        props.form.validateFields();
    }, [])

    const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                const formData = new FormData();
                Object.keys(values).forEach(key => {
                    if (values[key]) {
                        if (key == 'photo_url') {
                            formData.append(key, values[key][0].originFileObj);
                        } else {
                            formData.append(key, values[key]);
                        }
                    }
                })

                // posting our new module to the API
                axios.post('/api/modules', formData)
                    .then(response => {
                        setState({ ...state, imageUrl: undefined });
                        props.handleSetModules('create', response.data);
                        props.form.resetFields();
                        message.success("Successvol aangemaakt!");
                    })
                    .catch(err => {
                        let errors = errors;
                        errors = err.response.data.errors;
                        setErrors({ errors });
                        Object.keys(errors).forEach(function (key) {
                            // Rendering the error message as a pop-up message for a few seconds on the screen
                            message.error(errors[key]);
                        });
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
            getBase64(file, imageUrl => setState({
                ...state,
                imageUrl
            }));
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
    const clearError = (field) => {
        if (Object.keys(errors).length > 0) {
            let errors = { ...errors };
            errors = delete errors[field];
            this.setState({ ...state, errors });
        }
    }

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    const formData = state.formData;
    const { TextArea } = Input;

    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title') || errors['title'];
    const descriptionError = isFieldTouched('description') && getFieldError('description');
    const ecError = isFieldTouched('ec') && getFieldError('ec') || errors['ec'];

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
                    })(
                        <Input type="text" placeholder="Titel" onChange={() => clearError("title")} />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={descriptionError ? 'error' : ''}
                    help={descriptionError || ''}
                    {...formItemLayout} label="Module descriptie">
                    {getFieldDecorator('description')
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
                    })(
                        <Input type="text" placeholder="EC Punten" onChange={() => clearError("ec")} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="Module activeren">
                    {getFieldDecorator('is_active', {
                        initialValue: formData.is_active,
                        valuePropName: 'checked',
                    })(
                        <Switch checkedChildren="Ja" unCheckedChildren="Nee" />
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
                                {state.imageUrl ? <img src={state.imageUrl} style={{ width: '100%' }} alt="avatar" /> : null}
                            </Upload>
                        )}
                    </div>
                </Form.Item>
                <FormItem {...formTailLayout}>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Aanmaken
                        </Button>
                </FormItem>
            </Form>
        </div>
    );
}

const WrappedForm = Form.create()(CreateModule)

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};



export default WrappedForm;
