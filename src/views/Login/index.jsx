import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { login, getUserInfo } from "@/store/actions"
import "./index.less"
const Login = (props) => {
    const { form, token, login, getUserInfo } = props;
    const { getFieldDecorator } = form;
    const [loading, setLoading] = useState(false);
    const handlerLogin = (username, password) => {
        // 登录
        setLoading(true);
        login(username, password)
            .then((resJson => {
                message.success("登录成功")
                console.log(resJson.token)
                handlerUserInfo(resJson.token)
            })).catch(err => {
                setLoading(false);
                message.error(err)
            })
    }
    // 用户信息
    const handlerUserInfo = (token) => {
        getUserInfo(token).then(resJson => {
            console.log(resJson)
        }).catch(err => {
            message.error(err)
        })
    }
    // 表单提交
    const headlerSubmit = (event) => {
        event.preventDefault();
        // 检验表单字段
        form.validateFields((err, values) => {
            if (!err) {
                const { username, password } = values;
                console.log(username, password)
                handlerLogin(username, password)
            } else {
                message.error('验证失败')
            }
        })
    }
    if (token) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <DocumentTitle title={"用户登录"}>
            <div className="login-container">
                <Form className="content" onSubmit={headlerSubmit}>
                    <div className="title">
                        <h2>用户登录</h2>
                    </div>
                    <Spin spinning={loading} tip="正在登录...">
                        <Form.Item>
                            {
                                getFieldDecorator("username", {
                                    rules: [
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "请输入用户名"
                                        }
                                    ],
                                    initialValue: "admin", // 初始值
                                })(<Input
                                    prefix={
                                        <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                    }
                                    placeholder="用户名"
                                />)
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password", {
                                    rules: [
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "请输入密码"
                                        }
                                    ],
                                    initialValue: "123456", // 初始值
                                })(<Input
                                    prefix={
                                        <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                                    }
                                    type="password"
                                    placeholder="密码"
                                />)
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >登录 </Button>
                        </Form.Item>
                    </Spin>
                </Form>
            </div>
        </DocumentTitle>
    )
};
const CreateLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(
    CreateLogin
);