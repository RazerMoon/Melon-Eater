type Props = {
    className?: string
    board: string[][]
}

const Board = ({ className = "", board }: Props) => {
    return (
        <table className={`${className}`}>
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
    )
}

export default Board
