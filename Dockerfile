# Use specific Node.js version
FROM node:20.14.0-alpine

# Set working directory
WORKDIR /app

# Install dependencies early for caching
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose app port
EXPOSE 3030

# Use ENTRYPOINT or CMD to start the app
ENTRYPOINT ["npm", "run", "dev"]
