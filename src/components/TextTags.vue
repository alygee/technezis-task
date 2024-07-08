<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    align: {
      type: String,
      default: "justify",
    },
  },
  data() {
    return {
      myTags: this.tags.map((tag) => ({
        ...tag,
        visible: true,
      })),
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.$nextTick(() => {
        const { bottom: globalBottom, y: globalY } =
          this.$refs.tagsData.getBoundingClientRect();
        const globalOffset = globalBottom + globalY + 10;

        this.myTags.forEach((tag, index) => {
          const { bottom, y, width } =
            this.$refs.tagItem[index].getBoundingClientRect();
          const tagOffset = bottom + y;

          tag.visible = tagOffset < globalOffset;
          if (!tag.width) {
            tag.width = width + 12;
          }
        });
      });
    },
  },
};
</script>

<template>
  <div class="textTags">
    <div
      class="textTags__data"
      ref="tagsData"
      :class="{
        textTags__data_alignLeft: align === 'left',
        textTags__data_alignJustify: align === 'justify',
      }"
    >
      <template v-for="(tag, index) in myTags">
        <div
          class="textTags__item"
          ref="tagItem"
          :class="{
            textTags__item_invisible: !tag.visible,
          }"
          :style="{ width: tag.width + 'px' }"
        >
          <v-icon>{{ tag.icon }}</v-icon>
          {{ tag.text }}
          <v-icon v-if="myTags[index].visible && myTags[index + 1]?.visible">
            mdi-circle-small
          </v-icon>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.textTags {
  border: 1px solid rgba(0, 0, 0, 0.38);
  border-radius: 0.25rem;
  color: rgba(0, 0, 0, 0.86);
  font-size: 16px;
  height: 8rem;
  margin: 2.5rem 0;
  width: 100%;
}
.textTags__data {
  margin: 3rem;
  height: 3rem;
  overflow: hidden;
}
.textTags__item {
  display: inline-block;
  text-align: left;
}
.textTags__item_invisible {
  opacity: 0;
  pointer-events: none;
}
.textTags__data_alignLeft {
  text-align: left;
}
.textTags__data_alignJustify {
  text-align: justify;
}
</style>
