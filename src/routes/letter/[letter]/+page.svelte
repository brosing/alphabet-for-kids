<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon, Volume2Icon } from 'svelte-feather-icons';
  import { fade, fly, scale } from 'svelte/transition';
  import { page } from '$app/state';
  import { enEmoji, idEmoji } from '$lib/data';
  import { playSoundEffect } from '$lib/audio';

  type LangType = 'en' | 'id'
  let lang = $state<LangType>((page.url.searchParams.get('lang') as LangType) || 'id');
  let isUpperCase = $state(true);
  let mounted = $state(false);
  let availableVoices = $state<SpeechSynthesisVoice[]>([]);

  const words: Record<LangType, { [key: string]: string[]}> = {
    en: enEmoji,
    id: idEmoji
  };

  const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  
  const letter = $derived((page.params.letter ?? 'A').toUpperCase());
  const letterIndex = $derived(alphabet.indexOf(letter));
  const prevLetter = $derived(letterIndex > 0 ? alphabet[letterIndex - 1] : null);
  const nextLetter = $derived(letterIndex < 25 ? alphabet[letterIndex + 1] : null);

  // Color themes for each letter based on position
  const colorThemes = [
    { gradient: 'linear-gradient(135deg, #FB923C, #EA580C)', light: '#FFF7ED', accent: '#EA580C', border: '#FED7AA', btnBg: '#F97316', btnHover: '#EA580C' },
    { gradient: 'linear-gradient(135deg, #FBBF24, #F59E0B)', light: '#FFFBEB', accent: '#D97706', border: '#FDE68A', btnBg: '#F59E0B', btnHover: '#D97706' },
    { gradient: 'linear-gradient(135deg, #38BDF8, #0EA5E9)', light: '#F0F9FF', accent: '#0284C7', border: '#BAE6FD', btnBg: '#0EA5E9', btnHover: '#0284C7' },
    { gradient: 'linear-gradient(135deg, #4ADE80, #22C55E)', light: '#F0FDF4', accent: '#16A34A', border: '#BBF7D0', btnBg: '#22C55E', btnHover: '#16A34A' },
    { gradient: 'linear-gradient(135deg, #FB7185, #F43F5E)', light: '#FFF1F2', accent: '#E11D48', border: '#FECDD3', btnBg: '#F43F5E', btnHover: '#E11D48' },
  ];
  const colorIdx = $derived((letter.charCodeAt(0) - 65) % colorThemes.length);
  const theme = $derived(colorThemes[colorIdx]);

  onMount(() => {
    const urlLang = page.url.searchParams.get('lang') as LangType;
    if (urlLang === 'en' || urlLang === 'id') {
      localStorage.setItem('language', urlLang);
    } else {
      const stored = localStorage.getItem('language') as LangType;
      if (stored === 'en' || stored === 'id') {
        lang = stored;
      }
    }
    
    const loadVoices = () => {
      availableVoices = window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    setTimeout(() => { mounted = true; }, 50);
  });

  const selectLang = $derived(lang === 'en' ? 'en-US' : 'id-ID');

  function getSpeech(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectLang;
    
    const voice = availableVoices.find((v) => v.lang.startsWith(selectLang)) || 
                  availableVoices.find((v) => v.lang.startsWith(selectLang.split('-')[0]));
    if (voice) {
      utterance.voice = voice;
    }
    return utterance;
  }

  function playLetterSound() {
    playSoundEffect('pop');
    const utterance = getSpeech(letter.toLowerCase());
    window.speechSynthesis.speak(utterance);
  }

  function playWordSound(word: string) {
    playSoundEffect('pop');
    const wordPart = word.includes(' ') ? word.slice(word.indexOf(' ') + 1) : word;
    const utterance = getSpeech(wordPart);
    window.speechSynthesis.speak(utterance);
  }

  function toggleCase() {
    playSoundEffect('boing');
    isUpperCase = !isUpperCase;
  }
</script>

{#if mounted}
<div class="min-h-screen relative z-1" in:fade={{duration: 400}}>
  <div class="w-full max-w-xl mx-auto pb-8" in:fly={{y: 20, duration: 500, delay: 100}}>
    <!-- Top Navigation -->
    <div class="p-4 flex items-center justify-between">
      <div class="flex-1 flex justify-start">
        <a href="/" class="btn btn-secondary flex items-center gap-2 text-sm">
          <ArrowLeftIcon size="16" />
          <span class="font-bold">{lang === 'en' ? 'Home' : 'Beranda'}</span>
        </a>
      </div>
      <h1 class="text-lg font-black text-kid-title text-center shrink-0 px-2">
        {lang === 'en' ? 'Letter' : 'Huruf'} {letter}
      </h1>
      <div class="flex-1 flex gap-2 justify-end">
        {#if prevLetter}
          <a 
            href="/letter/{prevLetter.toLowerCase()}?lang={lang}"
            class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary-500 hover:scale-110 active:scale-90 transition-all border border-primary-100"
            title="Previous Letter"
          >
            <ArrowLeftIcon size="20" />
          </a>
        {:else}
          <div class="w-10 h-10"></div>
        {/if}

        {#if nextLetter}
          <a 
            href="/letter/{nextLetter.toLowerCase()}?lang={lang}"
            class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary-500 hover:scale-110 active:scale-90 transition-all border border-primary-100"
            title="Next Letter"
          >
            <ArrowRightIcon size="20" />
          </a>
        {:else}
          <div class="w-10 h-10"></div>
        {/if}
      </div>
    </div>

    <!-- Letter Hero Card -->
    <div class="mx-3 relative">
      <div
        class="card p-8 text-center border-none text-white relative overflow-hidden"
        style="background: {theme.gradient}; transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);"
      >
        <!-- Decorative circles -->
        <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10"></div>
        <div class="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10"></div>
        <div class="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/15 animate-float"></div>

        <div class="relative z-1">
          {#key isUpperCase}
          <div class="text-[7rem] leading-none font-black mb-4 drop-shadow-lg" in:scale={{duration: 400, start: 0.5, opacity: 0}}>
            {isUpperCase ? letter : letter.toLowerCase()}
          </div>
          {/key}
          <div class="flex items-center justify-center gap-3">
            <button
              class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-90"
              onclick={toggleCase}
              title={isUpperCase ? 'Show lowercase' : 'Show uppercase'}
            >
              {#if isUpperCase}
                <ArrowDownIcon class="h-5 w-5" />
              {:else}
                <ArrowUpIcon class="h-5 w-5" />
              {/if}
            </button>
            <button
              class="h-12 px-6 rounded-full bg-white font-black flex items-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95 hover:scale-105"
              style="color: {theme.accent};"
              onclick={playLetterSound}
            >
              <Volume2Icon size="20" />
              <span>{lang === 'en' ? 'Listen' : 'Dengar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Words Section -->
    <div class="mx-3 mt-4">
      <div
        class="card p-6"
        style="border-color: {theme.border}; transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
          {mounted ? 'opacity: 1; transform: translateY(0)' : 'opacity: 0; transform: translateY(1rem)'}"
      >
        <h2 class="text-xl font-black mb-4 flex items-center gap-2" style="color: {theme.accent};">
          <span>📖</span>
          {lang === 'en' ? 'Words starting with' : 'Kata dimulai dengan'} {letter}
        </h2>
        <div class="grid gap-3">
          {#each words[lang][letter] as word, i}
            <div
              class="flex items-center justify-between p-3.5 rounded-[var(--radius-kid)] border hover:shadow-md transition-all"
              style="background: {theme.light}; border-color: {theme.border};
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) {0.2 + i * 0.06}s;
                {mounted ? 'opacity: 1; transform: translateX(0)' : 'opacity: 0; transform: translateX(-1rem)'}"
            >
              <span class="text-lg font-bold">{word}</span>
              <button
                class="w-10 h-10 rounded-full text-white flex items-center justify-center shadow-md active:scale-90 transition-all hover:brightness-110"
                style="background: {theme.btnBg};"
                onclick={() => playWordSound(word)}
              >
                <Volume2Icon size="16" />
              </button>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
{/if}