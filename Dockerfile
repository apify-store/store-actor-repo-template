# --- Builder stage: install all deps and compile TypeScript ---
FROM apify/actor-node:26 AS builder

# pnpm is not bundled in the base image yet; install the latest version
RUN npm install -g pnpm

# Copy manifest files first to maximize layer cache hits on installs
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

RUN pnpm install --frozen-lockfile

COPY src ./src

RUN pnpm run build

# --- Final stage: lean runtime image with only production deps ---
FROM apify/actor-node:26

RUN npm install -g pnpm

# Copy manifest files first to maximise layer cache hits on installs
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --prod --frozen-lockfile

# Copy compiled output from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

RUN node -v

CMD ["node", "dist/main.js"]
