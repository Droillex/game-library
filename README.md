# Game Library Project

## 📖 Overview
A simple web application project that allows you to select suitable games according to specified filters. Additional information and screenshots are loaded by hovering over the game icon. [Igdb.com API](https://api-docs.igdb.com/) is used for backend queries.

#
<br/>

指定されたフィルターに従って適切なゲームを選択することができるシンプルなウェブアプリケーションプロジェクトです。追加情報やスクリーンショットは、ゲームアイコンにカーソルを合わせることで読み込まれます。[Igdb.com API](https://api-docs.igdb.com/) は、バックエンドのクエリに使用されています。<br/><br/>

### 🚧 Note 🚧<br/>
Due to API CORS settings the service [proxy.cors.sh](https://cors.sh/) is used to send requests from a third-party resource. Because of this, both data loading time may be increased, and errors may occur when loading data.

#
<br/>

API CORSの設定により、サービス[proxy.cors.sh](https://cors.sh/)が第三者のリソースからのリクエストを送信するために使用されます。そのため、データの読み込み時間が長くなったり、データの読み込み時にエラーが発生したりすることがあります。<br/><br/>


## 📚 Context
The project was created as part of a university course in web development. The course included the fundamentals of modern JavaScript (ECMASCRIPT 6), debugging, TypeScript, and the basics of development using React. There are several repositories named "task-..." among my repos. It's practical tests to complete alongside the course. The course was organized in three stages: layout, creating the working version on vanilla JS/TS, creating the working version on React using TypeScript. Each participant was assigned a mentor who checked the results of each stage and gave feedback on the code. Due to time constraints and the need to implement several iterations of the project, the project was developed without a mobile version, and cross-browsing was not tested.

#
<br/>

このプロジェクトは、大学のWeb開発に関する授業の一環として作成されました。モダンなJavaScript（ECMASCRIPT 6）の基礎、デバッグ、TypeScript、そしてReactを使った開発の基礎などを学びました。私のレポの中には、「task-...」という名前のレポがいくつかあります。講座と並行してこなす実践的なテストです。コースは、レイアウト、vanilla JS/TSでの作業版作成、TypeScriptを使ったReactでの作業版作成の3段階で構成されていました。各受講者にはメンターが付き、各ステージの結果をチェックし、コードにフィードバックを与えました。時間的な制約と、二度とも同じ機能を実施する必要があったため、プロジェクトはモバイル版なしで開発され、クロスブラウジングのテストは行われませんでした。<br/><br/>


## ✨ Layouting 
The layout was done considering semantic HTML, using the SCSS pre-processor and naming classes according to the BEM methodology. The design of the web application was developed by myself, based on the similar web services.

#
<br/>

レイアウトはセマンティックHTMLを考慮し、SCSSプリプロセッサを使用し、BEM手法に基づいたクラスの命名を行っています。Webアプリケーションのデザインは、類似のWebサービスをベースに自分で開発しました。<br/><br/>

![Layout Stage Result](https://cdn.discordapp.com/attachments/477756091803893760/1090492739579297843/image.png)
<br/><br/>


## ⌨️ Vanilla JS/TS
Since I already had experience with TypeScript at the time of the assignment, I immediately started using it for ease of development. Modern JS syntax such as classes and inheritance, fetch, promise, async/await, etc. was actively used. The code is organized into components by folder for easy navigation, and functions are commented out according to JS Doc. As a result, the organization and quality of the [code was praised by the mentor](https://github.com/Droillex/game-library/pull/3#pullrequestreview-977224780), and the only flaws were the use of alert to warn of errors at runtime.
The source code of the stage can be found in the [as.derbin/js-code branch](https://github.com/Droillex/game-library/tree/as.derbin/js-code). This version of the project is being hosted [here](https://js-game-library.onrender.com/).

#
<br/>

課題の時点ですでにTypeScriptの経験があったため、開発のしやすさを考えてすぐに使い始めました。クラスや継承、fetch、promise、async/awaitなど、最新のJS構文が積極的に使われました。コードはナビゲーションしやすいようにフォルダ単位でコンポーネントに整理し、JS Docに従って関数をコメントアウトしました。その結果、[コードの構成などはメンターに激賞されました](https://github.com/Droillex/game-library/pull/3#pullrequestreview-977224780)。唯一の欠点は、実行時にエラーを警告するためalertを使用していることでした。
このステージのソースコードは、[as.derbin/js-codeブランチ](https://github.com/Droillex/game-library/tree/as.derbin/js-code)で見ることができます。このバージョンのプロジェクトは、[ここ](https://js-game-library.onrender.com/)でホストされています。<br/><br/>


## 🖥️ React
The same project was implemented in React with TypeScript, using hooks, functional components and the Spring library for eye-pleasing animations. As in the project code in the previous stage, the React project code was documented in the same way according to JSDoc.
The source code of the stage can be found in the [as.derbin/game-library-react](https://github.com/Droillex/game-library/tree/as.derbin/game-library-react). This version of the project is being hosted [here](https://react-game-library.onrender.com/).

#
<br/>

同じプロジェクトをTypeScriptでReactに実装し、フックや関数型コンポーネント、Springライブラリを使って目を引くアニメーションを実現しました。前のステージのプロジェクトコードと同様に、ReactのプロジェクトコードもJSDocに従ってドキュメント化されました。
このステージのソースコードは、[as.derbin/game-library-react](https://github.com/Droillex/game-library/tree/as.derbin/game-library-react)で見ることができます。このバージョンのプロジェクトは、[ここ](https://react-game-library.onrender.com/)にホストされています。

![React Version](https://cdn.discordapp.com/attachments/477756091803893760/1090498050537033728/image.png)
