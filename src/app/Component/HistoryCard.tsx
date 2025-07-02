'use client';

import Image from 'next/image';
import { status,gender } from '../../../generated/prisma';
import { ImageOff } from 'lucide-react';

type HistoryCardProps = {
  name: string;
  link: string;
  dob: string;
  address: string;
  gender: gender;
  image: string | null;
  status: status;
};

const statusClasses: Record<status, { text: string; bg: string; ring: string }> = {
  [status.PENDING]: {
    text: 'text-yellow-800',
    bg: 'bg-yellow-100',
    ring: 'ring-yellow-300',
  },
  [status.ACCEPTED]: {
    text: 'text-blue-800',
    bg: 'bg-blue-100',
    ring: 'ring-blue-300',
  },
  [status.NON_ACCEPTED]: {
    text: 'text-gray-700',
    bg: 'bg-gray-100',
    ring: 'ring-gray-300',
  },
  [status.WORKING]: {
    text: 'text-orange-800',
    bg: 'bg-orange-100',
    ring: 'ring-orange-300',
  },
  [status.COMPLETED]: {
    text: 'text-green-800',
    bg: 'bg-green-100',
    ring: 'ring-green-300',
  },
  [status.FAILED]: {
    text: 'text-red-800',
    bg: 'bg-red-100',
    ring: 'ring-red-300',
  },
};

export default function HistoryCard({
  name,
  link,
  dob,
  address,
  gender,
  image,
  status,
}: HistoryCardProps) {
  const statusStyle = statusClasses[status];

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300 flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-4 border border-gray-200">
      {/* Image */}
      <div className="w-full sm:w-28 h-32 sm:h-28 flex-shrink-0 bg-gray-50 border rounded-lg overflow-hidden flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        ) : (
          <ImageOff className="text-gray-400 w-8 h-8" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle.bg} ${statusStyle.text} ring-1 ${statusStyle.ring}`}
          >
            {status.replace('_', ' ')}
          </span>
        </div>

        <div className="mt-2 text-sm text-gray-600 space-y-1">
          <p>📅 <span className="font-medium">{dob}</span></p>
          <p>📍 <span className="font-medium">{address}</span></p>
          <p>🚻 <span className="capitalize">{gender}</span></p>
        </div>

        <div className="pt-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            View Full Profile ↗
          </a>
        </div>
      </div>
    </div>
  );
}
