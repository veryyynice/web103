import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
    index("routes/ShowCreators.tsx"),
    route("new", "routes/AddCreator.tsx"),
    route("view_creator/:id", "routes/ViewCreator.tsx"),
    route("edit/:id", "routes/EditCreator.tsx"),
] satisfies RouteConfig;