# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install the app dependencies.
RUN npm install

# Copy the rest of the application code to the working directory.
COPY . .

# Expose the port that the app runs on.
EXPOSE 3000

# Define the command to run the app.
CMD ["node", "index.js"]

