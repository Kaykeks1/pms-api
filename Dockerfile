FROM node:18-alpine

WORKDIR /user/src/app

COPY --chown=node:node package.json ./

RUN yarn

COPY --chown=node:node . .
 
RUN yarn prisma generate

# RUN yarn prisma migrate dev
RUN yarn prisma migrate dev
 
RUN yarn build
 
CMD ["npm", "run", "start:dev"]
