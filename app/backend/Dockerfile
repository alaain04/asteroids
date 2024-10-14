FROM node:20-alpine as build

WORKDIR /app

#Install pnpm globally to speed up installation
RUN npm install -g pnpm

#Copy all the content
COPY . .

RUN pnpm i

#Regenerate prisma types
RUN npx prisma generate

#Build solution
RUN pnpm build

# Remove all the dev dependencies
RUN pnpm prune --production 

#Serve stage
FROM node:20-alpine as main

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/init-server.sh ./init-server.sh
COPY --from=build /app/.env ./.env

ENTRYPOINT [ ]

#Serve 
CMD ["sh", "init-server.sh"]