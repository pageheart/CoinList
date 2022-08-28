## 소개
---

CoinGecko의 API를 활용한 Coin market List정보를 뿌려주는 웹페이지 및 Coin 상세페이지 제공.

## 환경구성
---

| Project               	| Status(Version)                |
| ---------------------------- | ------------------------------|
| [vue-router]          	| 2.8.1                  	|
| [vue-cli]             	| 5.0.4                        	|
| [vue] 			| 2.6.14 			|
| [Visual Studio Code]	| 1.62.2                          	|
| [OS]			| Windows_NT x64 10	|
| [chrome]		| 102.0.5005.63(64bit)	|
| [Microsoft Edge]		| 102.0.1245.33(64bit)	|

## API
---

CoinGecko API V3
https://www.coingecko.com/api/documentations/v3#

conins
/coins/markets	| Use this to obtain all the coins market data (price, market cap, volume)
/coins/{id}	| Get current data (name, price, market, ... including exchange tickers) for a coin.

## 라우터 구성
---

[/], [/home]	| 가상자산 시세목록을 보여주는 기본 메인 페이지
[/mark]		| 북마크 목록을 보여주는 페이지

## 원화변경 기능
---

KRW 또는 USD의 해당하는 원화로만 제공되어지며, 변경시 해당 원화에 맞는 새로운 리스트를 조회하여 출력해주는 기능 제공.

## 북마크기능
---

cookie를 이용한 북마크 기능으로 자산명앞에 붙어 있는 별(☆)을 클릭시 북마크저장기간을 하루로 제공.
북마크된 별(★)을 클릭시 cookie에 저장된 해당 자산명이 삭제되면서 북마크해제 기능 제공.

## 더보기기능
---

자산 리스트 내 마우스휠로 아래로 내리면 "더보기" 버튼 클릭시 다음 페이지에 해당되어지는 데이터를 추가 표시 제공.
추가 데이터가 존재하지 않을 시 "더보기"버튼은 사라지는 기능 제공.

## 상세보기 팝업
---

자산명을 클릭시 해당 자산에 대한 자산명, 시가총액 Rank, 현재 금액, 24시간 등락 퍼센트, 웹사이트, 시가총액, 24시간 거래대금, 가격계산, Description을 팝업형태로 제공.
팝업을 띠워주는 부모페이지의 KRW or USD 정보를 가지고 가서 해당 원화표시에 해당되는 정보를 표시 제공.
팝업 우측 상단 X버튼을 클릭시 팝업은 닫힘기능 제공.

## 실행방법
---

npm run serve



