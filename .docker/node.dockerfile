FROM node:18-alpine as install
WORKDIR /usr/app
COPY ../ .
RUN npm ci --no-progress --quiet && npx prisma generate && npm prune

FROM install as build
RUN npm run prebuild && npm run build && npm prune --production

FROM node:18-alpine as production
WORKDIR /usr/app
COPY --chown=node:node --from=build /usr/app/package.json /usr/app/package-lock.json ./
COPY --chown=node:node --from=build /usr/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/app/dist ./dist
COPY --chown=node:node --from=build /usr/app/prisma ./prisma
ENV NODE_ENV=production
RUN npm prune --production
RUN chmod 750 /usr/app
RUN echo "node" > /etc/group && echo "node" > /etc/sudoers
