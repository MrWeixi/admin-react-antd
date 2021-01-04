import Mock from "mockjs";
// 模拟数据
import loginAPI from "./login";

// 登录用户相关信息

Mock.mock(/\/login/, "post", loginAPI.login)
Mock.mock(/\/userInfo/, "post", loginAPI.userInfo)
Mock.mock(/\/logout/, "post", loginAPI.logout)