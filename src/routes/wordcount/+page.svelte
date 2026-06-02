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

  // Game state
  let targetWord = $state("");
  let displayWord = $state("");
  let targetEmoji = $state("");
  let targetLetter = $state<string>("");
  let letterCount = $state<number>(0);
  let selectedCount = $state<number | null>(null);
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

  // Generate random word from the data
  function getRandomWord() {
    const allEntries = Object.values(wordsData[lang]).flat();
    const validEntries = allEntries.filter((entry) => entry.includes(" "));
    const randomEntry = validEntries[Math.floor(Math.random() * validEntries.length)];

    const firstSpaceIndex = randomEntry.indexOf(" ");
    targetEmoji = randomEntry.slice(0, firstSpaceIndex);
    displayWord = randomEntry.slice(firstSpaceIndex + 1).toUpperCase();
    targetWord = displayWord.replace(/[^A-Z]/g, "");
    
    // Pick a random letter from the word
    const letters = targetWord.split("");
    targetLetter = letters[Math.floor(Math.random() * letters.length)];
    letterCount = letters.filter(l => l === targetLetter).length;

    return targetWord;
  }

  function initQuiz() {
    getRandomWord();
    selectedCount = null;
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

  function checkAnswer(count: number) {
    if (isCorrect || isWrong) return;
    isWrong = false;
    selectedCount = count;

    if (count === letterCount) {
      isCorrect = true;
      playSoundEffect("ding");
      setTimeout(playSound, 500);
    } else {
      isWrong = true;
      playSoundEffect("boing");
    }
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
            <span>🔢</span> Word Count
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
                <h2 class="text-3xl font-black text-kid-title">
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
                    class="text-4xl font-black text-leaf-500 uppercase tracking-widest"
                  >
                    {displayWord}
                  </div>
                  <div
                    class="text-2xl font-black text-leaf-600"
                  >
                    <span class="text-leaf-500">{targetLetter}</span>
                    {lang === "en" ? " = " : " = "}
                    {letterCount} {lang === "en" ? "letters" : "huruf"}!
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
                    class="text-4xl font-black text-berry-500 uppercase tracking-widest"
                  >
                    {displayWord}
                  </div>
                  <div
                    class="text-2xl font-black text-berry-600"
                  >
                    <span class="text-berry-500">{targetLetter}</span>
                    {lang === "en" ? " = " : " = "}
                    {letterCount} {lang === "en" ? "letters" : "huruf"}
                  </div>
                  <div
                    class="flex items-center justify-center gap-2 text-berry-600 font-black text-lg"
                  >
                    {lang === "en" ? "Oops! The correct count is" : "Ups! Jumlah yang benar adalah"}
                    {letterCount} {lang === "en" ? "letters" : "huruf"}
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

                <!-- Word Display -->
                <div
                  class="text-5xl font-black text-kid-title uppercase tracking-widest my-4"
                >
                  {displayWord}
                </div>

                <div
                  class="text-3xl font-black text-sky-600 mb-4"
                >
                  {lang === "en" ? "How many " : "Berapa banyak "}
                  <span class="bg-sky-100 px-3 py-1 rounded-lg">{targetLetter}</span>
                  {lang === "en" ? " letters?" : " huruf?"}
                </div>

                <!-- Number Selection Buttons -->
                <div class="grid grid-cols-5 gap-3">
                  {#each [1, 2, 3, 4, 5] as num}
                    <button
                      class="aspect-square rounded-xl flex items-center justify-center text-3xl font-black transition-all
                      {selectedCount === num && isWrong
                        ? 'bg-berry-100 border-2 border-berry-400 text-berry-500'
                        : selectedCount === num
                          ? 'bg-leaf-500 border-2 border-leaf-600 text-white shadow-lg'
                          : 'bg-white border-2 border-primary-200 text-primary-600 shadow-kid hover:shadow-kid-lg hover:border-primary-400 hover:bg-primary-50 active:scale-90'}"
                      onclick={() => checkAnswer(num)}
                      in:scale={{ duration: 300, delay: num * 50, easing: backOut }}
                    >
                      {num}
                    </button>
                  {/each}
                </div>

                <!-- Reset -->
                {#if !isWrong && !isCorrect}
                  <button class="btn btn-ghost text-sm" onclick={() => initQuiz()}>
                    ↩️ {lang === "en" ? "New Word" : "Kata Baru"}
                  </button>
                {/if}
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
            ? `👆 Tap the number button that shows how many ${targetLetter}s are in the word!`
            : `👆 Ketuk tombol angka yang menunjukkan berapa banyak ${targetLetter} di kata ini!`}
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
