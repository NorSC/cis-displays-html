<template>
  <q-layout view="hHh Lpr lFf" class="q-pa-none">
    <q-page-container>
      <q-page class="q-pa-none over">
        <router-view class="fixed fit bg-black" style="overflow: hidden"></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>
