# Reactビギナーズガイド・サンプルプログラム
Reactビギナーズガイドのサンプルプログラムをwebpack2環境で構築.

* [Reactビギナーズガイド](https://www.oreilly.co.jp/books/9784873117881/)
* [原書のサンプルコード](https://github.com/stoyan/reactbook)
* [原書のライブデモ](http://www.whinepad.com/)
* [React](https://facebook.github.io/react/)
* [webpack](https://webpack.github.io/)
* [Babel](https://babeljs.io/)
* [ESLint](http://eslint.org/)
* [flow](https://flow.org/)

## 1.利用方法
### 事前準備
```bash
$ npm install -g yarn
```

### ダウンロード
```bash
$ git clone https://github.com/parapata/whinepad.git [YOUR_APPNAME]
$ cd [YOUR_APPNAME]
$ rm -rf .git (windows> rd /S /Q .git)
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

### テスト
```bash
$ yarn test
```

### flow-typeのインストール
```bash
$ flow-typed install --skip
```

改訂履歴
-------------
### 2019-12-28
- create-react-appベースに変更
- 依存ライブラリ更新

### 2017-05-07
- 新規登録

