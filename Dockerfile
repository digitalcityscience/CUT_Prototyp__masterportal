# Use an official Node.js runtime as a base image
FROM node:18 as builder

# Set the working directory in the container
WORKDIR /app

# Clone the main repository into the app folder
# Will also clone the submodules

# git submodule init // update
RUN git clone  --recurse-submodules https://github.com/digitalcityscience/CUT_Prototyp__masterportal /app

# Switch to the "portal" folder and install dependencies
WORKDIR /app/portal
RUN npm install

# Switch to the "addons" folder and install dependencies
WORKDIR /app/addons
RUN npm install

# Switch back to the app folder and build the main project for production
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
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80