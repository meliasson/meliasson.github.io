(function () {
  const model = {
    nrOfColumns: 80,
    nrOfRows: 45,
    grid: [],
    players: [],
    init: function () {
      for (let row = 0; row < this.nrOfRows; row++) {
        this.grid[row] = [];
        for (let col = 0; col < this.nrOfColumns; col++) {
          this.grid[row][col] = null;
        }
      }
    },
    step: function () {
      console.log("let's take a step", this.grid);
      //
    },
  };

  model.init();

  const modelPlayer = {
    direction: "east",
    body: [
      { x: 39, y: 9 },
      { x: 38, y: 9 },
      { x: 37, y: 9 },
      { x: 36, y: 9 },
    ],
  };

  //
  // Controller stuff below.
  //

  document.addEventListener("keydown", (event) => {
    if (event.keyCode > 36 && event.keyCode < 41) {
      event.preventDefault();
    }
    if (event.keyCode === 37) {
      modelPlayer.direction = "west";
    } else if (event.keyCode === 38) {
      modelPlayer.direction = "north";
    } else if (event.keyCode === 39) {
      modelPlayer.direction = "east";
    } else if (event.keyCode === 40) {
      modelPlayer.direction = "south";
    }
  });

  // Controller: Start game loop. TODO: Save return value so we can end game and
  // go to e.g. lobby?
  window.setInterval(() => {
    // Model: Update player model.
    const head = Object.assign({}, modelPlayer.body[0]);
    modelPlayer.body.unshift(head);
    if (modelPlayer.direction === "west") {
      modelPlayer.body[0].x -= 1;
    } else if (modelPlayer.direction === "north") {
      modelPlayer.body[0].y -= 1;
    } else if (modelPlayer.direction === "east") {
      modelPlayer.body[0].x += 1;
    } else if (modelPlayer.direction === "south") {
      modelPlayer.body[0].y += 1;
    }
    modelPlayer.body.pop();

    // Model: Clear grid.
    for (let i = 0; i < model.grid.length; i += 1) {
      for (let j = 0; j < model.grid[i].length; j += 1) {
        model.grid[i][j] = null;
      }
    }

    // Model: Place player in grid. TODO: Check for collisions.
    for (let i = 0; i < modelPlayer.body.length; i += 1) {
      bodyPart = modelPlayer.body[i];
      model.grid[bodyPart.y][bodyPart.x] = true;
    }

    // View: Render console grid.
    // let viewGrid = "";
    // for (let i = 0; i < model.grid.length; i += 1) {
    //   for (let j = 0; j < model.grid[i].length; j += 1) {
    //     if (model.grid[i][j]) {
    //       viewGrid += "X";
    //     } else {
    //       viewGrid += "O";
    //     }
    //   }
    //   viewGrid += "\n";
    // }
    // console.log(viewGrid);

    // View: Render canvas grid.
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#E9E8E8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const squareWidth = canvas.width / 80;
    const squareHeight = canvas.height / 45;
    context.fillStyle = "#55514f";
    for (let i = 0; i < model.grid.length; i += 1) {
      for (let j = 0; j < model.grid[i].length; j += 1) {
        if (model.grid[i][j]) {
          context.fillRect(
            j * squareWidth,
            i * squareHeight,
            squareWidth,
            squareHeight
          );
        }
      }
    }
  }, 100);
})();
