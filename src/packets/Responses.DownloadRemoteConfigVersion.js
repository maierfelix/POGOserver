import proto from "../proto";
import POGOProtos from "pokemongo-protobuf";

/**
 * @param {Object} obj
 * @return {Object}
 */
export default function DownloadRemoteConfigVersion(obj) {

  let buffer = {
    "result": "SUCCESS",
    "item_templates_timestamp_ms": "1471650700946",
    "asset_digest_timestamp_ms": "1467338276561000",
    "$unknownFields": []
  }

  return POGOProtos.serialize(buffer, "POGOProtos.Networking.Responses.DownloadRemoteConfigVersionResponse");

}