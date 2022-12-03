import Customize from "../Pages/Customize";
import GraphPage from "../Pages/GraphPage";
import Home from "../Pages/Home";
import LoginPage from "../Pages/LoginPage";
import NotFound from "../Pages/NotFound";
import RegisterPage from "../Pages/RegisterPage";

const routes = [
    { path: '/', component: <Home /> },
    { path: '/login', component: <LoginPage /> },
    { path: '/register', component: <RegisterPage /> },
    { path: '/graph', component: <GraphPage /> },
    { path: '/customize', component: <Customize/> },
    { path: '*', component: <NotFound /> }
]

export default routes;