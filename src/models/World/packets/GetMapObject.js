import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Request} request
 */
export function GetMapObject(request) {

  let player = this.player;

  let latitude = player.latitude;
  let longitude = player.longitude;

  return new Promise(() => {
    // db call
    // 
  });

}