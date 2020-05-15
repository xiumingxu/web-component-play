let chess = document.createElement('div');
const squares = {
    one   : 0,
    two   : 1,
    three : 2,
    four  : 3,
    five  : 4,
    six   : 5,
    seven : 6,
    eight : 7,
    nine  : 8
};
// record game
class PlayerRecord {
    constructor (id) {
        this.id = id;
        this.rows = [ new Set(), new Set(), new Set() ];
        this.cols = [ new Set(), new Set(), new Set() ];
        this.diag1 = new Set();
        this.diag2 = new Set();
    }
}

const filled = new Set();
const players = [ 0, 1 ];
const records = players.map(e => new PlayerRecord(e));
const labels = [ 'X', 'O' ];

const game = document.querySelector('.game');

let playerId = 0;

const move = e => {
    const el = e.target;
    const idx = squares[el.id];

    if (filled.has(idx)) return false;
    filled.add(idx);
    el.innerHTML = labels[playerId];

    const rowIdx = Math.floor(idx / 3);
    const colIdx = idx % 3;
    if (pushRecord(playerId, rowIdx, colIdx)) {
        console.log('player ' + playerId + ' win');
        game.removeEventListener('click', move);
    }
    else {
        playerId = playerId === 0 ? 1 : 0;
    }
    console.log(records);
};

const pushRecord = (pId, r, c) => {
    const { cols, rows, diag1, diag2 } = records[pId];
    cols[r].add(c);
    rows[c].add(r);
    if (r === c) diag1.add(r);
    if (r + c === 2) diag2.add(c);
    if (cols[r].size === 3 || rows[c].size === 3 || diag1.size === 3 || diag2.size === 3) return true;
    return false;
};

game.addEventListener('click', move);
