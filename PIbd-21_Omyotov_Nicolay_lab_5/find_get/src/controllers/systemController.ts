import { Request, Response } from "express";
import { ok } from "./utilsController";

export async function ping(request: Request, response: Response) {
  response.json(ok(new Date().toUTCString()));
}

export async function init(request: Request, response: Response) {
  response.json(ok("Server is running"));
}
