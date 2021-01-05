import Mock from "mockjs";
// 模拟数据
import loginAPI from "./login";
import tableAPI from "./table";
// 登录用户相关信息

Mock.mock(/\/login/, "post", loginAPI.login)
Mock.mock(/\/userInfo/, "post", loginAPI.userInfo)
Mock.mock(/\/logout/, "post", loginAPI.logout)
// table
Mock.mock(/\/table\/list/, "post", tableAPI.tableList);
Mock.mock(/\/table\/delete/, "post", tableAPI.deleteItem);
Mock.mock(/\/table\/edit/, "post", tableAPI.editItem);
