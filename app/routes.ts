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
  ]),
] satisfies RouteConfig
