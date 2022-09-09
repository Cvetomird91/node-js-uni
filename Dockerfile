FROM node:14.16.1-alpine
WORKDIR '/app'
COPY . .
RUN npm install
RUN npm test
EXPOSE 3000
CMD ["npm", "start"]
