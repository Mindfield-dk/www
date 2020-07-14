ORG=mindfield
APP=build
VERSION=latest
IMAGE=${ORG}/${APP}:${VERSION}

.PHONY: build_image shell start stop install build

# Build development image
build_image:
	@docker build \
	--build-arg BUILD_DATE=$(shell date -u +'%Y-%m-%dT%H:%M:%SZ') \
	--build-arg VCS_REF=$(shell git rev-parse HEAD) \
	--build-arg VERSION=${VERSION} \
	-t ${IMAGE} .

# Run a shell with the development image
shell:
	@docker run --rm -it -v ${PWD}/:/tmp -w /tmp ${IMAGE}

# Start docker image for development
start:
	@docker-compose -f dev.yml up -d --build

# Run shell inside development image
server_shell:
	@docker-compose -f dev.yml exec devserver bash

# Start vue ui
vue:
	@docker-compose -f dev.yml exec devserver vue ui -H 0.0.0.0 -p 8000

# Stop development image
stop:
	@docker-compose -f dev.yml down

# Install npm dependencies
install:
	@docker run --rm -v ${PWD}/:/tmp -w /tmp ${IMAGE} npm install

# Build webpage
build:
	@docker run --rm -v ${PWD}/:/tmp -w /tmp ${IMAGE} npm run build

# Publish weppage
publish:
	@if [ -z "$(git config user.email)" ]; then echo "It is not set"; fi
#	./publish.sh
