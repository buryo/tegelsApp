import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Upload, Icon, message, Spin } from "antd";

import assignmentStyles from "./Assignments.css";

const FormItem = Form.Item;

const allowedFileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/zip',
    'application/pdf'
]

class Assignments extends Component {
    state = {
        fileList: [
        ],
        loading: false,
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const props = {
            action: '',
            listType: "text",
            showUploadList: true,
            onChange: this.handleChange,
            beforeUpload: this.beforeUpload,
            headers: {
                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
            }
        }

        const assignmentCard = `assignment-card${this.props.checked ? ' assignment-checked' : ''}`


        return (
            <React.Fragment>
                <div className={assignmentCard}>
                    <div className="assignment-card-header">
                        <div className="assignment-card-header-image">
                            {this.props.checked ?
                                <img src="/images/check-mark.svg" className="filter-green" alt="" />
                                :
                                <img src="/images/close-cross.svg" className="filter-red" alt="" />
                            }
                        </div>
                        <h3 style={{ paddingLeft: 20, marginBottom: 0 }}>
                            {this.props.title}
                        </h3>
                    </div>
                    <div className="assignment-card-body">
                        {this.props.description}
                    </div>
                    <div className="assignment-card-footer">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('assignment_file')
                                    (
                                        <Upload {...props} fileList={this.state.fileList} >
                                            <Button
                                                disabled={this.props.checked}
                                                
                                            >
                                                <Icon type="upload" /> Bestand uploaden
                                            </Button>
                                        </Upload>
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                <Button
                                    disabled={this.props.checked}
                                    type="primary"
                                    htmlType="submit"
                                    onClick={this.loading}
                                    loading={this.state.loading}
                                >
                                    Opdracht inleveren
                            </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    loading = () => {
        let loadingStatus = this.state.loading;
        this.setState({ loading: !loadingStatus })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                const data = new FormData();

                Object.keys(values).forEach(key => {
                    if (values[key]) {
                        if (key == 'assignment_file') {
                            data.append(key, values[key].file);
                        } else {
                            data.append(key, values[key]);
                        }
                    }
                })

                data.append("assignment_id", this.props.id)

                // posting our new module to the API
                axios.post('/api/user/assignments/', data)
                    .then(response => {
                        this.props.changeStatus(this.props.id)
                        message.success("Opdracht ingeleverd!");
                        this.loading();
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

    // Handeling the upload list
    handleChange = info => {
        let fileList = [...info.fileList];
        console.log(fileList);

        // 1. Limit the number of uploaded files
        // Check if there is more than 1 item
        if (fileList.length > 1) {
            fileList = fileList.slice(1);
        }

        console.log(fileList);
        this.setState({ fileList });

    };

    beforeUpload = file => {
        const isJPG = allowedFileTypes.find(type => type === file.type)
        if (!isJPG) {
            message.error('De toegestaande bestand types: PDF, Word, jpg, jpeg, png, zip');
            if (fileList.length >= 1) {
                let fileList = [...info.fileList];
                fileList = fileList.slice(1);
                this.setState({ fileList });
            }
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Bestand is groter dan 2MB!');
        }
        if (isJPG == true && isLt2M == true) {
            this.getBase64(file, imageUrl => this.setState({
                imageUrl
            }));
        }
        return false;
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
}

const Assignment = Form.create()(Assignments)
export default Assignment;