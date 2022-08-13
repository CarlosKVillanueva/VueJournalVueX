import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-demo-6d7a8-default-rtdb.firebaseio.com',
})


export default journalApi