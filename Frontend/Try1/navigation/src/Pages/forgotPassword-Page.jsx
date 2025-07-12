import './forgotpassword-page.css';
import {Link} from 'react-router-dom'
import React, {useState} from "react"
function ForgotPassword() {
    const[showOtp,setShowOtp] = useState(false);
    const [otp,setOtp] = useState("");
    return(
            <div className="container">
                <div className="form-container">
                    <p className='logo-title'>Shree Shyam Enterprises</p>
                    <div className="form">
                        <h2>Forgot Password</h2>
                        <p className="paragraph">Please enter your Email</p>
                        <input type="email" placeholder="Email"/>

                        <div>
                            <button onClick={() => setShowOtp(true)}>
                                Get OTP
                            </button>
                        </div>
                            {showOtp && (
                                <div>
                                    <input
                                        className='OTP-input'
                                        type="text"
                                        placeholder='Enter OTP'
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <button 
                                        className='submission-button'
                                        onClick={()=>{
                                            console.log("Submitted OTP:",otp);
                                            alert("OTP submitted:" + otp)
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        
                         <p style={{textAlign:'right', marginRight:'40px'}}>
                        <Link to="/">Back to Login</Link>
                        </p>
                        <p>
                        Not an Account ? {" "} 
                        <Link to="/">SignUp Now</Link>
                        </p>
                    </div>
                </div> 
            </div>
    )
}
export default ForgotPassword