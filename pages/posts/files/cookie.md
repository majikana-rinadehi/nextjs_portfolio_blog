---
title: 'Cookieとは?'
date: '2022-07-13'
description: 'テスト用の記事2でーすw'
image: nextjs.png
topics: '["Web","cookie", "ブラウザ"]'
---

# cookieとは？
## cookieの定義
- サーバからのレスポンスでブラウザに送られ、以降一定期間の間ブラウザに保存され、送信されるデータのこと。

## なぜ必要
### ステートレスなHTTP通信に、ステートフルな情報を期限付きで付加できるから
- 一定期間の間、毎リクエストでクッキー`Cookie: key=value`が送信される
- ブラウザ側で保持しておきたい情報やユーザの設定値を格納できる
- ユーザ認証に使える(ログイン情報を保持する)
## いつ使うの
- セッション管理
	- ログイン、ショッピングカートなど
- ユーザ設定
- トラッキング
## ヘッダー一覧
### `Set-Cookie`
- サーバがレスポンスで設定し、ブラウザに「この`Cookie`を保存しとけ、あとリクエスト毎に送信して来い」と指示する。

```
Set-cookie: cookie-price=130;cookie-kind=choco;
```

- また、有効期限なども設定できる
	- `Max-Age`:期間で指定
	- `Expires`:日付時刻で指定
	- `HttpOnly`:Javascriptの`document.cookie`によってアクセスできないようにする
	- `Secure`:HTTPSのみで`Cookie`を送信する(HTTPでは送られない)

```
Set-cookie: id=xxx; Expires=Thu,21 Dec 2022 12:00:00 GMT; Secure; HttpOnly
```


### `Cookie`
- `Set-cookie`で送信されてきたCookieが、リクエスト時にこのヘッダーに設定される
```
Cookie: id=xxx; cart-item=yyy;
```

## リスクと対策
### 性能面
- 毎リクエストで送信されるので、Cookieが大きいと通信性能が悪化
- **対策**:クライアント側で保存しておきたいデータは、代わりに`WebStorage API`や`IndexedDB`をつかう

### セキュリティ面
- 中間者攻撃
	- 暗号化されていない`HTTP`通信の場合、中間者に`Cookie`を傍受されるかも
	- **対策**: `Set-cookie`で`Secure`を設定し、`HTTPS`でのみ`Cookie`が送られるようにする

- **XSS(クロスサイトスクリプティング)攻撃**
> XSS攻撃: 攻撃者が悪意のあるスクリプトをクライアント側に埋め込み、ユーザがアクセスなどしたときに実行させる 

  - フォームなどの入力時に埋め込まれた悪意のあるスクリプトから、`Cookie`が参照され悪用される可能性がある
    - **対策**:`Set-cookie`で`HttpOnly`を設定し、Javascriptから`Cookie`が参照されないようにする

- **CSRF(クロスサイトリクエストフォージェリ)**
	- 古い呼び方だと「イメタグ攻撃」
	- 意図しないリクエストをWebサーバへ送信させる攻撃。
		- 例: 銀行口座から100ドルを送金するGETリクエスト`GET http://bank.com/transfer.do?acct=BOB&amount=100 GTTP/1.1`を`img`タグの`src`に埋め込み、ローディング時に発火させる
	- `Cookie`の有効期限が切れていない状態でこれを踏むと...
	- **対策**
		- CSRFトークンをサインインごとに再生成し、リクエストごとにヘッダーに含めるようにする。サーバ側でチェックし、期待値でなければリクエストを中止する。
		- `Cookie`の有効期限を短くする(`SameSite`属性を`Strict`or`Lax`に設定)
