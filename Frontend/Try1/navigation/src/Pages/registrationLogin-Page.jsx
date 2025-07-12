import React, {useState} from "react";
import {Link} from 'react-router-dom'
function AuthForm(){

    // Add inside AuthForm component

    const handleSignUpfunction = () => {
    if (!email || !password || !confirmPassword) {
        setmessage("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        setmessage("Passwords do not match.");
        return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
        email,
        password,
        type: "signup",
        time: new Date().toLocaleString()
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setmessage("Registration successful. Please log in");
    setIslogin(true);
    };

    const handleLoginfunction = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(u => u.email === email && u.password === password);

    if (user) {
        setmessage(`Welcome back, ${email}!`);
        const loginEntry = {
        email,
        type: "login",
        time: new Date().toLocaleString()
        };
        storedUsers.push(loginEntry);
        localStorage.setItem("users", JSON.stringify(storedUsers));
    } else {
        setmessage("Invalid credentials. Please try again.");
    }
};

    const [isLogin,setIslogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setmessage] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //Login state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // SignUp states
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 


    const handleSignUp = () => {
        if (!email || !password || !confirmPassword) {
            setmessage("Please fill in all fields.");
        }
        
        if (password !== confirmPassword) {
            setmessage("Passwords do not match.");
            return;
        }

        localStorage.setItem("userEmail",email);
        localStorage.setItem("userPassword",password);
        setmessage("Registration successful. Please log in");
        setIslogin(true);
    };

    const handleLogin = () => {
        const storedEmail = localStorage.getItem("userEmail");
        const storePassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storePassword) {
            setmessage(`Welcome back, ${email}!`);
        }else{
            setmessage("Invalid credential. Please try again.");
        }
    };
    return(
        <div>
            <button  onClick={() => navigate("/admin")}>Admin Button</button>
            <Link className ="admin-button" to="/admin">Click here for Admin Login</Link>
            <div className="container">
                <div className="form-container">
                    <p className="logo-name">Shri Shyam Enterprises</p>
                    <div className="form-toggle">
                        <button className={isLogin ? 'active' : ""}onClick={() => setIslogin(true)}>Login</button>{/* active is a class*/}
                        <button className={!isLogin ? 'active' : ""}onClick={() => setIslogin(false)}>SignUp</button>
                    </div>
                    {
                        isLogin ? ( <>
                                    <div className="form">
                                        <h2>login Form</h2>
                                        <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
                                        <div>
                                            <input className="password-box" type={showPassword ? "text" : "password"} placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                                            <span onClick={() => setShowPassword(!showPassword)} className="show-icon">
                                                {showPassword ? "🙈" : "👁️"}
                                            </span>
                                        </div>
                                        <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                                        <button onClick={handleLogin}>Login</button>
                                        <p>
                                            Not an Account ? 
                                            <a href="#" onClick={(e) => {e.preventDefault(); setIslogin(false);}}>SignUp Now</a>
                                        </p>
                                    </div>
                                </> 
                        ):(
                                <>
                                    <div className="form">
                                        <h2>SignUp Form</h2>
                                        <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)}/>
                                        <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}/>
                                        <div>
                                            <input className="confirm-password"type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                                <spam onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="show-icon">
                                                    {showConfirmPassword ? "🙈" : "👁️"}
                                                </spam>
                                        </div>
                                        <button onClick={handleSignUp}>SignUp</button>
                                    </div>    
                                </>
                        )
                    }
                    
                    {message && <p style={{marginTop: "10px",color:"green"}}>{message}</p>}
                    <div>account make success</div>
                </div>
            </div>
    </div>
    );
}
export default AuthForm