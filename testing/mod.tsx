import { serve } from "https://deno.land/std@v0.39.0/http/server.ts";
import React from "https://esm.sh/react";
import ReactDOMServer from "https://esm.sh/react-dom/server";

const s = serve({ port: 8000 });
const Hello = () => {
  const x = "Newt"

  return <div>Hello {x}</div>;
};
console.log("http://localhost:8000/");
for await (const req of s) {
  const body = ReactDOMServer.renderToString(<Hello />);
  req.respond({ body });
}
