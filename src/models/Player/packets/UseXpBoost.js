import POGOProtos from "pokemongo-protobuf";
import print from "../../../print";
/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function UseXpBoost(msg) {
 let buffer = null;
 
 buffer = { result: "SUCCESS",
			applied_items:{item:[
			{
				item_id: msg.item_id,
				item_type: "ITEM_TYPE_XP_BOOST",
				expire_ms: +new Date()+1800000 ,
				applied_ms:+new Date()
			}
 ]}};
 this.removeItems({"301":1});
 this.info.LuckyEggExp = +new Date()+1800000;
  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.UseItemXpBoostResponse")
  );

}
