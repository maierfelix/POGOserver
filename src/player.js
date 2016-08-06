import * as CFG from "../cfg";

export function killPlayer(player) {

  let index = this.getPlayerIndex(player);

  if (index >= 0) {
    this.clients.splice(index, 1);
  }
  else {
    this.print("Failed at killing player", 33);
  }

}

export function getPlayerIndex(player) {

  let ip = player.remoteAddress;
  let index = -1;

  let ii = 0, length = this.clients.length;

  for (; ii < length; ++ii) {
    if (this.clients[ii].remoteAddress === ip) {
      index = ii;
      break;
    }
  };

  return (index);

}

export function getPlayerByRequest(req) {
  return (
    this.getPlayerByIP(req.connection.remoteAddress)
  );
}

export function getPlayerByIP(ip) {

  let ii = 0, length = this.clients.length;

  for (; ii < length; ++ii) {
    if (this.clients[ii].remoteAddress === ip) {
      return (this.clients[ii]);
    }
  };

  return (null);

}

export function addPlayer(connection) {

  this.clients.push({
    name: "rofl",
    timeout: this.time,
    remotePort: connection.remotePort,
    remoteAddress: connection.remoteAddress,
    connection: connection
  });

}

export function updatePlayers() {
  //this.print("Updating players");
  return void 0;
}

export function savePlayers() {
  this.print("Saving players into database");
  return void 0;
}