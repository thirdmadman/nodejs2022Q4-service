FROM node:18-alpine as install
WORKDIR /usr/app
COPY ../ .
RUN npm i --no-progress --quiet
RUN npx prisma generate

FROM install as build
RUN npm run prebuild
RUN npm run build

FROM node:18-alpine as production
WORKDIR /usr/app
COPY --chown=node:node --from=build /usr/app/package.json /usr/app/package-lock.json ./
COPY --chown=node:node --from=build /usr/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/app/dist ./dist
COPY --chown=node:node --from=build /usr/app/prisma ./prisma
ENV NODE_ENV=production
RUN npm prune --production
USER node