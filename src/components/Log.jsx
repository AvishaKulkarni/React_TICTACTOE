export default function Log({turns}){
    return <ol id='log'>
    {/* ``,${},this conjuncture let us create dynamic string in js */}
    {/* key should be there for dunamic list */}
    {/* `` to use js template literals */}
{turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>
    {turn.player} selected {turn.square.row},{turn.square.col}
</li>
)}
</ol>
}