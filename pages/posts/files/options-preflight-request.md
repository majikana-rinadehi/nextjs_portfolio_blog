---
title: 'OPTIONSリクエスト。プリフライトリクエストとは'
date: '2023-04-13'
description: 'テスト用の記事1でーすw'
image: nextjs.png
topics: '["Web","ブラウザ","プリフライトリクエスト","Options"]'
---

## OPTIONSリクエスト
- サーバが許可しているリクエストメソッドの情報を取得できるメソッド
  - レスポンスヘッダの`Allow`に、サーバで許可されたメソッドが入る

```sh
$ curl -X OPTIONS http://hoge.com/fuga -i
HTTP/1.1 200 
Allow: POST,OPTIONS
Accept-Patch:
Transfer-Encoding: chunked
Date: Mon, 05 Dec 2022 09:29:39 GMT
```

## プリフライトリクエスト
- CORSのリクエストを行う前に、ブラウザが自動的に実行する`OPTIONS`リクエストのこと
  - サーバにCORSのリクエストを送れるかどうかを確かめる。
  - `Access-Control-Request-Method`、`Access-Control-Request-Headers`、`Origin`の３つのヘッダーを送る。
- 例:

```
OPTIONS /resource/foo
Access-Control-Request-Method: DELETE <= 送るリクエストのメソッド
Access-Control-Request-Headers: origin, x-requested-with <= 送るヘッダー
Origin: https://foo.bar.org <= リクエスト元のオリジン

HTTP/1.1 204 No Content
Connection: keep-alive
Access-Control-Allow-Origin: https://foo.bar.org <= CORSを許可するオリジン
Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE <= 許可するメソッド
Access-Control-Max-Age: 86400 <= プリフライトリクエストの結果をキャッシュする時間
```

## いつ発生するのか
- 超ざっくりいうと、`GET`以外のほとんどのリクエスト！！！
    - 例外:[単純リクエスト](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS#simple_requests)
    - `POST`でも、特定の条件(`Content-Type `が `application/x-www-form-urlencoded ` など → 単純にブラウザからformをポストするだけ)なら単純リクエストになる。
 
 
## なぜ必要なのか
- 行おうとしているリクエストをサーバが許可しているか、事前に調べるため
  - 許可していない場合はリクエストを中断して、CORSエラーとなる。

## プリフライトで出てくるヘッダー集
### リクエストヘッダー
- `Access-Control-Request-Method`
    - 送ろうとしてるリクエストメソッド 
- `Access-Control-Request-Headers`
    -  送ろうとしてるヘッダー
- `Origin`
    - リクエスト元のオリジン 
 
### レスポンスヘッダー  
- `Access-Control-Allow-Methods`
    - サーバが許可しているリクエストメソッド 
- `Access-Control-Allow-Headers`
    - サーバが許可してるヘッダー
- `Access-Control-Max-Age`
    - プリフライトレスポンス内容をキャッシュする時間 
- `Access-Control-Allow-Origin`
    - サーバでCORS許可しているオリジン 

## 参考
https://developer.mozilla.org/ja/docs/Glossary/Preflight_request