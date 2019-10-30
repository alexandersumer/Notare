import axios from 'axios';
import { Component} from 'react'; 

//const BASE_URL = '127.0.0.1:5000'
//const BASE_URL = `${process.env.REACT_APP_URL}`

export default axios.create({
    baseURL: "http://127.0.0.1:5000/v1"

});

