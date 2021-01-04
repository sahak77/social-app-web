import React from 'react';

const Error = ({ touched, message }) => {
    if (!touched) {
        return <div>{null}</div>
    }
    if (message) {
        return <div style={{ color: '#ff4242', fontSize: '10px', marginLeft: 30, padding: '0' }}>{message}</div>
    }
    return <div>{null}</div>
}

export default Error