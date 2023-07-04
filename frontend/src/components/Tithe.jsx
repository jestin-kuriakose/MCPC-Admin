import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import Modal from './Modal'
import Loading from './Loading'
import baseURL from "../http.js"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import axios from '../api/axios'

const Tithe = () => {
    const [titheData, setTitheData] = useState({})
    const [editedTitheData, setEditedTitheData] = useState({})
    const [updatedTitheData, setUpdatedTitheData] = useState({})
    const [members, setMembers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [errors, setErrors] = useState({
        optionError: '',
        dateError: '',
        numberError: ''
      });
    const location = useLocation()
    const titheId = location.pathname.split('/')[2]
    const navigate = useNavigate()

    const axiosPrivate = useAxiosPrivate()

    useEffect(()=> {
        let isMounted = true;
        const controller = new AbortController()

        const getTitheData = async () => {
            try{
                const response = await axiosPrivate.get(`/tithe/titheData/${titheId}`)
                setTitheData(response.data)
                setUpdatedTitheData(response.data)
                console.log(response.data)
            } catch(err) {
                setError(err.message)
            }
        }
                
        getTitheData()

        return () => {
            isMounted = false;
            controller.abort()
        }

    }, [])


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController()

        const fetchMembers = async() => {
            try {
                const response = await axiosPrivate.get('/member/memberData')
                setMembers(response.data)
            } catch(err) {
                setError(err.message)
            }
        }
        fetchMembers()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const handleChange = (e) => {
        setUpdatedTitheData((prev) => ({...prev, [e.target.name]: e.target.value}))
        setEditedTitheData((prev) => ({...prev, [e.target.name] : e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setError("")
        setErrors({
            optionError: '',
            dateError: '',
            numberError: ''
          })

        let formIsValid = true;

        if (updatedTitheData?.memberId === undefined || updatedTitheData?.memberId === '') {
          setErrors({ ...errors, memberError: 'Please select a member' });
          formIsValid = false;
        }
    
        if (updatedTitheData?.date === undefined || updatedTitheData?.date === '') {
          setErrors({ ...errors, dateError: 'Please select a date' });
          formIsValid = false;
        }
    
        if (updatedTitheData?.amount === undefined || updatedTitheData?.amount === '') {
          setErrors({ ...errors, amountError: 'Please enter the amount' });
          formIsValid = false;
        }

        if(formIsValid) {
            console.log("Form is valid 1")
            try{
                const res = await axiosPrivate.patch(`/tithe/${titheId}`, editedTitheData)
                console.log("Form is valid 2")
                setIsLoading(false)
                navigate('/tithes')
            } catch(err) {
                setError(err.message)
                setIsLoading(false)
            }
        }
        setIsLoading(false)
    }
console.log(titheData)
  return (
    <div className='container-fluid'>
        {isLoading ? <Loading/> : 
        <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
            <h4 className="my-3">Tithe Details<p className='lead fs-6'>Tithe ID #{titheData?.id}</p></h4>
                <Form onSubmit={handleSubmit} className='col-md-6'>
                    <Form.Group>
                        <Form.Label>Select Option:</Form.Label>
                        <Form.Control
                            as="select"
                            name="memberId"
                            value={editedTitheData?.memberId ? editedTitheData?.memberId : titheData?.memberId}
                            onChange={handleChange}
                            isInvalid={!!errors.memberError}
                        >
                            <option value="">-- Select an option --</option>
                            {members?.map((member, index) => (
                                 <option value={member.id} key={index}>{member.firstName + " " + member.lastName}</option>
                             ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.memberError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Select Date:</Form.Label>
                        <Form.Control
                            name="date"
                            type="date"
                            defaultValue={titheData?.date}
                            onChange={handleChange}
                            isInvalid={!!errors.dateError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dateError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Amount:</Form.Label>
                        <Form.Control
                            min={0}
                            name="amount"
                            type="number"
                            defaultValue={titheData?.amount}
                            onChange={handleChange}
                            isInvalid={!!errors.amountError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.amountError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" variant="primary" className='mt-2'>Save</Button>
                    <Button onClick={()=>navigate(-1)} type="button" variant="danger" className='mt-2 ms-2'>Cancel</Button>

                    {error == "" ? "" : <p className='bg-danger text-white text-center w-50 mt-2'>{error}. Please try again</p>}
                </Form>
        </div>
    </div>}
    </div>
  )
}

export default Tithe