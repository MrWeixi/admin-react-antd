
const menuData = [
    {
        title: "首页",
        path: "/dashboard",
        icon: "home",
        roles: ["admin","guest"]
    },
    {
        title: "表格",
        path: "/table",
        icon: "table",
        roles: ["admin", "editor"]
      },
      {
        title: "路由嵌套",
        path: "/nested",
        icon: "cluster",
        roles: ["admin", "editor"],
        children: [
          {
            title: "菜单1",
            path: "/nested/menu1"
          },
          {
            title: "菜单2",
            path: "/nested/menu2"
          },
        ],
      },
]
export default menuData