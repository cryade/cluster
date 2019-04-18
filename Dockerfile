FROM keymetrics/pm2:10-alpine

# Bundle APP files
COPY data_server.js src/
COPY package.json .
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN echo 'Uncomment the correct proxy config for your enviroment' \
#CTC
  && npm config set proxy http://16.85.88.60:8080 \ 
  && npm config set https-proxy http://16.85.88.60:8080 \
#HPE Boeblingen
#  && npm config set proxy http://web-proxy.bbn.hpecorp.net:8080 \
#  && npm config set https-proxy http://web-proxy.bbn.hpecorp.net:8080 \
  && npm install --production

# Show current folder structure in logs
# RUN ls -al -R
EXPOSE 8081
CMD [ "pm2-runtime", "start", "pm2.json" ]
