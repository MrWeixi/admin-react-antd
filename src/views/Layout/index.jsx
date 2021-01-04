import React from 'react'
import Content from "./Content";
import Sider from "./Sider";
import Header from "./Header";
import Tags from "./Tags";
import { Layout } from "antd"
const Layouts = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
               <Sider />
            <Layout>
                <Header />
                <Tags />
                <Content />
            </Layout>
        </Layout>
    )
}
export default Layouts