import React from "react"

type Props = {
    text: string
    onClick?: () => void
    className?: string
}

const MenuButton = ({ text, onClick, className = "" }: Props) => {
    return (
        <button onClick={onClick} className={`border-b-4 top-2 right-2 message ${className}`}>
            {`${text}`}
        </button>
    )
}

export default MenuButton
