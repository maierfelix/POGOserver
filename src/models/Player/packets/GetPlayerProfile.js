import POGOProtos from "pokemongo-protobuf";

export default function GetPlayerProfile() {

  let buffer = ({
    result: "SUCCESS",
    start_time: +new Date(),
    badges: [
      {
        badge_type: "BADGE_TRAVEL_KM",
        end_value: 2674,
        current_value: 1337
      }
    ]
  });

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetPlayerProfileResponse")
  );

}