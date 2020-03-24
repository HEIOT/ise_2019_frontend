# This image is based on the oficial nodejs docker image
FROM node:12 AS base
# RUN echo “@edge http://nl.alpinelinux.org/alpine/edge/main” >> /etc/apk/repositories
# packages required for bcrypt
RUN apt-get install \
        python \
        g++ \
        make \
        bash \
        coreutils
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS dev
CMD ["npm", "run", "serve", "--", "--port", "80"]

FROM base as builder
COPY ./ ./
RUN npm run build

FROM nginx:1.16-alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]


