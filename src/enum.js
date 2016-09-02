import proto from "node-pogo-protos";

export default {
  TEAM: proto.Enums.TeamColor,
  ITEMS: proto.Inventory.Item.ItemId,
  GENDER: proto.Enums.Gender,
  POKEMON_IDS: proto.Enums.PokemonId,
  getNameById: (emu, id) => {
    id <<= 0;
    for (let key in emu) {
      if (emu[key] === id) return (key);
    };
    return (null);
  },
  getIdByName: (emu, name) => {
    for (let key in emu) {
      if (key === name) return (emu[key]);
    };
    return (null);
  }
}