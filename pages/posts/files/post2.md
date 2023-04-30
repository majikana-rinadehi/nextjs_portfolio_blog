---
title: 'テスト記事2'
date: '2022-07-13'
description: 'テスト用の記事2でーすw'
image: nextjs.png
topics: '["Linux", "awk"]'
---

# 目次 <!-- omit in toc -->
- [よく使うコマンド](#よく使うコマンド)
  - [ls](#ls)
    - [使い方](#使い方)
    - [ユースケース](#ユースケース)
  - [grep](#grep)
    - [使い方](#使い方-1)
  - [awk](#awk)
    - [使い方](#使い方-2)
    - [ユースケース](#ユースケース-1)
  - [xargs](#xargs)
    - [使い方](#使い方-3)
    - [ユースケース](#ユースケース-2)
  - [find](#find)
    - [使い方](#使い方-4)
    - [ユースケース](#ユースケース-3)
  - [cd](#cd)
  - [mkdir](#mkdir)
    - [使い方](#使い方-5)
  - [touch](#touch)
    - [使い方](#使い方-6)
    - [ユースケース](#ユースケース-4)
  - [cp](#cp)
    - [使い方](#使い方-7)
    - [ユースケース](#ユースケース-5)
  - [mv](#mv)
    - [使い方](#使い方-8)
    - [ユースケース](#ユースケース-6)
  - [rm](#rm)
    - [使い方](#使い方-9)
    - [ユースケース](#ユースケース-7)
  - [cat](#cat)
    - [使い方](#使い方-10)
    - [ユースケース](#ユースケース-8)
  - [chmod](#chmod)
  - [tar](#tar)
- [実務で応用編](#実務で応用編)
  - [ファイル名 連番 日付 一括置換 Linux コマンド](#ファイル名-連番-日付-一括置換-linux-コマンド)
- [エイリアスの作り方](#エイリアスの作り方)

# よく使うコマンド
## ls
- 指定ディレクトリにある、ファイル/ディレクトリの一覧を表示する

### 使い方
- `-l`
  - 長いフォーマットで表示する
  - `ls`使うときは基本`-l`付きで、`-ls`とか`-lsh`みたく他のオプションと組み合わせるのが多そう

  ```sh
  $ ls -l /
  # 右から順に、
  # パーミッション/ハードリンク数/ユーザ/所有者のグループ/ファイルサイズ/タイムスタンプ(最終更新日時)/ファイル・ディレクトリ名
  total 9564
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 bin/
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 cmd/
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 dev/
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 etc/
  -rwxr-xr-x 1 user-hogeee 1049089  153152 Mar 27  2021 git-bash.exe*
  -rwxr-xr-x 1 user-hogeee 1049089  152640 Mar 27  2021 git-cmd.exe*
  -rw-r--r-- 1 user-hogeee 1049089   18765 Mar 27  2021 LICENSE.txt
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 mingw64/
  dr-xr-xr-x 8 user-hogeee 1049089       0 Mar 27 17:29 proc/
  -rw-r--r-- 1 user-hogeee 1049089  199375 Mar 27  2021 ReleaseNotes.html
  drwxr-xr-x 1 user-hogeee 1049089       0 Mar 27 17:29 tmp/
  -rw-r--r-- 1 user-hogeee 1049089 1248228 Jun  2  2021 unins000.dat
  -rwxr-xr-x 1 user-hogeee 1049089 3127720 Jun  2  2021 unins000.exe*
  -rw-r--r-- 1 user-hogeee 1049089   24183 Jun  2  2021 unins000.msg
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 usr/
  ```

- `-s`
  - ファイルサイズを表示する

    ```sh
    $ ls -ls /
    total 9564
     128 drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 bin/
    ```
  - `-h`で、K, Mなどの単位を付けてわかりやすく表示
    ```sh
    $ ls -lsh /
    total 9.4M
    128K drwxr-xr-x 1 user-hogeee 1049089    0 Jun  2  2021 bin/
    4.0K drwxr-xr-x 1 user-hogeee 1049089    0 Jun  2  2021 cmd/
       0 drwxr-xr-x 1 user-hogeee 1049089    0 Jun  2  2021 dev/
    ```
- `-t`
  - 更新時間順に並び替えて表示

- `--time-style=FORMAT`
  - 時間の表示フォーマットを指定

  ```sh
  $ ls -l --time-style=+"%Y-%m-%d" /
  total 9564
  drwxr-xr-x 1 user-hogeee 1049089       0 2021-06-02 bin/

  $ ls -l --time-style=+"%Y-%m-%d %H:%M:%S"
  total 57
  -rw-r--r-- 1 nakajima-hi 1049089 28 2023-03-28 11:28:11 awk.awk
  ```

- `--ignore=PATTERN`
  - 特定のファイルを除外

  ```sh
  $ ls -l --ignore=*.exe /
  total 6204
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 bin/
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 cmd/
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 dev/
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 etc/
  -rw-r--r-- 1 user-hogeee 1049089   18765 Mar 27  2021 LICENSE.txt
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 mingw64/
  dr-xr-xr-x 8 user-hogeee 1049089       0 Mar 27 17:41 proc/
  -rw-r--r-- 1 user-hogeee 1049089  199375 Mar 27  2021 ReleaseNotes.html
  drwxr-xr-x 1 user-hogeee 1049089       0 Mar 27 17:41 tmp/
  -rw-r--r-- 1 user-hogeee 1049089 1248228 Jun  2  2021 unins000.dat
  -rw-r--r-- 1 user-hogeee 1049089   24183 Jun  2  2021 unins000.msg
  drwxr-xr-x 1 user-hogeee 1049089       0 Jun  2  2021 usr/
  ```

- `-n`
  - `-l`の、ユーザをユーザID(数字)で表示するバージョン

  ```sh
  $ ls -n /
  total 9564
  drwxr-xr-x 1 1061611 1049089       0 Jun  2  2021 bin/
  drwxr-xr-x 1 1061611 1049089       0 Jun  2  2021 cmd/
  ```

- `-o`
  - `-l`の、グループIDを表示しないバージョン

  ```sh
  $ ls -lo /
  total 9564
  drwxr-xr-x 1 user-hogeee       0 Jun  2  2021 bin/
  ```

- `1`
  - ファイル・ディレクトリ名だけ一行ずつ表示する

  ```sh
  $ ls -1
  awk.awk
  clipstudio/
  common/
  docker/
  ```

### ユースケース
- 更新日時順に並び替えたい
  - `-t`を使う

  ```sh
  $ ls -tl
  total 0
  -rw-r--r-- 1 nakajima-hi 1049089 0 Apr 10 09:23 aaa.txt
  -rw-r--r-- 1 nakajima-hi 1049089 0 Apr  1 00:00 bbb.txt
  -rw-r--r-- 1 nakajima-hi 1049089 0 Dec 31 00:00 ccc.txt
  ```

  - 古い順に並び替えたいときは、`-r`でおけ

  ```sh
  $ ls -tlr
  total 0
  -rw-r--r-- 1 nakajima-hi 1049089 0 Dec 31 00:00 ccc.txt
  -rw-r--r-- 1 nakajima-hi 1049089 0 Apr  1 00:00 bbb.txt
  -rw-r--r-- 1 nakajima-hi 1049089 0 Apr 10 09:23 aaa.txt
  ```


- フルパスで出力したい

## grep
- 標準入力の、検索条件に合致した行だけ抜き出してくれる

### 使い方
- AND検索
  - `grep xxx <filename> | grep yyy`

- OR検索
  - `grep "xxx|yyy" -E <filename>`
    - 拡張正規表現`|`を使うので`-E`オプション必要
    - 検索文字はダブルクオート囲みすること
  - `grep -e xxx -e yyy <filename>`
    - `-e`オプションを複数使う方法

- NOT検索
  - `-v`

- 大文字小文字区別しない
  - `-i`

- ファイルの行数数えたい
  - `grep . <filename> -c`
    - `-c` マッチした行数だけ表示する
  - ※追記: `wc`コマンドでも良い
    - `wc -l <filename>`

- 該当行の前後も表示する
  - `-A n`
    - 後ろn行
  - `-B n`
    - 前n行
  - `-C n`
    - 前後n行

- マッチしたうちn行だけ表示
  - `-m n`

- マッチ部分をハイライト
  - `--color=always`

- 圧縮ファイルをgrep
  - `zgrep`

## awk
- 参考: https://tech-blog.rakus.co.jp/entry/20210120/awk#anchor2
- 実はプログラミング言語の一種

### 使い方

```sh
awk 'パターン { アクション }' <filename>
```
- awkに渡した文字列が一行ずつ処理されていく
- パターン: `awk`に渡した文字列のうち、パターンに合致した行だけを処理する
  - 正規表現
  - BEGIN
  - END
  - 評価式

- アクション: 処理内容を書く

### ユースケース
- n行目だけ抜き出す
  - パターン`NR`で指定

  ```sh
  $ awk 'NR == 40 { print $1 }' temp.txt 
  Fukuoka
  ```

- n行目以降を抜き出す
  - パターン`NR`で指定

  ```sh
  $ awk 'NR > 40 { print $1 }' temp.txt 
  Saga
  Nagasaki
  Kumamoto
  Oita
  Miyazaki
  Kagoshima
  Okinawa
  ```

- 正規表現にマッチする(行全体が)ものを抜き出す
  - `awk '/正規表現/ { アクション }'`

  ```sh
  $ awk '/.a.a.a/ { print $1 }' temp.txt
  Yamagata
  Kanagawa
  Yamanashi
  Wakayama
  Okayama
  Kagawa
  Nagasaki
  ```

- 正規表現にマッチする(指定列が)ものを抜き出す
  - パターンに`$1 ~ /正規表現/`を使う

  ```sh
  $ ls -ls | awk '$2 ~ /^.{9}x/ {print $0}'
  ```

- 列の合計値を出したい
  - `END`を応用
    - 全行の読み込みが完了後に実行される処理を書く

    ```sh
    $ ls -ls | awk '{ x+=$1 }; END { print x }'
    61
    ```

- n文字目以降を抜き出したい
  - `substr()`を使用 ※インデックスは1始まりなので注意

  ```sh
  $ echo abcdefg | awk '{print substr($0, 3)}'
  cdefg
  ```
  - *短縮記法*
  ```sh
  $ echo abcdefg | awk '$0 = substr($0, 3)'
  cdefg
  ```

- ハイフン`-`付きの文字を検索したい
  - `--`の後に検索文字列を指定する

  ```sh
  $ cp --help | grep -- "-f"
  -f, --force                  if an existing destination file cannot be
                                 attempting to open it (contrast with --force)
  -x, --one-file-system        stay on this file system

  # 普通に検索しようとすると
  $ cp --help | grep "-f"
  grep: option requires an argument -- f
  Usage: grep [OPTION]... PATTERN [FILE]...
  Try 'grep --help' for more information.
  ```

## xargs
- `xargs <コマンド> <引数1> <引数2>...`
- 標準入力/ファイルから渡した、複数の引数に対してコマンドを実行できる
  - デフォルトでは、引数は空白文字で区切られたものが渡る
- コマンドを省略すると`echo`が実行
### 使い方
- `-n`
  - コマンドに一度に渡す引数の数を指定
    - 標準入力`aaa bbb`だと、引数の数は空白で区切って2個となる。
    - `-n1`では`aaa`、`bbb`が一つずつ`xargs`に引き渡される

- `-L`
  - コマンドに一度に何行を渡すか指定

- `-d`
  - 引数を区切る文字を指定
  - `-d'\n'`では改行文字で引数が区切られる

- `-E`
  - EOF(終了文字)を指定する
  - EOFに到達すると、それ以降を読み出さない
    - `xargs -E'--eof--'`

- `-a`
  - 標準入力の代わりに、ファイル名を指定できる

- `-t`
  - xargsが実行したコマンドを表示する

    ```sh
    $ grep -E .a.a.a temp.txt | xargs -n1 -t
    echo Yamagata 
    Yamagata
    echo Kanagawa 
    Kanagawa
    echo Yamanashi 
    Yamanashi
    echo Wakayama 
    Wakayama
    echo Okayama 
    Okayama
    echo Kagawa 
    Kagawa
    echo Nagasaki 
    Nagasaki
    ```

- `-r`
  - 空の入力はコマンドを実行しない
  - ※xargsは空の入力でも必ず一度はコマンド実行するのがデフォルト

- `-p`(小文字)
  - コマンド実行前に実行してもよいか確認する(`y/n`)

- `-P`(大文字)
  - 並列実行するプロセッサの数を指定(`0`は使用できる最大数を使う)

### ユースケース
- コマンドの引数に文字列を埋め込みたい
  - `-I`で指定した文字列(通常は`{}`)がコマンド引数になるので、好きな場所に置く]

  ```sh
  $ grep Hokkaido temp.txt | xargs -t -I{} echo result={}
  echo 'result=Hokkaido' 
  result=Hokkaido
  ```

## find

### 使い方
- `find <検索場所> <文字列>`

- `-type`
  - `-type f`: ファイルのみ
  - `-type d`: ディレクトリのみ

### ユースケース
- 特定の階層のみ調べたい
  - `-maxdepth n`で、今の場所からn階層の範囲だけ検索する

- 正規表現を使いたい
  - `-regextype posix-egrep -regex <正規表現>`: `grep`で`-E`をつけたときと同じ
    - `/common`以下の、30文字以上のファイル名

    ```sh
    $ find common/ -regextype posix-egrep -regex ".{30,}"
    common/Cookieって結局何者???おいしいの???.md
    common/httpsへのリダイレクトでリダイレクトループが起きる話.md
    common/OPTIONSリクエスト・プリフライトリクエストとは.md
    common/springMVCアプリをモバイル対応しよう.md
    common/全HTTPステータスコードに立ち向かってみる.md
    ```

  - `-regextype posix-bgrep <正規表現>`: `grep`で`-E`をつけないときと同じ

- 更新日時で絞り込み
  - `-newer` 特定のファイルよりも更新日時が新しい
  - `-mtime` 更新日(`0`: 今日、`1`: 昨日)
  - `-mmin`  n分以内に更新

- 一致したファイルの件数を調べたい
  - `wc -l` に渡せば良い

## cd
## mkdir

### 使い方
- `-p`
  - 親ディレクトリも同時に作成する

  ```sh
  mkdir -p ./aaa/bbb/ccc
  ```

  - ※指定しないと下記エラー

  ```sh
  mkdir ./aaa/bbb/ccc
  mkdir: cannot create directory ‘./aaa/bbb/ccc’: No such file or directory
  ```

- `-m`
  - パーミッションを設定する

## touch
### 使い方
- `touch [OPTION]... FILE...`
- すでにあるファイルの更新時間を現在時刻に書き換えできる
- ファイルが存在しない場合、空のファイルを作成する


```sh
$ ls -l temp.txt
-rw-r--r-- 1 nakajima-hi 1049089 349 Mar 29 09:16 temp.txt

$ touch temp.txt

# 更新時刻が変更されてる
$ ls -l temp.txt 
-rw-r--r-- 1 nakajima-hi 1049089 349 Apr  3 11:48 temp.txt
```

- d
  - 現在時刻のかわりに、時刻文字列を指定して更新できる

  ```sh
  $ touch temp.txt -d"2023-04-01 12:00:00"

  $ ls -l temp.txt
  -rw-r--r-- 1 nakajima-hi 1049089 349 Apr  1 12:00 temp.txt
  ```

- f
  - `--reference="filepath"`
  - 現在時刻の代わりに、指定したファイルと同じ時間で更新できる

  ```sh
  $ ls -l | grep -v ^d
  total 62
  -rw-r--r-- 1 nakajima-hi 1049089  28 Mar 28 11:28 awk.awk
  -rw-r--r-- 1 nakajima-hi 1049089 349 Apr  1 12:00 temp.txt
  -rw-r--r-- 1 nakajima-hi 1049089  36 Mar 28 13:56 xargs.txt

  $ touch temp.txt --reference="./xargs.txt"
  ```

- a
  - アクセス時間のみ変更

- m
  - 更新時間のみ変更

### ユースケース


## cp

### 使い方
- ファイル・ディレクトリをコピーする
- `-r`
  - ディレクトリを再帰的にコピーする

  ```sh
  $ cp ./test/dirA ./test2 -r

  $ cp ./test/dirA ./test2
  cp: -r not specified; omitting directory './test/dirA'
  ```

- `-f`
  - コピー先のファイルが開けない時、強制的にコピーする
### ユースケース
- 既存ファイルは上書きしたくない
  - `-n`, `--no-clobber`

## mv
- ファイル/ディレクトリの移動
- または、ファイル/ディレクトリの名前変更もできる

### 使い方
- `-f`
  - 上書き時にプロンプトで確認しない

### ユースケース

## rm
- ファイル・ディレクトリを削除する

### 使い方
- 💀死の呪文💀
  - ルートディレクトリ以下の全てが強制的に削除される。ぜったいやるな
  - 💀💀💀`rm -rf /`💀💀💀
- `-r`
  - ディレクトリを削除する
    - ※`rm`はデフォルトでディレクトリ削除できない
- `-f`
  - 強制的に削除処理を実施(プロンプトで確認しない)
- `-i`
  - 各ファイルの削除時にプロンプトで確認

  ```sh
  $ mkdir test/dirA/subDirA/text1.txt -p

  $ rm -ri test
  rm: descend into directory 'test'? y
  rm: descend into directory 'test/dirA'? y
  rm: descend into directory 'test/dirA/subDirA'? y
  rm: remove directory 'test/dirA/subDirA/text1.txt'? y
  rm: remove directory 'test/dirA/subDirA'? y
  rm: remove directory 'test/dirA'? y
  rm: remove directory 'test'? y
  ```

- `-v`
  - 処理内容を出力
    - 想定したファイルの削除ができてるかの確認に便利

  ```sh
  $ rm -v temp.txt 
  removed 'temp.txt'
  ```

### ユースケース
- 安全にファイル・ディレクトリを削除したい
  - `-ivr`オプションを習慣にしよう
  
  ```sh
  $ rm -ivr test
  rm: descend into directory 'test'? y
  rm: remove regular empty file 'test/temp.txt'? y
  removed 'test/temp.txt'
  rm: remove directory 'test'? y
  removed directory 'test'
  ```

- 指定したファイル以外を削除したい
  - `rm`にそんなオプションはなさそう。`xargs`と組み合わせ

  ```sh
  $ ll temp
  total 0
  -rw-r--r-- 1 nakajima-hi 1049089 0 Apr  3 14:02 temp.md
  -rw-r--r-- 1 nakajima-hi 1049089 0 Apr  3 14:02 temp.txt
  -rw-r--r-- 1 nakajima-hi 1049089 0 Apr  3 14:02 temp.xlsx

  # .md 以外を削除 
  $ ls temp/* -d | grep -v -E ".*\.md" | xargs rm -r
  ```

## cat
- ファイルを連結して、標準出力に表示する
- 一ファイルだけ中身を見るのにも使える
### 使い方
- `-E`
  - 各行末に`$を表示
- `-n`
  - 行番号を表示
- `-b`
  - (空の行以外に)行番号を表示
### ユースケース
- ファイルを連結して、新しいファイルを作る

  ```sh
  $ cat aaa.txt bbb.txt > ccc.txt
  ```

- ファイル + 標準入力を組み合わせて表示する
  - ファイル名の代わりにハイフン`-`を指定で、標準入力できる
  - 標準入力を終了したいときは `ctrl` + `-d`
## chmod
## tar
- 




# 実務で応用編
## ファイル名 連番 日付 一括置換 Linux コマンド
- 同ディレクトリのpngファイルのみを、`yyyy-MM-dd-hh-mm-${連番}.png`にリネームする
  - マークダウンファイルに添付する用にリネームするのに便利

```sh
$ ls -l --time-style=+"%Y-%m-%d-%H-%m" | grep png | nl | awk '{printf("%s %s-%s.png\n",$8, $7, $1)}' | xargs -n 2 mv
```

- ファイル一覧を表示

```sh
$ ls -l

total 21756
-rw-r--r-- 1 user-hogeee 1049089  807609 2023-03-22-10-03 image001.png
-rw-r--r-- 1 user-hogeee 1049089  383982 2023-03-22-10-03 image002.png
-rw-r--r-- 1 user-hogeee 1049089  182297 2023-03-22-10-03 image003.png
```

- .pngだけを抜き出し、行番号付きで表示

```sh
$ ls -l --time-style=+"%Y-%m-%d-%H-%m" | grep png | nl

1  -rw-r--r-- 1 user-hogeee 1049089  807609 2023-03-22-10-03 image001png
2  -rw-r--r-- 1 user-hogeee 1049089  383982 2023-03-22-10-03 image002png
3  -rw-r--r-- 1 user-hogeee 1049089  182297 2023-03-22-10-03 image003png
```

- `${変更前のファイル名} ${変更後のファイル名(yyyy-MM-dd-hh-mm-行番号)}`を出力

```sh
$ ls -l --time-style=+"%Y-%m-%d-%H-%m" | grep png | nl | awk '{printf("%s %s-%s.png\n",$8, $7, $1)}'

image001.png 2023-03-22-10-03-1.png
image002.png 2023-03-22-10-03-2.png
image003.png 2023-03-22-10-03-3.png
```

- `xargs -n 2 mv`に食わせて一括置換

```sh
$ ls -l --time-style=+"%Y-%m-%d-%H-%m" | grep png | nl | awk '{printf("%s %s-%s.png\n",$8, $7, $1)}' | xargs -n 2 mv
```

# エイリアスの作り方
- `~/.bashrc`にエイリアスを設定する
  - よく使うオプションで、いちいちうつのが面倒なときに便利

> ~/.bashrc
```sh
alias find ='find -regextype posix-egrep -regex'
```

- `$ source ~/.bashrc`で変更を反映しようとしたが...エラー

```sh
$ source ~/.bashrc
bash: alias: find: not found
bash: alias: =find -regextype posix-egrep -regex: not found
```

- `alias xxx`と`=`と`''`の間にスペースを入れないようにしなきゃいけない
- [参考](https://qiita.com/C_HERO/items/ede96528c1d446b535dc)

```sh
# スペースを消すこと
alias find='find -regextype posix-egrep -regex'
```

- `source ~/.bashrc`を実行 => 成功

- `alias`コマンドで設定が反映されていることを確認する
```sh
$ alias
alias find='find -regextype posix-egrep -regex'
alias ll='ls -l'
alias ls='ls -F --color=auto --show-control-chars'
alias node='winpty node.exe'
```

- ???

```sh
$ find . ".*プロジェクト.*"
find: paths must precede expression: `.*プロジェクト.*'
```

- とりあえずaliasを直す

```sh
alias find='find . -regextype posix-egrep -regex'
```

- 正規表現を指定してさっくりと検索できるようになった

```sh
$ find ".*プロジェクト.*"
./vue/vue cli を使ったプロジェクトでwebpackの設定をいじりたい.md
```
