# Use an official Node.js runtime as a base image
FROM node:18 as builder

# Set the working directory in the container
WORKDIR /app

# Clone the main repository into the app folder
# Will also clone the submodules

# git submodule init // update
COPY . /app

WORKDIR /app

# After the initial clone of the main repository update the submodules
# TODO doesn't work in deployment like this , as no gituser auth..
# Try git token as secret in the drone settings on github.
RUN git submodule init
RUN git submodule update --recursive

# install dependencies
RUN npm install

# run buildPortal to build the portals without interactive prompts
RUN npm run buildPortal

# Use an nginx for the final serving image
FROM nginx:latest

# Set the working directory in the container
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html/portal

# Expose port 80 to serve the app
EXPOSE 80