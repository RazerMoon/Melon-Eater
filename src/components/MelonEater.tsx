import React, { useEffect, useState } from "react"
import MenuButton from "./MenuButton"

type Props = {
    className?: string
}

const MelonEater = ({ className = "" }: Props) => {
    const [melons, setMelons] = useState(0)

    const newBoard = () => {
        let mel = 0
        const board: string[][] = []
        for (let i = 0; i < 10; i++) {
            board[i] = []
            for (let j = 0; j < 10; j++) {
                const rand = Math.floor(Math.random() * 10 + 1)
                if (rand > 9 && i + j != 0) {
                    board[i][j] = "🍉"
                    mel = mel + 1
                } else {
                    board[i][j] = "☐"
                }
            }
        }

        setMelons(mel)

        return board
    }

    const [tick, updateTick] = useState(0)
    const [foodEaten, setFoodEaten] = useState(0)
    const [board, setBoard] = useState(newBoard)
    const [alive, setAlive] = useState(false)
    const [pos, setPos] = useState({ x: 0, y: 0 })

    const [prevHigh, setPrevHigh] = useState("")

    useEffect(() => {
        if (alive) {
            setBoard((currentBoard) => {
                currentBoard[pos.y][pos.x] = "🟩"
                return currentBoard
            })
            console.log("Position changed")
            updateTick((prev) => prev + 1)
        } else {
            console.log("Cannot change position")
        }
    }, [alive, pos])

    const spawn = () => {
        console.clear()
        console.log("%cGame Started!", "color:red; font-size:50px")
        console.log("Setting Alive to True...")
        setAlive(true)
        console.log("Setting Position to {0, 0}...")
        setPos({ x: 0, y: 0 })
    }

    const reset = (respawn = true) => {
        console.log("Resetting...")
        setAlive(false)
        setFoodEaten(0)
        updateTick(0)
        setBoard(newBoard)
        respawn && spawn()
    }

    function move(x: number = pos.x, y: number = pos.y) {
        setBoard((currentBoard) => {
            if (
                currentBoard &&
                currentBoard[y] &&
                currentBoard[y][x] &&
                currentBoard[y][x] == "🍉"
            ) {
                console.log("Ate food")
                setFoodEaten((prev) => prev + 1)
            } else {
                console.log("No food")
            }
            currentBoard[pos.y][pos.x] = "☐"
            return currentBoard
        })
        if (x > 9 || x < 0 || y > 9 || y < 0) {
            console.log("Player hit a wall")
            reset(false)
        } else {
            if (foodEaten == melons) {
                setPrevHigh((foodEaten / (tick - 1)).toFixed(2))
                reset(false)
            } else {
                setPos({ x: x, y: y })
            }
        }
    }

    const Controls = ({ className = "" }: Props) => {
        return (
            <div className={`${className}`}>
                <div className="flex w-64 justify-evenly">
                    <MenuButton onClick={() => move(undefined, pos.y - 1)} text="⬆️" />
                </div>
                <div className="flex w-64 justify-evenly mt-2">
                    <MenuButton onClick={() => move(pos.x - 1)} text="⬅️" />
                    <MenuButton onClick={reset} text="🔄" />
                    <MenuButton onClick={() => move(pos.x + 1)} text="➡️" />
                </div>
                <div className="flex w-64 justify-evenly mt-2">
                    <MenuButton onClick={() => move(undefined, pos.y + 1)} text="⬇️" />
                </div>
            </div>
        )
    }

    return (
        <div className={`${className}`}>
            <h2 className="text-4xl italic message mb-2">MelonEater</h2>
            {prevHigh && <h2 className="message mb-8">{`High score: ${prevHigh}`}</h2>}
            {alive && (
                <div>
                    <h2 className="message mb-2">{`Moves made: ${tick - 1}`}</h2>
                    <h2 className="message mb-2">{`🍉 eaten: ${foodEaten} out of ${melons}`}</h2>
                    <h2 className="message mb-2">{`Efficiency: ${(foodEaten / (tick - 1)).toFixed(
                        2
                    )}`}</h2>
                </div>
            )}
            <table>
                <tbody>
                    {board.map((row, rIndex) => {
                        return (
                            <tr id={`R${rIndex}`} key={rIndex}>
                                {row.map((col, cIndex) => {
                                    return (
                                        <th id={`C${cIndex}`} key={cIndex}>
                                            {col}
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {!alive ? <MenuButton onClick={spawn} text="▶️" /> : <Controls className="mt-2" />}
        </div>
    )
}

export default MelonEater
