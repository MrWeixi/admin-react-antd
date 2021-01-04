import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";

import Logo from "./Logo";
import Menu from "./Menu"
const { Sider } = Layout;

const LayoutSider = (props) => {
    const { sidebarCollapsed } = props;
    return (
        <Sider
            collapsible
            collapsed={sidebarCollapsed}
            trigger={null}
            style={{ zIndex: "10" }}
        >
            <Logo />
            <Menu />
        </Sider>
    )
}
export default connect((state) => state.app)(LayoutSider)