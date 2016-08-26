import POGOProtos from "pokemongo-protobuf";

export function GetPlayer() {

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetPlayerResponse"));

}