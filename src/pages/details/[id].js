import Layout from "@/Components/Layout";
import Home from "@/pages";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";

function JobDetail(){
    const [detail, setDetail] = useState({})
    const router = useRouter()

    useEffect(() => {
        fetchJobDetail()
    }, [])

    const fetchJobDetail = () => {
        const baseUrl = location.origin;
        const path = window.location.pathname.split('/');
        const url = `${baseUrl}/api/recruitment/${path[2]}`
        axios.get(url)
            .then(response => {
                const {data} = response
                setDetail(data)
            })
            .catch(err => {
                if (err.response.data.message === 'unauthorized'){
                    window.location.href = '/login'
                }
            })
    }
    return (
        <>

            <div className="container-fluid">
                <div>
                    <Link className="text-decoration-none fw-bold text-primary" href="/">
                        <h5>
                            <i className="bi bi-arrow-left-square-fill"></i> &nbsp;
                            Back
                        </h5>
                    </Link>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <div className="card p-3">
                            <p className="mb-0 text-secondary">{detail?.type} / {detail?.location}</p>
                            <h3 className="pb-3 fw-bold">{detail?.title}</h3>
                            <div className="row border-top py-3">
                                <div className="col-8">
                                    <div dangerouslySetInnerHTML={{__html : detail?.description}}/>
                                </div>
                                <div className="col-4">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h4>
                                                {detail?.company}
                                            </h4>
                                        </div>
                                        <div className="card-body">
                                            <div>
                                                <img src={detail?.company_logo}/>
                                            </div>
                                            <a className="text-decoration" href={detail?.company_url}>{detail?.company_url}</a>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>
                                                How to apply
                                            </h4>
                                        </div>
                                        <div className="card-body">
                                            <div dangerouslySetInnerHTML={{__html : detail?.how_to_apply}}/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


JobDetail.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}




export default JobDetail
