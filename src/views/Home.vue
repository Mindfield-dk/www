<template>
  <b-container>
    <b-row>
      <b-col>
        <div class="container marketing">
          <div class="row">
            <div class="col-lg-6">
              <img
                class="rounded-circle"
                :src="require('../assets/malachite.jpg')"
                alt="Malachite image"
                width="140"
                height="140"
              />
              <h2>Malachite</h2>
              <p>
                Docker image for building nodejs/groovy application based on
                Alpine Linux with openjdk 8, NodeJS and Git installed.
              </p>
              <p>
                <a
                  class="btn btn-secondary"
                  href="https://github.com/localgod/malachite"
                  role="button"
                  >View details &raquo;</a
                >
              </p>
            </div>
            <div class="col-lg-6">
              <img
                class="rounded-circle"
                :src="require('../assets/docker-sonarqube.png')"
                alt="Docker image"
                width="140"
                height="140"
              />
              <h2>Docker SonarQube Scanner</h2>
              <p>
                The SonarQube Scanner is recommended as the default launcher to
                analyse a project with SonarQube. Here it has been wrapped in a
                docker image.
              </p>
              <p>
                <a
                  class="btn btn-secondary"
                  href="https://github.com/Mindfield-dk/docker-sonarqube-scanner"
                  role="button"
                  >View details &raquo;</a
                >
              </p>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
