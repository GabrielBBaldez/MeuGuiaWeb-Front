import axios from 'axios';

const ROTEIRO_API_BASE_URL = "http://localhost:8080/roteiro";

class RoteiroService{

    getRoteiros(){
        return axios.get(ROTEIRO_API_BASE_URL);
    }

    getRoteiroById(id){
        return axios.get(ROTEIRO_API_BASE_URL + '/' + id);
    }

    createRoteiro(roteiro){
        return axios.post(ROTEIRO_API_BASE_URL, roteiro);
    }

    deleteRoteiro(identificador){
        return axios.delete(ROTEIRO_API_BASE_URL + '/' + identificador);
    }
}

export default new RoteiroService()