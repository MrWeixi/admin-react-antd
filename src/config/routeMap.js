import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({ loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/Dashboard'), loading: Loading });
const Table = Loadable({ loader: () => import(/*webpackChunkName:'Table'*/'@/views/Table'), loading: Loading });
const Menu1 = Loadable({ loader: () => import(/*webpackChunkName:'Menu1_1'*/'@/views/Nested/Menu1'), loading: Loading });
const Menu2 = Loadable({ loader: () => import(/*webpackChunkName:'Menu1_1'*/'@/views/Nested/Menu2/Menu2-2'), loading: Loading });

export default [
    { path: "/dashboard", component: Dashboard, roles: ["admin", "guest"] },
    { path: "/Table", component: Table, roles: ["admin", "guest"] },
    { path: "/nested/menu1", component: Menu1, roles: ["admin", "editor"] },
    { path: "/nested/menu2/menu2-2", component: Menu2, roles: ["admin", "editor"] },
]