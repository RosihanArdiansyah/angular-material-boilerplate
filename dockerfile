# Stage 1: Build the Angular application
FROM node:20 as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application with production configuration
RUN npm run build -- --configuration production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/angular-material-boilerplate /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# When the container starts, replace the env.js with values from environment variables
CMD [\"/bin/sh\",  \"-c\",  \"envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'\""]