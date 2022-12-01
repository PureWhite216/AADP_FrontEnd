<template>
  <v-container>
    <v-card>
      <RichTextEditor
        ref="richTextEditor"
        :height="1000"
      />
    </v-card>
  </v-container>
</template>

<script>
import RichTextEditor from '@/components/RichTextEditor'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import qs from 'qs'
import store from '@/store'

export default {
name: "QuillEditorTest",
components: { RichTextEditor },
}
</script>

<style scoped>

</style>
