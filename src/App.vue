<script>
import TextTags from "./components/TextTags.vue";

export default {
  data() {
    return {
      tags: [
        { id: 0, text: "4.3", icon: "mdi-star-outline" },
        { id: 1, text: "Фридландские ворота" },
        { id: 2, text: "1.2 км от вас" },
        { id: 3, text: "5.4", icon: "mdi-star-outline" },
        { id: 4, text: "Тобольские ворота" },
        { id: 5, text: "2.3 км от вас" },
        { id: 6, text: "4.3", icon: "mdi-star-outline" },
        { id: 7, text: "Тарские ворота" },
        { id: 8, text: "3.4 км от вас" },
        { id: 9, text: "6.5", icon: "mdi-star-outline" },
        { id: 10, text: "Омские ворота" },
        { id: 11, text: "4.5 км от вас" },
        { id: 12, text: "7.6", icon: "mdi-star-outline" },
        { id: 13, text: "Триумфальная арка" },
        { id: 14, text: "4500 км от вас" },
        { id: 15, text: "8.7", icon: "mdi-star-outline" },
        { id: 16, text: "Ворота Сен-Дени" },
        { id: 17, text: "3250 км от вас" },
        { id: 18, text: "4.3", icon: "mdi-star-outline" },
        { id: 19, text: "Фридландские ворота" },
        { id: 20, text: "1.2 км от вас" },
        { id: 21, text: "5.4", icon: "mdi-star-outline" },
        { id: 22, text: "Тобольские ворота" },
        { id: 23, text: "2.3 км от вас" },
        { id: 24, text: "4.3", icon: "mdi-star-outline" },
        { id: 25, text: "Тарские ворота" },
        { id: 26, text: "3.4 км от вас" },
        { id: 27, text: "6.5", icon: "mdi-star-outline" },
        { id: 28, text: "Омские ворота" },
        { id: 29, text: "4.5 км от вас" },
        { id: 30, text: "7.6", icon: "mdi-star-outline" },
        { id: 31, text: "Триумфальная арка" },
        { id: 32, text: "4500 км от вас" },
        { id: 33, text: "8.7", icon: "mdi-star-outline" },
        { id: 34, text: "Ворота Сен-Дени" },
        { id: 35, text: "3250 км от вас" },
      ],
      count: 0,
      jsonError: "",
    };
  },
  computed: {
    textTags() {
      return JSON.stringify(this.tags);
    },
  },
  methods: {
    updateTextTags(value) {
      try {
        this.tags = JSON.parse(value);
        this.jsonError = "";
      } catch (e) {
        this.jsonError = e.message;
      }
    },
  },
};
</script>

<template>
  <v-app class="technezisTagsApp">
    <v-main>
      <v-textarea
        outlined
        label="Input JSON tags"
        :value="textTags"
        @input="updateTextTags"
        :error-messages="jsonError"
      ></v-textarea>
      <hr class="technezisTagsApp__divider" />

      <TextTags :tags="tags"></TextTags>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.technezisTagsApp {
  color: #000;

  &__divider {
    margin: 2rem 0;
  }
}
</style>
