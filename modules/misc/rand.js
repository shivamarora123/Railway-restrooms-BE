const randID = () => {
  let text = [];
  let possible = "0123456789";
  for (var i = 0; i < 6; i++) {
    text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
  }
  return text.join("");
}

const randStat = (l=14) => {
  let text = [];
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < l; i++) {
    text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
  }
  return text.join("");
}

module.exports = {
    "numeric":randID,
    "static":randStat
  }
