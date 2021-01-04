import React from "react"
import { connect } from "react-redux";
import { Icon, Menu, Dropdown, Modal, Layout, Avatar } from "antd";
import { Link } from "react-router-dom";
import { logout, getUserInfo } from "@/store/actions";
import FullScreen from "@/components/FullScreen";
import Hamburger from "../Components/Hamburger";
import BreadCrumb from "../Components/BreadCrumb"
import "./index.less";
const { Header } = Layout;

const LayoutHeader = (props) => {
    const {
        token,
        avatar,
        logout,
        getUserInfo,
        sidebarCollapsed
    } = props;
    token && getUserInfo(token);
    const handerLogout = (token) => {
        Modal.confirm({
            title: "退出",
            content: "确定要退出系统吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                logout(token)
            }
        })
    };
    const handeClick = ({ key }) => {
        switch (key) {
            case "logout":
                handerLogout(token);
                break;
            default:
                break;
        }
    };
    const menu = (
        <Menu onClick={handeClick}>
            <Menu.Item key="dashboard">
                <Link to="/dashboard">首页</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">退出登录</Menu.Item>
        </Menu>
    );
    const computedStyle = () => {
        let styles = {
            width: "100%",
        };
        if (sidebarCollapsed) {
            styles = {
                width: "calc(100% - 80px)",
            };
        } else {
            styles = {
                width: "calc(100% - 200px)",
            };
        }
        return styles;
    };

    return (
        <>
            <Header />
            <Header className="fix-header" style={computedStyle()}>
                <Hamburger />
                <BreadCrumb />
                <div className="right-menu">
                    <FullScreen />
                    <div className="dropdown-wrap">
                        <Dropdown overlay={menu}>
                            <div>
                                <Avatar shape="square" size="medium" src={avatar} />
                                <Icon style={{ color: "rgba(0,0,0,.3)" }} type="caret-down" />
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.app,
        ...state.user
    };
};
export default connect(mapStateToProps, { logout, getUserInfo })(LayoutHeader);
