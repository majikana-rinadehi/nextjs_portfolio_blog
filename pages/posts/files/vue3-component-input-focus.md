---
title: '[Vue 3] 親コンポーネントから子コンポーネントのinputをfocusさせる方法'
date: '2022-04-29'
description: 'テスト用の記事1でーすw'
image: nextjs.png
topics: '["Vue.js]'
emoji: '🙆'
---

# 環境

vueバージョン: 3.0.0
※ Composition API の形式で記述しています。
検証ブラウザ: Google Chrome


# やりたいこと
![Todo画像](https://1.bp.blogspot.com/-hmlrfMCPKYw/YZOOprUlIwI/AAAAAAAAMUk/ccqb2775CR8DCSrrJCrRyKzlltu532yiACLcBGAsYHQ/s0/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588%2B2021-11-16%2B19.57.07.png)
Todoアイテムを表示する親コンポーネント(Todo.vue)と、Todoアプリを追加するフォームの子コンポーネント(AddForm.vue)に分かれたTodoアプリで、
・ページの初回読み込み時
・Todoの追加、削除後
に子コンポーネントのinputに自動的にフォーカスが行くようにしたい
![Todo_gif](https://1.bp.blogspot.com/-1JAEJfEXBmg/YZOSlvtge-I/AAAAAAAAMUs/coO8ds7MF482p2TNR-GUn40Nb9Y5ymmxQCLcBGAsYHQ/s0/ezgif.com-gif-maker.gif)

# コンポーネントの構造

## Todo.vue
削除ボタン付きのTodoアイテムの一覧表示と、Todoアイテム追加用の子コンポーネントAddForm.vueからなる。

```html:Todo.vue
<template>
  <div class="todo">
    <AddForm 
      @add-item="addItem"/>
    <ul>
      <li 
        v-for="item, i in itemList"
        :key="i">
          {{ item.name }}
          <button
            @click="itemList.splice(i, 1)">
            delete
          </button>
      </li>
    </ul>
  </div>
</template>
```

```html:Todo.vue
<script setup>
import AddForm from './AddForm.vue'
import { ref } from 'vue'

const itemList = ref([
  { name: "aaa"},
  { name: "bbb"}
])

const addItem = (newItemName) => {
  itemList.value.push({
    name: newItemName
  })
}
</script>
```



## AddForm.vue
Todo.vueの子コンポーネントで、新しいTodoアイテム名を入力するinput要素と、新しいTodoを追加するためのbutton要素がセットになっている。

```html:Todo.vue
<template>
  <div class="add-form">
    <form action="">
      <input v-model="newItemName" type="text">
      <button @click.prevent="$emit('addItem', newItemName)">add</button>
    </form>
  </div>
</template>
```

```html:Todo.vue
<script setup>
import { ref, defineProps } from 'vue'

defineProps(['addItem'])

const newItemName = ref("")
</script>
```

# 試したこと1: カスタムディレクティブを使う

アプリケーションのマウント後に呼び出される`mounted()`と、画面に変更があり仮想DOMの再レンダリングがされたときに呼び出される`updated()`のライフサイクルフックを使って、input にいい感じにフォーカス当てたかったけど...

```html:AddForm.vue
<script setup>
(...略)

// script setup 内ではカスタムディレクティブは
// v 始まりのキャメルケースでないとだめ
const vFocus = { 
  mounted(el){
    el.focus()
  },
  updated(el){ // 親コンポーネントであるTodo.vueの変更は検知できない...
    el.focus()
  }
}
</script>

<template>
  <div class="add-form">
    <form action="">
      <input v-focus v-model="newItemName" type="text">
      <button @click.prevent="$emit('addItem', newItemName)">add</button>
    </form>
  </div>
</template>
```

`mounted()`で`el.focus()`を実行することにより、ページ読み込み時に`input`にフォーカスを当てることはできた。

ただ、`updated()`ライフサイクルでは、自分と子コンポーネントの変更は検知できるが、親コンポーネントの変更は検知できないため、Todoの追加や削除をした後は`input`にフォーカスが行かない。


# 試したこと2: テンプレート参照

Todo.vue で AddForm.vue へのテンプレート参照を定義し、Todo.vue の画面の変更を`updated()`で補足し、 AddForm.vue 側で定義したフォーカスイベントを発火させる。

```html:Todo.vue
<script setup>
import AddForm from './AddForm.vue'
import { ref, onMounted, onUpdated } from 'vue'

const addForm = ref(null) // AddFormコンポーネントへのテンプレート参照の追加

onMounted(() => {
  addForm.value.focusInput()
})

onUpdated(() => {
  addForm.value.focusInput()
})

(...略)
</script>

<template>
  <div class="todo">
  	<!-- テンプレート参照の追加 -->
    <AddForm 
      ref="addForm"
      @add-item="addItem"/>
    <ul>
      <li 
        v-for="item, i in itemList"
        :key="i">
          {{ item.name }}
          <button
            @click="itemList.splice(i, 1)">
            delete
          </button>
      </li>
    </ul>
  </div>
</template>
```

```html:AddForm.vue
<script setup>
(...略)

const input = ref(null) // input へのテンプレート参照

const focusInput = () => {
  input.value.focus() // Todo.vue で変更があったときに呼び出される
}

(...略)
</script>

<template>
  <div class="add-form">
    <form action="">
      <!-- inputへのテンプレート参照を定義 -->
      <input ref="input" v-model="newItemName" type="text">
      <button @click.prevent="$emit('addItem', newItemName)">add</button>
    </form>
  </div>
</template>

```

すると下記エラー

```console.log
Todo.vue?ebdb:8 Uncaught (in promise) TypeError: addForm.value.focusInput is not a function
```

AddForm.vue で` focusInput() `は定義したはずなのに、、、、

調べてみると、`<script setup>`で定義したプロパティはデフォルトでは他のコンポーネントに対して公開されていないため、`defineExpose()`を使ってプロパティを明示的に公開しないといけないらしい。

>Components using `<script setup>` are closed by default - i.e. the public instance of the component, which is retrieved via template refs or $parent chains, will not expose any of the bindings declared inside `<script setup>`.To explicitly expose properties in a `<script setup>` component, use the defineExpose compiler macro:

(vue.js 3 公式ドキュメントより引用: https://v3.ja.vuejs.org/api/sfc-script-setup.html#defineexpose)

この場合、`defineExpose()`を使って、親コンポーネントに対してプロパティを明示的に公開する必要がある。

```html:AddForm.vue
import { defineExpose } from 'vue'
(...略)

defineExpose({
  focusInput // 親の Todo.vue に向けて明示的に公開
})

(...略)
```

これで、Todo を追加・削除した後に自動的に input にフォーカスが行くようになりました!

# 補足: ref、テンプレート参照について

## ref

(Vue 3 公式ドキュメント参考: https://v3.ja.vuejs.org/api/refs-api.html)

composition API では、リアクティブな値を取り扱うとき、`ref`によって値をリアクティブにする必要がある。

`ref`を用いると値は`value`プロパティを持つオブジェクトでラップされるので、scriptタグ内で値にアクセスする際は**`.value`が必要**

(ただし、テンプレート内で参照する場合**自動でアンラップされるので`.value`は必要ない**)

```html
<script setup>
 import { ref } from 'vue'

 const count = ref(1)

 const increment = () => {
   count.value ++ // <script>内では .value が必要
 }
</script>

<template>
  {{ count }}  <!-- 自動でunwrapされるので.value は不要-->
  <button @click="increment">increment</button>
</template>
```

## テンプレート参照

(Vue 3 公式ドキュメント参考: https://v3.ja.vuejs.org/guide/composition-api-template-refs.html)

`ref` を用いて、DOM 要素に対して直接アクセスすることもできる。
`<script setup>`内で`const root = ref(null)`を定義すると、アプリケーションが初期描画された後のタイミングで、`<template>`内で`ref="root"`とした要素が代入される。

```html
<script setup>
 import { ref, onMounted } from 'vue'

 const root = ref(null)
 onMounted(()=>{
   // mounted() のタイミング、つまり初期描画の後に、
   // root に div 要素が代入される。
   console.log(root.value); // <div>This is a root element.</div>
   root.value.focus() // .value でアクセスして操作などが可能
 })
</script>

<template>
  <div ref="root">This is a root element.</div>
</template>
```

Todoアプリの例のように、子コンポーネントに対して`ref`を定義することも可能

```html
<script setup>
import { ref } from 'vue'

const addForm = ref(null)
</script>

<template>
<AddForm
  ref="addForm"/>
</template>
```