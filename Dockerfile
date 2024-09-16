FROM node:20

RUN apt-get update && apt-get install -y \
    xdg-utils \
    git-all

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173

EXPOSE 6006

CMD ["npm", "run", "dev"]
