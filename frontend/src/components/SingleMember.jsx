import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Modal from './Modal'
import Loading from './Loading'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const SingleMember = () => {
    const location = useLocation()
    const memberId = location.pathname.split('/')[2]
    const [members, setMembers] = useState([])
    const [memberData, setMemberData] = useState()
    const [editedMemberData, setEditedMemberData] = useState({})
    const [updatedInfo, setUpdatedInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [errors, setErrors] = useState({
        firstNameError: '',
        lastNameError: '',
        emailError: ''
    })

    const navigate = useNavigate()

    const axiosPrivate = useAxiosPrivate()

    useEffect(()=> {
        let isMounted = true
        const controller = new AbortController()

        const fetchMemberData = async() => {
            try {
                const res = await axiosPrivate.get(`/member/memberData`, {
                    signal: controller.signal
                })
                const filteredData = res.data.filter(d=>d.id == memberId)
                isMounted && setMembers(res.data)
                isMounted && setMemberData(...filteredData)
                isMounted && setUpdatedInfo(...filteredData)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setErrors({
            firstNameError: '',
            lastNameError: '',
            emailError: ''
        })

        let formIsValid = true

        if(updatedInfo?.firstName === undefined || updatedInfo?.firstName === '') {
            setErrors({...errors, firstNameError: "Enter a First Name"})
            formIsValid = false
        }
        if(updatedInfo?.lastName === undefined || updatedInfo?.lastName === '') {
            setErrors({...errors, lastNameError: "Enter a Last Name"})
            formIsValid = false
        }
        if(updatedInfo?.email1 === undefined || updatedInfo?.email1 === '') {
            setErrors({...errors, emailError: "Enter an email"})
            formIsValid = false
        }

        try {
            const res = await axiosPrivate.patch(`/member/${memberId}`, editedMemberData)
            setIsLoading(false)
            navigate('/members')
        } catch(err) {
            setError(err.message)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    const handleChange = (e) => {
        console.log(editedMemberData)
        setEditedMemberData((prev)=> ({...prev, [e.target.name]: e.target.value}))
        setUpdatedInfo((prev)=> ({...prev, [e.target.name]: e.target.value}))
    }
console.log(memberData)
  return (
    <div className='container-fluid'>
        {isLoading ? <Loading/> : 
        <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
            <h4 className="my-3">Member Details</h4>
            <Form onSubmit={handleSubmit} className='mb-2'>
                <div className="d-flex w-100 flex-wrap justify-content-md-center">
                    <div className='col-12 col-sm-4 d-md-flex flex-column align-items-center'>
                        <Form.Group className='col-md-10'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='firstName'
                                defaultValue={memberData?.firstName}
                                onInput={handleChange}
                                isInvalid={!!errors.firstNameError}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.firstNameError}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='middleName'
                                defaultValue={memberData?.middleName}
                                onInput={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='lastName'
                                onInput={handleChange}
                                defaultValue={memberData?.lastName}
                                isInvalid={!!errors.lastNameError}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.lastNameError}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Email 1</Form.Label>
                            <Form.Control
                                type='email'
                                name='email1'
                                onInput={handleChange}
                                defaultValue={memberData?.email1}
                                isInvalid={!!errors.emailError}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.emailError}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Email 2</Form.Label>
                            <Form.Control
                                type='email'
                                name='email2'
                                defaultValue={memberData?.email2}
                                onInput={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Phone 1</Form.Label>
                            <Form.Control
                                type='text'
                                name='phone1' 
                                placeholder='519-123-4567'
                                defaultValue={memberData?.phone1}
                                onInput={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Phone 2</Form.Label>
                            <Form.Control
                                type='text'
                                name='phone2'
                                placeholder='519-123-4567'
                                defaultValue={memberData?.phone2}
                                onInput={handleChange}
                            />
                        </Form.Group>
                    </div>

                    <div className='col-12 col-sm-1 d-sm-flex flex-column align-items-center'>
                        <span style={{backgroundColor:"#c7c8c9", width:"1px"}} className='h-100'></span>
                    </div>

                    <div className='col-12 col-sm-4 d-md-flex flex-column align-items-center'>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Address 1</Form.Label>
                            <Form.Control
                                type='text'
                                name='address1'
                                defaultValue={memberData?.address1}
                                onInput={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control
                                type='text'
                                name='address2'
                                defaultValue={memberData?.address2}
                                onInput={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type='text'
                                name='city'
                                defaultValue={memberData?.city} 
                                onInput={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Province</Form.Label>
                            <Form.Control
                                as="select"
                                name="province"
                                onChange={handleChange}
                                value={editedMemberData?.province ? editedMemberData?.province : memberData?.province}
                            >
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
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type='text'
                                name='postalCode'
                                defaultValue={memberData?.postalCode}
                                onInput={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                as="select"
                                name="country"
                                onChange={handleChange}
                                value={editedMemberData?.country ? editedMemberData?.country : memberData?.country}
                            >
                                <option value="" disabled>Choose..</option>
                                <option value={'United States'}>United States</option>
                                <option value={'Canada'}>Canada</option>
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className='col-12 col-sm-1 d-sm-flex flex-column align-items-center'>
                        <span style={{backgroundColor:"#c7c8c9", width:"1px"}} className='h-100'></span>
                    </div>

                    <div className='col-12 col-sm-2 d-md-flex flex-column align-items-center'>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Sex</Form.Label>
                            <Form.Control
                                as="select"
                                name='sex'  
                                onChange={handleChange}
                                value={editedMemberData?.sex ? editedMemberData?.sex : memberData?.sex}
                            >
                                <option value="">Choose..</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type='date'
                                name='dob'
                                onInput={handleChange}
                                defaultValue={memberData?.dob}
                            />
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Date of Joining</Form.Label>
                            <Form.Control
                                type='date'
                                name='doj'
                                onInput={handleChange}
                                defaultValue={memberData?.doj}
                            />
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Active ?</Form.Label>
                            <Form.Control
                                as="select"
                                name='active'  
                                onChange={handleChange}
                                value={editedMemberData?.active ? editedMemberData?.active : memberData?.active}
                            >
                                <option value="">Choose..</option>
                                <option value={'yes'}>Yes</option>
                                <option value={'no'}>No</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                </div>

                <hr/>

                <div className="d-flex w-100 flex-wrap justify-content-md-center">
                    <div className='col-12 col-sm-4 d-md-flex flex-column align-items-center'>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Spouse</Form.Label>
                            <Form.Control
                                as="select"
                                name='spouse'
                                onChange={handleChange}
                                value={editedMemberData?.spouse ? editedMemberData?.spouse : memberData?.spouse}
                            >
                                <option value={0}>Not Applicable</option>
                                {members?.map((member) => (
                                    <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className='col-12 col-sm-1 d-flex flex-column align-items-center'>
                        <span style={{backgroundColor:"#c7c8c9", width:"1px"}} className='h-100'></span>
                    </div>

                    <div className='col-12 col-sm-3 d-md-flex flex-column align-items-center'>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Child 1</Form.Label>
                            <Form.Control
                                as="select"
                                name='child1'
                                onChange={handleChange}
                                value={editedMemberData?.child1 ? editedMemberData?.child1 : memberData?.child1}
                            >
                                <option value={0}>Not Applicable</option>
                                {members?.map((member) => (
                                    <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Child 2</Form.Label>
                            <Form.Control
                                as="select"
                                name='child2'
                                onChange={handleChange}
                                value={editedMemberData?.child2 ? editedMemberData?.child2 : memberData?.child2}
                            >
                                <option value={0}>Not Applicable</option>
                                {members?.map((member) => (
                                    <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className='col-12 col-sm-1 d-flex flex-column align-items-center'>
                        <span style={{backgroundColor:"#c7c8c9", width:"1px"}} className='h-100'></span>
                    </div>

                    <div className='col-12 col-sm-3 d-md-flex flex-column align-items-center'>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Child 3</Form.Label>
                            <Form.Control
                                as="select"
                                name='child3'
                                onChange={handleChange}
                                value={editedMemberData?.child3 ? editedMemberData?.child3 : memberData?.child3}
                            >
                                <option value={0}>Not Applicable</option>
                                {members?.map((member) => (
                                    <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='col-md-10'>
                            <Form.Label>Child 4</Form.Label>
                            <Form.Control
                                as="select"
                                name='child4'
                                onChange={handleChange}
                                value={editedMemberData?.child4 ? editedMemberData?.child4 : memberData?.child4}
                            >
                                <option value={0}>Not Applicable</option>
                                {members?.map((member) => (
                                    <option value={member.id}>{member.firstName + " " + member.lastName} </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                </div>

                <div className='mt-5 d-flex align-items-center justify-content-center'>
                    {isLoading ?
                        <button class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="visually-hidden">Loading...</span>
                        </button> :
                        <Button type="submit" variant="primary" className=''>Save</Button>}
                    <Button onClick={()=>navigate(-1)} type="button" variant="danger" className='ms-2'>Cancel</Button>
                </div>


                {error == "" ? "" : <p className='bg-danger text-white text-center w-50 mt-2'>{error}. Please try again</p>}

            </Form>
            </div>
        </div>}
    </div>

  )
}

export default SingleMember