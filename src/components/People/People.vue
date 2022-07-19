<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="name">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    required
                    v-model="people.name"
                    name="name"
                />
            </div>
            <div class="form-group">
                <label for="birth">Data de Nascimento</label>
                <input
                    class="form-control"
                    id="birth"
                    required
                    v-model="people.birth"
                    name="birth"
                />
            </div>
            <button @click="savePeople" class="btn btn-success">Enviar</button>
        </div>
        <div v-else>
            <h4>Enviado com sucesso!</h4>
            <button class="btn btn-success" @click="newPeople">Novo</button>
        </div>
    </div>
</template>

<script>
import PeopleDataService from '../services/PeopleDataService';

export default {
    name: 'add-people',
    data() {
        return {
            people: {
                id: null,
                name: "",
                birth: "", 
            },
            submitted: false
        };
    },
    methods: {
        savePeople() {
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
        newPeople() {
            this.submitted = false;
            this.people = {};
        }
    }
}
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>