import Vue from 'vue'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

// import imageResize  from 'quill-image-resize-module'
import { ImageDrop } from 'quill-image-drop-module'
import Quill from "quill";
if (process.browser) {
// 加一个浏览器端判断，只在浏览器端才渲染就不会报错了
  const VueQuillEditor = require('vue-quill-editor/dist/ssr');
  Vue.use(VueQuillEditor)
  // Quill.register("modules/imageResize", imageResize );
  Quill.register("modules/imageDrop", ImageDrop );

}

