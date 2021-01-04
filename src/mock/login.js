const tokens = {
    admin: "admin-token",
    editor: "editor-token",
};
const users = {
    "admin-token": {
        id: "admin",
        role: "admin",
        name: "超级管理员",
        avatar: "http://wechat.encusa.com/hadmin/static/img/img.9aa3179b.jpg",
        description: "拥有系统内所有菜单和路由权限",
    },
    "editor-token": {
        id: "editor",
        role: "editor",
        name: "内部人员",
        avatar: "http://wechat.encusa.com/hadmin/static/img/img.9aa3179b.jpg",
        description: "可以看到除户管理页面之外的所有页面",
    }
};
export default {
    login: (config) => {
        const { username } = JSON.parse(config.body);
        const token = tokens[username];
        if (!token) {
            return {
                status: 1,
                message: '用户名错误'
            }
        }
        return {
            status: 0,
            token
        }
    },
    userInfo: (config) => {
        const token = config.body;
        const userInfo = users[token];
        if (!userInfo) {
            return {
                status: 1,
                message: '获取用户信息失败'
            }
        }
        return {
            status: 0,
            userInfo
        }
    },
    logout: (_) => {
        return {
            status: 0,
            data: "success",
        };
    },
}