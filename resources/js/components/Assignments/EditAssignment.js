import React, { Component } from 'react';
import { Form, Cascader, Input, Icon, message, Button, Select, Modal } from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const options = []

class CreateModule extends Component {
    state = {
        formData: {
            id: '',
            title: '',
            description: '',
            module_id: '',
        },
        errors: {
        },
        modules: {
        },
        options: [],
        selectedAssignment: null,
        showForm: false,
        module_title: ''
    }

    componentDidMount() {
        axios.get('api/modules')
            .then(response => {
                this.setState({ modules: response.data.data })
                for (let key of this.state.modules) {
                    let children = []

                    for (let assignment of key.assignments) {
                        let assignmentsObject = {
                            value: assignment.id,
                            label: assignment.title
                        }
                        children.push(assignmentsObject)
                    }

                    let innerObj = {
                        value: key.id,
                        label: key.title,
                        children: children
                    }
                    this.state.options.push(innerObj);
                }
            })
            .catch(err => {
                console.log(err);
            })
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
                <Form onSubmit={this.handleGetData} style={{ paddingTop: 20 }}>
                    <Form.Item
                        {...formItemLayout} label="Kies opdracht">
                        {getFieldDecorator('residence', {
                            rules: [
                                { type: 'array', required: true, message: 'Kies eerst een opdracht!' },
                            ],
                        })(<Cascader
                            options={this.state.options}
                            displayRender={this.displayRender}
                            expandTrigger="hover"
                            onChange={this.handleGetData}
                        />)}
                    </Form.Item>
                </Form>

                {this.state.showForm ?
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
                                initialValue: formData.title
                            })(
                                <Input type="text" placeholder="Titel" onChange={() => this.clearError("title")} />
                            )}
                        </FormItem>
                        <FormItem
                            validateStatus={descriptionError ? 'error' : ''}
                            help={descriptionError || ''}
                            {...formItemLayout} label="Opdracht descriptie">
                            {getFieldDecorator('description', {
                                initialValue: formData.description
                            })
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
                                }],
                                initialValue: formData.module_id.toString()
                            })
                                (
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
                                Bewerken
                            </Button>
                        </FormItem>
                        <FormItem {...formTailLayout}>
                            <Button type="danger" onClick={() => this.handleDelete(this.state.selectedAssignment)}>
                                Verwijderen
                            </Button>
                        </FormItem>
                    </Form> : null}
            </div>
        );
    }


    handleGetData = (values) => {
        axios.get('/api/assignments/' + values[1])
            .then(res => {
                this.setState({ formData: res.data, showForm: true, selectedAssignment: values[1] })
            });
    }

    handleDelete = (selectedAssignment) => {
        confirm({
            title: 'Weet je zeker dat je deze opdracht wilt verwijderen?',
            okText: 'Ja',
            okType: 'danger',
            cancelText: 'Nee',
            onOk() {
                //Opdracht verwijderen
                axios.get('/api/assignments/delete/' + selectedAssignment)
                    .then(res => {
                        if (res.status == 200) {
                            message.success(res.data.message)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const formData = new FormData();
                Object.keys(values).forEach(key => {
                    if (values[key]) {
                        if (key === 'module_id') {
                            formData.append(key, values[key]);
                        }
                        if (key !== 'residence') {
                            formData.append(key, values[key]);
                        }
                    }
                })

                formData.append('_method', 'put')

                // posting our new module to the API
                axios.post('/api/assignments/' + this.state.selectedAssignment, formData)
                    .then(response => {
                        message.success("Succesvol aangepast!");
                        this.forceUpdate()
                    })
                    .catch(err => {
                        console.log(err)
                        // let errors = this.state.errors;
                        // errors = err.response.data.errors;
                        // this.setState({ errors });
                        // Object.keys(errors).forEach(function (key) {
                        //     // Rendering the error message as a pop-up message for a few seconds on the screen
                        //     message.error(errors[key]);
                        // });
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
