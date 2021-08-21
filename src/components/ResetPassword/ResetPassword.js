import React, { useState } from 'react';
import '../Login/Login.css'
import * as firebase from "firebase/firebase";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../Login/loginManager';



function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/redy" } };


    const newAccountBtn = () => {
        history.push("/login")
    }





    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {



        e.preventDefault();
    }

    const resetPassword = email => {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email)
            .then(() => {
                history.replace("/thankyou")
            }).catch(function (error) {

            })
    }



    return (
        <div className="loginfor" style={{ textAlign: 'center' }}>
            <h1 className="text2">পাসওয়ার্ড রিসেট ফরম</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" onBlur={handleBlur} placeholder=" আপনার ইমেইল" />
                <br />
                <input onClick={() => resetPassword(user.email)} className="loginbtn" type="submit" value={newUser ? 'সাইন আপ' : 'ক্লিক করুন'} /> <br />
                <button onClick={newAccountBtn}  >লগ-ইন করুন</button>
            </form>
            {/* <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>} */}
        </div>
    );
}

export default Login;