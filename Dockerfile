FROM denoland/deno:alpine-1.23.2

USER deno

WORKDIR /app

COPY . .
COPY deno.json .

RUN deno cache --unstable mod.ts

CMD [ "deno", "run", "--allow-env", "--allow-read", "--allow-run", "--allow-net", "--config=deno.json", "--unstable", "./mod.ts" ]