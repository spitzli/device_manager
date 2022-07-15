FROM denoland/deno:alpine-1.23.2

USER deno

WORKDIR /app

COPY . .

RUN deno cache --unstable deps.ts

CMD [ "deno", "run", "--allow-env", "--allow-read", "--allow-run", "--allow-net", "--unstable", "./mod.ts" ]