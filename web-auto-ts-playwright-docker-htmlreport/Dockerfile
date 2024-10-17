# FROM mcr.microsoft.com/playwright:v1.44.1-jammy
FROM mcr.microsoft.com/playwright:v1.34.3-jammy
# FROM node:20-bookworm

WORKDIR /app
ADD . /app/
RUN npm install
ENTRYPOINT [ "npm", "run", "test" ]