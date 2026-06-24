# Specify the base Docker image. You can read more about
# the available images at https://crawlee.dev/docs/guides/docker-images
# You can also use any other image from Docker Hub.
FROM apify/actor-node:24 AS builder

# Copy just package.json and package-lock.json
# to speed up the build using Docker layer cache.
COPY package*.json ./

# Install all dependencies. Don't audit to speed up the installation.
RUN npm ci --include=dev --audit=false

# Copy only files needed for building to maximize cache hits
COPY tsconfig.json rolldown.config.mts ./
COPY src ./src

# Install all dependencies and build the project.
# Don't audit to speed up the installation.
RUN npm run build

# Create final image
FROM node:24-alpine
ENV NODE_ENV=production

# Copy just package.json and package-lock.json
# to speed up the build using Docker layer cache.
COPY package*.json ./

# Install NPM packages, skip optional and development dependencies to
# keep the image small. Avoid logging too much and print the dependency
# RUN npm --quiet set progress=false \
#     && npm ci --omit=dev \
#     && echo "Node.js version:" \
#     && node --version \
#     && echo "NPM version:" \
#     && npm --version \
#     && rm -r ~/.npm

# Copy built JS files from builder image
COPY --from=builder /usr/src/app/dist ./dist

# Here copy all other files necessary for runtime one by one. Try to keep them minimal to increase cache hits.

# Run the image.
CMD ["node", "dist/main.js"]
