import POGOProtos from "pokemongo-protobuf";

export default function GetPlayerProfile() {

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetPlayerProfileResponse")
  );

}