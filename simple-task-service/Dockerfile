# Step 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Copy the rest of the code and build
COPY . .
RUN npm run build

# Step 2: Run the app
FROM node:18-alpine AS runner

WORKDIR /app

# Only copy necessary files for runtime
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

EXPOSE 3000

# Use standalone Next.js output if enabled
CMD ["npm", "run", "start"]
