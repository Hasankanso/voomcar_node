FROM node:current-alpine
git clone https://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@github.com/Hasankanso/voomcar_node.git
WORKDIR /voomcar_node
RUN npm install --only=prod
ENTRYPOINT ["npm", "start"]
