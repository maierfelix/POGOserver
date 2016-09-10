import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} msg
 * @return {Buffer}
 */
export default function GetInventory(msg) {

  let items = this.bag.serialize();
  let stats = this.info.serialize();
  let party = this.party.serialize();
  let candies = this.candyBag.serialize();
  let currencies = this.currency.serialize();
  //let pokedex = this.pokedex.serialize();

  items.push(stats);
  items.push(candies);
  items.push(currencies);

  candies.map((candy) => {
    items.push(candy);
  });

  party.map((pkmn) => {
    items.push(pkmn);
  });

  let buffer = {
    success: true,
    inventory_delta: {
      new_timestamp_ms: +new Date(),
      inventory_items: items
    }
  };

  return (
    POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.GetInventoryResponse")
  );

}