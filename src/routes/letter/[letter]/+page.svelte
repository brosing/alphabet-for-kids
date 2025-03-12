<script lang="ts">
  import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, Volume2Icon } from 'svelte-feather-icons';
  import { page } from '$app/state';
  import { enEmoji, idEmoji } from '$lib/data';

  type LangType = 'en' | 'id'
  const lang = page.url.searchParams.get('lang') as LangType;
  const letter = page.params.letter.toUpperCase();
  let isUpperCase = true;
  const words: Record<LangType, { [key: string]: string[]}> = {
    en: enEmoji,
    id: idEmoji
  };
  const selectLang = lang === 'en' ? 'en-US' : 'id-ID';

  function playLetterSound() {
    const utterance = new SpeechSynthesisUtterance(letter.toLowerCase());
    utterance.lang = selectLang;
    window.speechSynthesis.speak(utterance);
  }

  function playWordSound(word: string) {
    const utterance = new SpeechSynthesisUtterance(word.split(' ')[1]);
    utterance.lang = selectLang;
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
      <h2 class="text-2xl font-bold text-blue-600 mb-4">{lang === 'en' ? 'Words starting with' : 'Kata dimulai dengan'} {letter}</h2>
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