ORG=mindfield
APP=build
VERSION=latest
IMAGE=${ORG}/${APP}:${VERSION}

.PHONY: build_image shell start stop install build

build_image:
	@docker build \
	--build-arg BUILD_DATE=$(shell date -u +'%Y-%m-%dT%H:%M:%SZ') \
	--build-arg VCS_REF=$(shell git rev-parse HEAD) \
	--build-arg VERSION=${VERSION} \
	-t ${IMAGE} .

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

# Stop dev server
stop:
	@docker-compose -f dev.yml down

install:
	@docker run --rm -v ${PWD}/:/tmp -w /tmp ${IMAGE} npm install

build:
	@docker run --rm -v ${PWD}/:/tmp -w /tmp ${IMAGE} npm run build
publish:
	TARGET_BRANCH=master
	if [ "${GITHUB_EVENT_NAME}" == "push" ]; then
    	  cd ${HOME}
    	  git config --global user.email "actions@github.com"
    	  git config --global user.name "Git Actions"
    	  git clone --quiet --branch=${TARGET_BRANCH} https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git ${TARGET_BRANCH} > /dev/null
    	  cd master
    	  rm -rf *.*
    	  cp -Rf ${HOME}/dist ./
    	  git add -f .
    	  git commit -m "Github Actions build ${GITHUB_RUN_NUMBER} pushed to master"
    	  git push -fq origin ${TARGET_BRANCH} > /dev/null
	fi
