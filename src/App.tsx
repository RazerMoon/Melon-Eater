import React, { useState } from "react"
import MelonEater from "./components/MelonEater"

function App() {
    const [dark, setDark] = useState(true)
    const [expanded, setExpanded] = useState(false)

    return (
        <div className={`App${dark ? " dark" : ""} text-sm md:text-md`}>
            <div className="flex relative items-center justify-center min-h-screen bg-gray-400 dark:bg-gray-700 dark:text-white">
                <div className="hidden md:block border 2 absolute top-2 left-2 message">
                    <h4 className="smallcaps text-2xl mb-2">Controls</h4>
                    <span className="smallcaps text-sm">
                        <p>
                            <b className="font-semibold">Arrow Keys:</b> Up, Down, Left and Right
                        </p>
                        <p>
                            <b className="font-semibold">Spacebar:</b> Reset and Respawn
                        </p>
                    </span>
                </div>
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className={`${
                        !expanded ? "expanded" : "md:w-64 w-44"
                    } block sm:hidden border 2 absolute top-2 md:top-32 left-2 message`}
                >
                    {expanded ? (
                        <div className="relative">
                            <h4 className="smallcaps text-xl md:text-2xl mb-1 sm:mb-2">
                                How to Play
                            </h4>
                            <span className="smallcaps text-xs md:text-sm">
                                <p>
                                    Eat all the melons in the least amount of moves and don&apos;t
                                    hit any walls!
                                </p>
                            </span>
                        </div>
                    ) : (
                        "ℹ️"
                    )}
                </button>
                <div
                    className={`hidden sm:block border 2 absolute top-2 md:top-32 left-2 md:w-64 w-44 message`}
                >
                    <h4 className="smallcaps text-xl md:text-2xl mb-1 sm:mb-2">How to Play</h4>
                    <span className="smallcaps text-xs md:text-sm">
                        <p>
                            Eat all the melons in the least amount of moves and don&apos;t hit any
                            walls!
                        </p>
                    </span>
                </div>
                <button
                    onClick={() => setDark((prev) => !prev)}
                    className="absolute border-2 sm:border-b-4 text-sm md:text-lg mb-1 sm:mb-2 smallcaps top-2 right-2 message"
                >
                    <p className="hidden sm:block">{`${dark ? "Light" : "Dark"} mode`}</p>
                    <p className="sm:hidden">{`${dark ? "☀️" : "🌙"}`}</p>
                </button>
                <MelonEater className="flex flex-col" />
            </div>
        </div>
    )
}

export default App
