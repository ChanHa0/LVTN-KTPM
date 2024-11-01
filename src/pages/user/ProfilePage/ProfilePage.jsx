import React from 'react'
import "./ProfilePage.scss"

const ProfilePage = () => {
    return (
        <form >
            <label>Enter your name:
                <input
                    type="text"
                    name="username"
                />
            </label>
            <label>Enter your age:
                <input
                    type="number"
                    name="age"
                />
            </label>
            <input type="submit" />
        </form>
    )
}

export default ProfilePage
