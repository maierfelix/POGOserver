import POGOProtos from "pokemongo-protobuf";
import print from "../../../print";
import * as _calc from "../../Pokemon/calc";
/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function UsePotion(msg) {


 let buffer = null;
 buffer = { result: "SUCCESS"};
  let pkmn = this.party.getPkmnById(msg.pokemon_id);
  let stamina;
  let items;
	switch(msg.item_id){
	case "ITEM_POTION":
	stamina =20;	
	buffer.stamina=20;
	items = {"101":1};
	break;	 
	case "ITEM_SUPER_POTION":
	stamina =50;	
	buffer.stamina=50;
	items = {"102":1};
	break;	  
	case "ITEM_HYPER_POTION":
	stamina =200;	
	buffer.stamina=200;
	items = {"103":1};
	break;	 	 
	case "ITEM_MAX_POTION":
	stamina =pkmn.staminaMax;	
	buffer.stamina=pkmn.staminaMax;
	items = {"104":1};
	break;
	
}
	if((pkmn.stamina+stamina)<= pkmn.staminaMax){
		pkmn.stamina = pkmn.stamina+stamina;
		pkmn.updateDatabase();
		this.removeItems(items);
	} else {
		pkmn.stamina = pkmn.staminaMax;
		pkmn.updateDatabase();
		this.removeItems(items);
	}

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.UseItemPotionResponse")
  );

}