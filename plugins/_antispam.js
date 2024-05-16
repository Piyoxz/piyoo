import { performance } from "perf_hooks";

export async function before(m) {
  const users = global.db.data.users;
  const chats = global.db.data.chats;

  let isCmddd =/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.text)

  if (!isCmddd) return;

  if (
    m.isBaileys ||
    m.mtype === "protocolMessage" ||
    m.mtype === "pollUpdateMessage" ||
    m.mtype === "reactionMessage"
  ) {
    return;
  }


  if (
    !m.msg ||
    !m.message ||
    users[m.sender].banned ||
    chats[m.chat].isBanned
  ) {
    return;
  }

  this.spam = this.spam || {};

  if (!m.isGroup) {
    this.spam[m.sender] = this.spam[m.sender] || { count: 0, lastspam: 0 };

    const now = performance.now();

    const timeDifference = now - this.spam[m.sender].lastspam;

    if (timeDifference < 10000) {
      this.spam[m.sender].count++;

      if (this.spam[m.sender].count >= 2) {
        users[m.sender].banned = true;
        this.spam[m.sender].lastspam = now + 10000;

        setTimeout(() => {
          users[m.sender].banned = false;
          this.spam[m.sender].count = 0;
        }, 10000);

        return m.reply(
          `❌ *Please do not spam*\nWait for ${Math.ceil(
            (this.spam[m.sender].lastspam - now) / 1000
          )} seconds`
        );
      }
    } else {
      this.spam[m.sender].count = 0;
    }

    this.spam[m.sender].lastspam = now;
  } else {
    this.spam[m.chat] = this.spam[m.chat] || { count: 0, lastspam: 0 };

    const now = performance.now();

    const timeDifference = now - this.spam[m.chat].lastspam;

    if (timeDifference < 10000) {
      this.spam[m.chat].count++;

      if (this.spam[m.chat].count >= 2) {
        chats[m.chat].isBanned = true;
        this.spam[m.chat].lastspam = now + 10000;

        setTimeout(() => {
          chats[m.chat].isBanned = false;
          this.spam[m.chat].count = 0;
        }, 10000);

        return m.reply(
          `❌ *Please do not spam*\nWait for ${Math.ceil(
            (this.spam[m.chat].lastspam - now) / 1000
          )} seconds`
        );
      }
    } else {
      this.spam[m.chat].count = 0;
    }

    this.spam[m.chat].lastspam = now;
  }
}
