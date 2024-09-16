FROM node:20

RUN apt-get update && apt-get install -y \
    xdg-utils \
    git-all \
    libevent-2.1-7 \
    libgstreamer-plugins-bad1.0-0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173

EXPOSE 6006

EXPOSE 9323

CMD ["npm", "run", "dev"]
