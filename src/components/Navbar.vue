<template lang="pug">
  nav.navbar.navbar-light.bg-default.navbar-expand-lg
    router-link.navbar-brand.router-link-exact-active.router-link-active(to='/')
      img.d-inline-block.align-top(src='/img/vue-boilerplates.svg' alt='Lorem Ipsum' height='30px' width='auto')
      |       Lorem Ipsum
    button.navbar-toggler.collapsed(type='button' aria-label='Toggle navigation' aria-expanded='false' aria-controls='nav-collapse')
      span.navbar-toggler-icon
    #nav-collapse.navbar-collapse.collapse(style='display: none;')
      ul.navbar-nav
      ul.navbar-nav.ml-auto
        li.nav-item(right='')
          router-link.nav-link(to='/') Home
        li.nav-item(right='')
          router-link.nav-link(to='/about') About
</template>
