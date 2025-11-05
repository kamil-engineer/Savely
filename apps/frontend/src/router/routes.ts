import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Register from '../pages/Register';
import User from '../pages/User';

export interface RouteWithParams {
  path: string;
  view: (params: Record<string, any>) => HTMLElement;
  title?: string;
}

export interface RouteWithoutParams {
  path: string;
  view: () => HTMLElement;
  title?: string;
}

export type Route = RouteWithParams | RouteWithoutParams;

export const paths = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  USER: '/user/:id',
  DASHBOARD: '/dashboard',
};

export const routes: Route[] = [
  { path: paths.HOME, view: Home, title: 'Home | Savely' },
  { path: paths.LOGIN, view: Home, title: 'Login to account | Savely' },
  { path: paths.REGISTER, view: Register, title: 'Create account | Savely' },
  { path: paths.ABOUT, view: About, title: 'About | Savely' },
  {
    path: paths.DASHBOARD,
    view: Dashboard,
    title: 'Dashboard | Savely',
  },
  {
    path: paths.USER,
    view: User as (params: Record<string, any>) => HTMLElement,
    title: 'User | Savely',
  },
];
