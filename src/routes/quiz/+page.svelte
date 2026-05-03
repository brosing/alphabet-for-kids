<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import {
    ArrowLeftIcon,
    Volume2Icon,
    RefreshCwIcon,
    CheckCircleIcon,
  } from "svelte-feather-icons";
  import { enEmoji, idEmoji } from "$lib/data";

  type LangType = "en" | "id";
  let lang = $state<LangType>(
    (page.url.searchParams.get("lang") as LangType) || "id",
  );

  let targetWord = $state("");
  let targetEmoji = $state("");
  let shuffledLetters = $state<string[]>([]);
  let selectedLetters = $state<string[]>([]);
  let isCorrect = $state(false);
  let isWrong = $state(false);
  let showHint = $state(false);

  const wordsData = {
    en: enEmoji,
    id: idEmoji,
  };

  function initQuiz() {
    const allEntries = Object.values(wordsData[lang]).flat();
    const validEntries = allEntries.filter((entry) => entry.includes(" "));
    const randomEntry =
      validEntries[Math.floor(Math.random() * validEntries.length)];

    const parts = randomEntry.split(" ");
    targetEmoji = parts[0];
    targetWord = parts[1].toUpperCase();

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
  });

  function getSpeech(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "en" ? "en-US" : "id-ID";
    utterance.voice =
      speechSynthesis
        .getVoices()
        .find((voice) => voice.lang === (lang === "en" ? "en-US" : "id-ID")) ||
      null;
    return utterance;
  }

  function playSound() {
    const utterance = getSpeech(targetWord.toLowerCase());
    window.speechSynthesis.speak(utterance);
  }

  function selectLetter(letter: string, index: number) {
    if (isCorrect) return;
    isWrong = false;

    selectedLetters.push(letter);
    shuffledLetters.splice(index, 1);

    if (selectedLetters.join("") === targetWord) {
      isCorrect = true;
      playSound();
    } else if (selectedLetters.length === targetWord.length) {
      isWrong = true;
    }
  }

  function undoLetter(index: number) {
    if (isCorrect) return;
    const [letter] = selectedLetters.splice(index, 1);
    shuffledLetters.push(letter);
    isWrong = false;
  }

  function resetQuiz() {
    selectedLetters = [];
    shuffledLetters = targetWord.split("").sort(() => Math.random() - 0.5);
    isCorrect = false;
    isWrong = false;
  }

  function nextWord() {
    initQuiz();
  }
</script>

<div class="min-h-screen bg-blue-50 p-4 font-nunito">
  <div class="w-full max-w-xl mx-auto space-y-6">
    <header class="flex justify-between items-center">
      <a href="/" class="btn btn-ghost flex items-center gap-2">
        <ArrowLeftIcon size="20" />
        Back
      </a>
      <h1 class="text-2xl font-bold text-blue-600">Word Quiz</h1>
      <button class="btn btn-ghost" onclick={nextWord}>
        <RefreshCwIcon size="20" />
      </button>
    </header>

    <div class="card p-8 text-center bg-white shadow-xl rounded-3xl space-y-8">
      {#if isCorrect}
        <div class="space-y-4">
          <div class="space-y-4 animate-bounce">
            <div class="text-8xl">{targetEmoji}</div>
            <div
              class="text-4xl font-black text-green-500 uppercase tracking-widest"
            >
              {targetWord}
            </div>
            <div
              class="flex items-center justify-center gap-2 text-green-600 font-bold"
            >
              <CheckCircleIcon /> Great Job!
            </div>
          </div>
          <button
            class="btn btn-primary rounded-full px-8 py-4 text-xl mt-4"
            onclick={nextWord}
          >
            Next Word!
          </button>
        </div>
      {:else}
        <div class="space-y-8">
          <button
            class="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto shadow-lg hover:scale-105 active:scale-95 transition-all"
            onclick={playSound}
          >
            <Volume2Icon size="48" />
          </button>

          <div
            class="flex flex-wrap justify-center gap-2 min-h-[60px] {isWrong
              ? 'animate-shake'
              : ''}"
          >
            {#each Array(targetWord.length) as _, i}
              <button
                class="w-12 h-16 border-b-4 flex items-center justify-center text-3xl font-bold transition-all
                  {isWrong
                  ? 'border-red-500 text-red-500'
                  : 'border-blue-200 text-blue-600'}
                  {selectedLetters[i] ? 'cursor-pointer' : 'cursor-default'}"
                onclick={() => selectedLetters[i] && undoLetter(i)}
              >
                {selectedLetters[i] || ""}
              </button>
            {/each}
          </div>

          <div class="flex flex-wrap justify-center gap-3 mt-8">
            {#each shuffledLetters as letter, i}
              <button
                class="w-14 h-14 bg-white border-2 border-blue-400 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600 shadow-md hover:bg-blue-50 active:bg-blue-100 transition-all"
                onclick={() => selectLetter(letter, i)}
              >
                {letter}
              </button>
            {/each}
          </div>

          <button
            class="text-blue-400 font-medium text-sm hover:underline"
            onclick={resetQuiz}
          >
            Reset
          </button>
        </div>
      {/if}
    </div>

    {#if !isCorrect}
      <div class="text-center text-blue-400/60 font-medium">
        Listen to the sound and spell the word!
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    background-color: #f0f7ff;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }

  .animate-shake {
    animation: shake 0.2s ease-in-out 0s 2;
  }
</style>
