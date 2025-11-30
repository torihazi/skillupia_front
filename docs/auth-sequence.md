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

手順
auth.js の signin("google")
route handler に post
post 先で redirect 302
idp 認証画面
成功したら callback
callback してから code 使って GET token endpoint
token をもらう
auth.js に帰ってきて、token を session に埋め込んで 最終的に app に帰る
この最終的な app の画面をどこで設定するか。
ここが分かれば、ここで token 使って rails の api に投げれば良い。
signin の{redirectTo: }で成功後のリダイレクト先を設定できる。
このあと、access_token、refresh_token を使用して、それらを rails に投げる必要がある。
route handler を経由して投げる必要がある

そのため、useeffect で routehandler に投げる必要がある

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
