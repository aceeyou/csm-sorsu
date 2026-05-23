import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes"

export default [
  layout("./layouts/app-sidebar.tsx", [
    index("routes/home.tsx"),
    route("csmform", "routes/csmform.tsx"),
    route("settings", "routes/settings.tsx"),
  ]),
  route("login", "features/auth/login.tsx"),
  route("register", "features/auth/register.tsx"),
  route("forgot-password", "features/auth/forgot-password.tsx"),
  route("*", "./components/not-found.tsx"),
] satisfies RouteConfig
