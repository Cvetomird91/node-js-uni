FROM node:14.16.1-alpine
WORKDIR '/app'
COPY . .
RUN npm test
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
