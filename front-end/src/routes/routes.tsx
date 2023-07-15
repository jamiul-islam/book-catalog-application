import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
