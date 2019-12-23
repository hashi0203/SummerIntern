# SARCOPION
隠れ肥満を解消するWebサービス
健康診断情報から健康情報を入力し，スマホと連携して簡単に健康管理ができる

# 注意
APIが叩けなくなっているので，APIを叩くフェーズはスルーで画面遷移や入力だけ可能
<br>
login.html から開始
```
login.html
    ┣━━(ログインできる時)━━ middle.html 
    ┗ firstData.html ━ mode.html ┛ ┣ input.html
                                      ┗ data.html
```
input.html, data.html, advice.html, setting.html は自由に行き来できる
<br>
これらのページからログアウトまたは退会を押すと login.html に戻る

# Summer Intern Template Project

# 環境構築

## 環境構築リソース一覧

- atom install
- vs code install
- Restlet Client
- AWS cli install
- AWS config
- node install
- node library install(global)
- node library install(local)
- filename convert
- gulp deploy
- Use Docker
- Git

## atom install

- https://atom.io からダウンロードし、インストール

### 推奨パッケージ

- linter
- linter-eslint
- editorconfig
- linter-ui-default

## VS code install

- https://azure.microsoft.com/ja-jp/products/visual-studio-code からダウンロードし、インストール

## Restlet Client

- ※Google Chromeのインストール必須
- 以下のURLよりダウンロード/インストール
- https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm

## AWS cli install

### windows

- https://s3.amazonaws.com/aws-cli/AWSCLI64.msi からダウンロードし、インストール

```bash
$ aws --version
```

### mac

```bash
# Pythonのバージョンを確認
$ python --version

$ curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
$ unzip awscli-bundle.zip
$ ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
$ aws --version
```

## AWS config

```bash
$ aws configure 
AWS Access Key ID [None]:  
AWS Secret Access Key [None]: 
Default region name [None]:ap-northeast-1
Default output format [None]:json
```

## node install

### windows

- https://nodejs.org/ja から `10.16.0 LTS` をダウンロードし、インストール

**バージョンコントロールしたい場合**

- https://github.com/coreybutler/nvm-windows/releases から `nvm-setup.zip
` をダウンロードして解凍後インストール
- プロンプトを立ち上げる
- 最後のコマンドで `v10.16.0` が出力されていればOK

```bash
$ nvm install 10.16.0
$ nvm use 10.16.0
$ node --version
```

### mac

```bash
$ brew install ndenv
$ echo 'export PATH="$HOME/.ndenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(ndenv init -)"' >> ~/.bash_profile
$ exec $SHELL -l

$ git clone https://github.com/riywo/node-build.git $(ndenv root)/plugins/node-build

$ ndenv install -l
$ ndenv install v10.16.0
$ ndenv versions
$ ndenv global v10.16.0
```

## node library install(global)

```bash
$ npm install -g gulp
```

## node library install(local)

```bash
$ cd ./template-project
$ npm install --dev
```

## filename convert

- filename.js の以下の部分を編集

```js
let username = "<< user name >>";
```

- 以下を実行

```bash
$ node filename.js
```

## gulp deploy

- s3-config.js, lambda-config.js 内の設定を確認
- s3の場合、指定のBucketが作成されていることを確認

```bash
# s3 and lambda
$ gulp deploy

# s3
$ gulp deploy-s3

# lambda
$ gulp deploy-lambda
```

## use Docker

- Need to run `aws configure` in containers

```bash
# build
$ docker-compose build
# start
$ docker-compose up -d
# bash login
$ docker-compose exec nodejs-v10-16 bash
# Need to run aws configure 
root@:/app# aws configure
AWS Access Key ID [None]:  
AWS Secret Access Key [None]: 
Default region name [None]:ap-northeast-1
Default output format [None]:json
# stop
$ docker-compose stop
```

## Git

- windowsの場合はCRLFに注意

```bash
$ git config --global core.autocrlf false
```