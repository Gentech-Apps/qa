const path = require('path')
const gmail = require("gmail-tester");


module.exports = (on, config) => {
  on("task", {
    "gmail:get-messages": async args => {
      const messages = await gmail.get_messages(
        path.resolve(__dirname, "credentials.json"),
        path.resolve(__dirname, "token.json"),
        args.options
      );
      return messages;
    }
  })
  on("task", {
    "gmail:check": async args => {
      const { from, to, subject } = args;
      const email = await gmail.check_inbox(
        path.resolve(__dirname, "credentials.json"), // Assuming credentials.json is in the current directory.
        path.resolve(__dirname, "token.json"), //Look for gmail_token.json in the current directory (if it doesn't exists, it will be created by the script).
        {
          subject: subject,
          from: from,
          to: to,
          wait_time_sec: 10, // Poll interval (in seconds).
          max_wait_time_sec: 30, // Maximum poll time (in seconds), after which we'll giveup.
          include_body: true,
        }
      );
      return email;
    }
  });
};