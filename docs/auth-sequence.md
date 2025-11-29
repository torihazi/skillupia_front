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

## 認証フロー（OIDC）

```mermaid
sequenceDiagram
    participant Frontend as Frontend<br/>(Next.js)
    participant AuthJS as Auth.js<br/>(NextAuth)
    participant AuthEndpoint as Authorization<br/>Endpoint
    participant TokenEndpoint as Token<br/>Endpoint
    participant UserInfoEndpoint as User Info<br/>Endpoint
    participant RailsAPI as Rails API
    participant DB as Database

    Frontend->>AuthJS: 認証リクエスト開始
    AuthJS->>AuthEndpoint: 認可リクエスト
    AuthEndpoint->>AuthJS: 認可レスポンス（code）
    AuthJS->>TokenEndpoint: token取得リクエスト（code使用）
    TokenEndpoint->>AuthJS: token返却

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
    AuthJS->>Frontend: 認証完了、ユーザー情報返却
```
