let board = [
  [
    { id: "R", color: "black", moved: false },
    { id: "N", color: "black", moved: false },
    { id: "B", color: "black", moved: false },
    { id: "Q", color: "black", moved: false },
    { id: "K", color: "black", moved: false },
    { id: "B", color: "black", moved: false },
    { id: "N", color: "black", moved: false },
    { id: "R", color: "black", moved: false },
  ],
  [
    { id: "P", color: "black", moved: false },
    { id: "P", color: "black", moved: false },
    { id: "P", color: "black", moved: false },
    { id: "P", color: "black", moved: false },
    { id: "P", color: "black", moved: false },
    { id: "P", color: "black", moved: false },
    { id: "P", color: "black", moved: false },
    { id: "P", color: "black", moved: false },
  ],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [
    { id: "P", color: "white", moved: false },
    { id: "P", color: "white", moved: false },
    { id: "P", color: "white", moved: false },
    { id: "P", color: "white", moved: false },
    { id: "P", color: "white", moved: false },
    { id: "P", color: "white", moved: false },
    { id: "P", color: "white", moved: false },
    { id: "P", color: "white", moved: false },
  ],
  [
    { id: "R", color: "white", moved: false },
    { id: "N", color: "white", moved: false },
    { id: "B", color: "white", moved: false },
    { id: "Q", color: "white", moved: false },
    { id: "K", color: "white", moved: false },
    { id: "B", color: "white", moved: false },
    { id: "N", color: "white", moved: false },
    { id: "R", color: "white", moved: false },
  ],
];

// let board = [
//   [
//     { id: "R", color: "black", moved: false },
//     { id: "N", color: "black", moved: false },
//     { id: "B", color: "black", moved: false },
//     { id: "Q", color: "black", moved: false },
//     false,
//     { id: "B", color: "black", moved: false },
//     false,
//     { id: "R", color: "black", moved: false },
//   ],
//   [
//     { id: "P", color: "black", moved: false },
//     { id: "P", color: "black", moved: false },
//     { id: "P", color: "black", moved: false },
//     { id: "P", color: "black", moved: false },
//     { id: "N", color: "black", moved: true },
//     { id: "P", color: "black", moved: false },
//     { id: "P", color: "black", moved: false },
//     { id: "P", color: "black", moved: false },
//   ],
//   [false, false, false, false, false, false, false, false],
//   [
//     false,
//     false,
//     false,
//     { id: "K", color: "white", moved: true },
//     { id: "P", color: "black", moved: true },
//     { id: "K", color: "black", moved: true },
//     false,
//     false,
//   ],
//   [
//     false,
//     false,
//     false,
//     { id: "P", color: "white", moved: true },
//     false,
//     false,
//     false,
//     false,
//   ],
//   [false, false, false, false, false, false, false, false],
//   [
//     { id: "P", color: "white", moved: false },
//     { id: "P", color: "white", moved: false },
//     { id: "P", color: "white", moved: false },
//     false,
//     { id: "P", color: "white", moved: false },
//     { id: "P", color: "white", moved: false },
//     { id: "P", color: "white", moved: false },
//     { id: "P", color: "white", moved: false },
//   ],
//   [
//     { id: "R", color: "white", moved: false },
//     { id: "N", color: "white", moved: false },
//     { id: "B", color: "white", moved: false },
//     { id: "Q", color: "white", moved: false },
//     false,
//     { id: "B", color: "white", moved: false },
//     { id: "N", color: "white", moved: false },
//     { id: "R", color: "white", moved: false },
//   ],
// ];

let displayedBoard = JSON.parse(JSON.stringify(board));

const kingsPositions = {
  white: { x: 4, y: 7 },
  black: { x: 4, y: 0 },
};

const piecesCount = {
  white: {
    P: 8,
    N: 2,
    B: 2,
    R: 2,
    Q: 1,
  },
  black: {
    P: 8,
    N: 2,
    B: 2,
    R: 2,
    Q: 1,
  },
};

let turn = "white";

const validateMove = (id, from, to) => {
  switch (id) {
    case "P":
      let direction = turn === "white" ? 1 : -1;
      if (from.y === to.y + direction) {
        if (from.x === to.x && !board[to.y][to.x]) return true;
        else if (
          Math.abs(from.x - to.x) === 1 &&
          board[to.y][to.x]?.color === (turn === "white" ? "black" : "white")
        )
          return true;
      } else if (
        from.x === to.x &&
        !board[from.y][from.x].moved &&
        from.y === to.y + direction * 2
      ) {
        if (!board[to.y][to.x] && !board[to.y + direction][to.x]) return true;
      }
      return false;

    case "B":
      if (Math.abs(from.x - to.x) === Math.abs(from.y - to.y)) {
        for (let i = 1; i < Math.abs(from.x - to.x); i++) {
          let x = from.x - to.x > 0 ? from.x - i : from.x + i;
          let y = from.y - to.y > 0 ? from.y - i : from.y + i;
          if (board[y][x]) return false;
        }
        if (board[to.y][to.x]?.color !== turn) return true;
      }
      return false;

    case "N":
      if (
        Math.abs((from.x - to.x) * (from.y - to.y)) === 2 &&
        board[to.y][to.x]?.color !== turn
      )
        return true;

      return false;

    case "R":
      if ((from.x === to.x) !== (from.y === to.y)) {
        if (from.x === to.x) {
          for (let i = 1; i < Math.abs(from.y - to.y); i++) {
            let x = from.x;
            let y = from.y - to.y > 0 ? from.y - i : from.y + i;
            if (board[y][x]) return false;
          }
        } else {
          for (let i = 1; i < Math.abs(from.x - to.x); i++) {
            let x = from.x - to.x > 0 ? from.x - i : from.x + i;
            let y = from.y;
            if (board[y][x]) return false;
          }
        }
        if (board[to.y][to.x]?.color !== turn) return true;
      }
      return false;

    case "Q":
      if (Math.abs(from.x - to.x) === Math.abs(from.y - to.y)) {
        for (let i = 1; i < Math.abs(from.x - to.x); i++) {
          let x = from.x - to.x > 0 ? from.x - i : from.x + i;
          let y = from.y - to.y > 0 ? from.y - i : from.y + i;
          if (board[y][x]) return false;
        }
        if (board[to.y][to.x]?.color !== turn) return true;
      } else if ((from.x === to.x) !== (from.y === to.y)) {
        if (from.x === to.x) {
          for (let i = 1; i < Math.abs(from.y - to.y); i++) {
            let x = from.x;
            let y = from.y - to.y > 0 ? from.y - i : from.y + i;
            if (board[y][x]) return false;
          }
        } else {
          for (let i = 1; i < Math.abs(from.x - to.x); i++) {
            let x = from.x - to.x > 0 ? from.x - i : from.x + i;
            let y = from.y;
            if (board[y][x]) return false;
          }
        }
        if (board[to.y][to.x]?.color !== turn) return true;
      }
      return false;

    case "K":
      if (Math.abs(from.x - to.x) <= 1 && Math.abs(from.y - to.y) <= 1) {
        if (board[to.y][to.x]?.color !== turn) return true;
      } else if (!board[from.y][from.x].moved && !Math.abs(from.y - to.y)) {
        if (from.x - to.x === 2 && !board[from.y][0].moved) {
          for (let i = 1; i <= 3; i++) {
            let x = from.x - i;
            let y = from.y;
            if (board[y][x]) return false;
            else if (i < 3 && isAttacked({ y: y, x: x })) return false;
          }
          board[from.y][3] = board[from.y][0];
          board[from.y][0] = false;
          return true;
        } else if (from.x - to.x === -2 && !board[from.y][7].moved) {
          for (let i = 1; i <= 2; i++) {
            let x = from.x + i;
            let y = from.y;
            if (board[y][x]) return false;
            else if (isAttacked({ y: y, x: x })) return false;
          }
          board[from.y][5] = board[from.y][7];
          board[from.y][7] = false;
          return true;
        }
      }
      return false;
  }
};

const isAttacked = (position) => {
  let right, left, top, bottom;
  let topCorners = { left: false, right: false },
    bottomCorners = { left: false, right: false };
  let x, y;

  for (let i = 1; i <= 7; i++) {
    if (!left) {
      x = position.x - i;
      y = position.y;
      if (x < 0 || x > 7) left = true;
      else if (board[y][x]) {
        if (board[y][x]?.color === turn) left = true;
        else if (board[y][x]?.id === "R" || board[y][x]?.id === "Q")
          return true;
        else if (i === 1 && board[y][x]?.id === "K") return true;
        else left = true;
      }
    }

    if (!right) {
      x = position.x + i;
      y = position.y;
      if (x < 0 || x > 7) right = true;
      else if (board[y][x]) {
        if (board[y][x]?.color === turn) right = true;
        else if (board[y][x]?.id === "R" || board[y][x]?.id === "Q")
          return true;
        else if (i === 1 && board[y][x]?.id === "K") return true;
        else right = true;
      }
    }

    if (!top) {
      x = position.x;
      y = position.y - i;
      if (y < 0 || y > 7) top = true;
      else if (board[y][x]) {
        if (board[y][x]?.color === turn) top = true;
        else if (board[y][x]?.id === "R" || board[y][x]?.id === "Q")
          return true;
        else if (i === 1 && board[y][x]?.id === "K") return true;
        else top = true;
      }
    }

    if (!bottom) {
      x = position.x;
      y = position.y + i;
      if (y < 0 || y > 7) bottom = true;
      else if (board[y][x]) {
        if (board[y][x]?.color === turn) bottom = true;
        else if (board[y][x]?.id === "R" || board[y][x]?.id === "Q")
          return true;
        else if (i === 1 && board[y][x]?.id === "K") return true;
        else bottom = true;
      }
    }

    y = position.y - i;
    if (!(y < 0)) {
      if (!topCorners.left) {
        x = position.x - i;
        if (!(x >= 0)) topCorners.left = true;
        else if (board[y][x]) {
          if (board[y][x]?.color === turn) topCorners.left = true;
          else if (board[y][x]?.id === "B" || board[y][x]?.id === "Q")
            return true;
          else if (i === 1 && board[y][x]?.id === "K") return true;
          else if (i === 1 && board[y][x]?.id === "P" && turn === "white")
            return true;
          else topCorners.left = true;
        }
      }

      if (!topCorners.right) {
        x = position.x + i;
        if (!(x <= 7)) topCorners.right = true;
        else if (board[y][x]) {
          if (board[y][x]?.color === turn) topCorners.right = true;
          else if (board[y][x]?.id === "B" || board[y][x]?.id === "Q")
            return true;
          else if (i === 1 && board[y][x]?.id === "K") return true;
          else if (i === 1 && board[y][x]?.id === "P" && turn === "white")
            return true;
          else topCorners.right = true;
        }
      }
    }

    y = position.y + i;
    if (!(y > 7)) {
      if (!bottomCorners.left) {
        x = position.x - i;
        if (!(x >= 0)) bottomCorners.left = true;
        else if (board[y][x]) {
          if (board[y][x]?.color === turn) bottomCorners.left = true;
          else if (board[y][x]?.id === "B" || board[y][x]?.id === "Q")
            return true;
          else if (i === 1 && board[y][x]?.id === "K") return true;
          else if (i === 1 && board[y][x]?.id === "P" && turn === "black")
            return true;
          else bottomCorners.left = true;
        }
      }

      if (!bottomCorners.right) {
        x = position.x + i;
        if (!(x <= 7)) bottomCorners.right = true;
        else if (board[y][x]) {
          if (board[y][x]?.color === turn) bottomCorners.right = true;
          else if (board[y][x]?.id === "B" || board[y][x]?.id === "Q")
            return true;
          else if (i === 1 && board[y][x]?.id === "K") return true;
          else if (i === 1 && board[y][x]?.id === "P" && turn === "black")
            return true;
          else bottomCorners.right = true;
        }
      }
    }
  }

  x = position.x - 2;
  if (x >= 0) {
    y = position.y - 1;
    if (y >= 0) {
      if (board[y][x]?.id === "N" && board[y][x]?.color !== turn) {
        return true;
      }
    }
    y = position.y + 1;
    if (y <= 7) {
      if (board[y][x]?.id === "N" && board[y][x]?.color !== turn) {
        return true;
      }
    }
  }

  x = position.x + 2;
  if (x <= 7) {
    y = position.y - 1;
    if (y >= 0) {
      if (board[y][x]?.id === "N" && board[y][x]?.color !== turn) {
        return true;
      }
    }
    y = position.y + 1;
    if (y <= 7) {
      if (board[y][x]?.id === "N" && board[y][x]?.color !== turn) {
        return true;
      }
    }
  }

  y = position.y - 2;
  if (y >= 0) {
    x = position.x - 1;
    if (x >= 0) {
      if (board[y][x]?.id === "N" && board[y][x]?.color !== turn) {
        return true;
      }
    }
    x = position.x + 1;
    if (x <= 7) {
      if (board[y][x]?.id === "N" && board[y][x]?.color !== turn) {
        return true;
      }
    }
  }

  y = position.y + 2;
  if (y <= 7) {
    x = position.x - 1;
    if (x >= 0) {
      if (board[y][x]?.id === "N" && board[y][x]?.color !== turn) {
        return true;
      }
    }
    x = position.x + 1;
    if (x <= 7) {
      if (board[y][x]?.id === "N" && board[y][x]?.color !== turn) {
        return true;
      }
    }
  }

  return false;
};

const isCheckmate = () => {
  for (let pieceY = 0; pieceY <= 7; pieceY++) {
    for (let pieceX = 0; pieceX <= 7; pieceX++) {
      if (board[pieceY][pieceX] && board[pieceY][pieceX]?.color === turn) {
        for (let fieldY = 0; fieldY <= 7; fieldY++) {
          for (let fieldX = 0; fieldX <= 7; fieldX++) {
            let piece = board[pieceY][pieceX];
            if (
              validateMove(
                piece.id,
                { x: pieceX, y: pieceY },
                { y: fieldY, x: fieldX }
              )
            ) {
              if (piece.id === "K") {
                if (!isAttacked({ x: fieldX, y: fieldY })) {
                  return false;
                }
              } else {
                board[fieldY][fieldX] = piece;
                board[pieceY][pieceX] = false;
              }
              if (!isAttacked(kingsPositions[turn])) {
                board = JSON.parse(JSON.stringify(displayedBoard));
                return false;
              }
              board = JSON.parse(JSON.stringify(displayedBoard));
            }
          }
        }
      }
    }
  }
  return true;
};

const isPat = () => {
  for (let pieceY = 0; pieceY <= 7; pieceY++) {
    for (let pieceX = 0; pieceX <= 7; pieceX++) {
      if (board[pieceY][pieceX] && board[pieceY][pieceX]?.color === turn) {
        for (let fieldY = 0; fieldY <= 7; fieldY++) {
          for (let fieldX = 0; fieldX <= 7; fieldX++) {
            let piece = board[pieceY][pieceX];
            if (
              validateMove(
                piece.id,
                { x: pieceX, y: pieceY },
                { y: fieldY, x: fieldX }
              )
            ) {
              if (
                (piece.id === "K" && !isAttacked({ y: fieldY, x: fieldX })) ||
                piece.id !== "K"
              ) {
                board[fieldY][fieldX] = piece;
                board[pieceY][pieceX] = false;
                if (!isAttacked(kingsPositions[turn])) {
                  board = JSON.parse(JSON.stringify(displayedBoard));
                  return false;
                }
                board = JSON.parse(JSON.stringify(displayedBoard));
              }
            }
          }
        }
      }
    }
  }
  return true;
};

const promotePawn = (color, position) => {
  const container = document.querySelector("#promotePawnWindow");
  container.style.visibility = "visible";
  const box = document.querySelector("#box");
  let img = document.createElement("img");
  img.setAttribute("src", piecesImg[color].Q);
  img.addEventListener("click", () => {
    let piece = board[position.y][position.x];
    piece.id = "Q";
    piecesCount[color].P--;
    piecesCount[color][piece.id]++;
    container.style.visibility = "hidden";
    displayedBoard = JSON.parse(JSON.stringify(board));
    display();
  });
  box.appendChild(img);

  img = document.createElement("img");
  img.setAttribute("src", piecesImg[color].R);
  img.addEventListener("click", () => {
    let piece = board[position.y][position.x];
    piece.id = "R";
    piecesCount[color].P--;
    piecesCount[color][piece.id]++;
    container.style.visibility = "hidden";
    displayedBoard = JSON.parse(JSON.stringify(board));
    display();
  });
  box.appendChild(img);

  img = document.createElement("img");
  img.setAttribute("src", piecesImg[color].N);
  img.addEventListener("click", () => {
    let piece = board[position.y][position.x];
    piece.id = "N";
    piecesCount[color].P--;
    piecesCount[color][piece.id]++;
    container.style.visibility = "hidden";
    displayedBoard = JSON.parse(JSON.stringify(board));
    display();
  });
  box.appendChild(img);

  img = document.createElement("img");
  img.setAttribute("src", piecesImg[color].B);
  img.addEventListener("click", () => {
    let piece = board[position.y][position.x];
    piece.id = "B";
    piecesCount[color].P--;
    piecesCount[color][piece.id]++;
    container.style.visibility = "hidden";
    displayedBoard = JSON.parse(JSON.stringify(board));
    display();
  });
  box.appendChild(img);
};

const move = (from, to) => {
  const piece = board[from.y][from.x];
  const deadPiece = JSON.parse(JSON.stringify(board[to.y][to.x]));

  if (piece.color === turn) {
    if (validateMove(piece.id, from, to)) {
      board[to.y][to.x] = piece;
      board[from.y][from.x] = false;
      piece.moved = true;

      if (piece.id === "P") {
        if (turn === "white") {
          if (to.y === 0) {
            promotePawn("white", { y: 0, x: to.x });
          }
        } else {
          if (to.y === 7) {
            promotePawn("black", { y: 7, x: to.x });
          }
        }
      }

      if (piece.id === "K") {
        kingsPositions[turn].x = to.x;
        kingsPositions[turn].y = to.y;
      }

      if (isAttacked(kingsPositions[turn])) {
        board = JSON.parse(JSON.stringify(displayedBoard));
      } else {
        turn = turn === "white" ? "black" : "white";
        if (deadPiece) piecesCount[turn][deadPiece.id]--;
        displayedBoard = JSON.parse(JSON.stringify(board));

        if (isAttacked(kingsPositions[turn])) {
          if (isCheckmate()) {
            document.querySelector("h1").textContent = "CHECKMATE";
            document.querySelector("#endScreen").style.visibility = "visible";
          }
        } else if (isPat()) {
          document.querySelector("h1").textContent = "PAT";
          document.querySelector("#endScreen").style.visibility = "visible";
        }
      }
    }
  }
};
