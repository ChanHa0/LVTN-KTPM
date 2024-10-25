import { customerRoutes } from './customerRoutes';
import { adminRoutes } from './adminRoutes';

export const routes = [...customerRoutes, ...adminRoutes];