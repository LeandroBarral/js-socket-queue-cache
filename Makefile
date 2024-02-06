up:
	docker-compose -f .docker/docker-compose.yml up --build --remove-orphans --force-recreate -d
down:
	docker-compose -f .docker/docker-compose.yml down --remove-orphans
up-queue:
	docker-compose -f .docker/docker-compose.yml up --build --remove-orphans --force-recreate -d rabbitmq