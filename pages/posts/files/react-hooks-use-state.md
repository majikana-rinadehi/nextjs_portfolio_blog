---
title: '【React Hooksシリーズ】useState() と仲良くなろう...!'
date: '2023-08-13'
description: 'テスト用の記事2でーすw'
image: nextjs.png
topics: '["React","hooks","useState"]'
---

## `useState()` とは

[useState – React](https://react.dev/reference/react/useState)

- 言わずと知れた、コンポーネントに状態をもたせられるReact Hooksの一種です。
- 書いているほぼ全コンポーネントで使わしていただいておりますが、`useState()` のこともっと知りたい、仲良くなりたい…ッと思い、改めて調べてみることに。

### 基本的な使い方

- `useState()`をこうして引数付きで呼びだすと、、、

```jsx
const [age, setAge] = useState(23)
```

- 1.コンポーネントの状態を保持する状態変数`age`(引数に指定した値が初期値として入ります)
- 2.その状態変数に値をセットするためのメソッド`setAge` (以降、公式ドキュメントにならって *setter function* と呼びます)
- この二つをペアで得ることができます。

- コンポーネントには、こうして得た `age` を埋め込み、最新の値を表示させます。

```jsx
return (
		<>
			<div>I'm still {age} years old.</div>
			<button onClick={handleClick}>Happy birthday again😇</button>
		</>
	)
```

- `age`の値を変化させるときも、`useState()`で組みで宣言した `setAge` (*setter function*)を使う必要があります。

```jsx
// ageの値を変更するには、ageと組みで宣言したsetAgeを使います
	function handleClick() {
		setAge(age => age + 1)
	}
```

### 気になるその1.  `setAge`を使わず、`age += 1`  では だめなの？

- 状態の値の変更は、コンポーネントの再レンダリングを行わないと表示に反映されません。
- Reactでは、*setter function*を使うことで、コンポーネントの再レンダリングが実施されます。`age += 1` と、普通に値を変更した場合は再レンダリングが走らないため、表示に反映されないようです。

### 気になるその2. `useState`を使わずにできないの？？

- たとえばこんな感じで、usestateを使わずに宣言した変数を更新した場合、、、

```jsx
let age = 1

function handleClick() {
	age += 1
}

return (
	<div>I'm still {age} years old!</div>
)
```

- 状態の変更をReactが検知できないため、これもやはりコンポーネント上に変更が反映されません。
- Reactに状態の変更を通知するためには、`useState()`で生成した状態変数を使う必要があります

### 気になるその3. React Hooksがなかった頃はどうしてたの???

- React version 16.8 までは、コンポーネントはこんな感じで書いていました。
    - コンポーネントはクラスで記載します。
    - 状態は `this.state` で管理し、状態の変更は `this.setState()` で実施します。
    - `useState()`  を使った今の書き方と比べると、状態変数とその変更をいちいちオブジェクトで記載する必要があったり、後はパフォーマンス面でもHooksを使うほうが良かったりするようです。

```jsx
import React, { Component } from 'react';

class UserFormClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('User submitted:', this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="Email"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default UserFormClass;
```

### 注意⚠️ `setter function`による変更後のstateは、次のレンダリング以降に参照可能

- 公式ドキュメントでへ〜とおもったので記載です。
- `setNumber`で`number`に5を加算後、`alert`で`number`の値を表示しようとしてます。
- どうなるかというと、、、

```tsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
```

- コンポーネント上には変更後の5を足した値で正しく表示されますが、アラートには変更前のままで表示されます、、、
- 公式ドキュメントを読む限り、状態変数`number` は、厳密にはコード上で値が変更されるというよりも、React側(コンポーネントの外の世界)で状態変数を管理しており、そちらで変更されている模様。
- 変更された状態変数を元に、Reactはコンポーネントの関数を再実行(=再レンダリング)し、その実行結果(新しいJSX)をDOMに反映している、という理解です。
- 変更後の値をわざわざ変更後の`state`から取る必要もないので、実装する上では特に意識する必要もないですが、`state`がどういうものであるか、またコンポーネントの描画の理解にもなる事例だと思いました。

### ※再レンダリングについて
- 再レンダリング = reactではコンポーネントはすべてJSXを返す関数として扱われますが、そのコンポーネントの関数を改めて実行し、実行結果(JSX)でDOMの一部を更新すること、です。
    - 再レンダリング実行のタイミングとしては、`setter function` を実行した時や、親コンポーネントが再レンダリングされた時などのようです。
    - ちなみにこの再レンダリングですが、React内でパフォーマンスを最適化するため、ある程度まとまった単位でバッチ処理として走っているみたいです。

### 注意⚠️ 配列、オブジェクトの値の変更時

[useState – React](https://react.dev/reference/react/useState#updating-objects-and-arrays-in-state)

- 最初はこれ分からなくて詰まりました…
- Reactでは状態変数は *Read-only* で扱われるので、配列、オブジェクトの値を更新したい時は、値そのものの変更ではなく、新しい配列・オブジェクトを生成する書き方でやる必要があります。

### 配列

- [公式ドキュメント](https://react.dev/learn/updating-arrays-in-state)に、stateの配列操作するときに避けるもの&使うべきものがわかりやすくまとまっていたので拝借です🙏
    - 左側の列 (**配列の値自体を変更する(=mutate)**) ではなく、**新しく配列を生成できる(=copy)** 右側の列のメソッドを使う

![Untitled.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1998030/73f3f1dd-52fe-085b-2963-21bff3efb8b0.png)


- 配列の末尾に要素を加える(=`push()`)
    - 元の配列をスプレッド構文でとり、新しい要素を下に記載する方法

```jsx
setUsers(
	[
		...users,
		{ id: nextId++, name: name}
	]
)
```

- 配列の先頭に要素を加える(=`unshift()`)
    - 元の配列をスプレッド構文でとり、新しい要素を上に記載

```jsx
setArtists(
	[
		...artists,
		{ id: nextId++, name: name}
	]
)
```

- 配列から要素を取り除く(=`pop()`, `shift()`, `splice()` )
    - `filter()` を使う方法(`filter()` は元の配列は変更せず、新しい配列を生成できます)

```jsx
setItems(
	[
		items.filter(v => v.id !== item.id)		
	]
)
```

- 配列の要素を置き換える(=`splice()`, `arr[i] = …`)
    - `map()` を使う方法
    - 配列の中のオブジェクトのプロパティの書き換えも、これで対応可能です。

```jsx
setItems(
	items.map(v => v.id === item.id ? { id: v.id, name: "" } : v)
)
```

- 配列に要素を挿入する(=`splice()`)
    - `slice()` を使う方法
    - ⚠️`slice()` は元の配列を変更せず新しい配列を生成しますが、`splice()` は元の配列を変更してしまいます。。。

```jsx
setShapes(
	[
		...shapes.slice(0, insertAt),
		{ id: nextId++, name: shape.name},
		...shapes.slice(insertAt)
	]
)
```

- 配列をソートする(=`sort()`, `reverse()`)
    - 一度配列をスプレッド構文、`concat()` などでコピーしてから、コピーした配列に対して`sort()`, `reverse()` します。

```jsx
function handlerClick() {
	const nextList = [...list]
	nextList.reverse()
	setList(nextList)
}
```

### オブジェクト

- 配列と同じで、元のオブジェクトは変更せず、新しいオブジェクトを作成して`setter function` にわたす必要があります。

- ⭕️: プロパティを一つ一つ記載する
    - 元のオブジェクトを変更していないため、OK

```jsx
setPerson({
	firstName: e.target.value, // 変更したいプロパティ
	lastName: person.lastName,
	email: person.email
})
```

- ⭕️: スプレッド構文を使う
    - 上の書き方よりも記述量が減って楽です👌

```jsx
setPerson({
	...person,
	firstname: e.target.value
})
```

- ❌: 元のオブジェクトのプロパティを書き換える
    - オブジェクトが変更されたことがReactに通知されないため、ダメです😇

```jsx
person.person.firstName = e.target.value
```

## `useState` のウラ側

### *setter function*の実行時、何が起きているか

- 大体、こういう流れで処理が走っているようです。

- 1.*setter function* による、再レンダリングのトリガー
- 2.変更後の状態変数を元に、コンポーネントの再レンダリング
- 3.再レンダリングしたコンポーネントをDOMに反映

- これに関連して、Reactのコンポーネントのライフサイクルもまた別の場所でちょっと深掘りしたいですね…

## Tips

### initializerFunctionについて

- `useState()` の引数には状態の初期値をとれますが、ここに関数を指定することもできます(=*initializer function*)

```jsx
import { useState } from 'react'

function createInitialTodos() {
	return [
		{id: 1, name: "Learn react."},
		{id: 2, name: "Grab a quick lunch."},
	]
}

export default function TodoList() {
	const [todos, setTodos] = useState(createInitialTodos)

	return (
		<ul>
			{todos.map(v => (
				<li key={v.id}>
					{v.name}
				</li>
			))}
		</ul>
	)
}
```

- コンポーネントの初期化時、 *initializer function* が呼ばれ、その戻り値が状態の初期値としてコンポーネントに保持されます。(以降のレンダリング時は、*initializer function* は無視されます。)
- 指定できる *initializer function* の条件は下記
    - 純粋関数である(関数の外部の状態を変更せず、外部への影響も与えない)
    - 引数を取らない
    - 値を返却する

- ⚠️`useState(createInitialTodos())` のように、関数の戻り値、実行結果を指定ではなく、`useState(createInitialTodos)` のように関数そのものを指定する必要があります
    - そうしないと、コンポーネントの再レンダリングのたびに `createInitialTodos()` が実行され、非効率なようです。
    - 初期値なので、コンポーネントの初期化時のみに実行されれば。関数そのものを渡してあげれば、初期化時のみに実行され、無駄がなく良いようです。