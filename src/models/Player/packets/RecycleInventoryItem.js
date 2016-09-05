import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function RecycleInventoryItem(msg) {

  let buffer = null;

  let success = this.bag.updateItem(msg.item_id, -(msg.count << 0));

  buffer = {
    result: success !== -1 ? "SUCCESS" : "ERROR_NOT_ENOUGH_COPIES",
    new_count: success,
  };

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.RecycleInventoryItemResponse")
  );

}