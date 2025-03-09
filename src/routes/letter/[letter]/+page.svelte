<script lang="ts">
  import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, Volume2Icon } from 'svelte-feather-icons';
  import { page } from '$app/state';

  type LangType = 'en' | 'id'
  const lang = page.url.searchParams.get('lang') as LangType;
  const letter = page.params.letter.toUpperCase();
  let isUpperCase = true;
  const words: Record<LangType, { [key: string]: string[]}> = {
    en: {
      A: ['🍎 Apple', '✈️ Airplane', '🐜 Ant'],
      B: ['🍌 Banana', '🐻 Bear', '🎈 Balloon'],
      C: ['🐱 Cat', '🍪 Cookie', '🤡 Clown'],
      D: ['🐕 Dog', '🦌 Deer', '🎲 Dice'],
      E: ['🥚 Egg', '🐘 Elephant', '👁️ Eye'],
      F: ['🐟 Fish', '🦊 Fox', '🔥 Fire'],
      G: ['🦒 Giraffe', '🍇 Grapes', '🎸 Guitar'],
      H: ['🏠 House', '🐎 Horse', '🎩 Hat'],
      I: ['🍦 Ice Cream', '🦎 Iguana', '🏝️ Island'],
      J: ['🤹 Juggler', '🎸 Jazz', '🦘 Kangaroo'],
      K: ['🪁 Kite', '🔑 Key', '👑 King'],
      L: ['🦁 Lion', '🍃 Leaf', '💡 Light'],
      M: ['🌙 Moon', '🐒 Monkey', '🎵 Music'],
      N: ['👃 Nose', '📰 Newspaper', '🌙 Night'],
      O: ['🐙 Octopus', '🍊 Orange', '🦉 Owl'],
      P: ['🐼 Panda', '🖊️ Pen', '🍕 Pizza'],
      Q: ['👸 Queen', '🪆 Quilt', '❓ Question'],
      R: ['🌹 Rose', '🎀 Ribbon', '🚀 Rocket'],
      S: ['🌞 Sun', '⭐ Star', '🐍 Snake'],
      T: ['🐯 Tiger', '🌳 Tree', '🚂 Train'],
      U: ['☂️ Umbrella', '🦄 Unicorn', '👆 Up'],
      V: ['🎻 Violin', '🌋 Volcano', '🚐 Van'],
      W: ['🐺 Wolf', '💧 Water', '🌊 Wave'],
      X: ['📦 Box', '🎸 Xylophone', '❌ X-mark'],
      Y: ['🟡 Yellow', '🧒 Youth', '☯️ Yin-yang'],
      Z: ['🦓 Zebra', '🤐 Zipper', '⚡ Zigzag']
    },
    id: {
      A: ['🍎 Apel', '🐜 Angsa', '🚑 Ambulans'],
      B: ['🍌 Bebek', '🐻 Beruang', '🎈 Balon'],
      C: ['🐱 Cicak', '🍪 Coklat', '🥥 Cabai'],
      D: ['🦌 Domba', '🎲 Dadu', '🍇 Durian'],
      E: ['🐘 Elang', '🥚 Entok', '🦐 Udang'],
      F: ['🦊 Flamingo', '🐟 Ikan', '🍟 Kentang'],
      G: ['🦒 Gajah', '🦍 Gorila', '🎸 Gitar'],
      H: ['🦛 Harimau', '🐎 Hamster', '🦅 Helang'],
      I: ['🐟 Ikan', '🦎 Iguana', '🍦 Es'],
      J: ['🦒 Jerapah', '🕷️ Jangkrik', '🍊 Jeruk'],
      K: ['🐊 Katak', '🦘 Kanguru', '🐈 Kucing'],
      L: ['🦁 Lebah', '🦎 Laba-laba', '🦗 Lalat'],
      M: ['🐒 Monyet', '🐜 Macan', '🐁 Marmut'],
      N: ['🐄 Naga', '🦅 Nuri', '🐝 Nyamuk'],
      O: ['🦉 Orangutan', '🐑 Orang Utan', '🦦 Otter'],
      P: ['🦜 Pinguin', '🐼 Panda', '🦚 Puyuh'],
      Q: ['🐜 Qilin'],
      R: ['🦏 Rusa', '🐟 Rajungan', '🦊 Rubah'],
      S: ['🐍 Singa', '🦈 Sapi', '🐿️ Semut'],
      T: ['🐯 Tikus', '🦃 Tupai', '🐅 Trenggiling'],
      U: ['🦅 Ulat', '🐍 Ular', '🦉 Unggas'],
      V: ['🦊 Vampir'],
      W: ['🐊 Walet', '🦅 Wau-wau'],
      X: ['❌ Tidak ada kata dalam bahasa Indonesia yang dimulai dengan X'],
      Y: ['🦓 Yak'],
      Z: ['🦓 Zebra']
    }
  };

  function playLetterSound() {
    const utterance = new SpeechSynthesisUtterance(letter.toLowerCase());
    utterance.lang = lang === 'en' ? 'en-US' : 'id-ID';
    window.speechSynthesis.speak(utterance);
  }

  function playWordSound(word: string) {
    const utterance = new SpeechSynthesisUtterance(word.split(' ')[1]);
    utterance.lang = lang === 'en' ? 'en-US' : 'id-ID';
    window.speechSynthesis.speak(utterance);
  }

  function toggleCase() {
    isUpperCase = !isUpperCase;
  }
</script>

<div class="min-h-screen">
  <div class="w-full max-w-xl mx-auto space-y-4 p-4">
    <a href="/" class="btn btn-ghost flex items-center gap-2 -ml-4">
      <ArrowLeftIcon size="20" />
      Home
    </a>
    <div class="card p-8 text-center">
      <div class="text-8xl font-bold text-blue-600 mb-6">{isUpperCase ? letter : letter.toLowerCase()}</div>
      <div class="flex items-center justify-center gap-4 mb-4">
        <button class="btn btn-secondary rounded-full" onclick={toggleCase}>
          {#if isUpperCase}
            <ArrowDownIcon class="h-4 w-4 my-1" />
          {:else}
            <ArrowUpIcon class="h-4 w-4 my-1" />
          {/if}
        </button>
        <button class="btn btn-primary flex items-center gap-2 rounded-full" onclick={playLetterSound}>
          <Volume2Icon size="20" />
          Play Sound
        </button>
      </div>
    </div>

    <div class="card p-8">
      <h2 class="text-2xl font-bold text-blue-600 mb-4">Words starting with {letter}</h2>
      <div class="grid gap-4">
        {#each words[lang][letter] as word}
          <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <span class="text-xl">{word}</span>
            <button class="btn btn-primary rounded-full" onclick={() => playWordSound(word)}>
              <Volume2Icon size="20" />
            </button>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>