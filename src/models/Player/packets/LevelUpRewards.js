import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function LevelUpRewards(msg) {

  let buffer = {
    result: "SUCCESS",
    items_awarded: [
      {
        item_id: "ITEM_POKE_BALL",
        item_count: 2
      },
      {
        item_id: "ITEM_TROY_DISK",
        item_count: 2
      }
    ],
    items_unlocked: []
  };

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.LevelUpRewardsResponse")
  );

}