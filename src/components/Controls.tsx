import React, { useCallback, useEffect } from "react"
import MenuButton from "./MenuButton"

type Props = {
    className?: string
    pos: { x: number; y: number }
    setBoard: (value: React.SetStateAction<string[][]>) => void
    setFoodEaten: (value: React.SetStateAction<number>) => void
    reset: (respawn?: boolean) => void
    foodEaten: number
    melons: number
    setPrevHigh: (value: React.SetStateAction<string>) => void
    setPos: (value: React.SetStateAction<{ x: number; y: number }>) => void
    tick: number
    alive: boolean
}

/**
 * Contains the control buttons and handles keydowns
 * @param Props Styling
 */
const Controls = ({
    className = "",
    pos,
    setBoard,
    setFoodEaten,
    reset,
    foodEaten,
    melons,
    setPrevHigh,
    setPos,
    tick,
    alive,
}: Props) => {
    /**
     * Used to change the player's position
     * @param x What x value to set. Defaults to the current value.
     * @param y What y value to set. Defaults to the current value.
     */
    const move = useCallback(
        (x: number = pos.x, y: number = pos.y) => {
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
                    //console.log("No food")
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
        },
        [foodEaten, melons, pos.x, pos.y, reset, setBoard, setFoodEaten, setPos, setPrevHigh, tick]
    )

    const handleKeydown = useCallback(
        ({ code }: KeyboardEvent) => {
            switch (code) {
                case "ArrowUp":
                    move(undefined, pos.y - 1)
                    break
                case "ArrowLeft":
                    move(pos.x - 1)
                    break
                case "ArrowRight":
                    move(pos.x + 1)
                    break
                case "ArrowDown":
                    move(undefined, pos.y + 1)
                    break
                case "Space":
                    reset()
                    break
            }
        },
        [move, pos.x, pos.y, reset]
    )

    useEffect(() => {
        if (alive) {
            document.addEventListener("keydown", handleKeydown)
        }
        return () => {
            document.removeEventListener("keydown", handleKeydown)
        }
    }, [alive, handleKeydown])

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

export default Controls
