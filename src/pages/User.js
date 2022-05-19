import React from 'react'
import Navbar from '../components/Navbar'
import UserContent from '../components/UserContent'

function User() {
    return (
        <div>
            <Navbar />
            <div style={{ margin: "1rem 1rem 1rem 1rem" }}>
                <UserContent />
            </div>
        </div>
    )
}

export default User