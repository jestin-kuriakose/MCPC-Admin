import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Modal from './Modal'
import Loading from './Loading'
import baseURL from "../http.js"

const SingleMember = () => {
    const location = useLocation()
    const memberId = location.pathname.split('/')[2]
    const [members, setMembers] = useState([])
    const [memberData, setMemberData] = useState()
    const [editedMemberData, setEditedMemberData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    useEffect(()=> {
        let isMounted = true
        const controller = new AbortController()

        const fetchMemberData = async() => {
            try {
                const res = await axios.get(`/member/memberData`, {
                    signal: controller.signal
                })
                const filteredData = res.data.filter(d=>d.id == memberId)
                isMounted && setMembers(res.data)
                isMounted && setMemberData(...filteredData)
            } catch(err) {
                console.log(err)
            }
        }
        fetchMemberData()

        return () => {
            isMounted = false;
            controller.abort()
        }
    }, [])

    const handleSave = async () => {
        setIsLoading(true)
        setError("")
        try {
            const res = await axios.patch(`/member/${memberId}`, editedMemberData)
            setIsLoading(false)
            navigate('/members')
        } catch(err) {
            setError(err.message)
            setIsLoading(false)
        }
        
    }

    const handleChange = (e) => {
        setEditedMemberData((prev)=> ({...prev, [e.target.name]: e.target.value}))
        console.log(editedMemberData)
    }

  return (
    <div className='container-fluid'>
        {isLoading ? <Loading/> : 
        <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
            <h4 className="my-3">Member Details</h4>
                <form className="needs-validation" novalidate>
                <div className="row g-3">
                    <div className="col-sm-4">
                        <label for="firstName" className="form-label fw-bold">First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" name='firstName' defaultValue={memberData?.firstName} onChange={handleChange} required/>
                        <div className="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <label for="middleName" className="form-label fw-bold">Middle name</label>
                        <input type="text" className="form-control" id="middleName" name='middleName' placeholder="" defaultValue={memberData?.middleName} onChange={handleChange}/>
                    </div>

                    <div className="col-sm-4">
                        <label for="lastName" className="form-label fw-bold">Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" name='lastName' defaultValue={memberData?.lastName} onChange={handleChange} required/>
                        <div className="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="sex" className="form-label fw-bold">Sex</label>
                        <select name="sex" id="sex" value={editedMemberData?.sex ? editedMemberData?.sex : memberData?.sex} className="form-select" onChange={handleChange}>
                            <option value="">Choose..</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="dob" className="form-label fw-bold">Date of Birth</label>
                        <input type="date" name="dob" id="dob" className='form-control' defaultValue={memberData?.dob} onChange={handleChange}/>
                    </div>

                    <div className="col-sm-3">
                        <label for="doj" className="form-label fw-bold">Date of Joining</label>
                        <input type="date" name="doj" id="doj" className='form-control' defaultValue={memberData?.doj} onChange={handleChange}/>
                    </div>

                    <div className="col-sm-3">
                        <label for="active" className="form-label fw-bold">Active ?</label>
                        <select name="active" id="active" className='form-select' value={editedMemberData?.active ? editedMemberData?.active : memberData?.active} onChange={handleChange}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="col-sm-6">
                        <label for="address1" className="form-label fw-bold">Address 1</label>
                        <input type="text" className="form-control" id="address1" placeholder="" name='address1' defaultValue={memberData?.address1} onChange={handleChange} required/>
                        <div className="invalid-feedback">
                            Valid address is required.
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <label for="address2" className="form-label fw-bold">Address 2</label>
                        <input type="text" className="form-control" id="address2" placeholder="" name='address2' defaultValue={memberData?.address2} onChange={handleChange}/>
                    </div>

                    <div className="col-sm-3">
                        <label for="city" className="form-label fw-bold">City</label>
                        <input type="text" className="form-control" id="city" placeholder="" name='city' defaultValue={memberData?.city} onChange={handleChange} required/>
                        <div className="invalid-feedback">
                            Valid city is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="province" className="form-label fw-bold">Province</label>
                        <select name="province" id="province" className='form-select' value={editedMemberData?.province ? editedMemberData?.province : memberData?.province} onChange={handleChange} required>
                            <option value="" disabled>Choose..</option>
                            <option value="AB">Alberta</option>
                            <option value="BC">British Columbia</option>
                            <option value="MB">Manitoba</option>
                            <option value="NB">New Brunswick</option>
                            <option value="NL">Newfoundland and Labrador</option>
                            <option value="NS">Nova Scotia</option>
                            <option value="ON">Ontario</option>
                            <option value="PEI">Prince Edward Island</option>
                            <option value="QC">Quebec</option>
                            <option value="SK">Saskatchewan</option>
                            <option value="YK">Yukon</option>
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="postalCode" className="form-label fw-bold">Postal Code</label>
                        <input type="text" className="form-control" id="postalCode" name='postalCode' placeholder="" defaultValue={memberData?.postalCode} onChange={handleChange} required/>
                        <div className="invalid-feedback">
                            Valid postal code is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                    <label for="country" className="form-label fw-bold">Country</label>
                    <select className="form-select" id="country" defaultValue={memberData?.country} name='country' onChange={handleChange} required>
                        <option disabled value="">Choose...</option>
                        <option value={"United States"}>United States</option>
                        <option value={"Canada"}>Canada</option>
                    </select>
                    <div className="invalid-feedback">
                        Please select a valid country.
                    </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="email1" className="form-label fw-bold">Email 1</label>
                        <input type="text" className="form-control" id="email1" placeholder="" name='email1' defaultValue={memberData?.email1} onChange={handleChange} required/>
                        <div className="invalid-feedback">
                            Valid email is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="email2" className="form-label fw-bold">Email 2</label>
                        <input type="text" className="form-control" id="email2" placeholder="" name='email2' defaultValue={memberData?.email2} onChange={handleChange}/>
                    </div>

                    <div className="col-sm-3">
                        <label for="phone1" className="form-label fw-bold">Phone 1</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text">+1</span>
                            <input type="text" className="form-control" id="phone1" placeholder="" name='phone1' defaultValue={memberData?.phone1} onChange={handleChange} required/>
                            <div className="invalid-feedback">
                                Valid phone is required.
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <label for="phone2" className="form-label fw-bold">Phone 2</label>
                        <div className="input-group">
                            <span className="input-group-text">+1</span>
                            <input type="text" className="form-control" id="phone2" name='phone2' placeholder="" defaultValue={memberData?.phone2} onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="my-4"/>

                    <div className="col-sm-3">
                        <label for="spouse" className="form-label fw-bold">Spouse</label>
                        <select className="form-select" id="spouse" name='spouse' value={editedMemberData?.spouse ? editedMemberData?.spouse : memberData?.spouse} onChange={handleChange}>
                            <option value={0}>NA</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}

                        </select>
                    </div>

                    <div className="col-sm-9">

                    </div>

                    <div className="col-sm-3">
                        <label for="child1" className="form-label fw-bold">Child 1</label>
                        <select className="form-select" id="child1" name='child1' value={editedMemberData?.child1 ? editedMemberData?.child1 : memberData?.child1} onChange={handleChange} required>
                        <option value={0}>NA</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="child2" className="form-label fw-bold">Child 2</label>
                        <select className="form-select" id="child2" name='child2' value={editedMemberData?.child2 ? editedMemberData?.child2 : memberData?.child2} onChange={handleChange} required>
                        <option value={0}>NA</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="child3" className="form-label fw-bold">Child 3</label>
                        <select className="form-select" id="child3" name='child3' value={editedMemberData?.child3 ? editedMemberData?.child3 : memberData?.child3} onChange={handleChange} required>
                        <option value={0}>NA</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="child4" className="form-label fw-bold">Child 4</label>
                        <select className="form-select" id="child4" name='child4' value={editedMemberData?.child4 ? editedMemberData?.child4 : memberData?.child4} onChange={handleChange} required>
                        <option value={0}>NA</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className='w-sm-25'>
                    <button className="btn btn-primary w-sm-25 my-4" data-bs-toggle="modal" data-bs-target="#saveModal" type="button">Save</button>
                    <button type='button' onClick={()=>navigate(-1)} className='btn btn-danger w-sm-25 mx-2'>Cancel</button>
                </div>
                
                <Modal handleClick={handleSave} type={"member"}/>

                {error == "" ? "" : <p className='text-white text-center bg-danger'>{error}. Please try again</p>}

                </form>
            </div>
        </div>}
    </div>

  )
}

export default SingleMember