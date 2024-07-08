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
      ],
      leftAlignment: "left",
      rightAlignment: "justify",
      wideAlignment: "left",
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
      <v-container>
        <div class="text-h5 ma-3">Входные параметры-теги</div>
        <v-textarea
          outlined
          label="Input JSON tags"
          :value="textTags"
          @input="updateTextTags"
          :error-messages="jsonError"
        ></v-textarea>

        <hr class="technezisTagsApp__divider" />

        <v-row>
          <v-col>
            <div class="text-h5 ma-3">
              Простой кейс, когда мало тегов и мало пространства для компонента
            </div>
            <v-select
              :items="['left', 'justify']"
              outlined
              v-model="wideAlignment"
            ></v-select>
            <TextTags :tags="tags" :align="wideAlignment"></TextTags>
          </v-col>
        </v-row>

        <hr class="technezisTagsApp__divider" />

        <v-row>
          <v-col>
            <div class="text-h5 ma-3">Пример с выравниванием</div>
            <v-select
              :items="['left', 'justify']"
              outlined
              v-model="leftAlignment"
            ></v-select>
            <TextTags
              :tags="tags.slice(0, 3)"
              :align="leftAlignment"
            ></TextTags>
          </v-col>
          <v-col>
            <div class="text-h5 ma-3">Пример с выравниванием</div>
            <v-select
              :items="['left', 'justify']"
              outlined
              v-model="rightAlignment"
            ></v-select>
            <TextTags
              :tags="tags.slice(0, 3)"
              :align="rightAlignment"
            ></TextTags>
          </v-col>
        </v-row>
      </v-container>
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
