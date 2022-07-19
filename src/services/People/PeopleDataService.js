import http from '../../http-common';

class PeopleDataService {
    getAll() {
        return http.get('/peoples');
    }

    get(id) {
        return http.get(`/peoples/${id}`);
    }

    create(data) {
        return http.post('/peoples', data);
    }

    update(id, data) {
        return http.put(`/peoples/${id}`, data);
    }

    delete(id) {
        return http.delete(`/peoples/${id}`);
    }

    deleteAll() {
        return http.deleteAll('/peoples');
    }

    findByName(name) {
        return http.get(`/peoples?name=${name}`);
    }
}

export default new PeopleDataService();