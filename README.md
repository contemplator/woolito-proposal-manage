# 使用說明

## 下載 Sample Code 並使用 VS code 開啟

```
git clone https://github.com/contemplator/angular-template.git <project-name>
cd <project-name>
code. 
```

## 下載相依賴套件

```
npm install
```

## 運行 server

```
npm start
```

## 更新 angular、rxjs 及 primeng 套件

for mac

```
npm install @angular/{common,compiler,compiler-cli,core,forms,http,platform-browser,platform-browser-dynamic,platform-server,router,animations}@latest typescript@latest font-awesome@latest primeng@latest rxjs@latest --save
```

for windows 
```
npm install @angular/common@latest @angular/compiler@latest @angular/compiler-cli@latest @angular/core@latest @angular/forms@latest @angular/http@latest @angular/platform-browser@latest @angular/platform-browser-dynamic@latest @angular/platform-server@latest @angular/router@latest @angular/animations@latest typescript@latest font-awesome@latest primeng@latest rxjs@latest --save
```


# 更新 log

## 2018-01-30 
1. 更新到 angular 5
2. 加上 bootstrap css，因為發現 primeng 的 form 樣式在排版上沒有 bootstrap 優美，所以決定加入 bootstrap 套件，但不使用 ng-bootstrap 是因為和 primeng component 功能重複，不習慣的人可以使用以下語法卸載，理想方式是自行有一套樣式

```
npm uninstall --save bootstrap
```
3. 套用 bootstrap 4 的 reboot.css (意義等同於 reset.css、normalize.css)

