<template>
  <div class="fit overflow:hidden">
    <q-carousel
      v-model="slide"
      transition-prev="fade"
      transition-next="fade"
      :transition-duration="800"
      animated
      infinite
      class="q-pa-none q-ma-none bg-black fit"
      :padding="false"
    >
      <q-carousel-slide
        :name="index"
        class="q-ma-none q-pa-none"
        v-for="(item, index) of thedata"
        :key="item.ID"
      >
        <q-img
          :src="`/data/${item.Source}`"
          class="fit"
          fit="cover"
          no-transition
          no-spinner
          :ratio="16 / 9"
          v-if="isImage(item.Source)"
        />
        <q-responsive :ratio="16 / 9" class="fit">
          <video :src="`/data/${item.Source}`" autoplay muted loop v-if="isVideo(item.Source)" />
        </q-responsive>
      </q-carousel-slide>
    </q-carousel>
    <div class="row q-pa-none" style="position: fixed; bottom: 4%px; left: 2%; width: 96%">
      <!-- <div class="text-red">{{ thedata }}</div> -->
      <div class="col q-pr-sm" v-for="(item, index) of thedata" :key="index">
        <!-- <div class="text-red">{{ item.progress }}</div> -->
        <q-linear-progress
          style="opacity: 0.5"
          track-color="white"
          color="white"
          :value="item.progress"
          :instant-feedback="isReset"
          animation-speed="100"
        ></q-linear-progress>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick } from 'vue'
import data from '../data/data.json'
import {} from 'lodash-es'
import { useIntervalFn } from '@vueuse/core'

export default defineComponent({
  name: 'App',
  data: function () {
    return {
      timeout: 10,
      slide: 0,
      counter: 0,
      thedata: [],
      isReset: false,
    }
  },
  mounted() {
    // this.slide = this.data[0].ID
    this.thedata = data

    for (let i = 0; i < this.thedata.length; i++) {
      this.thedata[i].progress = 0
    }

    // setInterval(this.doTimer, 1000)
    useIntervalFn(this.doTimer, 100, { immediate: true })
  },
  // computed: {
  //   thedata() {
  //     return data
  //   },
  // },
  watch: {
    async slide(val, prev) {
      // console.log(val, prev)

      // this.counter = 0

      // console.log('slide changed from ', prev)
      this.thedata[prev].progress = 1

      //its the last one so reset all to 0
      if (prev == this.thedata.length - 1) {
        this.isReset = true
        await nextTick()
        for (let i = 0; i < this.thedata.length; i++) {
          this.thedata[i].progress = 0
        }
      }
    },
  },
  methods: {
    doTimer() {
      this.counter += 1
      // console.log(this.counter)
      this.isReset = false
      this.thedata[this.slide].progress = this.counter / (this.timeout * 10)
      // this.data[0].progress = this.counter / 5.0
      // console.log(this.slide)
      // console.log(this.thedata[this.slide].progress)

      // this.data[this.slide].progress = 0.5

      if (this.counter > this.timeout * 10) {
        this.counter = 0
        let index = this.slide
        index += 1
        if (index >= this.thedata.length) {
          index = 0
        }
        this.slide = index
      }
    },
    isImage(source) {
      return source.endsWith('.jpg') || source.endsWith('.png') || source.endsWith('.jpeg')
    },
    isVideo(source) {
      return source.endsWith('.mp4') || source.endsWith('.webm')
    },
  },
})
</script>
