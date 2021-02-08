<template lang="pug">
  .p-0.m-0.container-fluid.mine
    .info-fixed
      h4.info {{ info }}
      ul
        li.info(v-for="value, key in list")
          span {{ key }}
          p {{value}}
    navbar
    .jumbotron.m-0.p-0.p-3.jumbotron-fluid
      .container
        .row
          .col-sm
            editor(ref="editor", :config="config", :initialized="onInitialized")
          .col-sm
            .export
              button.btn-primary(v-on:click="getJson") JSON
              pre
                code(v-html="json")
</template>
<script>
import Header from '@editorjs/header';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import Paragraph from '@editorjs/paragraph';
import Embed from '@editorjs/embed';
import Table from 'editorjs-table';
import Checklist from '@editorjs/checklist';
import Marker from '@editorjs/marker';
import Warning from '@editorjs/warning';
import RawTool from '@editorjs/raw';
import Quote from '@editorjs/quote';
import InlineCode from '@editorjs/inline-code';
import Delimiter from '@editorjs/delimiter';
import SimpleImage from '@editorjs/simple-image';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Editorjs',
  components: {
    Navbar,
  },
  data() {
    return {
      config: {
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4],
              defaultLevel: 3,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          code: {
            class: CodeTool,
          },
          paragraph: {
            class: Paragraph,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
                imgur: true,
              },
            },
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          checklist: {
            class: Checklist,
          },
          Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
              titlePlaceholder: 'Title',
              messagePlaceholder: 'Message',
            },
          },
          raw: RawTool,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M',
          },
          delimiter: Delimiter,
          image: SimpleImage,
        },
        onReady: () => {
          console.log('on ready');
          this.getJson();
          this.getInfo();
        },
        onChange: async () => {
          console.log('Now I know that Editor\'s content changed!');
          this.getJson();
          const index = this.$refs.editor.state.editor.blocks.getCurrentBlockIndex();
          this.list = this.json.blocks[index].data;
          this.info = this.json.blocks[index].type;
        },
        data: {
          time: 1591362820044,
          blocks: [
            {
              type: 'header',
              data: {
                text: 'Статья 1.',
                level: 2,
              },
            },
            {
              type: 'header',
              data: {
                text: 'Simple header',
                level: 3,
              },
            },
            {
              type: 'header',
              data: {
                text: 'Статья 2. Key features',
                level: 3,
              },
            },
            {
              type: 'list',
              data: {
                style: 'unordered',
                items: ['It is a block-styled editor', 'It returns clean data output in JSON', 'Designed to be extendable and pluggable with a simple API'],
              },
            },
            {
              type: 'header',
              data: {
                text: 'What does it mean clean data output',
                level: 3,
              },
            },
            {
              type: 'paragraph',
              data: {
                text: 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below',
              },
            },
            {
              type: 'paragraph',
              data: {
                text:
                  'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
              },
            },
            {
              type: 'paragraph',
              data: {
                text: 'Clean data is useful to sanitize, validate and process on the backend.',
              },
            },
            {
              type: 'delimiter',
              data: {},
            },
            {
              type: 'paragraph',
              data: {
                text:
                  'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it\'s core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏',
              },
            },
          ],
          version: '2.19.1',
        },
      },
      json: {},
      info: 'Choose Block',
      list: [],
    };
  },
  methods: {
    onInitialized(editor) {
      console.log(editor);
    },
    async getJson() {
      this.json = await this.$refs.editor.state.editor.save().then((res) => res);
    },
    getInfo() {
      [...Array(10).keys()].forEach((i) => {
        this.$refs.editor.state.editor.blocks.getBlockByIndex(i).holder.addEventListener('mouseup', () => {
          const index = this.$refs.editor.state.editor.blocks.getCurrentBlockIndex();
          this.list = this.json.blocks[index].data;
          this.info = this.json.blocks[index].type;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
h1,
h2 {
  margin: 0;
}

h3 {
  margin-top: 0.5rem;
}

img {
  margin-bottom: 1rem;
}

@import 'src/assets/css/variables';
.actions {
  max-width: 30rem;
  margin: 0 auto 2rem auto;
}

.export {
  max-width: 30rem;
  margin: 0 auto 2rem auto;

  pre {
    padding: 1rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    background: rgba($color-black, 0.05);
    color: rgba($color-black, 0.8);
  }

  code {
    display: block;
    white-space: pre-wrap;
  }
}

.info {
  margin-left: 20px; 
}

.info-fixed {
  position: fixed;
  right: 50px;
  top: 100px;
  background: #FFF;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  padding: 10px;
  border-radius: 10px;
  z-index: 1;
  max-width: 200px;
  overflow: scroll;
  max-height: 80vh;
}



.mine {
  position: relative;
}

</style>
