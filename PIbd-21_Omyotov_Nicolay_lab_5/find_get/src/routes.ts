import { Request, Response, Express } from "express";
import { user, system, notice, category } from "./controllers";

export class Route {
  public constructor(
    public path: string,
    public method: "get" | "post" | "put" | "delete",
    public action: (request: Request, response: Response) => Promise<void>
  ) {}
}

/**
 * All application routes.
 */
const AppRoutes: Route[] = [
  {
    path: "/register",
    method: "post",
    action: user.register,
  },
  {
    path: "/login",
    method: "post",
    action: user.login,
  },
  {
    path: "/user",
    method: "get",
    action: user.get,
  },
  {
    path: "/user",
    method: "post",
    action: user.create,
  },
  {
    path: "/user",
    method: "put",
    action: user.update,
  },
  {
    path: "/user",
    method: "delete",
    action: user.remove,
  },
  {
    path: "/notices",
    method: "get",
    action: notice.getAll,
  },
  {
    path: "/notices/subcategory",
    method: "get",
    action: notice.getAllBySubCategory,
  },
  {
    path: "/notice",
    method: "get",
    action: notice.get,
  },
  {
    path: "/notice",
    method: "post",
    action: notice.create,
  },
  {
    path: "/notice",
    method: "put",
    action: notice.update,
  },
  {
    path: "/notice",
    method: "delete",
    action: notice.remove,
  },
  {
    path: "/categories",
    method: "get",
    action: category.getAll,
  },
  {
    path: "/ping",
    method: "get",
    action: system.ping,
  },
  {
    path: "/",
    method: "get",
    action: system.init,
  },
];

export function initRoutes(app: Express) {
  AppRoutes.forEach((route) => {
    app[route.method](
      route.path,
      (request: Request, response: Response, next: Function) => {
        route
          .action(request, response)
          .then(() => next)
          .catch((err) => next(err));
      }
    );
  });
}
