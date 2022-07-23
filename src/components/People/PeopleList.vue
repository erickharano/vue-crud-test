<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Pesquisar pelo nome" v-model="name"/>

        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchName">
          Buscar
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <h4>Pessoas Registradas</h4>

      <ul class="list-group">
        <li class="list-group-item" v-for="(people, index) in peoples" :key="index">
          <button @click="removePeople(people.id)" class="btn btn-danger float-right delete">
            <!-- <b-icon-trash></b-icon-trash> -->
            Remover
          </button>
          <router-link :to="'/peoples/' + people.id" class="btn btn-warning float-right">
            <!-- <b-icon-pencil></b-icon-pencil> -->
            Editar
          </router-link>
          
          {{ people.name }} <br>
          <small>{{ formatDate(people.birth) }}</small>
        </li>

        <p v-if="peoples.length == 0">
          Nenhum resultado encontrado.
        </p>
      </ul>
    </div>
  </div>
</template>

<script>
import PeopleDataService from '../../services/People/PeopleDataService';
import moment from 'moment';

export default {
  name: 'people-list',
  data() {
    return {
      peoples: [],
      currentPeople: null,
      currentIndex: -1,
      name: '',
    };
  },
  methods: {
    formatDate(value) {
      return moment(String(value)).format('DD/MM/YYYY');
    },

    retrivePeoples() {
      PeopleDataService.getAll()
        .then(response => {
          this.peoples = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrivePeoples();
      this.currentPeople = null;
      this.currentIndex = -1;
    },

    removePeople(id) {
      if  (!confirm("Deseja realmente remover este registro?")) {
        return;
      }

      PeopleDataService.delete(id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchName() {
      PeopleDataService.findByName(this.name)
        .then(response => {
          this.peoples = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrivePeoples();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.delete { margin: 0 5px; }

small { 
  color: #afafaf; 
}
</style>