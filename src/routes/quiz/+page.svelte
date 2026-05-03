<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { fade, scale, fly } from "svelte/transition";
  import confetti from "canvas-confetti";
  import {
    ArrowLeftIcon,
    Volume2Icon,
    RefreshCwIcon,
    CheckCircleIcon,
  } from "svelte-feather-icons";
  import { enEmoji, idEmoji } from "$lib/data";
  import { playSoundEffect } from "$lib/audio";

  type LangType = "en" | "id";
  let lang = $state<LangType>(
    (page.url.searchParams.get("lang") as LangType) || "id",
  );

  let targetWord = $state("");
  let displayWord = $state("");
  let targetEmoji = $state("");
  let shuffledLetters = $state<string[]>([]);
  let selectedLetters = $state<string[]>([]);
  let isCorrect = $state(false);
  let isWrong = $state(false);
  let showHint = $state(false);
  let mounted = $state(false);
  let availableVoices = $state<SpeechSynthesisVoice[]>([]);

  const wordsData = {
    en: enEmoji,
    id: idEmoji,
  };

  function initQuiz() {
    const allEntries = Object.values(wordsData[lang]).flat();
    const validEntries = allEntries.filter((entry) => entry.includes(" "));
    const randomEntry =
      validEntries[Math.floor(Math.random() * validEntries.length)];

    const firstSpaceIndex = randomEntry.indexOf(" ");
    targetEmoji = randomEntry.slice(0, firstSpaceIndex);
    displayWord = randomEntry.slice(firstSpaceIndex + 1).toUpperCase();
    targetWord = displayWord.replace(/\s+/g, "");

    shuffledLetters = targetWord.split("").sort(() => Math.random() - 0.5);
    selectedLetters = [];
    isCorrect = false;
    isWrong = false;
    showHint = false;
  }

  onMount(() => {
    const stored = localStorage.getItem("language") as LangType;
    if (stored === "en" || stored === "id") {
      lang = stored;
    }
    initQuiz();

    const loadVoices = () => {
      availableVoices = window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    setTimeout(() => {
      mounted = true;
    }, 50);
  });

  function getSpeech(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedLang = lang === "en" ? "en-US" : "id-ID";
    utterance.lang = selectedLang;

    const voice =
      availableVoices.find((v) => v.lang.startsWith(selectedLang)) ||
      availableVoices.find((v) =>
        v.lang.startsWith(selectedLang.split("-")[0]),
      );
    if (voice) {
      utterance.voice = voice;
    }
    return utterance;
  }

  function playSound() {
    playSoundEffect("pop");
    const utterance = getSpeech(displayWord.toLowerCase());
    window.speechSynthesis.speak(utterance);
  }

  function selectLetter(letter: string, index: number) {
    if (isCorrect) return;
    isWrong = false;

    playSoundEffect("pop");
    selectedLetters.push(letter);
    shuffledLetters.splice(index, 1);

    if (selectedLetters.join("") === targetWord) {
      isCorrect = true;
      playSoundEffect("ding");
      fireConfetti();
      setTimeout(playSound, 500);
    } else if (selectedLetters.length === targetWord.length) {
      isWrong = true;
      playSoundEffect("boing");
    }
  }

  function undoLetter(index: number) {
    if (isCorrect) return;
    playSoundEffect("pop");
    const [letter] = selectedLetters.splice(index, 1);
    shuffledLetters.push(letter);
    isWrong = false;
  }

  function resetQuiz() {
    playSoundEffect("boing");
    selectedLetters = [];
    shuffledLetters = targetWord.split("").sort(() => Math.random() - 0.5);
    isCorrect = false;
    isWrong = false;
  }

  function nextWord() {
    playSoundEffect("pop");
    initQuiz();
  }

  function fireConfetti() {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#FB923C", "#FBBF24", "#38BDF8", "#4ADE80", "#FB7185"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#FB923C", "#FBBF24", "#38BDF8", "#4ADE80", "#FB7185"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
</script>

{#if mounted}
  <div class="min-h-screen relative z-1" in:fade={{ duration: 400 }}>
    <div
      class="w-full max-w-xl mx-auto pb-8"
      in:fly={{ y: 20, duration: 500, delay: 100 }}
    >
      <!-- Header -->
      <header class="p-4 flex justify-between items-center">
        <a href="/" class="btn btn-secondary flex items-center gap-2 text-sm">
          <ArrowLeftIcon size="16" />
          <span class="font-bold">{lang === "en" ? "Back" : "Kembali"}</span>
        </a>
        <h1 class="text-xl font-black text-kid-title flex items-center gap-2">
          <span>🎮</span> Word Quiz
        </h1>
        <button
          class="btn btn-secondary flex items-center justify-center w-10 h-10 !p-0"
          onclick={nextWord}
          title="Next word"
        >
          <RefreshCwIcon size="16" />
        </button>
      </header>

      <!-- Quiz Card -->
      <div class="mx-3">
        <div
          class="card p-8 text-center border-2 border-cream-200 relative overflow-hidden
          {mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}"
          style="transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);"
        >
          {#if isCorrect}
            <!-- Success State -->
            <div
              class="space-y-5"
              in:scale={{ duration: 500, start: 0.8, opacity: 0 }}
            >
              <div class="relative z-1 space-y-4">
                <div class="text-8xl animate-[jelly_0.5s_ease]">
                  {targetEmoji}
                </div>
                <div
                  class="text-4xl font-black text-leaf-500 uppercase tracking-widest"
                >
                  {displayWord}
                </div>
                <div
                  class="flex items-center justify-center gap-2 text-leaf-600 font-black text-lg"
                >
                  <CheckCircleIcon size="24" />
                  {lang === "en" ? "Great Job!" : "Hebat!"} 🎉
                </div>
              </div>

              <button
                class="btn bg-gradient-to-r from-leaf-400 to-leaf-500 text-white px-8 py-3.5 text-lg font-black shadow-lg hover:shadow-xl transition-all"
                onclick={nextWord}
              >
                {lang === "en" ? "Next Word!" : "Kata Berikutnya!"} →
              </button>
            </div>
          {:else}
            <!-- Quiz State -->
            <div class="space-y-7">
              <!-- Sound Button -->
              <button
                class="w-28 h-28 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 text-white flex items-center justify-center mx-auto shadow-kid-lg hover:shadow-kid-xl hover:scale-105 active:scale-95 transition-all"
                onclick={playSound}
              >
                <Volume2Icon size="44" />
              </button>

              <p class="text-sm font-bold text-primary-400">
                {lang === "en" ? "Tap to listen!" : "Ketuk untuk mendengar!"} 🔊
              </p>

              <!-- Letter Slots -->
              <div
                class="flex flex-wrap justify-center gap-2 min-h-[60px] {isWrong
                  ? 'animate-shake'
                  : ''}"
              >
                {#each Array(targetWord.length) as _, i}
                  <button
                    class="w-12 h-16 rounded-xl flex items-center justify-center text-3xl font-black transition-all
                    {isWrong
                      ? 'bg-berry-100 border-2 border-berry-400 text-berry-500'
                      : selectedLetters[i]
                        ? 'bg-primary-100 border-2 border-primary-300 text-primary-600'
                        : 'bg-cream-100 border-2 border-cream-300 text-cream-300'}
                    {selectedLetters[i]
                      ? 'cursor-pointer hover:scale-105 active:scale-95'
                      : 'cursor-default'}"
                    onclick={() => selectedLetters[i] && undoLetter(i)}
                  >
                    {selectedLetters[i] || ""}
                  </button>
                {/each}
              </div>

              <!-- Scrambled Letters -->
              <div class="flex flex-wrap justify-center gap-3">
                {#each shuffledLetters as letter, i}
                  <button
                    class="w-14 h-14 bg-white border-2 border-primary-200 rounded-[var(--radius-kid)] flex items-center justify-center text-2xl font-black text-primary-600 shadow-kid hover:shadow-kid-lg hover:border-primary-400 hover:bg-primary-50 active:scale-90 transition-all"
                    onclick={() => selectLetter(letter, i)}
                  >
                    {letter}
                  </button>
                {/each}
              </div>

              <!-- Reset -->
              <button class="btn btn-ghost text-sm" onclick={resetQuiz}>
                ↩️ {lang === "en" ? "Reset" : "Ulangi"}
              </button>
            </div>
          {/if}
        </div>
      </div>

      <!-- Hint text -->
      {#if !isCorrect}
        <div
          class="text-center mt-4 text-primary-300 font-bold text-sm
          {mounted ? 'opacity-100' : 'opacity-0'}"
          style="transition: opacity 0.5s ease 0.3s;"
        >
          {lang === "en"
            ? "🎶 Listen to the sound and spell the word!"
            : "🎶 Dengarkan suara dan eja kata-nya!"}
        </div>
      {/if}
    </div>
  </div>
{/if}
