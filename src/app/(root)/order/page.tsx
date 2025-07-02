"use client"
import React, {ChangeEvent, FormEvent, useState } from 'react'
import { OrderformDataType } from '@/app/valuedefiner/OrderValueDefiner'
import { toast } from 'sonner'
import { Check } from 'lucide-react'

function page() {
    const initFormData:OrderformDataType = {
        name: "",
        link: "",
        dob: "",
        address: "",
        gender: "man",
        image: null
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState<OrderformDataType>(initFormData)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading,setLoading] = useState({
        apiLoading:false,
        showLoading:false
    })

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    async function handleImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, [e.target.name]: reader.result as string }))
            }
            reader.readAsDataURL(file)
        } else {
            setFormData((prev) => ({ ...prev, [e.target.name]: null }))
        }
    }

    async function handleSub(e: FormEvent) {
        setLoading({apiLoading:true,showLoading:true})
        e.preventDefault()
        try {
            const response = await fetch("/api/order_thap", {
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
            if (response.status !== 201) {
                toast.error(data.message)
            } else {
                toast.success(data.message || "Something went wrong")
                setFormData(initFormData)

            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }finally{
            setLoading({showLoading:true,apiLoading:false})
        }
    }

    return (
        <div className='relative w-full h-auto flex flex-col items-center'>
            <form onSubmit={handleSub} className='max-w-[340px] flex flex-col items-center gap-3 h-auto p-3 border border-gray-200 rounded-md mt-2 shadow-md'>
                <h1><span className='text-red-400'>ঠাপানোর</span> জন্য ফর্ম পুরন করুন</h1>
                <div className='text-sm'>
                    <label htmlFor="name">যাকে <span className='text-red-400'>ঠাপাইতে</span> চান তার নামঃ <sup className='text-red-400'>*</sup> </label>
                    <input required type="text" id='name' value={formData.name} onChange={handleChange} name='name' className='w-full h-9 border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <div className='text-sm'>
                    <label htmlFor="link">যাকে <span className='text-red-400'>ঠাপাইতে</span> চান তার লিংকঃ <sup className='text-red-400'>*</sup> </label>
                    <input required type="url" id='link' value={formData.link} onChange={handleChange} name='link' className='w-full h-9 border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <div className='text-sm'>
                    <label htmlFor="dob">যাকে <span className='text-red-400'>ঠাপাইতে</span> চান তার জন্ম তারিখঃ <sup className='text-red-400'>*</sup> </label>
                    <input required type="date" id='dob' name='dob' value={formData.dob} onChange={handleChange} className='w-full h-9 border border-gray-300 px-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <div className='text-sm'>
                    <label htmlFor="address">যাকে <span className='text-red-400'>ঠাপাইতে</span> চান তার ঠিকানা  <sup className='text-red-400'>*</sup> </label>
                    <textarea id='address' name='address' value={formData.address} onChange={handleChange} className='w-full h-9 max-h-20 min-h-16 border border-gray-300 p-2 outline-0 rounded-md transition-all duration-100 ease-in-out focus:border-blue-500' />
                </div>
                <div className='text-sm flex flex-col self-start w-full'>
                    <label htmlFor="dob">যাকে <span className='text-red-400'>ঠাপাইতে</span> চান তার লিঙ্গঃ<sup className='text-red-400'>*</sup> </label>
                    <select required name="gender" value={formData.gender} onChange={handleChange} id="gender" className='w-full rounded-md border  p-2 border-gray-300 outline-none focus:border-blue-400'>
                        <option value="man">পুরুষ</option>
                        <option value="woman">নারী</option>
                    </select>
                </div>
                <div className='text-sm'>
                    <label htmlFor="image">যাকে <span className='text-red-400'>ঠাপাইতে</span> চান তার যদি কোনো ছবি থাকেঃ <sup className='text-red-400'>*</sup> </label>
                    <input type="file" id='image' name='image' onChange={handleImage} className='w-full' />
                </div>
                <button type='reset' className='hidden'></button>
                <button type='submit' className='w-full py-1 rounded-md border hover:bg-red-500 transition-colors duration-200 ease-in-out bg-red-400 text-white shadow-md cursor-pointer'>
                    ঠাপান
                </button>
            </form>

            {
                loading.apiLoading || loading.showLoading ? <div className='fixed top-0 flex items-center justify-center left-0 bg-black/40 w-[100%] h-[100vh]'>
                    <div className='w-[300px] h-[200px] flex items-center pt-3 px-2 flex-col bg-white rounded-md'>
                        {
                            loading.apiLoading ?
                                <div className='self-center w-[70px] rounded-full h-[70px] border-3 border-black/40 animate-spin border-t-red-400'>

                                </div> :
                                <div className='self-center flex items-center justify-center w-[70px] rounded-full h-[70px] border-3 border-red-400'>
                                    <Check size={"3rem"} color='#FF6467' />
                                </div>
                        }
                        <div className='text-center mt-5'>
                            {loading.apiLoading?<h1>Posting......</h1>:<h1>Request Complited</h1>}
                            {loading.apiLoading?<h1 className='text-xs text-red-300'>Wait for some time......</h1>:<h1 className='text-xs text-red-300'>Thanks for countribute us</h1>}
                        </div>
                        {
                            !loading.apiLoading &&
                            <button onClick={()=>setLoading({apiLoading:false,showLoading:false})} className='bg-red-400 text-white text-sm py-1 mt-2 rounded-md cursor-pointer px-5'>
                                Close
                            </button>
                        }
                    </div>
                </div> : null
            }
            
        </div>
    )
}

export default page
