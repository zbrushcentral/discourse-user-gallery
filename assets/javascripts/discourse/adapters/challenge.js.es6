import Adapter from "@ember-data/adapter";
import { pixo_domain } from "../utils/const";

const getChallenges = async () => {
  const res = await fetch(`${pixo_domain}/zbc-challenge/get-challenges.php`);
  const data = await res.json();
  const keys = Object.keys(data);
  const result = [];
  for (let i = 0; i < keys.length; i++) {
    result.push(data[i]);
  }
  console.log("this is RESULT ", result);
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
