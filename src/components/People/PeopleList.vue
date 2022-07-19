<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by name" v-model="name"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchName">
                    Buscar
                    </button>
                </div>
            </div>
        </div>

    <div class="col-md-6">
        <h4>Lista de Pessoas</h4>
        <ul class="list-group">
            <li class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(people, index) in peoples"
                :key="index"
                >
                {{ people.name }}
            </li>
        </ul>
    </div>

    <div class="col-md-6">
        <div v-if="currentPeople">
            <h4>Pessoa</h4>
            <div>
                <label><strong>Nome:</strong></label> 
                {{ currentPeople.name }}
            </div>
            <div>
                <label><strong>Data de Nascimento:</strong></label> 
                {{ currentPeople.birth }}
            </div>
            <router-link :to="'/people/' + currentPeople.id" class="badge badge-warning">Editar</router-link>
        </div>
        <div v-else>
            <br />
            <p>Por favor selecione uma pessoa...</p>
        </div>
        </div>
    </div>
</template>

<script>
import PeopleDataService from '../../services/People/PeopleDataService';

export default {
    name: 'people-list',
    data() {
        return {
            peoples: [],
            currentPeople: null,
            currentIndex: -1,
            name: ''
        };
    },
    methods: {
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
            PeopleDataService.searchName(this.name)
                .then(response => {
                    this.peoples = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

    }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>