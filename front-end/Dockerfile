FROM node:12.22.1-alpine
WORKDIR '/app'
COPY . .
RUN npm install -g http-server
EXPOSE 80
CMD ["http-server", "-p", "80"]
