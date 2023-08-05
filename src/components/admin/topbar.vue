<script setup></script>

<template>
  <v-app-bar flat class="px-5 py-2">
    <div class="container">
      <div class=" " style="width:100%!important">
        <v-text-field
          variant="plain"
          placeholder="Search"
          class="mt-n3"
          style="width: 100%!important;"
          density="compact"
          full-width
        >
          <template v-slot:prepend-inner>
            <v-icon size="19" class="mt-1">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
.container {
  /* display: flex; */
  width: 724px;
  height: 42px;
  padding: 8px 15px 7px 16px;
  /* align-items: flex-start; */
  /* gap: 5px; */
  /* flex-shrink: 0; */
  border-radius: 15px;
  background: #f0f0f0;
}
.search {
  color: rgba(0, 0, 0, 0.5);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
