import React from 'react'

const NoContentFoundComponent = () => {
    return (
        <div className="flex flex-col justify-center items-center py-5 gap-6">
            <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/woman-searching-for-content-4006349-3309935.png?f=webp"
                alt="no-content-found"
                className="w-1/2 h-1/2 object-contain"
            />
            <h2 className="text-4xl text-orange-500">No Content Found</h2>
        </div>
    )
}

export default NoContentFoundComponent
