# Use Node.js LTS for building
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
COPY frontend/package*.json frontend/
RUN npm install
RUN cd frontend && npm install && npm run build
COPY . .

# Production image
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/frontend/dist frontend/dist
COPY --from=build /app/frontend/public frontend/public
COPY --from=build /app/index.js ./
COPY --from=build /app/.env.example ./
EXPOSE 8080
ENV PORT=8080
CMD ["node", "index.js"]
