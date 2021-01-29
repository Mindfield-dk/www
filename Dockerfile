FROM alpine:3.13

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

ARG bash_version=5.1.0-r0
ARG nodejs_version=14.15.4-r0
ARG gpp_version=10.2.1_pre1-r3
ARG npm_version=14.15.4-r0
ARG make_version=4.3-r0
ARG jq_version=1.6-r1
ARG python3_version=3.8.7-r0
ARG openjdk11_jre_headless_version=11.0.9_p11-r1

RUN apk --update --no-cache add \
    bash=${bash_version} \
    openjdk11-jre-headless=${openjdk11_jre_headless_version} \
    jq=${jq_version} \
    make=${make_version} \
    g++=${gpp_version} \
    nodejs=${nodejs_version} \
    npm=${npm_version} \
    python3=${python3_version}

RUN npm -g config set user root
RUN npm install -g npm@6.14.11 @vue/cli@4.5.10 firebase-tools@9.2.2
RUN firebase setup:emulators:firestore
