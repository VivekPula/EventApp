import React from 'react'

function BookingDetails({ Icon, name, count }) {
  return (
    <div className='flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm w-[220px]'>

      <div className='p-3 rounded-full bg-(--primaryColor)/10'>
        <Icon size={22} className='text-(--primaryColor)/60' />
      </div>

      <div>
        <div className='text-sm text-gray-500'>{name}</div>
        <div className='text-lg font-semibold text-gray-800'>{count}</div>
      </div>

    </div>
  );
}

export default BookingDetails