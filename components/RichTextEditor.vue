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
// import ImageResize from 'quill-image-resize-module'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'

// Quill.register('modules/imageDrop', ImageDrop)
// Quill.register('modules/imageResize', ImageResize)
export default {
  name: 'RichTextEditor',
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
          // imageDrop: true, // 图片拖拽
          // imageResize: {
          //   displayStyles: { // 放大缩小
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          //   modules: ['Resize', 'DisplaySize', 'Toolbar']
          // },
          // clipboard: {
          //   matchers: [[Node.ELEMENT_NODE, this.handleCustomMatcher]]// 粘贴版，处理粘贴时候带图片
          // },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 切换按钮
            ['blockquote', 'code-block'],

            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 减少缩进/缩进
            [{ direction: 'rtl' }], // 文本下划线

            [{ size: ['small', false, 'large', 'huge'] }], // 用户自定义下拉
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // 主题默认下拉，使用主题提供的值
            [{ align: [] }],

            ['link', 'image'],

            ['clean'] // 清除格式
          ]
        },
        placeholder: '请输入论文内容…',
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
    },
    // syn_send_doc(delta, oldDelta, source) {
    //   // console.log(this.getJsonContent().slice(7, -1))
    //   if (source == 'api') {
    //     console.log("同步中...");
    //   } else if (source == 'user') {
    //     this.websock.send(JSON.stringify({
    //       'type': 'doc',
    //       'id': localStorage.getItem('doc_id'),
    //       'content': this.getJsonContent().slice(7, -1)
    //     }))
    //   }
    // },
    // initWebSocket() { // 建立连接
    //   // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
    //   var url = " ws://101.42.171.88:8090/ws"
    //   // var url = " ws://localhost:8090/ws"
    //   this.websock = new WebSocket(url);
    //   this.websock.onopen = this.websocketonopen;
    //   // this.websock.send = this.websocketsend;
    //   this.websock.onerror = this.websocketonerror;
    //   this.websock.onmessage = this.websocketonmessage;
    //   this.websock.onclose = this.websocketclose;
    // },
    // // 连接成功后调用
    // websocketonopen() {
    //   this.websock.send(JSON.stringify({
    //     token: getters.getToken(state),
    //     user_id: getters.getUserId(state),
    //     type: "doc",
    //     id: localStorage.getItem('doc_id')
    //   }))
    //   console.log("WebSocket连接成功");
    // },
    // // 发生错误时调用
    // websocketonerror() {
    //   console.log("WebSocket连接发生错误");
    // },
    // // 给后端发消息时调用
    // websocketsend() {
    //   console.log("WebSocket连接发生错误");
    // },
    // // 接收后端消息
    // // vue 客户端根据返回的cmd类型处理不同的业务响应
    // websocketonmessage(e) {
    //   this.quill.setContents(JSON.parse(JSON.parse(e.data).content))
    // },
    // // 关闭连接时调用
    // websocketclose(e) {
    //   console.log("connection closed (" + e.code + ")");
    // }
  }
}

</script>
