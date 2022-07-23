<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">
            <img alt="Vue logo" src="../assets/logo.png" height="35">
            Erick Harano
        </router-link>
        <div class="navbar-nav mr-auto">
        <li class="nav-item">
            <router-link to="/peoples" class="nav-link">Listagem de Pessoa</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/peoples/add" class="nav-link">Adicionar Pessoa</router-link>
        </li>
        </div>
    </nav>
    <div class="container mt-3">
        <router-view />
    </div>
</template>

<script>
export default {
  name: 'MenuApp',
  props: {
    msg: String
  },
}
</script>