import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const history = useHistory();

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch (e) {
            setError('Something went wrong!')
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
                </div>

                <form className="mt-8 space-y-6"  onSubmit={handleFormSubmit}>
                    {
                        error && <p className="px-5 py-3 font-semibold border border-red-600 text-red-600 bg-red-200 rounded">{error}</p>
                    }

                    <div className="rounded-md shadow-sm -space-y-px">

                        <div className="">
                            <label className="sr-only">Email</label>
                            <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="email" placeholder="Email" ref={emailRef} required />
                        </div>
                        <div className="">
                            <label className="sr-only">Password</label>
                            <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="password" placeholder="Password" ref={passwordRef} required />
                        </div>
                    </div>

                    <button disabled={loading} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>

                    <div className="flex flex-row gap-2">
                        <p>Already have an account?</p>
                        <Link to="/signup" className="text-indigo-600">sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
