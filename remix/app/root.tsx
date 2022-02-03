import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import { useShouldHydrate } from "remix-utils";

export const meta: MetaFunction = () => {
  return { title: "Crystallize | Remix Rendering Demo" };
};

export default function App() {
  let shouldHydrate = useShouldHydrate();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        {shouldHydrate ? <Scripts /> : null}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
