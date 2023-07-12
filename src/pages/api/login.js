import axios from "axios";
import {setCookie} from "cookies-next";

export default async function handler(req, res){
    try {
        const body = req.body;
        const url = `${process.env.BACKEND_API}/login`
        const response = await axios.post(url, body)
        const {data} = response
        const cookiesValue = btoa(JSON.stringify(data?.data))
        setCookie('dans_auth', cookiesValue, {req, res, httpOnly : true, sameSite : true})
        return res.json(data)
    }catch (e){
        console.log(e)
        const data = e.response?.data
        return res.status(422).json(data)

    }
}
