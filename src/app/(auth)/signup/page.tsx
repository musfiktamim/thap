"use client"
import { SignUpDataType } from '@/app/valuedefiner/UserSignupDefiner'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import {toast} from "sonner"

const SECRET_FOR_REQ_USER_CREATE = "=====XnaEYdFM9cQOw6eZqIqB38P3pzKmcvocsaPJwqzdDrg=====!IqB38P3pzKmcvocsaPJwqzdDrgZqIqB38P3pzKmcvocsaPJ!===="

function SignUppage() {
    const initFormData:SignUpDataType = {
        name:"",
        email:"",
        phone:"",
        password:"",
    }
    const [formData,setFormData] = useState<SignUpDataType>(initFormData)
    const [TandC,setTandC] = useState(false)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading,setLoading] = useState(false)

    const secretRef = useRef<HTMLInputElement>(null)

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    async function handleSub(e:FormEvent){
        e.preventDefault()
        setLoading(false)
        let itRedirect = false
         try {
            if(secretRef.current?.value == SECRET_FOR_REQ_USER_CREATE){
                const response = await fetch("/api/auth/user/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
    
                const data = await response.json();
                console.log(data)
                if (!response.ok) {
                    return toast.error(data.message || "Something went wrong")
                }
                if (response.status !== 201) {
                    // console.log(data.)

                    return toast.error( data.message || "Something went wrong")
                } else {
                    toast.success(data.message || "Something went wrong")
                    setFormData(initFormData)
                    secretRef.current.value = ""
                    itRedirect = true
                }
            }else{
                toast.error("something is wrong")
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }finally{
            if(itRedirect){
                return redirect("/")
            }
            setLoading(false)
        }


    }
    
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
            <form onSubmit={handleSub} className='max-w-[340px] flex flex-col items-center gap-3 h-auto p-3 border border-gray-200 rounded-md shadow-md'>
                <h1><span className='text-red-400'>একাউন্ট</span> খুলার জন্য ফর্ম পুরন করুন</h1>
                <div className='text-sm w-full'>
                    <label htmlFor="name"><span className='text-red-400'>নাম</span> দিনঃ <sup className='text-red-400'>*</sup> </label>
                    <input required type="text" id='name' name='name' value={formData.name} onChange={handleChange} className='w-full h-9 border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <div className='text-sm w-full'>
                    <label htmlFor="email"><span className='text-red-400'>ইমেইল</span> দিনঃ <sup className='text-red-400'>*</sup> </label>
                    <input required type="email" id='email' name='email' value={formData.email} onChange={handleChange} className='w-full h-9 border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <div className='text-sm w-full'>
                    <label htmlFor="phone"><span className='text-red-400'>ফোন</span> নাম্বার দিনঃ <sup className='text-red-400'>*</sup> </label>
                    <input required type="number" id='phone' name='phone' value={formData.phone} onChange={handleChange} className='w-full h-9 border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <div className='text-sm w-full'>
                    <label htmlFor="password"><span className='text-red-400'>পাসওয়ার্ড</span> দিনঃ <sup className='text-red-400'>*</sup> </label>
                    <input required type="password" id='password' name='password' value={formData.password} onChange={handleChange} className='w-full h-9 border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <div className='text-sm w-full'>
                    <label htmlFor="secret"><span className='text-red-400'>গোপন</span> কোড দিনঃ <sup className='text-red-400'>*</sup> </label>
                    <input ref={secretRef} required type="password" id='secret' name='secrete' className='w-full h-9 border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <label htmlFor="terms">
                    <input required onChange={()=>setTandC(!TandC)} checked={TandC} type="checkbox" id='password' className='border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                    <label htmlFor="terms" className='text-xs'> আপনি কি আমাদের টার্মস অ্যান্ড কন্ডিশনের সাথে একমত? <Link href={"/read_terms_and_condition"} className='text-red-400'>পড়ুন</Link></label>
                </label>
                <button disabled={!TandC || loading} type='submit' className={`w-full py-1 rounded-md border transition-colors duration-200 ease-in-out ${TandC ?"bg-red-400 hover:bg-red-500":"bg-gray-300"} text-white shadow-md cursor-pointer`}>
                    ঢুকান
                </button>
                 <Link href={"/login"} className='text-xs'>আমার <span className='text-red-400'>একাউন্ট</span> আছে</Link>
            </form>
    </div>
  )
}

export default SignUppage
