import React, { Component } from "react"
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { addTag } from "@/store/actions";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import menuData from "@/config/menuConfig";
import { getMenuItemProperty } from "@/utils"

import "./index.less";


const SubMenu = Menu.SubMenu;

class Mine extends Component {
    state = {
        menuTreeNode: null,
        openKey: [],
    };
    filterMenuItem = (item) => {
        const { roles } = item;
        const { role } = this.props;
        if (role === "admin" || !roles || roles.includes(role)) {
            return true;
        } else if (item.children) {
            // item的子权限
            return !!item.children.find((child) => roles.includes(child.role))
        }
        return false
    };

    // 菜单渲染

    getMenuNodes = (menuList) => {
        // 得到路径
        const path = this.props.location.pathname;
        return menuList.reduce((pre, item) => {
            if (this.filterMenuItem(item)) {
                if (!item.children) {
                    pre.push(
                        <Menu.Item key={item.path}>
                            <Link to={item.path}>
                                {item.icon ? <Icon type={item.icon} /> : null}
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    // 查找与当前请求路径匹配的子Item
                    const childrenItem = item.children.find(
                        (childrenItem) => path.indexOf(childrenItem.path) === 0
                    );
                    //  如若存在说明当前item的子列表需要打开
                    if (childrenItem) {
                        this.setState((state) => ({
                            openKey: [...state.openKey, item.path]
                        }))
                    }
                    // 像 pre添加<SubMenu>
                    pre.push(
                        <SubMenu
                            key={item.path}
                            title={
                                <span>
                                    {item.icon ? <Icon type={item.icon} /> : null}
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }
            return pre
        }, [])
    }
    handleMenuSelect = ({ key = "/dashboard" }) => {
        let menuItem = getMenuItemProperty(menuData, "path", key);
        this.props.addTag(menuItem);
    };
    componentWillMount() {
        const menuTreeNode = this.getMenuNodes(menuData);
        this.setState({
            menuTreeNode,
        });
        this.handleMenuSelect(this.state.openKey);

    }
    render() {
        const path = this.props.location.pathname;
        const openKey = this.state.openKey;

        return (
            <div className="sidebar-menu-container">
                <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                    {
                        this.state.menuTreeNode.map((item, index) => (
                            <Menu
                                mode="inline"
                                theme="dark"
                                key={index}
                                onSelect={this.handleMenuSelect}
                                selectedKeys={[path]}
                                defaultOpenKeys={openKey}
                            >
                                {item}
                            </Menu>
                        ))
                    }
                </Scrollbars>
            </div>

        )
    }
}

export default connect((state) => state.user, { addTag })(withRouter(Mine));