const main = () => {

// layout

let render = (template, node) => node.innerHTML = template;

const codeKeys = [
  {key: 81, char: 'Q' },
  {key: 87, char: 'W' },
  {key: 69, char: 'E' },
  {key: 65, char: 'A' },
  {key: 83, char: 'S' },
  {key: 68, char: 'D' },
];

let renderKeys = () => {

  let keys = codeKeys.map((v, i) => {
    return `
      <div data-key=${codeKeys[i].key} class="key">
        <kbd>${codeKeys[i].char}</kbd>
        <audio data-key=${codeKeys[i].key} src=${
          `sounds/${codeKeys[i].key}.wav`
        }></audio>
        <div class="lambda">&lambda;</div>
      </div>
    `;
  });

  render (`
    <div class="keys">
      ${keys}
    </div>
  `, document.querySelector('#main'));
}

renderKeys();

// ui

let removeTransition = (e) => {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

// playsound

let play = (e) => {
  let audio   = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  let key     = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return;

  key.classList.add('playing');

  audio.play();
  audio.currentTime = 0;
}

const keys = Array.from(document.querySelectorAll('.key'));

keys.forEach((key) => {
  key.addEventListener('transitionend', removeTransition)
});

window.addEventListener('keydown', play);

}
