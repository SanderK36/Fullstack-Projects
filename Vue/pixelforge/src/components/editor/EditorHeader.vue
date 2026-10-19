
<script setup lang="ts">
import {
  Download,
  Redo2,
  Undo2,
  Grid2X2,
} from 'lucide-vue-next'
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
    <div class="flex items-center gap-3">
      <div class="rounded-lg bg-violet-600 p-2">
        <Grid2X2 :size="20" />
      </div>

      <h1 class="text-xl font-bold tracking-tight">
        PixelForge
      </h1>
    </div>

    <div class="flex items-center gap-3">
      <button
        class="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        title="Undo"
        aria-label="Undo"
        disabled>
        <Undo2 :size="20" />
      </button>

      <button
        class="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        title="Redo"
        aria-label="Redo"
        disabled>
        <Redo2 :size="20" />
      </button>

      <button class="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 font-medium hover:bg-violet-500"disabled>
        <Download :size="18" /> Export PNG
      </button>
    </div>
  </header>
</template>
