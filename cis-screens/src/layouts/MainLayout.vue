<template>
  <div class="fit overflow:hidden">
    <div :class="{ highlightedMain: highlighted }" v-if="highlighted">
      <q-img
        :src="`/data/${highlighted.filename}`"
        class="fit"
        fit="cover"
        no-transition
        no-spinner
        :ratio="16 / 9"
        v-if="isImage(highlighted.filename)"
      />
      <q-responsive :ratio="16 / 9" class="fit">
        <video
          :src="`/data/${highlighted.filename}`"
          muted
          loop
          autoplay
          v-if="isVideo(highlighted.filename)"
        />
      </q-responsive>
    </div>
    <div :class="{ highlightedSub: highlighted }">
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
          <q-responsive :ratio="16 / 9" class="fit">
            <q-img
              :src="`/data/${item.filename}`"
              class="fit"
              fit="cover"
              no-transition
              no-spinner
              :ratio="16 / 9"
              v-if="isImage(item.filename)"
            />

            <video
              :ref="`video_${index}`"
              :src="`/data/${item.filename}`"
              muted
              loop
              autoplay
              v-if="isVideo(item.filename)"
            />
          </q-responsive>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="row q-pa-none" style="position: fixed; bottom: 2%; left: 2%; width: 96%">
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
    <div
      class="text-grey-8 text-small"
      style="position: fixed; bottom: 24px; right: 3%; font-size: smaller"
    >
      {{ updatedAt }}
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick } from 'vue'
import data from '../data/data.json'
import { find, filter } from 'lodash-es'
import { useIntervalFn } from '@vueuse/core'

export default defineComponent({
  name: 'App',
  data: function () {
    return {
      timeout: 15,
      slide: 0,
      counter: 0,
      thedata: [],
      isReset: false,
      updatedAt: null,
      highlighted: null,
    }
  },
  mounted() {
    // this.slide = this.data[0].ID
    this.thedata = filter(data.data, (w) => {
      if (!w.IsHighlighted) return w
    })

    // console.log(this.thedata)
    this.updatedAt = `Updated ${new Date(data.updatedAt).toDateString()}`

    for (let i = 0; i < this.thedata.length; i++) {
      this.thedata[i].progress = 0
    }

    this.highlighted = find(data.data, { IsHighlighted: true })
    // console.log(this.highlighted)

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

      //videos:
      // try {
      //   this.$refs[`video_${prev}`][0].pause()
      // } catch {
      //   //
      // }
      // try {
      //   console.log(this.$refs)
      //   this.$refs[`video_${val}`][0].play()
      // } catch {
      //   //
      // }

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
    // transition(nv, ov) {
    //   //stop old val, start newval
    //   console.log(nv, ov)
    //   // this.$refs[`video${ov}`][0].pause()
    //   // this.$refs[`video${nv}`][0].play()
    // },
    doTimer() {
      if (this.thedata.length) {
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

<style lang="scss">
.highlightedMain {
  position: fixed;
  top: 4%;
  left: 1%;
  width: 55%;
  z-index: 1;
  transform: perspective(1500px) rotateY(20deg);
  box-shadow: 0px 0px 50px 5px rgb(255, 255, 255, 0.2);
}

.highlightedSub {
  position: fixed;
  bottom: 5%;
  right: 3%;
  width: 80%;
  height: auto;
  transform: perspective(1500px) rotateY(-20deg);
  box-shadow: 0px 0px 50px 5px rgb(255, 255, 255, 0.2);
}
</style>
