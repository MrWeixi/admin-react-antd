
import React from 'react'
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from '@/views/Login';
import Layout from "@/views/Layout";
import { connect } from 'react-redux';
import { getUserInfo } from "@/store/actions";
const Router = (props) => {
    console.log(props)
    const { token, role, getUserInfo } = props;
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/"
                    render={() => {
                        if (!token) {
                            return <Redirect to="/login" />
                        } else {
                            if (role) {
                                return <Layout />;
                            } else {
                                getUserInfo(token).then(() => <Layout />);
                            }
                        }
                    }}
                />
            </Switch>
        </HashRouter>
    )
}
export default connect((state) => state.user, { getUserInfo })(Router);