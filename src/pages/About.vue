<template lang="pug">
  .text-center.p-0.m-0.container-fluid
    Navbar
    .jumbotron.m-0.jumbotron-fluid
      .container
        h2.display-4 This is an About Page
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'About',
  components: {
    Navbar,
  },
};
</script>
