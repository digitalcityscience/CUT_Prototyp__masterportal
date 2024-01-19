# Use an official Node.js runtime as a base image
FROM node:18
# Set the working directory in the container
WORKDIR /app

# Clone the main repository into the app folder
# Will also clone the subuilderbmodules

# git submodule init // update
COPY . /app

WORKDIR /app

# install dependencies
RUN npm install

# run buildPortal to build the portals without interactive prompts
RUN npm run buildPortal

# Use an nginx for the final serving image
FROM nginx:latest

# Set the working directory in the container
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=0 /app/dist /usr/share/nginx/html/portal

# Expose port 80 to serve the app
EXPOSE 80