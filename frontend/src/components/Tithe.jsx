import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Modal from './Modal'
import Loading from './Loading'
import baseURL from "../http.js"

const Tithe = () => {
    const [titheData, setTitheData] = useState({})
    const [editedTitheData, setEditedTitheData] = useState({})
    const [members, setMembers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const location = useLocation()
    const titheId = location.pathname.split('/')[2]
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchTitheData = async () => {
            try {
                const res = await axios.get(baseURL + "/tithe")
                const tithes = res.data
                const data = tithes.filter((tithe)=>titheId == tithe.id)
                setTitheData(...data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchTitheData()
    }, [])
        
    useEffect(() => {
        const fetchMemberData = async() => {
            try {
                const res = await axios.get(baseURL + "/member")
                setMembers(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchMemberData()
    },[])

    const handleChange = (e) => {
        setEditedTitheData((prev) => ({...prev, [e.target.name] : e.target.value}))
    }

    const handleSave = async () => {
        setIsLoading(true)
        try{
            const res = await axios.patch(`${baseURL}/tithe/${titheId}`, editedTitheData)
            console.log(res.data)
            setIsLoading(false)
            navigate('/tithes')
        } catch(err) {
            setError(err.message)
            setIsLoading(false)
        }
    }
console.log(editedTitheData)
  return (
    <div className='container-fluid'>
        {isLoading ? <Loading/> : 
        <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
            <h4 className="my-3">Member Details</h4>
                <form className="needs-validation" noValidate>
                <div className="row g-3">
                    <div className="col-sm-4">
                        <label htmlFor="firstName" className="form-label fw-bold">Member</label>
                            <select id='member' name='member' className='form-select' value={editedTitheData?.member ? editedTitheData?.member : titheData?.member} onChange={handleChange}>
                                {members?.map((member) => (
                                    <option key={member?.id} id={member?.id} value={member?.id}>{member?.firstName + " " + member?.lastName}</option>
                                ))}
                            </select>
                        <div className="invalid-feedback">
                            Valid Member is required.
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <label htmlFor="middleName" className="form-label fw-bold">Date</label>
                        <input type="date" className="form-control" id="middleName" placeholder="" defaultValue={titheData?.date} name='date' onChange={handleChange}/>
                        <div className="invalid-feedback">
                            Valid Date is required.
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <label htmlFor="lastName" className="form-label fw-bold">Amount</label>
                        <input type="number" className="form-control" id="lastName" placeholder="" defaultValue={titheData?.amount} name='amount' onChange={handleChange} required/>
                        <div className="invalid-feedback">
                            Valid amount is required.
                        </div>
                    </div>

                    <div className='w-sm-25'>
                        <button className='btn btn-primary w-sm-25' data-bs-toggle="modal" data-bs-target="#saveModal" type='button'>Save</button>
                        <button type='button' onClick={()=>navigate('/tithes')} className='btn btn-danger mx-2 w-sm-25'>Cancel</button>
                    </div>

                    <Modal handleClick={handleSave} type={"tithe"}/>

                    {error == "" ? "" : <p className='text-white bg-danger w-50 text-center'>{error}. Please try again</p>}
                    
            </div>
            </form>
        </div>
    </div>}
    </div>
  )
}

export default Tithe