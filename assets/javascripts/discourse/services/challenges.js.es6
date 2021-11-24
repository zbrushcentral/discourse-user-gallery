import Service from "@ember/service";

export default Service.extend({
  challenges: undefined,
  fetchedChallenges: false,
  init() {
    this._super(...arguments);
    this.getChallenges();
  },
  async getChallenges() {
    if (this.get("fetchedChallenges")) {
      return this.get("challenges");
    }
    const res = await fetch(
      "http://localhost:8888/zbc-challenge/get-challenges.php"
    );
    const data = await res.json();
    const keys = Object.keys(data);
    const result = [];
    for (let i = 0; i < keys.length; i++) {
      result.push(data[i]);
    }

    this.set("fetchedChallenges", true);
    this.set("challenges", result);
    return result;
  },
});
