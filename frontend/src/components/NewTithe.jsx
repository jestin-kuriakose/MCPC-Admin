import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import Loading from './Loading'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const NewTithe = () => {
    const navigate = useNavigate()
    const [titheInfo, setTitheInfo] = useState({date: new Date().toLocaleDateString()})
    const [members, setMembers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [errors, setErrors] = useState({
        optionError: '',
        dateError: '',
        numberError: ''
      });
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchMembers = async() => {
            try {
                const res = await axiosPrivate.get("/member/memberData")
                setMembers(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchMembers()
    }, [])


    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true)
        setError("")
        setErrors({
            optionError: '',
            dateError: '',
            numberError: ''
          })

        let formIsValid = true;
    
        if (titheInfo?.memberId === undefined || titheInfo?.memberId === '') {
          setErrors({ ...errors, memberError: 'Please select a member' });
          formIsValid = false;
        }
    
        if (titheInfo?.date === '' || titheInfo?.date === '') {
          setErrors({ ...errors, dateError: 'Please select a date' });
          formIsValid = false;
        }
    
        if (titheInfo?.amount === undefined || titheInfo?.amount === '') {
          setErrors({ ...errors, amountError: 'Please enter an amount' });
          formIsValid = false;
        }

        if(formIsValid) {
            try{
                const res = await axiosPrivate.post("/tithe", titheInfo)
                setIsLoading(false)
                navigate('/tithes')
            } catch(err) {
                setIsLoading(false)
                setError(err.message)
            }
        }
        setIsLoading(false)
    }

  return (
    <div className='container-fluid'>
        {isLoading ? <Loading/> : 
        <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
                <h3 className="my-3">New Tithe</h3>
                <Form onSubmit={handleSubmit} className='col-md-6'>
                    <Form.Group>
                        <Form.Label>Select Member:</Form.Label>
                        <Form.Control
                            as="select"
                            value={titheInfo?.memberId}
                            onChange={(e)=>setTitheInfo((prev)=>({...prev, memberId: e.target.value}))}
                            isInvalid={!!errors.memberError}
                        >
                            <option value="">-- Select a Member --</option>
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
                            type="date"
                            value={new Date(titheInfo?.date).toISOString().split('T')[0]}
                            onChange={(e)=>setTitheInfo((prev)=>({...prev, date: new Date(e.target.value).toLocaleDateString()}))}
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
                            type="number"
                            value={titheInfo?.amount}
                            onChange={(e)=>setTitheInfo((prev) => ({...prev, amount: e.target.value}))}
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
        </div>
    }
    </div>
  )
}

export default NewTithe