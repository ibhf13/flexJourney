
export interface AppRoute {
    title?: string
    children?: AppRoute[]
}

export type RouteConfig = {
    publicRoutes: AppRoute[]
    privateRoutes: AppRoute
} 