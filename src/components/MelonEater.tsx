import React, { useEffect, useState } from "react"
import Board from "./Board"
import Controls from "./Controls"
import MenuButton from "./MenuButton"
import _newBoard from "../functions/newBoard"

type Props = {
    className?: string
}

/**
 * The Game
 * @param Props Styling
 */
const MelonEater = ({ className = "" }: Props) => {
    const [melons, setMelons] = useState(0)

    const newBoard = () => {
        return _newBoard(setMelons)
    }

    const [tick, updateTick] = useState(0)
    const [foodEaten, setFoodEaten] = useState(0)
    const [board, setBoard] = useState(newBoard)
    const [alive, setAlive] = useState(false)
    const [pos, setPos] = useState({ x: 0, y: 0 })

    const [prevHigh, setPrevHigh] = useState("")

    // Changes Position on pos state change
    useEffect(() => {
        if (alive) {
            setBoard((currentBoard) => {
                currentBoard[pos.y][pos.x] = "🟩"
                return currentBoard
            })
            //console.log("Position changed")
            updateTick((prev) => prev + 1)
        } else {
            console.log("Cannot change position")
        }
    }, [alive, pos])

    /**
     * Clears console, resets position
     */
    const spawn = () => {
        console.clear()
        console.log("%cGame Started!", "color:red; font-size:50px")
        console.log("Setting Alive to True...")
        setAlive(true)
        console.log("Setting Position to {0, 0}...")
        setPos({ x: 0, y: 0 })
    }

    /**
     * Resets the food and ticks. Also, sets a new board
     * @param respawn Should the player respawn after death. Defaults to `true`
     */
    const reset = (respawn = true) => {
        console.log("Resetting...")
        setAlive(false)
        setFoodEaten(0)
        updateTick(0)
        respawn && spawn()
        setBoard(newBoard)
    }

    return (
        <div className={`${className}`}>
            <h2 className="text-2xl md:text-4xl border 2 italic message mb-1 sm:mb-2">
                MelonEater
            </h2>
            {prevHigh && <h2 className="message mb-8 border-2">{`Previous score: ${prevHigh}`}</h2>}
            {alive && (
                <div className="text-sm md:text-md">
                    <h2 className="message mb-1 sm:mb-2 border 2">{`Moves made: ${tick - 1}`}</h2>
                    <h2 className="message mb-1 sm:mb-2 border 2">{`🍉 eaten: ${foodEaten} out of ${melons}`}</h2>
                    <h2 className="message mb-1 sm:mb-2 border 2">{`Efficiency: ${(
                        foodEaten /
                        (tick - 1)
                    ).toFixed(2)}`}</h2>
                </div>
            )}
            <Board className="message border 2" board={board} />
            {!alive ? (
                <MenuButton className="mt-2" onClick={spawn} text="▶️" />
            ) : (
                <Controls
                    className="mt-2"
                    alive={alive}
                    foodEaten={foodEaten}
                    melons={melons}
                    pos={pos}
                    reset={reset}
                    setBoard={setBoard}
                    setFoodEaten={setFoodEaten}
                    setPos={setPos}
                    setPrevHigh={setPrevHigh}
                    tick={tick}
                />
            )}
        </div>
    )
}

export default MelonEater
