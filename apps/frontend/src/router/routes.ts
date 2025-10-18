import About from '../pages/About';
import Home from '../pages/Home';
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
  ABOUT: '/about',
  USER: '/user/:id',
};

export const routes: Route[] = [
  { path: paths.HOME, view: Home, title: 'Home' },
  { path: paths.ABOUT, view: About, title: 'About' },
  { path: paths.USER, view: User as (params: Record<string, any>) => HTMLElement, title: 'User' },
];
