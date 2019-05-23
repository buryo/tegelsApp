import React, { Component } from 'react';
import { Form, Input, Icon, message, Button, Select, Spin } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreateModule extends Component {
    state = {
        formData: {
        },
        errors: {
        },
        modules: {

        }
    }

    componentDidMount() {
        axios.get('api/modules')
            .then(response => {
                this.setState({ modules: response.data.data })
            })
            .catch(err => {
                console.log(err);
            })
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formData = this.state.formData;
        const modules = this.state.modules;
        const { Option } = Select;
        const { TextArea } = Input;

        // Only show error after a field is touched.
        const titleError = isFieldTouched('title') && getFieldError('title') || this.state.errors['title'];
        const descriptionError = isFieldTouched('description') && getFieldError('description');
        const moduleError = isFieldTouched('module_id') && getFieldError('module_id');

        return (
            <div>
                <Form onSubmit={this.handleSubmit} style={{ paddingTop: 20 }}>
                    <FormItem
                        validateStatus={titleError ? 'error' : ''}
                        help={titleError || ''}
                        {...formItemLayout} label="Opdracht titel">
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: "Dit veld is verplicht."
                            }, {
                                max: 30,
                                message: "De titel mag maximum 30 karakters bevatten."
                            }],
                        })(
                            <Input type="text" placeholder="Titel" onChange={() => this.clearError("title")} />
                        )}
                    </FormItem>
                    <FormItem
                        validateStatus={descriptionError ? 'error' : ''}
                        help={descriptionError || ''}
                        {...formItemLayout} label="Opdracht descriptie">
                        {getFieldDecorator('description')
                            (
                                <TextArea prefix={<Icon type="dash" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Descriptie" onChange={() => this.clearError("description")} />
                            )}
                    </FormItem>
                    <FormItem
                        validateStatus={moduleError ? 'error' : ''}
                        help={moduleError || ''}
                        {...formItemLayout} label="Module">
                        {getFieldDecorator('module_id', {
                            rules: [{
                                required: true,
                                message: "Dit veld is verplicht."
                            }]
                        })
                            (
                                // <Input prefix={<Icon type="dash" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Descriptie" onChange={() => this.clearError("description")} />
                                <Select
                                    placeholder="Kies een module"
                                >
                                    {Object.keys(modules).map(key => {
                                        return <Option key={modules[key].id} value={modules[key].id.toString()}>{modules[key].title}</Option>
                                    })}
                                </Select>
                            )}
                    </FormItem>
                    <FormItem {...formTailLayout}>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Aanmaken
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const formData = new FormData();
                Object.keys(values).forEach(key => {
                    if (values[key]) {
                        formData.append(key, values[key]);
                    }
                })

                // posting our new assignment to the API
                axios.post('/api/assignments', formData)
                    .then(response => {
                        this.props.form.resetFields();
                        message.success("Successvol aangemaakt!");
                    })
                    .catch(err => {
                        let errors = this.state.errors;
                        errors = err.response.data.errors;
                        this.setState({ errors });
                        Object.keys(errors).forEach(function (key) {
                            // Rendering the error message as a pop-up message for a few seconds on the screen
                            message.error(errors[key]);
                        });
                    })
            }
        });
    }

    // Clearing server side rendered errors
    clearError = (field) => {
        if (Object.keys(this.state.errors).length > 0) {
            let errors = { ...this.state.errors };
            errors = delete errors[field];
            this.setState({ errors });
        }
    }
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
