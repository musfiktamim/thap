'use client'

import React, { useEffect, useState } from 'react'
import HistoryCard from '@/app/Component/HistoryCard'
import { gender, status } from '../../../../generated/prisma'

type ThapItem = {
  id: string
  name: string
  link: string
  dob: string
  address: string
  gender: gender
  image: string | null
  status: status
}

export default function Page() {
  const [items, setItems] = useState<ThapItem[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch initial data once on mount
  useEffect(() => {
    async function fetchInitial() {
      setLoading(true)
      try {
        const res = await fetch('/api/thap')
        const data = await res.json()
        setItems(data.items)
        setCursor(data.nextCursor)
      } catch (err) {
        console.error('Failed to load initial data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchInitial()
  }, [])

  // Handle scroll event for infinite loading
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
        cursor !== null &&
        !loading
      ) {
        setLoading(true)
        fetch(`/api/thap?cursor=${cursor}`)
          .then((res) => res.json())
          .then((data) => {
            setItems((prev) => [...prev, ...data.items])
            setCursor(data.nextCursor)
          })
          .catch((err) => {
            console.error('Failed to load more:', err)
          })
          .finally(() => setLoading(false))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [cursor, loading])

  return (
    <div>
      <h1 className="text-center mt-3 text-lg">
        আপনি যেই একাউন্ট গুলোকে <span className="text-red-400">ঠাপাইতে</span> দিয়েছেন
      </h1>
      <div className="flex flex-col gap-2 pt-3 px-2">
        {items.map((item) => (
          <HistoryCard
            key={item.id}
            name={item.name}
            link={item.link}
            dob={item.dob}
            address={item.address || ''}
            gender={item.gender || 'woman'}
            image={item.image || null}
            status={item.status}
          />
        ))}
        <div className="py-4 text-center text-gray-400">
          {cursor ? (loading ? 'লোড হচ্ছে...' : 'আরো লোড করার জন্য নিচে স্ক্রল করুন') : 'সব ডাটা লোড হয়েছে'}
        </div>
      </div>
    </div>
  )
}
