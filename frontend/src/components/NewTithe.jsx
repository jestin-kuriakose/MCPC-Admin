import React, { useState } from 'react'
import { members } from '../dummyData'
import { useNavigate } from 'react-router-dom'

const NewTithe = () => {
    const navigate = useNavigate()
    const [titheInfo, setTitheInfo] = useState({})

    console.log(titheInfo)
  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
                <h3 className="my-3">New Tithe</h3>
                <form action="">
                    <div className="row g-3">
                        <div className="col-sm-4">
                            <label for="member" className="form-label fw-bold">Member</label>
                            <select name="member" id="member" className="form-select" defaultValue={""} required onChange={(e)=>setTitheInfo((prev)=>({...prev, member: e.target.value}))}>
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
                            <input onChange={(e)=>setTitheInfo((prev)=>({...prev, date: e.target.value}))} defaultValue={""} type="date" className='form-control' required/>
                            <div className="invalid-feedback">
                                Valid Member is required.
                        </div>
                        </div>

                        <div className="col-sm-2">
                            <label className="form-label">Amount $</label>
                            <input onChange={(e)=>setTitheInfo((prev) => ({...prev, amount: e.target.value}))} defaultValue={'0'} type="number" name="amount" id="amount" className='form-control' required/>
                            <div className="invalid-feedback">
                                Valid Member is required.
                            </div>
                        </div>

                        <div className="w-sm-25">
                            <button className="btn btn-primary btn-sm-sm w-sm-25">Save</button>
                            <button onClick={()=>navigate(-1)} className="btn btn-danger btn-sm-sm mx-1">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default NewTithe