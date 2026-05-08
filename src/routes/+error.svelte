<script lang="ts">
  import { page } from "$app/state";
  import { fade, scale, fly } from "svelte/transition";
  import { HomeIcon, ArrowLeftIcon } from "svelte-feather-icons";
  import { playSoundEffect } from "$lib/audio";

  let mounted = $state(false);

  const messages = [
    "Oops! This page wandered off! 🐻",
    "Huh? The page is playing hide and seek! 🙈",
    "Oh no! This page got lost in the alphabet! 🔤",
    "Yikes! Nothing here but empty space! 🌌",
    "Whoopsie! The page took a wrong turn! 🦕",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  function goHome() {
    playSoundEffect("pop");
    window.location.href = "/";
  }

  function goBack() {
    playSoundEffect("pop");
    history.back();
  }
</script>

{#if page?.status === 404}
  <div
    class="min-h-screen flex items-center justify-center p-4"
    style="background: linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 50%, #F0F9FF 100%);"
  >
    <div
      class="w-full max-w-md text-center"
      in:fade={{ duration: 400 }}
    >
      <!-- Floating Lost Character -->
      <div class="relative h-48 flex items-center justify-center mb-6">
        <div
          class="text-9xl animate-bounce-slow"
          style="filter: drop-shadow(0 8px 24px rgba(249, 115, 22, 0.2));"
        >
          🦖
        </div>
        <!-- Floating question marks -->
        <div
          class="absolute top-0 left-1/4 text-4xl animate-float"
          style="animation-delay: 0s;"
        >
          ❓
        </div>
        <div
          class="absolute top-4 right-1/4 text-3xl animate-float"
          style="animation-delay: 0.7s;"
        >
          ❔
        </div>
        <div
          class="absolute bottom-8 left-1/3 text-2xl animate-float"
          style="animation-delay: 1.4s;"
        >
          ❓
        </div>
      </div>

      <!-- Big 404 -->
      <div
        class="relative inline-block mb-4"
        in:scale={{ duration: 500, delay: 200, start: 0.5 }}
      >
        <h1
          class="text-8xl font-black tracking-tight"
          style="
            background: linear-gradient(135deg, #FB923C, #FBBF24, #F472B6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 4px 12px rgba(251, 146, 60, 0.3));
          "
        >
          404
        </h1>
      </div>

      <!-- Message -->
      <div
        class="space-y-2 mb-8"
        in:fly={{ y: 20, duration: 400, delay: 400 }}
      >
        <h2 class="text-2xl font-black text-kid-title">
          {randomMessage}
        </h2>
        <p class="text-primary-400 font-semibold text-sm">
          This page doesn't exist, but you can find your way home!
        </p>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row gap-3 justify-center"
        in:fly={{ y: 20, duration: 400, delay: 600 }}
      >
        <button
          class="btn bg-linear-to-r from-primary-400 to-primary-500 text-white px-6 py-3 text-lg font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          onclick={goHome}
        >
          <HomeIcon size="20" />
          Back Home 🏠
        </button>
        <button
          class="btn btn-secondary flex items-center justify-center gap-2 text-lg font-black"
          onclick={goBack}
        >
          <ArrowLeftIcon size="20" />
          Go Back ↩️
        </button>
      </div>

      <!-- Footer doodles -->
      <div class="mt-12 flex justify-center gap-4 opacity-40">
        <span class="text-2xl animate-float" style="animation-delay: 0.3s;">⭐</span>
        <span class="text-2xl animate-float" style="animation-delay: 0.6s;">🌈</span>
        <span class="text-2xl animate-float" style="animation-delay: 0.9s;">✨</span>
        <span class="text-2xl animate-float" style="animation-delay: 1.2s;">🎈</span>
        <span class="text-2xl animate-float" style="animation-delay: 1.5s;">☁️</span>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(3deg); }
  }

  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0) scale(1); }
    30% { transform: translateY(-16px) scale(1.05); }
    50% { transform: translateY(-8px) scale(0.98); }
    70% { transform: translateY(-16px) scale(1.02); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-bounce-slow {
    animation: bounce-slow 2.5s ease-in-out infinite;
  }
</style>
