import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import Loading from './Loading'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import NewTitheForm from './NewTitheForm'

const WeeklyTithe = () => {

    const navigate = useNavigate()
    const [count, setCount] = useState(1)
    const [members, setMembers] = useState([])
    const [titheArray, setTitheArray] = useState([])
    const [titheInfo, setTitheInfo] = useState({date: new Date().toLocaleDateString()})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const axiosPrivate = useAxiosPrivate()
    const [array, setArray] = useState([])

    useEffect(() => {

        const fetchMembers = async() => {
            try {
                const res = await axiosPrivate.get("/member/memberData")
                setMembers(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchMembers()
        console.log(array)
    }, [])

useEffect(() => {
    setArray((prev) => [...prev, count])
}, [count])

    const handleAdd = (tithe) => {
        setCount(prev => prev + 1)
        setTitheArray((prev) => [...prev, titheInfo])
        console.log(titheArray)
    }

    const handleSave = async() => {
        setTitheArray((prev) => [...prev, titheInfo])
        setIsLoading(true)
        setError("")
        try{
            const res = await axiosPrivate.post("/tithe/bulk", titheArray)
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
                <h3 className="my-3">Weekly Tithe In-take</h3>
                <form>
                    {array?.map((arr, index) => (
                        // <NewTitheForm key={index} members={members} count={count} handleAdd={handleAdd}/>
                        <div className="row g-3">
                            <div className="col-sm-4 ">
                                <label htmlFor="memberValidation">Member</label>
                                <select name="member" id="memberValidation" className="form-select" defaultValue={''} required onChange={(e)=>setTitheInfo((prev)=>({...prev, memberId: e.target.value}))}>
                                    <option value="" disabled>Choose...</option>
                                        {members?.map((member) => (
                                            <option value={member.id}>{member.firstName + " " + member.lastName}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="col-sm-3 ">
                                <label htmlFor="dateValidation">Date</label>
                                <input type="date" onChange={(e)=>setTitheInfo((prev)=>({...prev, date: new Date(e.target.value).toLocaleDateString()}))} defaultValue={new Date().toISOString().split('T')[0]} className="form-control" id="dateValidation" required/>
                            </div>

                            <div className="col-sm-3">
                                <label htmlFor="amountValidation">Amount</label>
                                <input min={1} onInput={(e)=>setTitheInfo((prev) => ({...prev, amount: e.target.value}))} type="number" name="amount" id="amountValidation" className="form-control" required/>
                            </div>
                            <button className="btn btn-primary col-sm-1 " onClick={handleAdd} type="button">+</button>
                        </div>
                    ))}

                    <div className="w-sm-25">
                        <button className="btn btn-primary w-sm-25" type="button" onClick={handleSave}>Save</button>
                        <button onClick={()=>navigate(-1)} className="btn btn-danger btn-sm-sm mx-1">Cancel</button>
                    </div>
                </form>
                {error == "" ? "" : 
                    <div class="alert alert-danger mt-3" role="alert">
                        {error}. Please refresh the page or try again later.
                    </div>
                }
            </div>

        </div>}

    </div>
  )
}

export default WeeklyTithe