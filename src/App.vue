<template>
  <MenuApp msg="Menu"/>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Bem-vindo ao aplicativo em VueJS"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MenuApp from './components/MenuApp.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    MenuApp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
