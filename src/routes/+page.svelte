<script lang="ts">
  import { GlobeIcon } from "svelte-feather-icons";
  
  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  let language = $state<'en' | 'id'>('id');

  function toggleLanguage() {
    language = language === 'en' ? 'id' : 'en';
  }

  function goToLetterDetail(letter: string) {
    window.location.href = `/letter/${letter.toLowerCase()}?lang=${language}`;
  }
</script>

<div class="min-h-screen">
  <div class="w-full max-w-xl mx-auto">
    <header class="bg-white shadow-sm md:rounded-b-lg">
      <div class="container mx-auto p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-600">Kids Alphabet</h1>
        <button
          class="btn btn-secondary flex items-center gap-2 rounded-xl"
          onclick={toggleLanguage}
        >
          <GlobeIcon size="20" />
          {language.toUpperCase()}
        </button>
      </div>
    </header>
    <div class="grid grid-cols-4 gap-2 p-2 md:px-0">
      {#each alphabet as letter}
        <button
          class="card aspect-square flex items-center justify-center text-3xl font-bold text-blue-600 hover:text-blue-700 opacity-90"
          onclick={() => goToLetterDetail(letter)}
        >
          {letter}
        </button>
      {/each}
    </div>
  </div>
</div>