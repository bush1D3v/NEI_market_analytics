FROM node:20

# Instalar dependências de desenvolvimento
RUN apt-get update && apt-get install -y \
    xdg-utils \
    git-all \
    libevent-2.1-7 \
    libgstreamer-plugins-bad1.0-0 \
    curl \
    wget \
    zsh \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Instalar Oh My Zsh para melhor experiência no terminal
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

WORKDIR /workspace

# Configurar permissões do node_modules
RUN mkdir -p /workspace/node_modules && chown -R node:node /workspace

USER node

EXPOSE 5173 6006 9323 3000

CMD ["zsh"]
