FROM alpine:3.10

ARG BUILD_DATE=""
ARG VCS_REF=""
ARG VERSION=""

LABEL maintainer="https://github.com/Mindfield-dk/mindfield-dk.github.io" \
      org.label-schema.schema-version="1.0" \
      org.label-schema.vendor="Mindfield" \
      org.label-schema.name="mindfield_build" \
      org.label-schema.license="MIT" \
      org.label-schema.description="This is a dockerized collection of tools needed to build mindfield website" \
      org.label-schema.vcs-url="https://github.com/Mindfield-dk/mindfield-dk.github.io.git" \
      org.label-schema.vcs-ref=${VCS_REF} \
      org.label-schema.build-date=${BUILD_DATE} \
      org.label-schema.version=${VERSION} \
      org.label-schema.url="http://www.mindfield.dk" \
      org.label-schema.usage="https://github.com/Mindfield-dk/mindfield-dk.github.io/blob/development/README.md"

ARG bash_version=5.0.0-r0
ARG nodejs_version=10.19.0-r0
ARG npm_version=10.19.0-r0
ARG make_version=4.2.1-r2
ARG jq_version=1.6-r0

RUN apk --update --no-cache add \
    bash=${bash_version} \
    nodejs=${nodejs_version} \
    npm=${npm_version} \
    make=${make_version} \
    jq=${jq_version}

RUN npm install -g npm@6.14.6 @vue/cli@4.4.6
