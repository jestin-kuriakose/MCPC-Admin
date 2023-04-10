import React, { useState } from 'react'
import { members } from '../dummyData'
import { useNavigate } from 'react-router-dom'

const NewMember = () => {
    const [memberInfo, setMemberInfo] = useState({})

    const navigate = useNavigate()

    console.log(memberInfo)

  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
            <h4 className="my-3">New Member</h4>
                <form className="needs-validation" noValidate>
                <div className="row g-3">
                    <div className="col-sm-4">
                        <label for="firstName" className="form-label fw-bold">First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" defaultValue={''} required onChange={(e)=>setMemberInfo((prev)=>({...prev, firstName: e.target.value}))}/>
                        <div className="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <label for="middleName" className="form-label fw-bold">Middle name</label>
                        <input type="text" className="form-control" id="middleName" placeholder="" defaultValue={''} onChange={(e)=>setMemberInfo((prev)=>({...prev, middleName: e.target.value}))}/>
                    </div>

                    <div className="col-sm-4">
                        <label for="lastName" className="form-label fw-bold">Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" defaultValue={''} required onChange={(e)=>setMemberInfo((prev)=>({...prev, lastName: e.target.value}))}/>
                        <div className="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="sex" className="form-label fw-bold">Sex</label>
                        <select name="sex" id="sex" defaultValue={"M"} className="form-select" required onChange={(e)=>setMemberInfo((prev)=>({...prev, sex: e.target.value}))}>
                            <option value="">Choose..</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                        <div className="invalid-feedback">
                            Valid Member is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="dob" className="form-label fw-bold">Date of Birth</label>
                        <input type="date" name="dob" id="dob" className='form-control' defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, dob: e.target.value}))}/>
                        <div className="invalid-feedback">
                            Valid Member is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="doj" className="form-label fw-bold">Date of Joining</label>
                        <input type="date" name="doj" id="doj" className='form-control' defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, doj: e.target.value}))}/>
                        <div className="invalid-feedback">
                            Valid Member is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="active" className="form-label fw-bold">Active ?</label>
                        <select name="active" id="active" className='form-select' defaultValue={"yes"} required onChange={(e)=>setMemberInfo((prev)=>({...prev, active: e.target.value}))}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <div className="invalid-feedback">
                            Valid Member is required.
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <label for="address1" className="form-label fw-bold">Address 1</label>
                        <input type="text" className="form-control" id="address1" placeholder="" defaultValue={""} required  onChange={(e)=>setMemberInfo((prev)=>({...prev, address1: e.target.value}))}/>
                        <div className="invalid-feedback">
                            Valid address is required.
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <label for="address2" className="form-label fw-bold">Address 2</label>
                        <input type="text" className="form-control" id="address2" placeholder="" defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, address2: e.target.value}))}/>
                        <div className="invalid-feedback">
                            Valid Member is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="city" className="form-label fw-bold">City</label>
                        <input type="text" className="form-control" id="city" placeholder="" defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, city: e.target.value}))}/>
                        <div className="invalid-feedback">
                            Valid city is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="province" className="form-label fw-bold">Province</label>
                        <select name="province" id="province" className='form-select' defaultValue={"ON"} required onChange={(e)=>setMemberInfo((prev)=>({...prev, province: e.target.value}))}>
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
                        <div className="invalid-feedback">
                            Valid Member is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="postalCode" className="form-label fw-bold">Postal Code</label>
                        <input type="text" className="form-control" id="postalCode" placeholder="" defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, postalCode: e.target.value}))}/>
                        <div className="invalid-feedback">
                            Valid postal code is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                    <label for="country" className="form-label fw-bold">Country</label>
                    <select className="form-select" id="country" defaultValue={"CA"} required onChange={(e)=>setMemberInfo((prev)=>({...prev, country: e.target.value}))}>
                        <option disabled value="">Choose...</option>
                        <option value={'US'}>United States</option>
                        <option value={'CA'}>Canada</option>
                    </select>
                    <div className="invalid-feedback">
                        Please select a valid country.
                    </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="email1" className="form-label fw-bold">Email 1</label>
                        <input type="email" className="form-control" id="email1" placeholder="" defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, email1: e.target.value}))}/>
                        <div className="invalid-feedback">
                            Valid email is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="email2" className="form-label fw-bold">Email 2</label>
                        <input type="email" className="form-control" id="email2" placeholder="" defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, email2: e.target.value}))}/>
                        <div className="invalid-feedback">
                            Valid Member is required.
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label for="phone1" className="form-label fw-bold">Phone 1</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text">+1</span>
                            <input type="text" className="form-control" id="phone1" placeholder="" defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, phone1: e.target.value}))}/>
                            <div className="invalid-feedback">
                                Valid phone is required.
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <label for="phone2" className="form-label fw-bold">Phone 2</label>
                        <div className="input-group">
                            <span className="input-group-text">+1</span>
                            <input type="text" className="form-control" id="phone2" placeholder="" defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, phone2: e.target.value}))}/>
                        </div>
                        <div className="invalid-feedback">
                            Valid Member is required.
                        </div>
                    </div>

                    <div className="my-4"/>

                    <div className="col-sm-3">
                        <label for="spouse" className="form-label fw-bold">Spouse</label>
                        <select className="form-select" id="spouse" defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, spouse: e.target.value}))}>
                            <option value={""} disabled>Choose..</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}

                        </select>
                    </div>

                    <div className="col-sm-9">

                    </div>

                    <div className="col-sm-3">
                        <label for="child1" className="form-label fw-bold">Child 1</label>
                        <select className="form-select" id="child1" defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, child1: e.target.value}))}>
                        <option  value={""} disabled>Choose..</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="child2" className="form-label fw-bold">Child 2</label>
                        <select className="form-select" id="child2" defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, child2: e.target.value}))}>
                        <option value={""} disabled>Choose..</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="child3" className="form-label fw-bold">Child 3</label>
                        <select className="form-select" id="child3"  defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, child3: e.target.value}))}>
                        <option value={""} disabled>Choose..</option>
                            {members?.map((member) => (
                                <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-3">
                        <label for="child4" className="form-label fw-bold">Child 4</label>
                        <select className="form-select" id="child4"  defaultValue={""} required onChange={(e)=>setMemberInfo((prev)=>({...prev, child4: e.target.value}))}>
                        <option value={""} disabled>Choose..</option>
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
                
                {/* Modal Component */}
                <div class="modal fade" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="saveModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="saveModalLongTitle">Save Changes</h5>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want create this member ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Yes</button>
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

export default NewMember