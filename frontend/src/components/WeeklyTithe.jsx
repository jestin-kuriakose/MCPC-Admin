import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import Loading from './Loading'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import NewTitheForm from './NewTitheForm'

const WeeklyTithe = () => {

    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const [count, setCount] = useState(1)
    const [members, setMembers] = useState([])
    const [titheArray, setTitheArray] = useState([{date: new Date().toLocaleDateString()}])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [array, setArray] = useState([])

    useEffect(() => {

        const fetchMembers = async() => {
            try {
                const res = await axiosPrivate.get("/member/memberData")
                setMembers(res.data)
            } catch(err) {
                setError(err.message)
            }
        }
        fetchMembers()
    }, [])

useEffect(() => {
    setArray((prev) => [...prev, count])
}, [count])

    const handleChange = (e, index) => {
        const objectExist = titheArray?.filter(obj => obj.index == index+1)
        setTitheArray((prev) => {
            let newArray = []
            if(objectExist.length > 0) {
                newArray = prev?.map((tithe, i) => {
                    if(tithe.index == index+1) {
                        return {...tithe, [e.target.name]: e.target.value}
                    } else {
                        return tithe
                    }
                })
            } else {
                newArray = [...prev, {index: count, date: new Date().toLocaleDateString(), [e.target.name]: e.target.value }]
            }
            return newArray
        })
    }

    const handleAdd = () => {
        setCount(prev => prev + 1)
    }

    const handleDelete = (e, index) => {
        const filteredArray = titheArray.filter(tithe => tithe.index != index+1)
        setTitheArray(filteredArray)
        
    }

    const handleSave = async() => {
        const filteredArray = titheArray.filter(tithe => tithe.index > 0)
        const newArray = filteredArray.map((obj) => {
            delete obj.index
            return obj
        })
        setIsLoading(true)
        setError("")
        try{
            const res = await axiosPrivate.post("/tithe/bulk", newArray)
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
                <form onSubmit={handleSave}>
                <div>
                    {array?.map((arr, index) => (
                        <div className="row g-3 border p-2 m-2">
                            <button onClick={(e)=>handleDelete(e, index)} type="button" class="btn-close" aria-label="Close"></button>
                            <div className="col-sm-4 ">
                                <label htmlFor="memberValidation">Member</label>
                                <select name="memberId" id="memberValidation" className="form-select" defaultValue={''} required onChange={(e)=>handleChange(e, index)}>
                                    <option value="" disabled>Choose...</option>
                                        {members?.map((member) => (
                                            <option value={member.id}>{member.firstName + " " + member.lastName}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="col-sm-3 ">
                                <label htmlFor="dateValidation">Date</label>
                                <input type="date" name='date' onChange={(e)=>handleChange(e, index)}  className="form-control" id="dateValidation" required/>
                            </div>

                            <div className="col-sm-3">
                                <label htmlFor="amountValidation">Amountt</label>
                                <input min={1} onInput={(e)=>handleChange(e, index)} type="number" name="amount" id="amountValidation" className="form-control" required/>
                            </div>
                        </div>
                    ))}

                        <button className="btn btn-primary col-sm-1 mt-3" onClick={handleAdd} type="button">Add</button>
                    </div>


                    <div className="w-sm-25 mt-3">
                        <button className="btn btn-primary w-sm-25" type="submit" >Save</button>
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