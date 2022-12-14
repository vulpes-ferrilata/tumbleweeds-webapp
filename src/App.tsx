import React, { useEffect, lazy, Suspense, FunctionComponent } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { connectWebsocket } from 'features/websocket/actions';
import Loading from 'shared/components/loading';
import Layout from 'shared/components/layout';

const Toast = lazy(() => import('features/notification/toast'));
const Menu = lazy(() => import('shared/components/menu'));
const IndexPage = lazy(() => import('routes/index'));
const LoginPage = lazy(() => import('routes/login'));
const RegisterPage = lazy(() => import('routes/register'));
const LobbyPage = lazy(() => import('routes/catan/games/index'));
const GamePage = lazy(() => import('routes/catan/games/[id]/index'));

interface IProps {}

const App: FunctionComponent<IProps> = (props: IProps) => {
    const dispatch = useDispatch();

    const routes = useRoutes([
            {
                path: "/",
                element: <IndexPage/>,
            },
            {
                path:"/login", 
                element: <LoginPage/>,
            },
            {
                path: "/register", 
                element: <RegisterPage/>,
            },
            {
                path: "/catan/games",
                element: <LobbyPage/>,
            },
            {
                path: "/catan/games/:id",
                element: <GamePage/>,
            }
    ]);

    useEffect(() => {
        dispatch(connectWebsocket());
    }, [dispatch]);
    
    return (
        <Layout>
            <Suspense fallback={<Loading/>}>
                <Toast/>
                    <Menu>
                        {routes}
                    </Menu>
            </Suspense>
        </Layout>
    );
}

export default App;
