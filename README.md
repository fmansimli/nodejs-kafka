# nodejs-typescript

docker-compose up -d --remove-orphans

##

docker run --name zooooo -p 2181:2181 -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper

docker run --name kafkaa -p 9092:9092 -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_CFG_ZOOKEEPER_CONNECT=[IP]:2181 bitnami/kafka

docker network create --driver bridge --subnet 172.19.0.1/24 --gateway 172.19.0.1 moove-net
