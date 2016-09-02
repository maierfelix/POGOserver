/**
 * @class Contact
 */
export default class Contact {

  /**
   * @param {Player} player
   * @constructor
   */
  constructor(player) {

    this.player = player;

    this.sendMarketingEmails = false;
    this.sendPushNotifications = false;

  }

  /**
   * @return {Object}
   */
  serialize() {
    return ({
      send_marketing_emails: this.sendMarketingEmails,
      send_push_notifications: this.sendPushNotifications
    });
  }

}