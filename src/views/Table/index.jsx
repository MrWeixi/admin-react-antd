import React, { Component } from "react"
import { tableList, deleteItem, editItem } from "@/api/table";

class TableGrid extends Component {
    state = {
        list: [],
        loading: false,
        total: 0,
        listQuery: {
            pageNumber: 1,
            pageSize: 10,
            title: "",
            star: "",
            status:""
          },
    }
    // 取得数据
    fetchData = () => {
        tableList(this.state.listQuery).then(resJson => {
            console.log(resJson)
        })
    }
    componentDidMount(){
    this.fetchData();
    }
    render() {
        return (
            <div>
                表格
            </div>
        )
    }

}
export default TableGrid