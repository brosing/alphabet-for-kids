<script lang="ts">
  import { onMount } from "svelte";
  import { fade, scale, fly } from "svelte/transition";
  import { cubicOut, backOut } from "svelte/easing";
  import confetti from "canvas-confetti";
  import {
    ArrowLeftIcon,
    Volume2Icon,
    RefreshCwIcon,
    CheckCircleIcon,
  } from "svelte-feather-icons";
  import { enEmoji, idEmoji } from "$lib/data";
  import { playSoundEffect } from "$lib/audio";
  import { languageStore } from "$lib/stores/language.svelte";

  const lang = $derived(languageStore.current);

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
  // Round system
  let questionsAnswered = $state(0);
  let correctAnswers = $state(0);
  let totalQuestions = 10;
  let isRoundComplete = $state(false);
  let showRoundSummary = $state(false);
  let quizHistory = $state<boolean[]>([]);

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

  function startNewRound() {
    questionsAnswered = 0;
    correctAnswers = 0;
    isRoundComplete = false;
    showRoundSummary = false;
    quizHistory = [];
    initQuiz();
  }

  function getScoreMessage() {
    const percentage = (correctAnswers / totalQuestions) * 100;
    if (percentage === 100) {
      return lang === "en"
        ? "Perfect! You're a star! 🌟"
        : "Sempurna! Kamu bintang! 🌟";
    } else if (percentage >= 80) {
      return lang === "en" ? "Amazing work! 🎉" : "Kerja luar biasa! 🎉";
    } else if (percentage >= 60) {
      return lang === "en"
        ? "Great job! Keep practicing! 👍"
        : "Hebat! Terus latihan! 👍";
    } else {
      return lang === "en"
        ? "Good try! You'll do better next time! 💪"
        : "Coba yang baik! Kamu lebih baik next time! 💪";
    }
  }

  onMount(() => {
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
    if (isCorrect || isWrong) return;
    isWrong = false;

    playSoundEffect("pop");
    selectedLetters.push(letter);
    shuffledLetters.splice(index, 1);

    if (selectedLetters.join("") === targetWord) {
      isCorrect = true;
      playSoundEffect("ding");
      setTimeout(playSound, 500);
    } else if (selectedLetters.length === targetWord.length) {
      isWrong = true;
      playSoundEffect("boing");
    }
  }

  function undoLetter(index: number) {
    if (isCorrect || isWrong) return;
    playSoundEffect("pop");
    const [letter] = selectedLetters.splice(index, 1);
    shuffledLetters.push(letter);
    isWrong = false;
  }

  function resetQuiz() {
    if (isCorrect || isWrong) return;
    playSoundEffect("boing");
    selectedLetters = [];
    shuffledLetters = targetWord.split("").sort(() => Math.random() - 0.5);
    isCorrect = false;
    isWrong = false;
  }

  function nextWord() {
    playSoundEffect("pop");

    // Record answer
    if (isCorrect) {
      correctAnswers++;
    }
    questionsAnswered++;
    quizHistory.push(isCorrect);

    // Check if round is complete
    if (questionsAnswered >= totalQuestions) {
      isRoundComplete = true;
      showRoundSummary = true;
      celebrate();
    } else {
      initQuiz();
    }
  }

  function celebrate() {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#FBBF24", "#FB923C", "#38BDF8", "#4ADE80", "#FB7185"],
      });
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#FBBF24", "#FB923C", "#38BDF8", "#4ADE80", "#FB7185"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
</script>

{#if mounted}
  <div class="min-h-screen relative z-1" in:fade={{ duration: 400, easing: cubicOut }}>
    <div
      class="w-full max-w-xl mx-auto pb-8"
      in:fly={{ y: 20, duration: 500, delay: 100, easing: cubicOut }}
    >
      <!-- Header with Score Progress -->
      <header class="p-4">
        <div class="flex justify-between items-center mb-3">
          <a href="/" class="btn btn-secondary flex items-center gap-2 text-sm">
            <ArrowLeftIcon size="16" />
            <span class="font-bold">{lang === "en" ? "Back" : "Kembali"}</span>
          </a>
          <h1 class="text-xl font-black text-kid-title flex items-center gap-2">
            <span>🎮</span> Word Quiz
          </h1>
          <button
            class="btn btn-secondary flex items-center justify-center p-0"
            onclick={nextWord}
            title="Next word"
          >
            <RefreshCwIcon size="16" />
          </button>
        </div>

        <!-- Score Progress Bar -->
        <div class="w-full bg-cream-100 rounded-full h-3 overflow-hidden">
          <div
            class="h-full bg-linear-to-r from-primary-400 to-primary-500 transition-all duration-500 ease-out"
            style="width: {(questionsAnswered / totalQuestions) * 100}%"
          ></div>
        </div>
        <div class="text-center mt-1 text-sm font-bold text-primary-600">
          {lang === "en" ? "Question" : "Soal"} {questionsAnswered} / {totalQuestions}
        </div>
      </header>

      <!-- Quiz Card -->
      <div class="mx-3">
        {#if showRoundSummary}
          <!-- Round Summary Screen -->
          <div
            class="card p-8 text-center border-2 border-cream-200 relative overflow-hidden"
            in:scale={{ duration: 600, start: 0.8, opacity: 0, easing: backOut }}
          >
            <div class="space-y-6 pt-4">
              <!-- Trophy Animation -->
              <div class="text-8xl animate-bounce">
                {correctAnswers >= 8
                  ? "🏆"
                  : correctAnswers >= 6
                    ? "🥈"
                    : correctAnswers >= 4
                      ? "🥉"
                      : "🌟"}
              </div>

              <!-- Score Display -->
              <div class="space-y-2">
                <h2 class="text-xl font-black text-kid-title">
                  {correctAnswers} / {totalQuestions}
                </h2>
                <p class="text-lg font-bold text-primary-600">
                  {getScoreMessage()}
                </p>
              </div>

              <!-- Progress Circles -->
              <div class="flex justify-center gap-2 flex-wrap">
                {#each quizHistory as correct, i}
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all"
                    style="
                      background: {correct ? '#10B981' : '#EF4444'};
                      color: white;
                      animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) {i * 0.08}s both;
                    "
                  >
                    {correct ? "✓" : "✗"}
                  </div>
                {/each}
              </div>

              <!-- Action Buttons -->
              <div class="space-y-3 flex flex-col">
                <button
                  class="btn bg-linear-to-r from-primary-400 to-primary-500 text-white px-8 py-3.5 text-lg font-black shadow-lg hover:shadow-xl transition-all"
                  onclick={startNewRound}
                >
                  {lang === "en" ? "Play Again! 🎮" : "Main Lagi! 🎮"}
                </button>
                <a href="/" class="btn btn-secondary w-full">
                  {lang === "en" ? "Back to Home 🏠" : "Kembali ke Rumah 🏠"}
                </a>
              </div>
            </div>
          </div>
        {:else}
          <!-- Regular Quiz Card -->
          <div
            class="card text-center border-2 border-cream-200 overflow-hidden relative"
            in:scale={{ duration: 500, start: 0.95, opacity: 0, easing: backOut }}
          >
            {#if isCorrect}
              <!-- Success State -->
              <div
                class="space-y-5"
                in:scale={{ duration: 500, start: 0.8, opacity: 0, easing: backOut }}
              >
                <!-- Confetti decorations -->
                <div
                  class="absolute inset-0 pointer-events-none overflow-hidden"
                >
                  {#each Array(8) as _, i}
                    <div
                      class="absolute text-2xl"
                      style="
                        left: {10 + i * 12}%;
                        top: {-10 + (i % 3) * 5}%;
                        animation: confetti-fall {1.2 + (i % 3) * 0.15}s ease-in {i * 0.08}s forwards;
                        will-change: transform, opacity;
                        --rot-dir: {i % 2 === 0 ? 1 : -1};
                      "
                    >
                      {["🎉", "⭐", "🌟", "🎊", "💫", "✨", "🎈", "🎀"][i]}
                    </div>
                  {/each}
                </div>

                <div class="relative z-1 space-y-4 p-8">
                  <div class="text-8xl animate-jelly">{targetEmoji}</div>
                  <div
                    class="text-xl font-black text-leaf-500 uppercase tracking-widest"
                  >
                    {targetWord}
                  </div>
                  <div
                    class="flex items-center justify-center gap-2 text-leaf-600 font-black text-lg"
                  >
                    <CheckCircleIcon size="24" />
                    {lang === "en" ? "Great Job!" : "Hebat!"} 🎉
                  </div>
                </div>

                <button
                  class="btn bg-linear-to-r from-leaf-400 to-leaf-500 text-white px-8 py-3.5 text-lg font-black shadow-lg hover:shadow-xl transition-all mb-8 mx-8"
                  onclick={nextWord}
                >
                  {questionsAnswered < totalQuestions - 1
                    ? (lang === "en" ? "Next Word!" : "Kata Berikutnya!") + " →"
                    : (lang === "en" ? "See Results!" : "Lihat Hasil!") + " 🏆"}
                </button>
              </div>
            {:else if isWrong}
              <!-- Wrong Answer Reveal State -->
              <div
                class="space-y-5 p-8 "
                in:scale={{ duration: 500, start: 0.8, opacity: 0, easing: backOut }}
              >
                <div class="relative z-1 space-y-4">
                  <div class="text-8xl animate-shake">
                    {targetEmoji}
                  </div>
                  <div
                    class="text-xl font-black text-berry-500 uppercase tracking-widest"
                  >
                    {displayWord}
                  </div>
                  <div
                    class="flex items-center justify-center gap-2 text-berry-600 font-black text-lg"
                  >
                    {lang === "en" ? "Oops! The answer is" : "Ups! Jawabannya"}
                    {displayWord}
                  </div>
                </div>

                <button
                  class="btn bg-linear-to-r from-berry-400 to-berry-500 text-white px-8 py-3.5 text-lg font-black shadow-lg hover:shadow-xl transition-all"
                  onclick={nextWord}
                >
                  {questionsAnswered < totalQuestions - 1
                    ? (lang === "en" ? "Next Word!" : "Kata Berikutnya!") + " →"
                    : (lang === "en" ? "See Results!" : "Lihat Hasil!") + " 🏆"}
                </button>
              </div>
            {:else}
              <!-- Quiz State -->
              <div
                class="space-y-7 p-8"
                in:scale={{ duration: 300, start: 0.98, opacity: 0, easing: backOut }}
              >
                <!-- Sound Button -->
                <button
                  class="w-28 h-28 rounded-full bg-linear-to-br from-primary-400 to-primary-500 text-white flex items-center justify-center mx-auto shadow-kid-lg hover:shadow-kid-xl hover:scale-105 active:scale-95 transition-all"
                  onclick={playSound}
                >
                  <Volume2Icon size="44" />
                </button>

                <p class="text-sm font-bold text-primary-400">
                  {lang === "en" ? "Tap to listen!" : "Ketuk untuk mendengar!"} 🔊
                </p>

                <!-- Letter Slots -->
                <div
                  class="flex flex-wrap justify-center gap-2 min-h-15"
                >
                  {#each Array(targetWord.length) as _, i}
                    <button
                      class="w-12 h-16 rounded-xl flex items-center justify-center text-xl font-black transition-all
                      {selectedLetters[i]
                          ? 'bg-primary-100 border-2 border-primary-300 text-primary-600'
                          : 'bg-cream-100 border-2 border-cream-300 text-cream-300'}
                      {selectedLetters[i]
                        ? 'cursor-pointer hover:scale-105 active:scale-95'
                        : 'cursor-default'}"
                      onclick={() => selectedLetters[i] && undoLetter(i)}
                    >
                      {#key selectedLetters[i]}
                        <span
                          class="block"
                          in:scale={{ duration: 250, easing: backOut, delay: 50 }}
                        >
                          {selectedLetters[i] || ""}
                        </span>
                      {/key}
                    </button>
                  {/each}
                </div>

                <!-- Scrambled Letters -->
                <div class="flex flex-wrap justify-center gap-3">
                  {#each shuffledLetters as letter, i}
                    <button
                      class="w-14 h-14 bg-white border-2 border-primary-200 rounded-kid flex items-center justify-center text-2xl font-black text-primary-600 shadow-kid hover:shadow-kid-lg hover:border-primary-400 hover:bg-primary-50 active:scale-90 transition-all"
                      in:scale={{ duration: 300, delay: i * 40, easing: backOut }}
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
        {/if}
      </div>

      <!-- Hint text -->
      {#if !isCorrect && !isWrong}
        <div
          class="text-center mt-4 text-primary-300 font-bold text-sm"
          in:fade={{ duration: 400, delay: 300, easing: cubicOut }}
        >
          {lang === "en"
            ? "🎶 Listen to the sound and spell the word!"
            : "🎶 Dengarkan suara dan eja kata-nya!"}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  @keyframes drift {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(20px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes popIn {
    0% {
      transform: scale(0) rotate(-180deg);
      opacity: 0;
    }
    60% {
      transform: scale(1.15) rotate(8deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes jelly {
    0%,
    100% {
      transform: scale(1) rotate(0deg);
    }
    25% {
      transform: scale(1.1) rotate(-5deg);
    }
    75% {
      transform: scale(0.9) rotate(5deg);
    }
  }

  .animate-jelly {
    animation: jelly 0.5s ease;
  }

  @keyframes confetti-fall {
    0% { transform: translateY(-10px) translateX(0) rotate(0deg); opacity: 1; }
    25% { transform: translateY(50px) translateX(12px) rotate(calc(90deg * var(--rot-dir, 1))); opacity: 1; }
    50% { transform: translateY(120px) translateX(-8px) rotate(calc(180deg * var(--rot-dir, 1))); opacity: 1; }
    75% { transform: translateY(180px) translateX(6px) rotate(calc(270deg * var(--rot-dir, 1))); opacity: 0.8; }
    100% { transform: translateY(240px) translateX(0) rotate(calc(360deg * var(--rot-dir, 1))); opacity: 0; }
  }
</style>
