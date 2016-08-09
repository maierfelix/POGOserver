import proto from "../proto";

import DownloadUrlEntry from "./Data.DownloadUrlEntry";

/**
 * @return {Object}
 */
export default function GetDownloadUrls() {

  let download_urls = [
    DownloadUrlEntry({
      asset_id: "9649e04b-ccd8-4b1c-b066-cc75ed4c0976/1467338147687000",
      url: "https://storage.googleapis.com/cloud_assets_pgorelease/bundles/android/pm0101?generation=1467338147687000&GoogleAccessId=pgorelease-service-account@pgorelease.iam.gserviceaccount.com&Expires=1469970173&Signature=CY4YbWipMVMUzyDgHGceoo2NO429spFyH39p%2FSMltBlQOBYLcRD8panRgTH8tuMc3uB65rtp613IkGwUMaMMXx40v0NBECEsRXcggYxYluO2k4waShMyOmWHOomMPKwGXg5ot93wLH6aXFwv0%2FD%2FUaqZDrJYJ9bMRcsF2KlPPy363XbrbcSCcT19otqU3D9yjWU1mDbzRy9yZRqmaCu%2FPtWHKKWnUKiN2f2UqL8Gbulex8BDpm4OKf4lXnOwAKYDpcAMph%2FC3LKVhvoRuryzPRJgXojb1CvfHaY0svUFoKq0N%2FuFl9hzR8RAVLsAPaD%2FpKuql4BUm%2BZtoc%2BWi0lQXA%3D%3D",
      size: 169205,
      checksum: 0xbe30d925
    })
  ];

  return (
    new proto.Networking.Responses.GetDownloadUrlsResponse({
      download_urls: download_urls
    }).encode()
  );

}