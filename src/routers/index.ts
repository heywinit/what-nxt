import { Express } from "express";
import authRouter from "./authRouter";
import eventRouter from "./eventRouter";

export async function registerRouters(app: Express) {
  const routers = [
    { path: "/auth", router: authRouter },
    {
      path: "/events",
      router: eventRouter,
    },
  ];

  for (const { path, router } of routers) {
    app.use(path, router);
  }
}
