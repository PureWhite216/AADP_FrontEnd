<template>
  <RichTextEditor
    id="pdfDom"
    ref="richTextEditor"
    v-model="editor"
    :height="1000"
  />
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
