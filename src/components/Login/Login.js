import React, { useEffect, useState } from 'react';
import './Login.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';
import Swal from 'sweetalert2'


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
    let { from } = location.state || { from: { pathname: "/" } };
    const [paid, setPaid] = useState("unpaid")
    const [userPaymentDatas, setUserpaymentData] = useState([])
    //user payment check data

    useEffect(() => {
        fetch('http://localhost:5000/api/users/getPaymentStatus')
            .then(res => res.json())
            .then(userPaymentData => {
                if (userPaymentData.length > 0) {
                    setUserpaymentData(userPaymentData)
                }
            })
    }, [])

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const resetpassbtn = () => {
        history.push("/resetpassword")
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
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                    if (userPaymentDatas.length == 0) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        history.push("/redy")

                    }

                    userPaymentDatas.filter(data => {
                        if (data?.email === user.email) {
                            const payments = data?.paymentStatus

                            if (payments === true) {
                                history.push("/clicknow")

                            }
                        }
                        else {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            history.push('/redy')
                        }

                    })


                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                    if (userPaymentDatas.length == 0) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'সফলভাবে লগইন হয়েছে',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        history.push("/redy")
                    }
                    userPaymentDatas.filter(data => {
                        if (data?.email === user.email) {
                            const payments = data?.paymentStatus

                            if (payments === true) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'সফলভাবে লগইন হয়েছে',
                                    showConfirmButton: false,
                                    timer: 2000
                                })

                                history.push("/clicknow")
                            }
                        }
                        else {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'সফলভাবে লগইন হয়েছে',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            history.push('/redy')
                        }

                    })

                })
        }
        e.preventDefault();
    }



    return (
        <div className="loginform" style={{ textAlign: 'center' }}>

            <h2 className="text3">
                দেশ সেরা ইসলামী সংগীত শিল্পীদের <br />
                নিয়ে ইসলাভো পডকাস্ট <br />
                চার্জ ৬৪.২ টাকা মাত্র (মেয়াদ ১বছর) <br />
                যেভাবে পেমেন্ট করতে পারবেন <br />
                বিকাশ ও নগদ , ভিসা , মাস্টার ও <br />
                এমেরিকান এক্সপ্রেস এর মাধ্যমে</h2>
            <h1 className="text2">সাইন-আপ অথবা সাইন-ইন করুন</h1>
            <form onSubmit={handleSubmit}>
                {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder=" আপনার নাম" />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder=" আপনার ইমেইল" />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder=" ছয় সংখ্যার পাসওয়ার্ড" />
                <br />
                <input className="loginbtn" type="submit" value={newUser ? 'সাইন আপ' : 'সাইন ইন'} /> <br />
                <button className="loginbtn" htmlFor="newUser" onClick={() => setNewUser(!newUser)} name="newUser" >নতুন অ্যাকাউন্ট</button> <br />
                <button onClick={resetpassbtn} >পাসওয়ার্ড রিসেট করুন</button>
            </form>
            {/* <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>} */}
        </div>
    );
}

export default Login;