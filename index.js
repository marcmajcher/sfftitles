let words = {};
let templates = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json').then(res => res.json()).then(init);

});

function init(data) {
  templates = data.templates;
  for (const part of ['adj', 'noun']) {
    words[part] = { list: data.words.filter(e => e[part]) };
    words[part].totalWeight = words[part].list.reduce((a, c) => a + c.weight, 0);
  }
  generateTitle();
  document.getElementById('btn-generate').addEventListener('click', generateTitle);
}

function generateTitle() {
  const template = templates[Math.floor(Math.random() * templates.length)];
  document.getElementById('title').innerText = template.replace(/_([A-Z]+)_/g, replaceWord);
}

function replaceWord(match, part) {
  return (getWord(part.toLowerCase()));
}

function getWord(part) {
  const index = Math.floor(Math.random() * words[part].totalWeight);
  let total = 0;
  for (const word of words[part].list) {
    total += word.weight;
    if (total >= index) {
      return word.word;
    }
  }
}
