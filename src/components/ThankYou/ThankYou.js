import React from 'react';
import { useHistory } from 'react-router-dom';

const ThankYou = () => {
    const history = useHistory();
    const loginbtn = () => {
        history.push("/login")
    }
    return (
        <div>
            <div style={{ marginTop: '280px', textAlign: 'center' }}>
                <h1 className="text4" style={{ textAlign: 'center', textDecoration: 'none', color: '#30a0c7' }}> দয়া করে আপনার ইমেইল চেক করুন</h1> <br />
                <button onClick={loginbtn}  >লগ-ইন করুন</button>

            </div>
        </div>
    );
};

export default ThankYou;