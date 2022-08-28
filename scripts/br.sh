docker build -t voomcarwebapp ..
docker run --name voomcar_node -p 3000:3000 voomcarwebapp
read ans