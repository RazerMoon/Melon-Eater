import React, { useState } from "react"
import MelonEater from "./components/MelonEater"

function App() {
    const [dark, setDark] = useState(true)

    return (
        <div className={`App${dark ? " dark" : ""}`}>
            <div className="flex relative items-center justify-center min-h-screen bg-gray-400 dark:bg-gray-700 dark:text-white">
                <button
                    onClick={() => setDark((prev) => !prev)}
                    className="absolute border-b-4 top-2 right-2 rounded-sm text-white bg-blue-600 border-blue-700 active:bg-blue-700 dark:bg-gray-800 dark:border-gray-900 dark:active:bg-gray-900 p-2"
                >
                    {`${dark ? "Light" : "Dark"} mode`}
                </button>
                <MelonEater className="flex flex-col" />
            </div>
        </div>
    )
}

export default App
