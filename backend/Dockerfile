# Step 1: Use the official Node.js image as the base image
FROM node:20

# Step 2: Set the working directory in the container
WORKDIR src/server

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application into the container
COPY . .

# Step 6: Build TypeScript files
RUN npm run build

# Step 7: Expose the port that your app will run on
EXPOSE 5000

# Step 8: Run the application
CMD ["npm", "start"]
