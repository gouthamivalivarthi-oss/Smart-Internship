# Multi-stage build for Smart Internship Tracker
# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the backend and production image
FROM node:20-alpine
WORKDIR /app

# Copy backend package and install production dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

# Copy backend source code
COPY backend/ ./backend/

# Copy built frontend assets to backend/dist or frontend/dist
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose port
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000

# Start server
CMD ["node", "backend/server.js"]
