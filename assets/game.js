(function () {
  //
  // Model stuff.
  //

  const buildPlayer = () => {
    let body;
    let direction;

    const getBody = () => {
      return body;
    };

    const getDirection = () => {
      return direction;
    };

    const setBody = (newBody) => {
      body = newBody;
    };

    const setDirection = (newDirection) => {
      if (
        !direction ||
        (new RegExp("east|west").test(direction) &&
          new RegExp("north|south").test(newDirection)) ||
        (new RegExp("north|south").test(direction) &&
          new RegExp("east|west").test(newDirection))
      ) {
        direction = newDirection;
      }
    };

    const step = (newDirection) => {
      setDirection(newDirection);
      // TODO: Stop logic below into a function to get the same abstraction
      // level as we get with setDirection?
      body.pop();
      const head = Object.assign({}, body[0]);
      body.unshift(head);
      switch (direction) {
        case "west":
          body[0].x -= 1;
          break;
        case "north":
          body[0].y -= 1;
          break;
        case "east":
          body[0].x += 1;
          break;
        case "south":
          body[0].y += 1;
          break;
      }
    };

    return {
      getBody,
      getDirection,
      setBody,
      setDirection,
      step,
    };
  };

  const model = {
    nrOfColumns: 80,
    nrOfRows: 45,
    grid: [],
    player: null,
    init: function () {
      // Create grid.
      for (let row = 0; row < this.nrOfRows; row++) {
        this.grid[row] = [];
        for (let col = 0; col < this.nrOfColumns; col++) {
          this.grid[row][col] = null;
        }
      }

      // Create player in middle of grid.
      const headX = Math.floor(this.nrOfColumns / 2);
      const headY = Math.floor(this.nrOfRows / 2);
      this.player = buildPlayer();
      this.player.setDirection("west");
      this.player.setBody([
        { x: headX, y: headY },
        { x: headX + 1, y: headY },
        { x: headX + 2, y: headY },
        { x: headX + 3, y: headY },
      ]);
    },
    step: function (playerDirection) {
      // Clear grid.
      for (let row = 0; row < this.nrOfRows; row++) {
        for (let col = 0; col < this.nrOfColumns; col++) {
          this.grid[row][col] = null;
        }
      }

      this.player.step(playerDirection);

      // Place player in grid.
      for (let i = 0; i < this.player.getBody().length; i++) {
        const { x, y } = this.player.getBody()[i];
        model.grid[y][x] = true;
      }

      // TODO: Check for collisions.
    },
  };

  model.init();

  //
  // View stuff.
  //

  const buildCanvasView = () => {
    const render = (model) => {
      // TODO: Move static stuff like finding the element and getting the
      // context into the "constructor".
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
    };

    return {
      render,
    };
  };

  //
  // Controller stuff.
  //

  const buildPlayerController = () => {
    const directions = { 37: "west", 38: "north", 39: "east", 40: "south" };
    let direction;

    const getDirection = () => {
      return direction;
    };

    document.addEventListener("keydown", (event) => {
      direction = directions[event.keyCode];
      if (direction) {
        event.preventDefault();
      }
    });

    return {
      getDirection,
    };
  };

  const playerController = buildPlayerController();
  const canvasView = buildCanvasView();
  // Controller: Start game loop.
  // TODO: Save return value so we can end game and go to e.g. lobby?
  window.setInterval(() => {
    const playerDirection = playerController.getDirection();
    model.step(playerDirection);
    canvasView.render(model);

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
  }, 200);
})();
