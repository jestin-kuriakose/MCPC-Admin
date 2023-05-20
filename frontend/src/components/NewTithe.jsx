import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import Loading from './Loading'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const NewTithe = () => {
    const navigate = useNavigate()
    const [titheInfo, setTitheInfo] = useState({date: new Date().toLocaleDateString()})
    const [members, setMembers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchMembers = async() => {
            try {
                const res = await axiosPrivate.get("/member")
                setMembers(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchMembers()
    }, [])

    const handleSave = async() => {
        setIsLoading(true)
        setError("")
        try{
            const res = await axiosPrivate.post("/tithe", titheInfo)
            setIsLoading(false)
            navigate('/tithes')
        } catch(err) {
            setIsLoading(false)
            setError(err.message)
        }
        
    }
  return (
    <div className='container-fluid'>
        {isLoading ? <Loading/> : <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
                <h3 className="my-3">New Tithe</h3>
                <form action="">
                    <div className="row g-3">
                        <div className="col-sm-4">
                            <label for="member" className="form-label fw-bold">Member</label>
                            <select name="member" id="member" className="form-select" defaultValue={''} required onChange={(e)=>setTitheInfo((prev)=>({...prev, memberId: e.target.value}))}>
                                <option value="" disabled>Choose...</option>
                                    {members?.map((member) => (
                                        <option value={member.id}>{member.firstName + " " + member.lastName}</option>
                                    ))}
                            </select>
                            <div className="invalid-feedback">
                                Valid Member is required.
                            </div>
                        </div>

                        <div className="col-sm-2">
                            <label htmlFor="" className="form-label">Date</label>
                            <input onChange={(e)=>setTitheInfo((prev)=>({...prev, date: new Date(e.target.value).toLocaleDateString()}))} defaultValue={new Date().toISOString().split('T')[0]} type="date" className='form-control' required/>
                            <div className="invalid-feedback">
                                Valid Member is required.
                        </div>
                        </div>

                        <div className="col-sm-2">
                            <label className="form-label">Amount $</label>
                            <input onInput={(e)=>setTitheInfo((prev) => ({...prev, amount: e.target.value}))} defaultValue={'0'} type="number" name="amount" id="amount" className='form-control' required/>
                            <div className="invalid-feedback">
                                Valid Member is required.
                            </div>
                        </div>

                        <div className="w-sm-25">
                            <button className="btn btn-primary w-sm-25" data-bs-toggle="modal" data-bs-target="#saveModal" type="button">Save</button>
                            <button onClick={()=>navigate(-1)} className="btn btn-danger btn-sm-sm mx-1">Cancel</button>
                        </div>
                            
                        {error == "" ? "" : <p className='bg-danger text-white text-center w-50'>{error}. Please try again</p>}
                        <Modal handleClick={handleSave} type={'Tithe'} action={'Create'}/>
                    </div>
                </form>
            </div>
        </div>}
    </div>
  )
}

export default NewTithe