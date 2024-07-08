<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    align: {
      type: String,
      default: "left",
    },
  },
  data() {
    return {
      rows: [this.tags.map((tag, index) => ({ index, visible: true, ...tag }))],
      myAlign: "left",
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.onResize();
      // this.myAlign = "justify";
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize: function () {
      this.$nextTick(() => {
        const globalWidth =
          this.$refs.textTags.getBoundingClientRect().width -
          Number(
            window.getComputedStyle(this.$refs.textTags).paddingLeft.slice(0, 2)
          ) -
          Number(
            window
              .getComputedStyle(this.$refs.textTags)
              .paddingRight.slice(0, 2)
          );

        const { y: globalY, bottom: globalBottom } =
          this.$refs.textTags.getBoundingClientRect();
        const globalHeightBoundary = globalY + globalBottom;

        let row = [];
        let tmpRows = [];
        let sumWidth = 0;

        this.tags.forEach((tag, index) => {
          const item = this.$refs.textTagsItem[index];
          const width = item.getBoundingClientRect().width + 25;
          const { y, bottom } = item.getBoundingClientRect();
          const heightBoundary = y + bottom;
          const visible = heightBoundary < globalHeightBoundary;
          const excessWidth =
            !visible && row[row.length - 1] && row[row.length - 1].visible;

          sumWidth += width;

          if (sumWidth >= globalWidth || excessWidth) {
            sumWidth = 0;
            tmpRows.push(row);
            row = [];
          }

          row.push({ index, visible, ...tag });
        });

        if (row.length) {
          tmpRows.push(row);
        }
        this.rows = tmpRows;
      });
    },
  },
};
</script>

<template>
  <div class="textTags" ref="textTags">
    <div
      class="textTags__row"
      :class="{
        textTags__row_alignLeft: myAlign === 'left',
        textTags__row_alignJustify: myAlign === 'justify',
      }"
      v-for="row in rows"
    >
      <template v-for="rowItem in row">
        <div
          ref="textTagsItem"
          class="textTags__item"
          :class="{ textTags__item_invisible: !rowItem.visible }"
        >
          <v-icon v-if="rowItem.icon">
            {{ rowItem.icon }}
          </v-icon>
          <span>
            {{ rowItem.id }}:
            {{ rowItem.text }}
          </span>
        </div>
        <v-icon v-if="rowItem.visible && rowItem.index !== row.length - 1">
          mdi-circle-small
        </v-icon>
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
  padding: 2.5rem;
  margin: 2.5rem 0;
}
.textTags__row {
  display: inline-block;
}
.textTags__row_alignLeft {
  display: inline-block;
}
.textTags__row_alignJustify {
  // display: flex;
  // justify-content: space-between;
}
.textTags__item {
  display: inline-block;
}
.textTags__item_invisible {
  opacity: 0;
  pointer-events: none;
}
</style>
