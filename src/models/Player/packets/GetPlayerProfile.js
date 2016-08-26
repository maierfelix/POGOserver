import POGOProtos from "pokemongo-protobuf";

export function GetPlayerProfile() {

  return (POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetPlayerProfileResponse"));

}