FROM node:18-alpine

WORKDIR /usr/src/app

# Install TypeScript globally
# RUN npm install -g typescript

# Copy all source files
COPY . .

# Install dependencies and build
RUN npm install
RUN npm run build

# Start the application
# CMD ["node", "dist/server.js"]
CMD [ "npm", "run", "prod" ]