import Component from "@ember/component";

export default Component.extend({
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,

  init() {
    this._super(...arguments);
    this.set("interval", setInterval(this.countdown.bind(this), 1000));
  },

  willDestroy() {
    clearInterval(this.get("interval"));
  },

  isFinished() {
    this.set("days", "00");
    this.set("hours", "00");
    this.set("minutes", "00");
    this.set("seconds", "00");
  },

  countdown() {
    const countDate = new Date(this.get("endDate")).getTime();
    const now = new Date().getTime();
    const timeGap = countDate - now;

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let daysRemaining = Math.floor(timeGap / day); 
    this.set("days", daysRemaining < 10 ? '0' + daysRemaining : daysRemaining);


    let hoursRemaining = Math.floor((timeGap % day) / hour);
    this.set("hours", hoursRemaining < 10 ? '0' + hoursRemaining : hoursRemaining);

    let minutesRemaining = Math.floor((timeGap % hour) / minute);
    this.set("minutes", minutesRemaining < 10 ? '0' + minutesRemaining : minutesRemaining);

    let secondsRemaining = Math.floor((timeGap % minute) / second);
    this.set("seconds",  secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining);
  

    if (timeGap < 0) {
      this.isFinished();
    }
  },
});
