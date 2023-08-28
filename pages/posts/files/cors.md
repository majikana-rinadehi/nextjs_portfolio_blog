---
title: 'CORSとは'
date: '2022-07-13'
description: 'テスト用の記事2でーすw'
image: nextjs.png
topics: '["Web","CORS", "ブラウザ"]'
---

## CORSの定義
- Cross Origin Resource Sharing
- 違うオリジン間で通信する時、その通信を許可するかしないかということ。
  - `オリジン` = `URLのスキーマ + ドメイン + ポート番号`
  - 一つでも違うと、「別オリジン」になる
    - https://aaa.com、https://bbb.com は別オリジン

## いつ使うの
- CORSはブラウザの機能なので、**ブラウザから通信する時**だけ関係ある。
  - 例: フロント`https://react.front` => バックエンド`https://go.api` の通信 => CORSに引っかかる
  - APIからの通信ではCORSは**適用されない**。
  - 例: https://hoge.api => https://fuga.api のAPI間で Javaの RESTTemplate、URLConnectionとかで通信はCORSに引っかから**ない**
- 基本的に、オリジンが違うとCORSに引っかかる
  - CORSを貫通したい場合、バックエンド側(通信される側)で特別に指定する必要がある

## CORSいらんくない？
- 違うオリジンから勝手に通信されたらまずいですよ...まずいでしょうよ...
  - 通信される側の方で、「お前通信してきていいよ」って指定できるので便利だよね

## 資格情報付き
- `cookie`ヘッダーとかが付いたリクエストのこと
- 資格情報: `Cookie`、`認証ヘッダー`、`TLSクライアント証明書`
- 実装的にはこうなってるときを指す。
- XHR
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/', true);
xhr.withCredentials = true;
xhr.send(null);
```
- Fetch
```js
fetch(url, {
  credentials: 'include'
})
```

## ヘッダー一覧
### Access-Control-Allow-Origin
- 基本。通信できるオリジンを指定する。
  - `*`で全オリジンを許可。ただし、[資格情報付き][1]でリクエストする場合は`*`は使えない(ブラウザコンソールでCORSエラーが発生する)
    - `*`の代わりに、`https://aaa.com`のように明示的に指定すればよい
```
Access-Control-Allow-Origin: *

Access-Control-Allow-Origin: https://aaa.com
```

### Access-Control-Allow-Credentials
- [資格情報付き][1]でリクエストする場合、`true`にしないとだめ。(trueにしないと、資格情報付きリクエストのときにレスポンスがフロントに公開されない)
```
Access-Control-Allow-Credentials: true
```


### Access-Control-Request-Method
- 実際のリクエストで使うメソッドをサーバに知らせる
  - プリフライトリクエスト時にこのヘッダーを使う
```
Access-Control-Request-Method: POST,GET,DELETE
```

### Access-Control-Request-Headers
- 実際のリクエストで使うヘッダーをサーバに知らせる
  - プリフライトリクエスト時にこのヘッダーを使う
```
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

### Access-Control-Max-Age
- プリフライトリクエストの結果をキャッシュする上限時間(秒)
  - プリフライトリクエスト一回送ってからこの時間の間は送らなくて良くなる
```
Access-Control-Max-Age: 86400
```

## CORSエラー事例
### 1.GolangのAPIサーバに、フロントからアクセス
  - http://localhost:3000 => http://localhost:8080/complaints

 
```log
xhr.js:220          GET http://localhost:8080/complaints net::ERR_FAILED 200
Access to XMLHttpRequest at 'http://localhost:8080/complaints' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

- これで解決
 
```go
import (
    "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
    ...
    router := gin.Default()

	// CORS設定
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	router.Use(cors.New(config))
    ...
    router.Run()

}
```

[1]:#資格情報付き