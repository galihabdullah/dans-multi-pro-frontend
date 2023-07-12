import axios from "axios";
import {getCookie, setCookie} from "cookies-next";

export default async function handler(req, res){
    try {
        const cookie = getCookie('dans_auth',{req, res})
        if (!cookie){
            return res.status(422).json({
                success : false,
                message : 'unauthorized'
            })
        }
        let auth = atob(cookie.toString())
        auth = JSON.parse(auth)
        const id = req.query.id
        const url = `${process.env.BACKEND_API}/recruitment/${id}`
        console.log(url)
        const response = await axios.get(url, {
            headers : {
                "authorization" : `bearer ${auth.access_token}`
            }
        })
        const {data} = response.data
        return res.json(data)
    }catch (e){
        console.log(e)
        const data = e.response?.data
        return res.status(422).json(data)
    }
}
