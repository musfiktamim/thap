"use client"
import { SignInDataType } from '@/app/valuedefiner/UserSignupDefiner'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

function Loginpage() {
    const initFormData: SignInDataType = {
        email: "",
        password: ""
    }
    const [formData, setFormData] = useState<SignInDataType>(initFormData)

    //eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }




    async function handleSub(e: FormEvent) {
        setLoading(true)
        e.preventDefault()
        let itRedirect = false
        try {
            const response = await fetch("/api/auth/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message)
            }
            if (response.status !== 200) {
                toast.error(data.message)
            } else {
                toast.success(data.message)
                setFormData(initFormData)
                itRedirect = true
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }finally{
            if (itRedirect) {
                return redirect("/")
            }
            setLoading(false)
        }
    }

    return (
        <div className='w-full h-[100vh] flex items-center justify-center'>
            <form onSubmit={handleSub} className='max-w-[340px] flex flex-col items-center gap-y-3 h-auto p-3 border border-gray-200 rounded-md shadow-md'>
                <h1><span className='text-red-400'>একাউন্ট</span> এ ঢুকার জন্য ফর্ম পুরন করুন</h1>
                <div className='text-sm w-full'>
                    <label htmlFor="email"><span className='text-red-400'>ইমেইল</span> দিনঃ <sup className='text-red-400'>*</sup> </label>
                    <input type="text" id='email' name='email' value={formData.email} onChange={handleChange} className='w-full h-9 border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <div className='text-sm w-full'>
                    <label htmlFor="password"><span className='text-red-400'>পাসওয়ার্ড</span> দিনঃ <sup className='text-red-400'>*</sup> </label>
                    <input type="password" id='password' name='password' value={formData.password} onChange={handleChange} className='w-full h-9 border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <button disabled={loading} type='submit' className={`w-full py-1 rounded-md border transition-colors duration-200 ease-in-out ${loading?"bg-gray-400":"bg-red-400 hover:bg-red-500"} text-white shadow-md cursor-pointer`}>
                    ঢুকান
                </button>
                <Link  href={"/signup"} className='text-xs'>আমার কোনো <span className='text-red-400'>একাউন্ট</span> নেই</Link>
            </form>
        </div>
    )
}

export default Loginpage
