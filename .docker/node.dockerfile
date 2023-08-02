FROM node:18-alpine as install
WORKDIR /usr/app
COPY ../package*.json .
COPY ../tsconfig*.json .
COPY ../nest-cli.json .
RUN npm i --no-progress --quiet

FROM install as build
COPY ../ .
RUN npm run prebuild
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/app
COPY --chown=node:node --from=build /usr/app/package.json /usr/app/package-lock.json ./
COPY --chown=node:node --from=build /usr/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/app/dist ./dist
ENV NODE_ENV=production
RUN npm prune --production
USER node