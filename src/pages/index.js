
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from "@/Components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import JobList from "@/Components/JobList";

const inter = Inter({ subsets: ['latin'] })

function Home() {
    const [jobList, setJobList] = useState([])
    const [page, setPage] = useState(1)
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [isFullTimeOnly, setIsFullTimeOnly] = useState(false)

    useEffect(() => {
        fetchJobList(1)
    }, [])


    const fetchJobList = async (page, isSearch = false) => {
        let url = `/api/recruitment?page=${page}`
        if (description !== ''){
            url = `${url}&description=${description}`
        }

        if (location !== ''){
            url = `${url}&location=${location}`
        }
        if (isFullTimeOnly){
            url = `${url}&full_time=true`
        }
        axios.get(url)
            .then(response => {
                const {data} = response;
                if (isSearch){
                    setJobList(data)
                }else{
                    const appendData = jobList.concat(data)
                    setJobList(appendData)
                    setPage(page)
                }
            })
            .catch(err => {
                if (err.response.data.message === 'unauthorized'){
                    window.location.href = '/login'
                }
                console.log(err)
            })
    }

    const handleMoreJobs = async () => {
       await fetchJobList(page + 1)
    }

    const handleChangeDescription = (e) => {
        const value = e.target.value;
        setDescription(value)
    }

    const handleChangeLocation = (e) => {
        const value = e.target.value;
        setLocation(value)
    }

    const handleFulltimeOnly = () => {
        setIsFullTimeOnly(!isFullTimeOnly)
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        setJobList([])
        await fetchJobList(1,true)
    }

    return (
        <div className="container-fluid">
            <form onSubmit={handleSearch}>
                <div className="row mb-3">
                    <div className="col-12 col-md-4 col-lg-5">
                        <label className="fw-bold">
                            Job Description
                        </label>
                        <input onChange={handleChangeDescription} className="form-control" value={description} placeholder="Filter by title, benefits, companies, experties"/>
                    </div>
                    <div className="col-12 col-md-4 col-lg-5">
                        <label className="fw-bold">
                            Location
                        </label>
                        <input className="form-control" value={location} onChange={handleChangeLocation} placeholder="Filter by city, state, zip code or country"/>

                    </div>
                    <div className="col-12 col-md-2 col-lg-1 align-self-end">
                        <div className="form-check">
                            <input onChange={handleFulltimeOnly} className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label fw-bold" htmlFor="flexCheckChecked">
                                Fulltime Only
                            </label>
                        </div>

                    </div>
                    <div className="col-12 col-md-2 col-lg-1 align-self-end">
                        <button className="btn btn-secondary btn-block">Search</button>
                    </div>
                </div>

            </form>
            <div className="row">
                <div className="col-12">
                    <div className="card p-3">
                        <h2 className="p-3">Job List</h2>

                        {
                            jobList.map((item, index) => {
                                return <JobList key={index} data={item}/>
                            })
                        }
                        {
                            jobList.length > 0 && <button onClick={handleMoreJobs} className="btn btn-primary">More Jobs</button>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

Home.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default Home
