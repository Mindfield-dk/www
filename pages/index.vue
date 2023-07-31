<template>
  <div>
    <MainNavigation />
    <div class="container">
      <h1>Unlocking Boundless Potential with Mindfield</h1>
      <p>Experience the power of Mindfield, the revolutionary service that transcends boundaries and unleashes
        unimaginable
        possibilities.</p>
      <a href="https://github.com/Mindfield-dk" class="btn btn-primary">Discover More</a>
    </div>





    <div class="row">

      <div v-for="repo in repos" v-bind:key="repo?.name" class="col-sm-4">
        <div class="card" style="width: 18rem;">
          <div class="card-header">
            <h3>{{ repo?.name }}</h3>
          </div>
          <div class="card-body">
            <p class="card-text">{{ repo?.description }}

            </p>
            <a :href="repo?.html_url" class="btn btn-primary">Go</a>
          </div>
          <div class="card-footer">
            <span v-for="topic in repo?.topics" v-bind:key="topic" class="badge bg-secondary">{{ topic }}</span>
          </div>
        </div>
      </div>
    </div>

    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="7"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="8"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <h1>Introduction</h1>
          <p>Welcome to today's presentation on Mindfield, the revolutionary service that's set to redefine the way we
            experience the world! Prepare to embark on a journey that will transcend boundaries and unleash unimaginable
            possibilities.</p>
        </div>
        <div class="carousel-item">
          <h1>The Power of Mindfield</h1>
          <p>Mindfield harnesses the power of cutting-edge technology to connect people, ideas, and opportunities like
            never
            before. It opens the door to a realm of endless exploration and creativity, where the only limit is your
            imagination.</p>
        </div>
        <div class="carousel-item">
          <h1>Seamless Connectivity</h1>
          <p>Mindfield seamlessly bridges the gap between individuals, communities, and resources, enabling a new era of
            collaboration and connection. It empowers users to tap into a vast network of like-minded individuals,
            fostering innovation and driving progress.</p>
        </div>
        <div class="carousel-item">
          <h1>Discover New Frontiers</h1>
          <p>With Mindfield, you'll embark on a transformative journey of discovery. Explore uncharted territories,
            uncover
            hidden gems, and embrace the unknown, all from the comfort of your fingertips.</p>
        </div>
        <div class="carousel-item">
          <h1>Empowering Creativity</h1>
          <p>Mindfield is a catalyst for creativity, empowering individuals to unlock their full potential. Whether you're
            an
            artist, entrepreneur, or dreamer, Mindfield provides the tools and inspiration to turn ideas into reality.</p>
        </div>
        <div class="carousel-item">
          <h1>Unleash Your Passion</h1>
          <p>Mindfield ignites the spark within, allowing you to pursue your passions with unwavering dedication. Through
            immersive experiences and tailored recommendations, it fuels your drive and helps you achieve greatness.</p>
        </div>
        <div class="carousel-item">
          <h1>Privacy and Security</h1>
          <p>At Mindfield, we value your privacy and security above all else. Our state-of-the-art encryption ensures that
            your data remains protected, allowing you to explore with peace of mind.</p>
        </div>
        <div class="carousel-item">
          <h1>Embrace the Future</h1>
          <p>Mindfield is a glimpse into the future, where possibilities are endless and innovation knows no bounds.
            Embrace
            this transformative service and be at the forefront of a new era of connectivity and exploration.</p>
        </div>
        <div class="carousel-item">
          <h1>Join the Mindfield Revolution</h1>
          <p>Are you ready to embark on an extraordinary journey? Join the Mindfield revolution and unlock a world of
            limitless potential today!</p>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
const repos = (await useFetch(() => '/api/github/repos')).data.value
</script>

<style lang="css" scoped>  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
    text-align: center;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
    color: #333333;
  }

  p {
    font-size: 18px;
    margin-bottom: 40px;
    color: #666666;
  }

  .btn {
    font-size: 20px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  .btn-primary {
    background-color: #007bff;
    color: #ffffff;
    border: none;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }

  .carousel-item {
    background-color: #f8f8f8;
    padding: 40px;
    text-align: center;
  }

  .carousel-item h1 {
    font-size: 36px;
    margin-bottom: 20px;
    color: #333333;
  }

  .carousel-item p {
    font-size: 18px;
    margin-bottom: 40px;
    color: #666666;
  }</style>