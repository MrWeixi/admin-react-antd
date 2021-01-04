import React from "react"
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from "antd";
import { getMenuItemProperty } from "@/utils"
import routeList from "@/config/routeMap";
import menuList from "@/config/menuConfig";

const { Content } = Layout;

// 页面标题
const getPageTitle = (menuList, pathname) => {
    let title = "admin-react-antd";
    let item = getMenuItemProperty(menuList, "path", pathname)
    if (item) {
        title = `${item.title}`
    }
    return title;
}
const LayoutContent = (props) => {
    const { role, location } = props;
    const { pathname } = location;
    // 权限过滤
    const handlerFilter = (route) => {
        return role === "admin" || !route.roles || route.routes.includes(role);
    }
    return (
        <DocumentTitle title={getPageTitle(menuList, pathname)}>
            <Content
                style={{ height: "calc(100% - 100px)" }}
            >
                <TransitionGroup>
                    <CSSTransition
                        key={location.pathname}
                        timeout={500}
                        classNames="fade"
                        exit={false}
                    >
                        <Switch loaction={location}>
                            <Redirect exact from="/" to="/dashboard" />
                            {
                                routeList.map((route) => {
                                    return (
                                        handlerFilter(route) && (
                                            <Route component={route.component}
                                                key={route.path}
                                                path={route.path} />
                                        )
                                    )
                                })
                            }
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </Content>
        </DocumentTitle>
    )
}
export default connect((state) => state.user)(withRouter(LayoutContent));
