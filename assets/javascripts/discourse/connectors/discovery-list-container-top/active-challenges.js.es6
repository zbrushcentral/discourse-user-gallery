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

export default {
  // setupComponent(args, component) {
  //   getChallenges().then((data) => {
  //     console.log(data);
  //     component.set("challenges", data);
  //   });
  // },
};
