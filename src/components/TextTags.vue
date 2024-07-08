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
        const textDataBottom =
          this.$refs.tagsData.getBoundingClientRect().bottom;

        this.myTags.forEach((tag, index) => {
          const tagItemBottom =
            this.$refs.tagItem[index].getBoundingClientRect().bottom;

          tag.visible = tagItemBottom + 2 < textDataBottom;
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
        <span
          class="textTags__item"
          ref="tagItem"
          :class="{
            textTags__item_invisible: !tag.visible,
          }"
        >
          <v-icon>{{ tag.icon }}</v-icon>
          {{ tag.text }}
          <v-icon v-if="myTags[index].visible && myTags[index + 1]?.visible">
            mdi-circle-small
          </v-icon>
        </span>
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
  height: 4rem;
  overflow: hidden;
}
.textTags__item {
  text-align: justify;
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
