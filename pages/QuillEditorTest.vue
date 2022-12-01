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


export default {
name: "QuillEditorTest",
components: { RichTextEditor },
}
</script>

<style scoped>

</style>
