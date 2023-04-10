import React, { useEffect, useState } from 'react'
import { members, tithes } from '../dummyData'
import { useLocation, useNavigate } from 'react-router-dom'

const Tithe = () => {
    const [titheData, setTitheData] = useState()
    const location = useLocation()
    const titheId = location.pathname.split('/')[2]

    const navigate = useNavigate()

    
    useEffect(()=> {
        const fetchTitheData = () => {
            const data = tithes.filter((tithe)=>titheId == tithe.id)
            setTitheData(...data)
        }
        fetchTitheData()
    }, [])
        
    

    console.log(titheData)
  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
            <h4 className="my-3">Member Details</h4>
                <form className="needs-validation" novalidate>
                <div className="row g-3">
                    <div className="col-sm-4">
                        <label for="firstName" className="form-label fw-bold">Member</label>
                            <select id='member' name='member' className='form-select' defaultValue={titheData?.member}>
                                {members?.map((member) => (
                                    <option id={member?.id} value={member?.id}>{member?.firstName + " " + member?.lastName}</option>
                                ))}
                            </select>
                        <div className="invalid-feedback">
                            Valid Member is required.
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <label for="middleName" className="form-label fw-bold">Date</label>
                        <input type="date" className="form-control" id="middleName" placeholder="" defaultValue={titheData?.date}/>
                        <div className="invalid-feedback">
                            Valid Date is required.
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <label for="lastName" className="form-label fw-bold">Amount</label>
                        <input type="number" className="form-control" id="lastName" placeholder="" defaultValue={titheData?.amount} required/>
                        <div className="invalid-feedback">
                            Valid amount is required.
                        </div>
                    </div>

                    <div className='w-sm-25'>
                        <button className='btn btn-primary w-sm-25' data-bs-toggle="modal" data-bs-target="#saveTitheModal" type='button'>Save</button>
                        <button type='button' onClick={()=>navigate('/tithes')} className='btn btn-danger mx-2 w-sm-25'>Cancel</button>
                    </div>

                    {/* Modal Component */}
                    <div class="modal fade" id="saveTitheModal" tabindex="-1" role="dialog" aria-labelledby="saveModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="saveModalLongTitle">Save Changes</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to make changes to this Tithe Information ?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
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

export default Tithe