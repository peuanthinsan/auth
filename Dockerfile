# Use Node.js LTS for building
FROM node:20 AS build
WORKDIR /app
# install backend dependencies first
COPY package*.json ./
RUN npm install

# install frontend dependencies separately to leverage Docker layer caching
COPY frontend/package*.json frontend/
RUN cd frontend && npm install

# copy the rest of the source
COPY . .

# build the frontend assets
RUN cd frontend && npm run build

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
