# まず何をするか

最初の認証。

next.js の front から route handler を叩く
route handler から rails の endpoint を叩く、
rails の endpoint から oauth が始まって、

と思ったけどどうなるんだ？
というのは rails の omniauth は front から api endpoint 叩くのはいいけど、

そもそも omniauth の仕組みから考えるか。
ええとまず rails の api endpoint 叩いたら勝手に redirect してくれるんだよな
そこから勝手にクライアントに返してくれるのかな？
やってみるか。

まず form 使って、指定の route handler へ叩くことができるかかな

まず、next.js から rails の omniauth endpoint を csrf token 添えて、叩く必要がある
post で。中で何しているかは知らないけど。

omniauth がどういうふうに認証しているかを知らないといけないのかな。

https://authjs.dev/getting-started/installation?framework=Next.js

結局 auth.js

まず、signin("google")をしたらどうなるのか

コードだったり doc を読み進めるとする

https://authjs.dev/concepts/oauth

frontend から sigin を通して post する
post の向き先が route handler
route handler が受け取って、client_id とか載せて、302 リダイレクトで idp いって終わったらアプリ側に callback
そこから

## 認証フロー（OIDC）

```mermaid
sequenceDiagram
    participant Browser as Browser
    participant AuthJS as Auth.js<br/>(NextAuth)
    participant AuthEndpoint as Authorization<br/>Endpoint
    participant TokenEndpoint as Token<br/>Endpoint
    participant UserInfoEndpoint as User Info<br/>Endpoint
    participant RailsAPI as Rails API
    participant DB as Database

    Browser->>AuthJS: POST /api/auth/signin/google<br/>(認証リクエスト)
    AuthJS->>AuthJS: sign-inオプション計算<br/>(scopes, callback URL等)
    AuthJS->>AuthEndpoint: 302 リダイレクト<br/>(Authorization Endpointへ)
    AuthEndpoint->>Browser: サインインページ表示
    Browser->>AuthEndpoint: ユーザー認証情報入力
    AuthEndpoint->>AuthEndpoint: 認証情報検証
    AuthEndpoint->>AuthJS: 302 リダイレクト<br/>(GET /api/auth/callback/google?code=xxx)
    AuthJS->>TokenEndpoint: POST Token Endpoint<br/>(code交換)
    TokenEndpoint->>TokenEndpoint: code検証、token生成
    TokenEndpoint->>AuthJS: access token返却

    AuthJS->>RailsAPI: tokenを渡す
    RailsAPI->>UserInfoEndpoint: user info取得リクエスト<br/>(token使用)
    UserInfoEndpoint->>RailsAPI: user info JSON返却

    RailsAPI->>DB: ユーザー検索<br/>(user infoを使用)

    alt ユーザーが存在しない場合
        DB->>RailsAPI: 検索結果（存在しない）
        RailsAPI->>DB: ユーザー作成
        DB->>RailsAPI: 作成結果
    else ユーザーが存在する場合
        DB->>RailsAPI: 既存ユーザー情報
    end

    RailsAPI->>AuthJS: ユーザー情報返却
    AuthJS->>AuthJS: session token生成、<br/>ユーザーセッション保存
    AuthJS->>Browser: 認証完了、ユーザー情報返却
```
