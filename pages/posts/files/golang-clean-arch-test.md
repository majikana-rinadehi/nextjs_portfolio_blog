---
title: 'Golang×クリーンアーキテクチャのRest APIでテストを書こう'
date: '2023-08-01'
description: 'テスト用の記事2でーすw'
image: nextjs.png
topics: '["Go","クリーンアーキテクチャ","テスト"]'
---

## 概要

- Golangで書いた簡単なRest API のテストコードを書いてみた記事です。

## 構成

- handler
    - HTTPリクエストを処理するハンドラー関数。
- usecase
    - ビジネスロジック、各種操作の実行、ハンドラーとリポジトリの橋渡し。
- repository
    - DBと接続し、CRUD操作を実施。

<h2>ディレクトリ構成(抜粋)</h2>

<details><summary>詳細</summary> 

- 微妙なところはあるかもです。utilとかの置き場所は今考えると微妙です( `internal` のほうが良いかも)。

```bash
.
├── go.mod
├── go.sum
├── internal #外部に公開しない、プロジェクト内のみで使うロジック。リポジトリの実装もここ。
│   ├── config
│   └── repositories #リポジトリ層(DB操作)
│       ├── fixtures
│       │   └── stocks.yaml
│       ├── stock_category_repository.go
│       ├── stock_repository.go
│       ├── stock_repository_test.go
│       └── user_repository.go
├── main.go #アプリケーションのエントリポイント
├── pkg
│   ├── adapters #外部(=データベース、HTTPなど)とのやりとりを担当。
│   │   ├── database.go #DB接続処理の実装
│   │   ├── handlers #ハンドラー層(HTTPリクエストを処理する)
│   │   │   ├── stock_category_handler.go
│   │   │   ├── stock_handler.go
│   │   │   ├── stock_handler_test.go
│   │   │   └── user_handler.go
│   │   └── http.go #ルーティングのセットアップ
│   ├── entities #エンティティクラス
│   │   ├── stock.go
│   │   ├── stock_category.go
│   │   └── user.go
│   ├── interfaces #クリーンアーキテクチャ各層のインターフェース
│   │   ├── database.go
│   │   ├── handlers
│   │   │   ├── error_struct.go
│   │   │   ├── response_struct.go
│   │   │   ├── stock_category_handler.go
│   │   │   ├── stock_handler.go
│   │   │   └── user_handler.go
│   │   ├── repository.go
│   │   └── usecases #ビジネスロジック、各種操作の実行、ハンドラーとリポジトリの橋渡し
│   │       ├── stock_category_uc.go
│   │       ├── stock_uc.go
│   │       └── user_uc.go
│   └── usecases #ユースケース層
│       ├── stock_category_uc.go
│       ├── stock_uc.go
│       └── user_uc.go
└── util #プロジェクト全体で使用されるユーティリティ関数、ヘルパー関数
    ├── customStringer.go
    ├── test
    │   └── templates #cwell/gotestsによるテストコード自動生成用のテンプレートファイル
    │       └── handler
    │           ├── call.tmpl
    │           ├── function.tmpl
    │           ├── header.tmpl
    │           ├── inline.tmpl
    │           ├── inputs.tmpl
    │           ├── message.tmpl
    │           └── results.tmpl
    ├── testUtil
    │   └── testUtil.go
    └── validator.go
```

</details>


## テスト観点✅

- 各層のテスト観点です(超基本的なものだけ)

### ハンドラー層

- 1.正しいレスポンス構造、処理結果に応じたHTTPステータスコードを返却
- 2.リクエスト値の入力バリデーションを正しく実施

### ユースケース層

- 1.ハンドラー層から渡った値をもとに正しくリポジトリ層のメソッドを呼び出す
- 2.ビジネスロジックを正しく実行
- 3.エラーハンドリングを行い、ハンドラー層に返却

### リポジトリ層

- CRUDに応じてこんな感じ
    - C
        - 正しくレコードにインサートする
    - R
        - 検索条件で、取得件数、レコードを正しく取得
    - U
        - 対象のレコードを正しく更新
    - D
        - 対象のレコードを正しく削除

## テスト実施🔥

- 上で上げたテスト観点を元に、各層のテストコードを書いていきましょう。

## ハンドラー層

- 前提: webフレームワークは`gin`を使用

https://github.com/gin-gonic/gin

### セットアップ

- 依存するユースケースのモックを作成
    - テスト用に、ハンドラー層から呼び出すユースケースのメソッドのモックを作成します。
    - モック作成に使ったのは [`stretchr/testify/mock`](http://github.com/stretchr/testify/mock)
        - [参考](https://zenn.dev/aiiro/articles/cfc7c2e9a8e53a)

```go
type MockUsecase struct {
	mock.Mock
}

func (m *MockUsecase) GetAllStocks() ([]*entities.Stock, error) {
	args := m.Called()
	return args.Get(0).([]*entities.Stock), args.Error(1)
}
```

- ユースケースのモックを実装
    - 正常系のモック(取得結果を返却)と、異常系のモック(エラーを返却)を作成してます

```go

func TestStockHandler_GetAllStocks(t *testing.T) {

	mockUsecase, mockUsecaseErr := new(MockUsecase), new(MockUsecase)

	// TODO: implement mock method
	mockUsecase.On("GetAllStocks").Return(mockStockList, nil)
	mockUsecaseErr.On("GetAllStocks").Return([]*entities.Stock{}, errors.New("db error"))
  ...
}
```

- 正常系で返す取得結果は、こんな感じで定数化してます

```go
var mockStockList = []*entities.Stock{
	{
		Id:         1,
		UserId:     1,
		CategoryId: 1,
		Name:       "きゅうり",
		Amount:     1,
		ExpireDate: "2023-07-14",
	},
	{
		Id:         2,
		UserId:     2,
		CategoryId: 2,
		Name:       "酢",
		Amount:     2,
		ExpireDate: "2023-07-14",
	},
}
```

- テスト対象のハンドラーを初期化(依存するユースケース層を注入)

```go
h := &StockHandler{
	stockUsecase: tt.fields.stockUsecase,
}
```

- 次に、ハンドラー関数にHTTPリクエストを送る
- Standard Libraryの `net/http/httptest` で、テスト用の `ResponseRecorder` を作成
- `ResponseRecorder` を `*gin.CreateTestContext()` に渡し、テスト用の `*gin.Context` を作成する
- テスト対象のハンドラーのメソッドを呼び出す
    - レスポンスボディ、ステータスコードなどが書き込まれた `*gin.Context` が、 `got` に入る。

```go
// Setup gin context
w := httptest.NewRecorder()
c, _ := gin.CreateTestContext(w)

got := h.GetAllStocks(c)
```

### テスト結果検証

> *1.正しいレスポンス値、処理結果に応じたHTTPステータスコードを返却*
> 
- ステータスコードの検証
    - `ResponseWriter` に、ステータスコード、レスポンスボディなどが書き込まれている。
    - `ResponseWriter.Status()` で、書き込まれたステータスコードの取得ができる

```go
// Assert status code
if !reflect.DeepEqual(got.Writer.Status(), tt.wantStatus) {
	t.Errorf("StockHandler.GetAllStocks() = %v, wantStatus %v", got.Writer.Status(), tt.wantStatus)
}
```

- レスポンス値の検証
    - `ResponseRecorder` に書き込まれているレスポンスボディ( `[]byte` )を `json.Unmarshal()` でエンティティにマッピングして、期待値のエンティティと比較
    
    ```go
    // Assert response body
    var gotBody handlers.Response[*entities.Stock]
    json.Unmarshal(w.Body.Bytes(), &gotBody)
    if !reflect.DeepEqual(gotBody, tt.wantBody) {
    	t.Errorf("StockHandler.GetAllStocks() = %v, wantBody %v", gotBody, tt.wantBody)
    }
    ```
    
    - 注: `Unmarshal()` のターゲットはポインタ!
    
    - ちなみに、jsonの値と、`json.Unmarshal()` が構造体にマッピングする値の対応はこれ
        - jsonの数値は `float64` にマッピングされるのか。
        
        ```go
        To unmarshal JSON into an interface value, Unmarshal stores one of these in the interface value:
        
        bool, for JSON booleans
        float64, for JSON numbers
        string, for JSON strings
        []interface{}, for JSON arrays
        map[string]interface{}, for JSON objects
        nil for JSON null
        ```
        

> *2. リクエスト値の入力バリデーションを正しく実施*
> 
- 不正なリクエスト値に対し、入力バリデーションエラーメッセージを正しく返せてるかを検証!

- ハンドラーでの必須チェック、桁数チェック、文字種チェックに関しては、`go-ozzo/ozzo-validation/v4` でバリデーションを実装している。
    - チェックエラーに該当したメッセージすべてを、レスポンス構造の配列 `Errors` に格納して返却している
    - 例:
    
    ```go
    Response: {
        total: 0,
        results: [],
        errors: [
                {
                        message: Param 'expireDate' must be a 'YYYY-MM-DD'.
                },
    
                {
                        message: Param 'name' length must be <= '255'.
                },
    					  ],
      }
    ```
    

- テストケースでも、期待されるメッセージの配列 `Errors` を記述します。
- ただし、配列の中でメッセージの出現する順番が期待値と違うと、レスポンスと期待値の比較で当然テストFailとなってしまう…
- ハンドラー実装、テストケースの両方で、メッセージ文字列の昇順で構造体をソートしてこれを回避しています。
- テストケース
    - `SortErrorResponse` で期待値のエラーリストを並び替え

```go
{
			name: "400_invalidType",
			fields: fields{
				stockUsecase: mockUsecase,
			},
			args: &entities.Stock{
				Id:         1,
				UserId:     1,
				CategoryId: 1,
				// 256 length
				Name:       "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUV",
				Amount:     1,
				ExpireDate: "2023-99-99",
			},
			wantStatus: 400,
			wantBody: handlers.Response[*entities.Stock]{
				Total:   0,
				Results: nil,
				Errors: handlers.SortErrorResponse([]*handlers.ErrorResponse{
					{
						Message: util.MaxLengthErrMsg("name", 255),
					},
					{
						Message: util.InvalidTypeErrMsg("expireDate", "YYYY-MM-DD"),
					},
				}),
			},
		},
```

- ハンドラー実装
    - `SortErrorResponse` で返却値のエラーリストを並び替え

```go
c.JSON(http.StatusBadRequest, &Response[any]{
	Total:   0,
	Results: nil,
	Errors:  SortErrorResponse(errors),
})
```

- ちなみに `SortErrorResponse` はこんな感じ。文字列を含む構造体の並び替え、もっとうまい方法知っている人がいたら教えてください…
    
    ```go
    func SortErrorResponse(errorList []*ErrorResponse) []*ErrorResponse {
    	sorted := make([]*ErrorResponse, len(errorList))
    	// 配列のディープコピー
    	for i, err := range errorList {
    		newErr := &ErrorResponse{
    			Message: err.Message,
    		}
    		sorted[i] = newErr
    	}
    	// sort.Slice, sort.SliceStableではうまく並び替えられなかった
    	sortByMessage(sorted)
    	return sorted
    }
    
    // sortByMessageは、ErrorResponseの配列をMessageの辞書順(昇順)で並び替えます。
    // バブルソートのアルゴリズムを使用しています。
    func sortByMessage(list []*ErrorResponse) {
    	length := len(list)
    	if length <= 1 {
    		return
    	}
    
    	for i := 0; i < length-1; i++ {
    		minIndex := i
    		for j := i + 1; j < length; j++ {
    			if list[j].Message < list[minIndex].Message {
    				minIndex = j
    			}
    		}
    		if minIndex != i {
    			list[i], list[minIndex] = list[minIndex], list[i]
    		}
    	}
    }
    ```
    

### テストケース例

- 在庫データを全取得する `GetAllStocks`
    - ステータスコード200(正常系)と500(システムエラー)

```go
tests := []struct {
		name       string
		fields     fields
		args       args
		want       *gin.Context
		wantStatus int
		wantBody   handlers.Response[*entities.Stock]
	}{
		// TODO: Add test cases.
		{
			name: "200",
			fields: fields{
				stockUsecase: mockUsecase,
			},
			wantStatus: 200,
			wantBody: handlers.Response[*entities.Stock]{
				Total:   len(mockStockList),
				Results: mockStockList,
				Errors:  nil,
			},
		},
		{
			name: "500",
			fields: fields{
				stockUsecase: mockUsecaseErr,
			},
			wantStatus: 500,
			wantBody: handlers.Response[*entities.Stock]{
				Total:   0,
				Results: nil,
				Errors: []*handlers.ErrorResponse{
					{
						Message: "GetAllStocks failed",
					},
				},
			},
		},
```

- 在庫を作成する `CreateStock`
    - ステータスコード400(リクエスト値不正) のみ抜粋
        - 必須チェックエラー、桁数・文字種チェックエラーを用意

```go
{
			name: "400_empty",
			fields: fields{
				stockUsecase: mockUsecase,
			},
			args:       &entities.Stock{},
			wantStatus: 400,
			wantBody: handlers.Response[*entities.Stock]{
				Total:   0,
				Results: nil,
				Errors: handlers.SortErrorResponse([]*handlers.ErrorResponse{
					{
						Message: util.RequiredErrMsg("id"),
					},
					{
						Message: util.RequiredErrMsg("categoryId"),
					},
					{
						Message: util.RequiredErrMsg("userId"),
					},
					{
						Message: util.RequiredErrMsg("amount"),
					},
					{
						Message: util.RequiredErrMsg("name"),
					},
					{
						Message: util.RequiredErrMsg("expireDate"),
					},
				}),
			},
		},
		{
			name: "400_invalidType",
			fields: fields{
				stockUsecase: mockUsecase,
			},
			args: &entities.Stock{
				Id:         1,
				UserId:     1,
				CategoryId: 1,
				// 256 length
				Name:       "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUV",
				Amount:     1,
				ExpireDate: "2023-99-99",
			},
			wantStatus: 400,
			wantBody: handlers.Response[*entities.Stock]{
				Total:   0,
				Results: nil,
				Errors: handlers.SortErrorResponse([]*handlers.ErrorResponse{
					{
						Message: util.MaxLengthErrMsg("name", 255),
					},
					{
						Message: util.InvalidTypeErrMsg("expireDate", "YYYY-MM-DD"),
					},
				}),
			},
		},
```

## ユースケース層

- ※追記予定!

## リポジトリ層

### mockを使う? OR 実際のDBに接続?

- mock: **`go-sqlmock`** など。DBのモックを立てて、返却するレコードの指定、発行SQLの検証ができる。
- 実際のDBに接続: テスト用のDBのコンテナを作って、実際に接続してCRUD操作をやる。

### ⇒ 実際のDBに接続することに

- mockよりややテスト実装、テスト用DBの用意など面倒だが、確実性(mockで検出できない環境依存のバグ)とか考えると実DBに繋いだほうがいい…良くない?
    - テストデータの用意に関しても、`go-testfixtures/testfixtures` で自動化できる!!!

### セットアップ

- 予め、開発環境と同じDBコンテナを用意しておく。
    - ⚠️テスト用DBのスキーマ名に `test` を含まないと、`testfixtures` でデータの投入ができない
    
    ```go
    panic: testfixtures: database "manage_stock" does not appear to be a test database
    ```
    
    > In order to prevent you from accidentally wiping the wrong database, this package will refuse to load fixtures if the database name (or database filename for SQLite) doesn't contains "test".
    > 
- テスト用DBに入れるテストデータを、yamlファイルで用意しておく。
    - stocks.yaml
    
    ```yaml
    - id: 1
      user_id: 1
      category_id: 1
      name: きゅうり
      amount: 1
      expire_date: 2023-01-01 0:00:00
    ```
    

- https://github.com/go-testfixtures/testfixtures で、yamlファイルで用意しておいたテストデータをテスト用テーブルに投入。
    - ちなみに、[railsのDBテスト方法](https://guides.rubyonrails.org/testing.html#the-test-database)に近い思想。

```go
const (
	fixturesDirRelativePathFormat = "%s/../../internal/repositories/fixtures"
)

func SetupFixtures() {

	a := new(adapters.DatabaseAdapter)
	// テスト用DBへの接続
	a.Connect(true)
	db, _ := a.GetDB()
	sqlDb, _ := db.DB()

	// テストDBに投入するデータ(yamlファイル)の配置場所を指定
	_, pwd, _, _ := runtime.Caller(0)
	dir := fmt.Sprintf(fixturesDirRelativePathFormat, path.Dir(pwd))

	fmt.Println("dir:", dir)

	fixtures, err := testfixtures.New(
		testfixtures.Database(sqlDb),  // You database connection
		testfixtures.Dialect("mysql"), // Available: "postgresql", "timescaledb", "mysql", "mariadb", "sqlite" and "sqlserver"
		testfixtures.Directory(dir),   // The directory containing the YAML files
	)

	if err != nil {
		panic(err)
	}

	if err := fixtures.Load(); err != nil {
		panic(err)
	}
}
```

- テスト用DBに接続

```go
a := adapters.NewDatabaseAdapter()
a.Connect(true)
```

- テスト用DBに接続した`adapter` の注入、テスト対象のリポジトリのメソッドの実行

```go
r := &StockRepository{
	dbAdapter: tt.fields.dbAdapter,
}
gotStocks, err := r.FindAll()
```

### Create

> *ユースケース層から渡った値を正しくレコードにインサートする*
> 
- テストDBに挿入されたレコードを実際に取得して確かめる必要あり
    - ↓↓↓メソッドの定義的には作成した在庫が返却されるように見えるが、
    - 実際はユースケースから受け取った在庫オブジェクトをそのまま返しているだけ😋
    - なので、結局テストDBの中を見に行く必要がある
    
    ```go
    func (r *StockRepository) Save(stock *entities.Stock) (*entities.Stock, error) {
    	db, dbErr := r.dbAdapter.GetDB()
    	if dbErr != nil {
    		return nil, dbErr
    	}
    
    	if err := db.Create(&stock).Error; err != nil {
    		return nil, err
    	}
    
    	return stock, nil
    }
    ```
    
- 期待値の検証
    - リポジトリによるインサート後、`*gorm.DB.Find()` で挿入されたレコードをselectしています。

```go
r := &StockRepository{
	dbAdapter: tt.fields.dbAdapter,
}
got, err := r.Save(tt.args.stock)

if err != nil && err != tt.wantErr {
	t.Errorf("StockRepository.Save() error = %v, wantErr %v", err, tt.wantErr)
	return
}
if !reflect.DeepEqual(got, tt.want) {
	t.Errorf("StockRepository.Save() = %v, want %v", got, tt.want)
}

// データがインサートされていることを確認
gormDb, _ := tt.fields.dbAdapter.GetDB()

var insertedStocks []*entities.Stock
gormDb.Find(&insertedStocks, tt.args.stock.Id)

if !reflect.DeepEqual(tt.args.stock, insertedStocks[0]) {
	t.Errorf("StockRepository.Save() :Correct row sholud be inserted."+
		"want = %v, got = %v", tt.args.stock, insertedStocks[0])
}

t.Logf("insertedStocks: %v", insertedStocks)
```

- テストケース例

```go
tests := []struct {
		name    string
		fields  fields
		args    args
		want    *entities.Stock
		wantErr error
	}{
		// TODO: Add test cases.
		// normal
		{
			name: "NORMAL",
			fields: fields{
				dbAdapter: a,
			},
			args: args{
				stock: &entities.Stock{
					Id:         999,
					UserId:     999,
					CategoryId: 999,
					Name:       "テスト",
					Amount:     1,
					ExpireDate: "2023-01-01T00:00:00+09:00",
				},
			},
			want: &entities.Stock{
				Id:         999,
				UserId:     999,
				CategoryId: 999,
				Name:       "テスト",
				Amount:     1,
				ExpireDate: "2023-01-01T00:00:00+09:00",
			},
			wantErr: nil,
		},
		// insert error
	}
```

### Read

> *ユースケース層から渡った検索条件で、取得件数、レコードを正しく取得*
> 
- 取得結果と期待値の検証

```go
gotStocks, err := r.FindAll()
if !reflect.DeepEqual(gotStocks, tt.wantStocks) {
	t.Errorf("StockRepository.FindAll() = %v, want %v", gotStocks, tt.wantStocks)
}
```

- テストケース例

```go
tests := []struct {
		name       string
		fields     fields
		wantStocks []*entities.Stock
		wantErr    error
	}{
		// TODO: Add test cases.
		{
			name: "NORMAL",
			fields: fields{
				dbAdapter: a,
			},
			wantStocks: []*entities.Stock{
				{
					Id:         1,
					UserId:     1,
					CategoryId: 1,
					Name:       "きゅうり",
					Amount:     1,
					ExpireDate: "2023-01-01T09:00:00+09:00",
				},
			},
			wantErr: nil,
		},
	}
```

- テストデータ
    - stocks.yaml
    
    ```yaml
    - id: 1
      user_id: 1
      category_id: 1
      name: きゅうり
      amount: 1
      expire_date: 2023-01-01 0:00:00
    ```
    

### Delete

- リポジトリのメソッドの戻り値は `error` だけ
- Createと同じく実際のDB上で目的のレコードが削除されていることを確認する必要があります。
    - ↓↓↓リポジトリ実装
    
    ```go
    func (r *StockRepository) DeleteById(id int) error {
    	db, dbErr := r.dbAdapter.GetDB()
    	if dbErr != nil {
    		return dbErr
    	}
    
    	if err := db.
    		Clauses(clause.Returning{}).
    		Where("id = ?", id).
    		Delete(&entities.Stock{}).Error; err != nil {
    		return err
    	}
    
    	return nil
    }
    ```
    
- 期待値の検証
    - リポジトリによるレコードの削除後、`*gorm.DB.QueryRow()` で削除対象のレコードが存在しないことを確認しています。

```go
r := &StockRepository{
	dbAdapter: tt.fields.dbAdapter,
}
if err := r.DeleteById(tt.args.id); err != nil && err != tt.wantErr {
	t.Errorf("StockRepository.DeleteById() error = %v, wantErr %v", err, tt.wantErr)
}
// テストデータが削除されていることを確認
var count int
gormDb, _ := tt.fields.dbAdapter.GetDB()
db, _ := gormDb.DB()
db.QueryRow("select count(*) from stocks where id = ?", tt.args.id).Scan(&count)

if !reflect.DeepEqual(count, 0) {
	t.Errorf("StockRepository.DeleteById() :Row sholud be deleted")
}

t.Logf("count: %d", count)
```

- テストケース例

```go
tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr error
	}{
		// TODO: Add test cases.
		{
			"NORMAL",
			fields{
				dbAdapter: a,
			},
			args{
				id: 1,
			},
			nil,
		},
	}
```

### 異常系(DB接続エラーなど)

- ※追記予定!

## 詰まったところ

### 1. `204:No Content`を返すHandlerで、テストでは`200`が返ってきてしまう

> Handler.go
> 

```go
func (ch complaintHandler) DeleteByComplaintId(c *gin.Context) {
  ...
  // 204をステータスコードにセットする
  c.Status(http.StatusNoContent)
}

```

> HandlerTest.go
> 

```go
w, c := testutils.SetupGinContext()
ch := complaintHandler{
complaintUseCase: tt.fields.complaintUseCase,
}
ch.DeleteByComplaintId(c)

// w.Codeに200がセットされている
if !reflect.DeepEqual(w.Code, tt.wantStatus) {
  t.Errorf("complaintHandler.DeleteByComplaintId() = %v, want %v", w.Code, tt.wantStatus)
}

```

- [gin.CreateTestContext() may happen that the status code unexpected.](https://github.com/gin-gonic/gin/issues/3569)
- `httptest.ResponseRecorder`ではなく、`gin.Context.Writer.Status()`で取得すると正しく`204`になった

```go
if !reflect.DeepEqual(c.Writer.Status(), tt.wantStatus) {
  t.Errorf("complaintHandler.DeleteByComplaintId() = %v, want %v", c.Writer.Status(), tt.wantStatus)
}

```

### 2.テスト用の環境変数を.envファイルから読み込めていない

- テスト時は`.env`ファイルが読み込まれないため、`os.SetEnv()`でセットする

```go
if isTest {
		os.Setenv("DBUSER", "xxxx")
		os.Setenv("DBPASS", "xxxx")
		os.Setenv("DBNAME", "manage_stock_test")
		os.Setenv("DBHOST", "localhost")
		os.Setenv("DBPORT_TEST", "3307")
	} else {
		godotenv.Load(".env." + env)
	}
```

## その他Tips

### カバレッジを確認したい(VSCode)

- コマンドパレット > Go: Toggle Test Coverage in Current Package
- エディタで開いているパッケージのテストカバレッジが、コード上に示される
![スクリーンショット 2023-07-30 19.56.27.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1998030/e41d557c-1a6f-1ca6-f627-79aaf9c604db.png)

### ビルド・コミット時に自動テスト

- ※追記予定!