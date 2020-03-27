export default class BulkEmailValidator {
  getValidInvalid(
    emails: string[]
  ): {
    validEmails: Array<{ email: string; index: number }>;
    invalidEmails: Array<{ email: string; index: number }>;
  } {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let invalidEmails: any[] = [];
    let validEmails: any[] = [];
    let validIndex = -1;
    let invalidIndex = -1;
    let obj: {
      email: string;
      index: number;
    };
    for (let index = 0; index < emails.length; index++) {
      if (emails[index].length > 0) {
        if (!regEx.test(emails[index])) {
          invalidIndex = invalidIndex + 1;
          obj = {
            email: emails[index],
            index: invalidIndex
          };
          invalidEmails.push(obj);
        } else {
          validIndex = validIndex + 1;
          obj = {
            email: emails[index],
            index: validIndex
          };
          validEmails.push(obj);
        }
      }
    }
    return { validEmails, invalidEmails };
  }
}
