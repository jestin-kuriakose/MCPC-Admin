import React, { useState } from 'react'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'

const NewTitheForm = ({members, count, handleAdd}) => {
    const [titheInfo, setTitheInfo] = useState({date: new Date().toLocaleDateString()})

    const handleButtonClick = (e) => {
        e.preventDefault()
        handleAdd(titheInfo)
    }

  return (
    <>
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
            <button className="btn btn-primary col-sm-1 " onClick={handleButtonClick} type="button">+</button>
        </div>
        
    </>
  )
}

export default NewTitheForm