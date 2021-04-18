import { Request, Response, Express } from 'express';
import { author, system } from './controllers';

export class Route {
    public constructor(
        public path: string,
        public method: 'get' | 'post' | 'put' | 'delete',
        public action: (request: Request, response: Response) => Promise<void>
    ) { }
}

/**
 * All application routes.
 */
const AppRoutes: Route[] = [
    {
        path: "/author",
        method: "get",
        action: author.get
    },
    {
        path: "/author/pure",
        method: "get",
        action: author.getPureSql
    },
    {
        path: "/author",
        method: "post",
        action: author.create
    },
    {
        path: "/ping",
        method: "get",
        action: system.ping
    },
    {
        path: "/clear",
        method: "get",
        action: system.clearDb
    }
];



export function initRoutes(app: Express) {
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });
}