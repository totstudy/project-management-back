import Route from "@ioc:Adonis/Core/Route";

Route.post("/auth/register", "AuthController.register");
Route.post("/auth/login", "AuthController.login");
Route.get("/auth/check", "AuthController.check");



Route.group(() => {
  Route.get("/auth/me", "AuthController.me");
  Route.delete("/auth/logout", "AuthController.logout");

  Route.post("/project/create", "ProjectController.create");
  Route.get("project/get", "ProjectController.get");
  Route.get("project/:id", "ProjectController.detail");
  Route.put("project/:id", "ProjectController.update");
}).middleware("auth");
