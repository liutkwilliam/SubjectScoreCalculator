// import React from 'react'

export default function Buttons({ onClick, disabled, buttonColor, children }) {
    const combinedClassName = `self-end rounded-md border border-gray-300 
    text-white cursor-pointer px-3 py-2 text-sm font-medium 
    disabled:cursor-not-allowed disabled:opacity-40 
    ${buttonColor}`;
    return (
        <>
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={combinedClassName}
            >
                {children}
            </button>
        </>
    )
}
