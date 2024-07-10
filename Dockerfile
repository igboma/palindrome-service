FROM node:lts-alpine

# Update and install dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache bash

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY ./app ./app
COPY ./test ./test
COPY ./config ./config
COPY ./Makefile ./
COPY ./server.js ./

# Change ownership of app files to the non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to the non-root user
USER appuser

# Command to run the app
CMD ["node", "server.js"]
