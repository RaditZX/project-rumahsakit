import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Card,ListGroup,Form} from 'react-bootstrap';


function ForgotPassword () {
    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const [loading,setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('http://localhost:3000/forgotPassword',{
            email
        })
        .then(res => {
            setLoading(false);
            setSuccess(res.data.message);
        })
        .catch(err => {
            setLoading(false);
            setError(err.response.data.message);
        })
    }

    return(
        <div className="forgot-password">
            <div className="d-flex justify-content-center">
                <div className="reset" style={{marginTop: "130px"}}>

                    {/* card form reset password  */}
                    <Card style={{ width: '25rem' }}>
                        <Card.Header className="card-header">Form forgot password</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>

                                {/* email */}
                                <div className="d-flex flex-column"> 
                                    <div className="p-2 col-example text-left">
                                        <div className="d-flex flex-row"><label>Email:</label></div>
                                        <Form.Control type="email" placeholder=" Email Address" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                {/* button reset */}
                                <div className="p-3 col-example text-left">
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>submit</button>
                                    </div>
                                    <p />
                                
                                    {/* button back */}
                                    <div className="d-grid gap-2">
                                        <Link to={`/`} className="btn btn-primary" size="sm">Back</Link>{' '}
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            </div>
        </div>
    )

}

export default ForgotPassword;

                                

