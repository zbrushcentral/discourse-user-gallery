import Component from "@ember/component";

export default Component.extend({
  init() {
    this._super(...arguments);
    setInterval(this.countdown.bind(this), 1000);
  },
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
  countdown() {
    const countDate = new Date(this.get("endDate")).getTime();
    const now = new Date().getTime();
    const timeGap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    this.set("day", Math.floor(timeGap / day));
    this.set("hour", Math.floor((timeGap % day) / hour));
    this.set("minute", Math.floor((timeGap % hour) / minute));
    this.set("second", Math.floor((timeGap % minute) / second));
  },
});
