(function () {
  //
  // Model stuff.
  //

  const buildPlayerModel = (body, direction) => {
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
      // TODO: Move logic below into a function to get the same
      // abstraction level as we get with setDirection?
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
      return body;
    };

    return {
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
      const body = [
        { x: headX, y: headY },
        { x: headX + 1, y: headY },
        { x: headX + 2, y: headY },
        { x: headX + 3, y: headY },
      ];
      const direction = "west";
      this.player = buildPlayerModel(body, direction);
    },
    step: function (playerDirection) {
      // Clear grid.
      for (let row = 0; row < this.nrOfRows; row++) {
        for (let col = 0; col < this.nrOfColumns; col++) {
          this.grid[row][col] = null;
        }
      }

      // Update player position.
      const playerBody = this.player.step(playerDirection);

      // Check for collisions.
      for (let i = 0; i < playerBody.length; i++) {
        const { x, y } = playerBody[i];
        if (x < 0 || x > this.nrOfColumns || y < 0 || y > this.nrOfRows) {
          // Player out of bounds. Restart game.
          this.init();
          return;
        }
      }

      // Place player in grid.
      for (let i = 0; i < playerBody.length; i++) {
        const { x, y } = playerBody[i];
        model.grid[y][x] = true;
      }
    },
  };

  model.init();

  //
  // View definition.
  //

  const buildCanvasView = () => {
    const render = (model) => {
      // TODO: Move static stuff like finding the element and getting
      // the context into the "constructor".
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

  const buildConsoleView = () => {
    const render = (model) => {
      let viewGrid = "";
      for (let i = 0; i < model.grid.length; i += 1) {
        for (let j = 0; j < model.grid[i].length; j += 1) {
          if (model.grid[i][j]) {
            viewGrid += "X";
          } else {
            viewGrid += "O";
          }
        }
        viewGrid += "\n";
      }
      console.log(viewGrid);
    };

    return {
      render,
    };
  };

  //
  // Controller definition.
  //

  const buildPlayerController = () => {
    const directions = {
      a: "west",
      w: "north",
      d: "east",
      s: "south",
    };
    let direction;

    const getDirection = () => {
      return direction;
    };

    document.addEventListener("keydown", (event) => {
      direction = directions[event.key];
      if (direction) {
        event.preventDefault();
      }
    });

    return {
      getDirection,
    };
  };

  //
  // Game loop definition.
  //

  const buildGameLoop = (model, view, controller) => {
    const run = () => {
      window.setInterval(() => {
        const playerDirection = controller.getDirection();
        model.step(playerDirection);
        view.render(model);
      }, 50);
    };

    return {
      run,
    };
  };

  //
  // Initialize game loop and run it.
  //

  const gameLoop = buildGameLoop(
    model,
    buildCanvasView(),
    buildPlayerController()
  );

  gameLoop.run();
})();
