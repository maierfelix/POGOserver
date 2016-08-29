/**
 * @class Contact
 */
export default class Contact {

  /** @constructor */
  constructor() {

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