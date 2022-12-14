<template>
  <div
    ref="richTextEditor"
    :style="{'height': height + 'px'}"
  >
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  name: "RichTextReadOnly",
  props: {
    height: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data() {
    return {
      quill: null
    }
  },
  mounted() {
    this.init()
  },
  destroyed: function () { // 离开页面生命周期函数
    // this.websocketclose();
    this.quill = null;
  },
  methods: {
    init() {
      const options = {
        modules: {

          toolbar: []
        },
        placeholder: '',
        readOnly: true,
        theme: 'snow'
      }
      // this.initWebSocket()
      this.quill = new Quill(this.$refs.richTextEditor, options)
      // setInterval(() => {
      //   this.websock.send("")
      // }, 5000);
      this.quill.on('text-change', this.syn_send_doc)
      // JSON.parse(localStorage.getItem('word_content'))
      if (localStorage.getItem('flag') === 'in') {
        this.quill.setContents(JSON.parse(localStorage.getItem('in_word_content')))
      } else {
        this.quill.setContents(JSON.parse(localStorage.getItem('doc_content')))
      }
      if (localStorage.getItem('enable') === 'false') {
        this.quill.enable(false)
      }
    },
    getHtmlContent() {
      return this.$refs.richTextEditor.firstChild.innerHTML
    },
    getJsonContent() {
      return JSON.stringify(this.quill.getContents())
    }
  }
}
</script>

<style scoped>

</style>
