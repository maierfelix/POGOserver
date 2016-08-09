import * as CFG from "../../cfg";

import proto from "../proto";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function FortDetails(obj) {

  return (
    new proto.Networking.Responses.FortDetailsResponse({ 
      fort_id: "cbb56441628d4a4d88f1c00b5b545684.16",
      name: "Bauer Vom Lande",
      image_urls: ["http://lh3.ggpht.com/Pu8QxppOJjm3gNI8wO_--2CcyXmfeOH8CTb3DionlzCpo7stk3pjlV_c9-kMakhtFyygN62WuNJaTsIiTw334UVmHZgEXDCj"],
      type: proto.Map.Fort.FortType.CHECKPOINT,
      description: "meow!"
    }).encode()
  );

}