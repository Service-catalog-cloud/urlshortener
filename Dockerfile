FROM node:15-alpine

RUN apk update
RUN apk upgrade

WORKDIR /home/appuser
COPY  . .

RUN apk add libcap
RUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/node
RUN adduser appuser -D
USER appuser
WORKDIR /home/appuser

COPY --chown=appuser package.json /home/appuser
COPY --chown=appuser package-lock.json /home/appuser

RUN npm install

COPY --chown=appuser . /home/appuser

ENV NODE_ENV production

RUN npx tsc --project tsconfig.json

CMD node bin/server.js