FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb (if exists)
COPY package.json ./
COPY bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy all files
COPY . .

# Expose the port your app runs on
EXPOSE 6969

# Set environment variables (these will be overridden by Render)
# ENV RESEND_API_KEY="your-resend-api-key-here"

# Add health check
HEALTHCHECK --interval=600s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:6969/health || exit 1

# Start the application
CMD ["bun", "run", "./src/index.ts"]