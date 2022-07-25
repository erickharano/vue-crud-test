<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" class="form-control" id="name" required v-model="people.name" name="name" />
      </div>
      
      <div class="form-group">
        <label for="birth">Data de Nascimento</label>
        <Datepicker locale="pt-br" format="dd/MM/Y" id="birth" name="birth" required v-model="people.birth"></Datepicker>
      </div>

      <div v-if="people.id">
        {{ message }}
      </div>

      <p v-if="errors.length">
        <b>Por favor, preenchar os dados abaixo:</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>

      <br>
      <button v-if="people.id" @click="updatePeople" class="btn btn-success">Salvar</button>
      <button v-if="!people.id" @click="savePeople" class="btn btn-success">Salvar</button>
    </div>
    <div v-else>
      <h4>Cadastro salvo com sucesso!</h4>
      <br>
      <a href="/peoples/add" class="btn btn-info">Novo Cadastro</a>
      
      <br>
      <br>
      <a href="/peoples" class="btn btn-success">Lista de Pessoas</a>
    </div>
  </div>
</template>

<script>
import PeopleDataService from '../../services/People/PeopleDataService';
import moment from 'moment';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'people-create',
  data() {
    return {
      people: {
        id: null,
        name: "",
        birth: "", 
      },
      submitted: false,
      message: "",
      errors: [],
    };
  },
  methods: {
    validForm() {
      this.errors = [];

      if (this.people.name.toString().length == 0) {
        this.errors.push('O campo Nome é obrigatório.');
      } else if (this.people.name.toString().length <= 3) {
        this.errors.push('Preencha o campo Nome corretamente.');
      }
      if (!this.people.birth || this.people.birth.toString().length == 0) {
        this.errors.push('O campo Data de Nascimento é obrigatório.');
      }

      if (this.errors.length) {
        return false;
      }

      return true;
    },

    savePeople() {
      if (!this.validForm()) {
        return;
      }

      var data = {
        name: this.people.name,
        birth: this.people.birth,
      };

      PeopleDataService.create(data)
        .then(response => {
          this.people.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePeople() {
      if (!this.validForm()) {
        return;
      }

      PeopleDataService.update(this.people.id, this.people)
        .then(response => {
          console.log(response.data);
          this.message = 'Cadastro atualizado com sucesso!';
          setTimeout(() => this.$router.push({path: '/peoples'}), 1000 * 1,5);
        })
        .catch(e => {
          console.log(e);
        });
    },

    formatDate(value) {
      return moment(String(value)).format('MM/DD/YYYY');
    },

    getPeople(id) {
      PeopleDataService.get(id)
        .then(response => {
          this.people = response.data;
          this.people.birth = this.formatDate(response.data.birth);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
        
    newPeople() {
      this.submitted = false;
      this.people = {};
    }
  },

  mounted() {
    this.message = '';
    if (this.$route.params.id) {
      this.getPeople(this.$route.params.id);
    }
  },

  components: {
    Datepicker
  }
}
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>