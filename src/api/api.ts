import axios from "axios";
import {DataType} from "../features/Calculator/calculator-reducer";

export const dataAPI = {
    setData(data: DataType) {
        return axios.post('https://eoj3r7f3r4ef6v4.m.pipedream.net', data)
    }
}