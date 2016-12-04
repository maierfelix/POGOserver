import POGOProtos from "pokemongo-protobuf";
import print from "../../../print";
import * as _calc from "../../Pokemon/calc";
/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function UseRevive(msg) {


 let buffer = null;
 buffer = { result: "SUCCESS"};
  let pkmn = this.party.getPkmnById(msg.pokemon_id);
  let stamina;
  let items;
	switch(msg.item_id){
	case "ITEM_REVIVE":
	stamina =0.5;	
	buffer.stamina=20;
	items = {"201":1};
	break;	 
	case "ITEM_MAX_REVIVE":
	stamina =1;	
	buffer.stamina=50;
	items = {"202":1};
	break;	  
	
	
}
	
		pkmn.stamina = pkmn.staminaMax*stamina;
		pkmn.updateDatabase();
		this.removeItems(items);
	

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.UseItemReviveResponse")
  );

}