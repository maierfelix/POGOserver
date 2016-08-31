import proto from "node-pogo-protos";

export default {
  ITEMS: proto.Inventory.Item.ItemId,
  getItemNameById: (emu, id) => {
    id <<= 0;
    for (let key in emu) {
      if (emu[key] === id) return (key);
    };
    return (null);
  },
  getItemIdByName: (emu, name) => {
    for (let key in emu) {
      if (key === name) return (emu[key]);
    };
    return (null);
  }
}