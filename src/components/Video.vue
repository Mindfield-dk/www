<template>
  <video
    playsinline="playsinline"
    autoplay="autoplay"
    muted="muted"
    loop="loop"
  >
    <source
      src="https://drive.google.com/uc?export=download&id=1vmC-A9qZIGbcO6oXOm2qC_pJJugOQTFr"
      type="video/mp4"
    />
  </video>
</template>

<script>
export default {};
</script>

<style scoped>
video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
</style>
