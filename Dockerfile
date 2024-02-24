# Build Stage

# `yarn build` fails on arm64 alpine, so use buster instead
FROM node:lts-buster-slim as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG api_base_url=http://shelf-back
ENV VITE_API_BASE_URL $api_base_url

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./package.json /usr/src/app/
COPY ./yarn.lock /usr/src/app/

# increase timeout for arm64
# see: https://github.com/docker/build-push-action/issues/471
RUN yarn install --frozen-lockfile --network-timeout 600000

COPY ./public /usr/src/app/public
COPY ./src /usr/src/app/src
COPY ./index.html /usr/src/app/index.html
COPY ./i18next-parser.config.js /usr/src/app/
COPY ./LICENSE /usr/src/app/
COPY ./tsconfig.json /usr/src/app/
COPY ./postcss.config.js /usr/src/app/
COPY ./vite.config.mts /usr/src/app/
COPY ./tailwind.config.js /usr/src/app/

RUN yarn build


# Prod Stage
FROM nginx:stable-alpine

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
