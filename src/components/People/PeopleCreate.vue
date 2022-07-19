<template>
  <div v-if="currentPeople" class="edit-form">
    <h4>Cadastro de Pessoa</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="currentPeople.name" />
      </div>
      <div class="form-group">
        <label for="birth">Data de Nascimento</label>
        <input type="text" class="form-control" id="birth" v-model="currentPeople.birth" />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deletePeople">Delete</button>
    <button type="submit" class="badge badge-success" @click="updatePeople">Update</button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Selecione uma pessoa...</p>
  </div>
</template>

<script>
import PeopleDataService from '../services/PeopleDataService';

export default {
  name: 'people-create',
  data() {
    return {
      currentPeople: null,
      message: ''
    };
  },
  methods: {
    getPeople(id) {
      PeopleDataService.get(id)
        .then(response => {
          this.currentPeople = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePeople() {
      PeopleDataService.update(this.currentPeople.id, this.currentPeople)
        .then(response => {
          console.log(response.data);
          this.message = 'Cadastro atualizado com sucesso!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deletePeople() {
      PeopleDataService.delete(this.currentPeople.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "peoples" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getPeople(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>