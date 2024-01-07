import React from 'react'

export default function SubmitButton({title, style}) {
    return (
        <>
            <div>
                <button
                    type="button"
                    className={`group relative flex  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${style} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    </span>
                    {title}
                </button>
            </div>
        </>
    )
}
