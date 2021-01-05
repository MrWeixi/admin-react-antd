import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from "antd";
import "./index.less"
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
const lineChartDefaultData = {
    "会员": {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145],
    },
    "消息": {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130],
    },
    "销售额": {
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130],
    },
    "购物车": {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130],
    },
};

const Dashboard = (props) => {
    const { hideTags } = props;
    const [lineChartData, setLineChartData] = useState(
        lineChartDefaultData["会员"]
    );

    const handleSetLineChartData = (type) => setLineChartData(lineChartDefaultData[type]);
    return (
        <div className="app-container">
            <PanelGroup handleSetLineChartData={handleSetLineChartData} />
            <LineChart chartData={lineChartData}
                styles={{
                    padding: 12,
                    backgroundColor: "#fff",
                    marginBottom: "25px",
                }} />
            <Row gutter={32}>
                <Col xs={24} sm={24} lg={8}>
                    <div className="chart-wrapper">
                        <RaddarChart />
                    </div>
                </Col>
                <Col xs={24} sm={24} lg={8}>
                    <div className="chart-wrapper">
                        <PieChart />
                    </div>
                </Col>
                <Col xs={24} sm={24} lg={8}>
                    <div className="chart-wrapper">
                        <BarChart />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default connect(state => state.settings)(Dashboard);