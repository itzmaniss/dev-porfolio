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

# Start the application
CMD ["bun", "run", "./src/index.ts"]