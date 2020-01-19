# Reactビギナーズガイド・サンプルプログラム(react-hooks版)
Reactビギナーズガイドのサンプルプログラムをcreate-react-appで構築.

* [Reactビギナーズガイド](https://www.oreilly.co.jp/books/9784873117881/)
* [原書のサンプルコード](https://github.com/stoyan/reactbook)
* [原書のライブデモ](http://www.whinepad.com/)
* [React](https://facebook.github.io/react/)
* [webpack](https://webpack.github.io/)
* [Babel](https://babeljs.io/)
* [ESLint](http://eslint.org/)

## 1.利用方法
### 事前準備
```bash
$ npm install -g yarn
```

### ダウンロード
```bash
$ git clone https://github.com/parapata/whinepad.git
$ cd whinepad
$ rm -rf .git (windows> rd /S /Q .git)
$ cd whinepad-hooks
$ git init
$ git add -A
$ git commit -m "Initial commit with whinepad"
```

### パッケージのインストール
```bash
$ yarn install
```

### 開発サーバ起動
```bash
$ yarn start
```

### ビルド
```bash
$ yarn build
```

### テスト
```bash
$ yarn test
```

改訂履歴
-------------
### 2020-01-19
- flux対応

### 2020-01-14
- 新規登録
