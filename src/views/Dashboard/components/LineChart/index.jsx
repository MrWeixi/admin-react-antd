import React, { Component } from "react"

import echarts from "@/lib/echarts";
import { debounce } from "@/utils";
class LineChart extends Component {
    static defaultProps = {
        width: "100%",
        height: "400px",
        styles: {},
        className: ""
    }
    state = {
        chart: null
    }
    componentDidMount() {
        debounce(this.initChart.bind(this), 300)();
        window.addEventListener("resize", () => this.resize());
    }
    // 监听变化
    resize() {
        const chart = this.state.chart;
        if (chart) {
            debounce(chart.resize.bind(this), 300)()
        }
    }
    dispose() {
        // 移除窗口监听
        if (!this.state.chart) {
            return;
        }
        window.removeEventListener("resize", () => this.resize()); // 移除窗口，变化时重置图表
        this.setState({ chart: null });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebarCollapsed !== this.props.sidebarCollapsed) {
            this.resize();
        }
        if (nextProps.chartData !== this.props.chartData) {
            debounce(this.initChart.bind(this), 300)();
        }
    }

    componentWillUnmount() {
        // 卸载
        this.dispose();
    }
    setOptions({ expectedData, actualData } = {}) {
        this.state.chart.setOption({
            backgroundColor: "#fff",
            xAxis: {
                data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                boundaryGap: false,
                axisTick: {
                    show: false,
                },
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 10,
                top: 30,
                containLabel: true,
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
                padding: [5, 20],
            },
            yAxis: {
                axisTick: {
                    show: false,
                },
            },
            legend: {
                data: ["expected", "actual"],
            },
            series: [
                {
                    name: "expected",
                    itemStyle: {
                        normal: {
                            color: "#FF005A",
                            lineStyle: {
                                color: "#FF005A",
                                width: 2,
                            },
                        },
                    },
                    smooth: true,
                    type: "line",
                    data: expectedData,
                    animationDuration: 2800,
                    animationEasing: "cubicInOut",
                },
                {
                    name: "actual",
                    smooth: true,
                    type: "line",
                    itemStyle: {
                        normal: {
                            color: "#03c4a1",
                            lineStyle: {
                                color: "#03c4a1",
                                width: 2,
                            },
                            areaStyle: {
                                color: "#f3f8ff",
                            },
                        },
                    },
                    data: actualData,
                    animationDuration: 2800,
                    animationEasing: "quadraticOut",
                },
            ],
        });
    }
    initChart() {
        if (!this.el) return;
        this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
            this.setOptions(this.props.chartData)
        })
    }
    render() {
        const { className, height, width, styles } = this.props;
        return (
            <div
                className={className}
                ref={(el) => (this.el = el)}
                style={{
                    ...styles,
                    height,
                    width,
                }}
            />
        );
    }
}
export default LineChart;