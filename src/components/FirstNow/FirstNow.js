import React from 'react';
import { useHistory } from 'react-router-dom';

const FirstNow = () => {
    const history = useHistory();
    const btn = () => {
        history.push("/redy")
    }
    return (
        <div>
            <div style={{ marginTop: '280px', textAlign: 'center' }}>
                <button onClick={btn} type="">ক্লিক করুন</button>
            </div>
        </div>
    );
};

export default FirstNow;