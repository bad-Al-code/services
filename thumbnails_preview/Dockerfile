FROM node:alpine3.20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY . . 

FROM node:alpine3.20
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app . 

CMD ["sh", "-c", "npm run db:push && npm start"]
