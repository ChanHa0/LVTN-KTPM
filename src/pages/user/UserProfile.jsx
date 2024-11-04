import React from 'react'

const ProfilePage = () => {
    return (
        <form className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Enter your name:
                    <input
                        type="text"
                        name="username"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                </label>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Enter your age:
                    <input
                        type="number"
                        name="age"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                </label>
            </div>
            <input
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
        </form>
    )
}

export default ProfilePage