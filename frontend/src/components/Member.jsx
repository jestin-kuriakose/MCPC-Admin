import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { members } from '../dummyData'

const Member = () => {
    const location = useLocation()
    const memberId = location.pathname.split('/')[2]
    const [memberData, setMemberData] = useState()

    const navigate = useNavigate()

    useEffect(()=> {
        const fetchMemberData = () => {
            const data = members.filter(member => member.id == memberId)
            setMemberData(...data)
            console.log(memberData)
        }
        fetchMemberData()
    }, [])

  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
            <h4 className="my-3">Member Details</h4>
                <form className="needs-validation" novalidate>
                <div className="row g-3">
                    <div className="col-sm-4">
                        <label for="firstName" className="form-label fw-bold">First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" value={memberData?.firstName} required/>
                        <div className="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <label for="middleName" className="form-label fw-bold">Middle name</label>
                        <input type="text" className="form-control" id="middleName" placeholder="" value={memberData?.middleName}/>
                    </div>

                    <div className="col-sm-4">
                        <label for="lastName" className="form-label fw-bold">Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" value={memberData?.lastName} required/>
                        <div className="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="sex" className="form-label fw-bold">Sex</label>
                        <select name="sex" id="sex" value={memberData?.sex} className="form-select">
                            <option value="">Choose..</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="dob" className="form-label fw-bold">Date of Birth</label>
                        <input type="date" name="dob" id="dob" className='form-control' value={memberData?.dob}/>
                    </div>

                    <div className="col-sm-3">
                        <label for="doj" className="form-label fw-bold">Date of Joining</label>
                        <input type="date" name="doj" id="doj" className='form-control' value={memberData?.doj}/>
                    </div>

                    <div className="col-sm-3">
                        <label for="active" className="form-label fw-bold">Active ?</label>
                        <select name="active" id="active" className='form-select' value={memberData?.active ? "yes" : "no"}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="col-sm-6">
                        <label for="address1" className="form-label fw-bold">Address 1</label>
                        <input type="text" className="form-control" id="address1" placeholder="" value={memberData?.address1} required/>
                        <div className="invalid-feedback">
                            Valid address is required.
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <label for="address2" className="form-label fw-bold">Address 2</label>
                        <input type="text" className="form-control" id="address2" placeholder="" value={memberData?.address2}/>
                    </div>

                    <div className="col-sm-3">
                        <label for="city" className="form-label fw-bold">City</label>
                        <input type="text" className="form-control" id="city" placeholder="" value={memberData?.city} required/>
                        <div className="invalid-feedback">
                            Valid city is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="province" className="form-label fw-bold">Province</label>
                        <select name="province" id="province" className='form-select' value={memberData?.province} required>
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
                        <input type="text" className="form-control" id="postalCode" placeholder="" value={memberData?.postalCode} required/>
                        <div className="invalid-feedback">
                            Valid postal code is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                    <label for="country" className="form-label fw-bold">Country</label>
                    <select className="form-select" id="country" value={memberData?.country} required>
                        <option disabled value="">Choose...</option>
                        <option>United States</option>
                        <option>Canada</option>
                    </select>
                    <div className="invalid-feedback">
                        Please select a valid country.
                    </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="email1" className="form-label fw-bold">Email 1</label>
                        <input type="text" className="form-control" id="email1" placeholder="" value={memberData?.email1} required/>
                        <div className="invalid-feedback">
                            Valid email is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="email2" className="form-label fw-bold">Email 2</label>
                        <input type="text" className="form-control" id="email2" placeholder="" value={memberData?.email2}/>
                    </div>

                    <div className="col-sm-3">
                        <label for="phone1" className="form-label fw-bold">Phone 1</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text">+1</span>
                            <input type="text" className="form-control" id="phone1" placeholder="" value={memberData?.phone1} required/>
                            <div className="invalid-feedback">
                                Valid phone is required.
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <label for="phone2" className="form-label fw-bold">Phone 2</label>
                        <div className="input-group">
                            <span className="input-group-text">+1</span>
                            <input type="text" className="form-control" id="phone2" placeholder="" value={memberData?.phone2} />
                        </div>
                    </div>

                    <div className="my-4"/>

                    <div className="col-sm-3">
                        <label for="spouse" className="form-label fw-bold">Spouse</label>
                        <select className="form-select" id="spouse">
                            <option disabled>Choose..</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}

                        </select>
                    </div>

                    <div className="col-sm-9">

                    </div>

                    <div className="col-sm-3">
                        <label for="child1" className="form-label fw-bold">Child 1</label>
                        <select className="form-select" id="child1" required>
                        <option value={'0'} disabled>Choose..</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="child2" className="form-label fw-bold">Child 2</label>
                        <select className="form-select" id="child2" required>
                        <option value={'0'} disabled>Choose..</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="child3" className="form-label fw-bold">Child 3</label>
                        <select className="form-select" id="child3" required>
                        <option value={'0'} disabled>Choose..</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="child4" className="form-label fw-bold">Child 4</label>
                        <select className="form-select" id="child4" required>
                        <option value={'0'} disabled>Choose..</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className='w-sm-25'>
                    <button className="btn btn-primary w-sm-25 my-4" data-bs-toggle="modal" data-bs-target="#saveMemberModal" type="button">Save</button>
                    <button type='button' onClick={()=>navigate(-1)} className='btn btn-danger w-sm-25 mx-2'>Cancel</button>
                </div>
                
                {/* Modal Component */}
                <div class="modal fade" id="saveMemberModal" tabindex="-1" role="dialog" aria-labelledby="saveModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="saveModalLongTitle">Save Changes</h5>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to make changes to this member ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>


                </form>
            </div>
        </div>
    </div>

  )
}

export default Member