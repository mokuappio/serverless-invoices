# docker build . -t mokuappio/serverless-invoices
# docker run -p 80:8080 -d mokuappio/serverless-invoices

FROM node:16

RUN npm install -g http-server

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install
RUN npm install

# Bundle app source
COPY . .

# Copy config (grrrr not written in README!! https://github.com/mokuappio/serverless-invoices/issues/9)
COPY src/config/app.config.example.js ./src/config/app.config.js

# Build the app
RUN npm run build

# Choose what port to expose
EXPOSE 8080

# Run the app
CMD ["http-server", "dist"]
