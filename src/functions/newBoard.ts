/**
 * Makes a new board, with randomly scattered Watermelon slices. Also, it sets the melons' state.
 * @param Props.setMelons Used to set melon state
 */
export default function newBoard(setMelons: (value: React.SetStateAction<number>) => void) {
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
