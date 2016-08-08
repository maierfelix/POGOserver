import proto from "../proto";

/**
 * @param {Object}
 * @return {Object}
 */
export default function DownloadUrlEntry(obj) {

  return (
    new proto.Data.DownloadUrlEntry({
      url: obj.url,
      asset_id: obj.id,
      size: obj.size,
      checksum: obj.checksum
    })
  );

}