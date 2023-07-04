import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import Loading from './Loading'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { Button, Form } from 'react-bootstrap'

const NewMember = () => {
    const axiosPrivate = useAxiosPrivate()
    const [members, setMembers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [errors, setErrors] = useState({
        firstNameError: '',
        lastNameError: '',
        emailError: ''
    })
    const [memberInfo, setMemberInfo] = useState({
        active: "yes",
        province: "ON",
        country: "Canada",
        spouse: 0,
        child1: 0,
        child2: 0,
        child3: 0,
        child4: 0,
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setMemberInfo((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setErrors({
            firstNameError: '',
            lastNameError: '',
            emailError: ''
        })
        setIsLoading(true)

        let formIsValid = true

        if(memberInfo?.firstName === undefined || memberInfo?.firstName === '') {
            setErrors({...errors, firstNameError: "Enter a First Name"})
            formIsValid = false
        }
        if(memberInfo?.lastName === undefined || memberInfo?.lastName === '') {
            setErrors({...errors, lastNameError: "Enter a Last Name"})
            formIsValid = false
        }
        if(memberInfo?.email1 === undefined || memberInfo?.email1 === '') {
            setErrors({...errors, emailError: "Enter an email"})
            formIsValid = false
        }

        if(formIsValid) {
            try {
                const res = await axiosPrivate.post("/member", memberInfo)
                setIsLoading(false)
                navigate('/members')
            } catch(err) {
                setIsLoading(false)
                setError(err.message)
                console.log(err)
            }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController()
        const getMembers = async () => {
            try {
                const res = await axiosPrivate.get("/member/memberData", {
                    signal: controller.signal
                })
                isMounted && setMembers(res.data)
            } catch(err) {
                console.log(err)
            }

        }
        getMembers()

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])
console.log(memberInfo)
  return (
    <div className='container-fluid'>
        {isLoading ? <Loading/>:
        <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
            <h4 className="my-3">New Member</h4>
                <Form onSubmit={handleSubmit} className='mb-2'>
                    <div className="d-flex w-100 flex-wrap justify-content-md-center">
                        <div className='col-12 col-sm-4 d-md-flex flex-column align-items-center'>
                            <Form.Group className='col-md-10'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='firstName'
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
                                    onInput={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='col-md-10'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='lastName'
                                    onInput={handleChange}
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
                                    onInput={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='col-md-10'>
                                <Form.Label>Phone 1</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='phone1' 
                                    placeholder='519-123-4567'
                                    onInput={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='col-md-10'>
                                <Form.Label>Phone 2</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='phone2'
                                    placeholder='519-123-4567'
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
                                    onInput={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='col-md-10'>
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='address2'
                                    onInput={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='col-md-10'>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='city'
                                    onInput={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='col-md-10'>
                                <Form.Label>Province</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="province"
                                    onChange={handleChange}
                                    defaultValue={'ON'}
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
                                    defaultValue={''}  
                                    onInput={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='col-md-10'>
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="country"
                                    onChange={handleChange}
                                    defaultValue={'Canada'}
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
                                />
                            </Form.Group>
                            <Form.Group className='col-md-10'>
                                <Form.Label>Date of Joining</Form.Label>
                                <Form.Control
                                    type='date'
                                    name='doj'
                                    onInput={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='col-md-10'>
                                <Form.Label>Active ?</Form.Label>
                                <Form.Control
                                    as="select"
                                    name='active'  
                                    onChange={handleChange}
                                    defaultValue={'yes'}
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
                        <Button type="submit" variant="primary" className=''>Save</Button>
                        <Button onClick={()=>navigate(-1)} type="button" variant="danger" className='ms-2'>Cancel</Button>
                    </div>


                    {error == "" ? "" : <p className='bg-danger text-white text-center w-50 mt-2'>{error}. Please try again</p>}

                </Form>
            </div>
        </div>}
        </div>
    )
}

export default NewMember