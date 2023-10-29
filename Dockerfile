FROM node:14

WORKDIR /app/nutricraft-spa

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm install -D tailwindcss
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
