import { k as ensure_array_like, j as escape_html, e as pop, l as fallback, m as attr, n as attr_class, o as bind_props, p as push, q as stringify } from './index-f1623389.js';
import { p as page } from './index2-4e08a838.js';
import './exports-eeea347f.js';

function ArrowDownIcon($$payload, $$props) {
  push();
  let size = fallback($$props["size"], "24");
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let customClass = fallback($$props["class"], "");
  if (size !== "100%") {
    size = size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px";
  }
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg"${attr("width", size)}${attr("height", size)} fill="none" viewBox="0 0 24 24" stroke="currentColor"${attr("stroke-width", strokeWidth)} stroke-linecap="round" stroke-linejoin="round"${attr_class(`feather feather-arrow-down ${stringify(customClass)}`)}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`;
  bind_props($$props, { size, strokeWidth, class: customClass });
  pop();
}
function ArrowLeftIcon($$payload, $$props) {
  push();
  let size = fallback($$props["size"], "24");
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let customClass = fallback($$props["class"], "");
  if (size !== "100%") {
    size = size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px";
  }
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg"${attr("width", size)}${attr("height", size)} fill="none" viewBox="0 0 24 24" stroke="currentColor"${attr("stroke-width", strokeWidth)} stroke-linecap="round" stroke-linejoin="round"${attr_class(`feather feather-arrow-left ${stringify(customClass)}`)}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`;
  bind_props($$props, { size, strokeWidth, class: customClass });
  pop();
}
function Volume2Icon($$payload, $$props) {
  push();
  let size = fallback($$props["size"], "24");
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let customClass = fallback($$props["class"], "");
  if (size !== "100%") {
    size = size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px";
  }
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg"${attr("width", size)}${attr("height", size)} fill="none" viewBox="0 0 24 24" stroke="currentColor"${attr("stroke-width", strokeWidth)} stroke-linecap="round" stroke-linejoin="round"${attr_class(`feather feather-volume-2 ${stringify(customClass)}`)}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
  bind_props($$props, { size, strokeWidth, class: customClass });
  pop();
}
function _page($$payload, $$props) {
  push();
  const lang = page.url.searchParams.get("lang");
  const letter = page.params.letter.toUpperCase();
  const words = {
    en: {
      A: ["🍎 Apple", "✈️ Airplane", "🐜 Ant"],
      B: ["🍌 Banana", "🐻 Bear", "🎈 Balloon"],
      C: ["🐱 Cat", "🍪 Cookie", "🤡 Clown"],
      D: ["🐕 Dog", "🦌 Deer", "🎲 Dice"],
      E: ["🥚 Egg", "🐘 Elephant", "👁️ Eye"],
      F: ["🐟 Fish", "🦊 Fox", "🔥 Fire"],
      G: ["🦒 Giraffe", "🍇 Grapes", "🎸 Guitar"],
      H: ["🏠 House", "🐎 Horse", "🎩 Hat"],
      I: ["🍦 Ice Cream", "🦎 Iguana", "🏝️ Island"],
      J: ["🤹 Juggler", "🎸 Jazz", "🦘 Kangaroo"],
      K: ["🪁 Kite", "🔑 Key", "👑 King"],
      L: ["🦁 Lion", "🍃 Leaf", "💡 Light"],
      M: ["🌙 Moon", "🐒 Monkey", "🎵 Music"],
      N: ["👃 Nose", "📰 Newspaper", "🌙 Night"],
      O: ["🐙 Octopus", "🍊 Orange", "🦉 Owl"],
      P: ["🐼 Panda", "🖊️ Pen", "🍕 Pizza"],
      Q: ["👸 Queen", "🪆 Quilt", "❓ Question"],
      R: ["🌹 Rose", "🎀 Ribbon", "🚀 Rocket"],
      S: ["🌞 Sun", "⭐ Star", "🐍 Snake"],
      T: ["🐯 Tiger", "🌳 Tree", "🚂 Train"],
      U: ["☂️ Umbrella", "🦄 Unicorn", "👆 Up"],
      V: ["🎻 Violin", "🌋 Volcano", "🚐 Van"],
      W: ["🐺 Wolf", "💧 Water", "🌊 Wave"],
      X: ["📦 Box", "🎸 Xylophone", "❌ X-mark"],
      Y: ["🟡 Yellow", "🧒 Youth", "☯️ Yin-yang"],
      Z: ["🦓 Zebra", "🤐 Zipper", "⚡ Zigzag"]
    },
    id: {
      A: ["🍎 Apel", "🐜 Angsa", "🚑 Ambulans"],
      B: ["🍌 Bebek", "🐻 Beruang", "🎈 Balon"],
      C: ["🐱 Cicak", "🍪 Coklat", "🥥 Cabai"],
      D: ["🦌 Domba", "🎲 Dadu", "🍇 Durian"],
      E: ["🐘 Elang", "🥚 Entok", "🦐 Udang"],
      F: ["🦊 Flamingo", "🐟 Ikan", "🍟 Kentang"],
      G: ["🦒 Gajah", "🦍 Gorila", "🎸 Gitar"],
      H: ["🦛 Harimau", "🐎 Hamster", "🦅 Helang"],
      I: ["🐟 Ikan", "🦎 Iguana", "🍦 Es"],
      J: ["🦒 Jerapah", "🕷️ Jangkrik", "🍊 Jeruk"],
      K: ["🐊 Katak", "🦘 Kanguru", "🐈 Kucing"],
      L: ["🦁 Lebah", "🦎 Laba-laba", "🦗 Lalat"],
      M: ["🐒 Monyet", "🐜 Macan", "🐁 Marmut"],
      N: ["🐄 Naga", "🦅 Nuri", "🐝 Nyamuk"],
      O: ["🦉 Orangutan", "🐑 Orang Utan", "🦦 Otter"],
      P: ["🦜 Pinguin", "🐼 Panda", "🦚 Puyuh"],
      Q: ["🐜 Qilin"],
      R: ["🦏 Rusa", "🐟 Rajungan", "🦊 Rubah"],
      S: ["🐍 Singa", "🦈 Sapi", "🐿️ Semut"],
      T: ["🐯 Tikus", "🦃 Tupai", "🐅 Trenggiling"],
      U: ["🦅 Ulat", "🐍 Ular", "🦉 Unggas"],
      V: ["🦊 Vampir"],
      W: ["🐊 Walet", "🦅 Wau-wau"],
      X: [
        "❌ Tidak ada kata dalam bahasa Indonesia yang dimulai dengan X"
      ],
      Y: ["🦓 Yak"],
      Z: ["🦓 Zebra"]
    }
  };
  const each_array = ensure_array_like(words[lang][letter]);
  $$payload.out += `<div class="min-h-screen"><div class="w-full max-w-xl mx-auto space-y-4 p-4"><a href="/" class="btn btn-ghost flex items-center gap-2 -ml-4">`;
  ArrowLeftIcon($$payload, { size: "20" });
  $$payload.out += `<!----> Home</a> <div class="card p-8 text-center"><div class="text-8xl font-bold text-blue-600 mb-6">${escape_html(letter)}</div> <div class="flex items-center justify-center gap-4 mb-4"><button class="btn btn-secondary rounded-full">`;
  {
    $$payload.out += "<!--[-->";
    ArrowDownIcon($$payload, { class: "h-4 w-4 my-1" });
  }
  $$payload.out += `<!--]--></button> <button class="btn btn-primary flex items-center gap-2 rounded-full">`;
  Volume2Icon($$payload, { size: "20" });
  $$payload.out += `<!----> Play Sound</button></div></div> <div class="card p-8"><h2 class="text-2xl font-bold text-blue-600 mb-4">Words starting with ${escape_html(letter)}</h2> <div class="grid gap-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let word = each_array[$$index];
    $$payload.out += `<div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg"><span class="text-xl">${escape_html(word)}</span> <button class="btn btn-primary rounded-full">`;
    Volume2Icon($$payload, { size: "20" });
    $$payload.out += `<!----></button></div>`;
  }
  $$payload.out += `<!--]--></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-317e5535.js.map
