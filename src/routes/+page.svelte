<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { playSoundEffect } from "$lib/audio";

  const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  // Color palette for rainbow grid
  const colorPalette = [
    {
      bg: "#FFF7ED",
      text: "#EA580C",
      border: "#FED7AA",
      hoverShadow: "0 6px 20px rgba(249,115,22,0.25)",
    }, // Orange
    {
      bg: "#FFFBEB",
      text: "#D97706",
      border: "#FDE68A",
      hoverShadow: "0 6px 20px rgba(245,158,11,0.25)",
    }, // Yellow
    {
      bg: "#F0F9FF",
      text: "#0284C7",
      border: "#BAE6FD",
      hoverShadow: "0 6px 20px rgba(14,165,233,0.25)",
    }, // Blue
    {
      bg: "#F0FDF4",
      text: "#16A34A",
      border: "#BBF7D0",
      hoverShadow: "0 6px 20px rgba(34,197,94,0.25)",
    }, // Green
    {
      bg: "#FFF1F2",
      text: "#E11D48",
      border: "#FECDD3",
      hoverShadow: "0 6px 20px rgba(244,63,94,0.25)",
    }, // Rose
  ];

  function getColor(index: number) {
    return colorPalette[index % colorPalette.length];
  }

  let language = $state<"en" | "id">("id");
  let mounted = $state(false);

  onMount(() => {
    const stored = localStorage.getItem("language");
    if (stored === "en" || stored === "id") {
      language = stored;
    }
    setTimeout(() => {
      mounted = true;
    }, 50);
  });

  $effect(() => {
    localStorage.setItem("language", language);
  });

  function toggleLanguage() {
    playSoundEffect('pop');
    language = language === "en" ? "id" : "en";
  }

  function goToLetterDetail(letter: string) {
    playSoundEffect('pop');
    window.location.href = `/letter/${letter.toLowerCase()}?lang=${language}`;
  }
</script>

{#if mounted}
<div class="min-h-screen relative z-1" in:fade={{duration: 400}}>
  <!-- Animated Background Elements -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10 opacity-40">
    {#each Array(10) as _, i}
      <div 
        class="absolute text-5xl opacity-50"
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          animation: float {5 + Math.random() * 5}s ease-in-out infinite {Math.random() * 2}s, 
                     drift {15 + Math.random() * 15}s linear infinite {Math.random() * 5}s;
          filter: blur(1px);
        "
      >
        {['⭐', '☁️', '🎈', '✨'][Math.floor(Math.random() * 4)]}
      </div>
    {/each}
  </div>

  <div class="w-full max-w-xl mx-auto pb-8" in:fly={{y: 20, duration: 500, delay: 100}}>
    <!-- Header -->
    <header
      class="sticky top-0 z-10 backdrop-blur-lg bg-white/70 border-b-2 border-cream-200 md:rounded-b-[var(--radius-kid-xl)]"
    >
      <div
        class="container mx-auto px-4 py-3 flex justify-between items-center"
      >
        <div class="flex items-center gap-2">
          <span class="text-2xl">⭐️</span>
          <h1 class="text-xl font-black text-kid-title">Kids Alphabet</h1>
        </div>
        <button
          class="btn btn-secondary flex items-center gap-2 text-sm"
          onclick={toggleLanguage}
        >
          <span class="font-black">{language === "en" ? "🇬🇧 EN" : "🇮🇩 ID"}</span
          >
        </button>
      </div>
    </header>

    <!-- Hero Banner -->
    <div
      class="mx-3 mt-4 p-6 rounded-[var(--radius-kid-xl)] text-white relative overflow-hidden"
      style="background: linear-gradient(135deg, #FB923C 0%, #F97316 40%, #FB7185 100%);"
    >
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-2 right-8 text-6xl animate-float">⭐</div>
        <div
          class="absolute bottom-2 left-4 text-4xl animate-float"
          style="animation-delay: 1s"
        >
          🌈
        </div>
        <div
          class="absolute top-4 left-[33%] text-3xl animate-float"
          style="animation-delay: 0.5s"
        >
          ✨
        </div>
      </div>
      <div class="relative z-1">
        <h2 class="text-2xl font-black mb-1">
          {language === "en" ? "Let's Learn!" : "Ayo Belajar!"}
        </h2>
        <p class="text-white/80 text-sm font-semibold">
          {language === "en"
            ? "Tap a letter to explore words & sounds 🎶"
            : "Ketuk huruf untuk jelajahi kata & suara 🎶"}
        </p>
      </div>
    </div>

    <!-- Alphabet Grid -->
    <div class="grid grid-cols-4 gap-2.5 p-3 md:px-0 mt-2">
      {#each alphabet as letter, i}
        {@const color = getColor(i)}
        <button
          class="card aspect-square flex items-center justify-center text-3xl font-black"
          style="
            background: {color.bg};
            color: {color.text};
            border: 2px solid {color.border};
            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          "
          in:scale={{duration: 400, delay: i * 15, start: 0.8, opacity: 0}}
          onclick={() => goToLetterDetail(letter)}
        >
          {letter}
        </button>
      {/each}

      <!-- Word Quiz Button -->
      <a
        href="/quiz?lang={language}"
        onclick={() => playSoundEffect('pop')}
        class="col-span-2 card aspect-[2/1] flex items-center justify-center gap-3 text-xl font-black text-white border-none"
        style="
          background: linear-gradient(135deg, #FCD34D, #FBBF24, #FB923C);
          box-shadow: 0 6px 24px rgba(245, 158, 11, 0.35);
        "
        in:scale={{duration: 400, delay: alphabet.length * 15, start: 0.8, opacity: 0}}
      >
        <span class="text-2xl">🎮</span>
        <span>Word Quiz</span>
      </a>
    </div>

    <!-- Footer -->
    <div class="text-center py-4 text-sm font-semibold" style="color: #FDBA74;">
      Made with ❤️ for little learners
    </div>
  </div>
</div>
{/if}

<style>
  @keyframes drift {
    0% { transform: translateX(0); }
    50% { transform: translateX(20px); }
    100% { transform: translateX(0); }
  }
</style>
