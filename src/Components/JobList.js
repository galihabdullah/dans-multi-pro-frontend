import Link from "next/link";

const moment = require("moment")
export default function JobList(props){
    return (
        <div className="border-top p-3">
            <Link className="text-decoration-none" href={`/details/${props.data.id}`}>
                <div className="d-flex justify-content-between">
                    <div>
                        <h4 className="fw-bold text-primary mb-0">{props.data.title}</h4>
                        <span className="text-secondary fw-bold">{props.data.company} </span> - <span className="text-success fw-bold">{props.data.type}</span>
                    </div>
                    <div className="text-end">
                        <p className="fw-bold text-secondary mb-0">{props.data.location}</p>
                        <p className="text-secondary mb-0">{moment(props.data.created_at).fromNow()}</p>

                    </div>
                </div>
            </Link>
        </div>
    )
}
