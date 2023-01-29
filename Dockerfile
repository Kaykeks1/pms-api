# FROM node:18-alpine

# WORKDIR /user/src/app

# COPY --chown=node:node . .
 
# RUN npm ci

# RUN npx prisma generate
 
# CMD ["npm", "run", "start:dev"]
FROM node:18-alpine

WORKDIR /user/src/app

COPY --chown=node:node package.json ./

RUN yarn

COPY --chown=node:node . .
 
RUN yarn prisma generate
 
RUN yarn build
 
CMD ["npm", "run", "start:dev"]
