import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Register from '../pages/Register';
import ChangePassword from '../pages/ChangePassword';

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
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ABOUT: '/about',
  USER: '/user/:id',
  DASHBOARD: '/dashboard',
};

export const routes: Route[] = [
  { path: paths.HOME, view: Home, title: 'Home | Savely' },
  { path: paths.LOGIN, view: Home, title: 'Login to account | Savely' },
  { path: paths.REGISTER, view: Register, title: 'Create account | Savely' },
  { path: paths.FORGOT_PASSWORD, view: ForgotPassword, title: 'Forgot password | Savely' },
  { path: paths.RESET_PASSWORD, view: ChangePassword, title: 'Change password | Savely' },
  {
    path: paths.DASHBOARD,
    view: Dashboard,
    title: 'Dashboard | Savely',
  },
];
