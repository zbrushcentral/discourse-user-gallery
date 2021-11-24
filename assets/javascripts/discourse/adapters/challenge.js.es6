import Adapter from "@ember-data/adapter";

const getChallenges = async () => {
  const res = await fetch(
    "http://localhost:8888/zbc-challenge/get-challenges.php"
  );
  const data = await res.json();
  const keys = Object.keys(data);
  const result = [];
  for (let i = 0; i < keys.length; i++) {
    result.push(data[i]);
  }
  return result;
};
export default Adapter.extend({
  query(store, type, query) {
    if (query.active) {
      return getChallenges();
    }
    return [];
  },
});
