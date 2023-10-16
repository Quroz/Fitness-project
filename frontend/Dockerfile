# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application
COPY . .



# Build the React app
RUN npm run build

# Expose the port your React app runs on
EXPOSE 3000

# Start your React app
CMD [ "npm", "start" ]
