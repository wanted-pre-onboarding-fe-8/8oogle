# Wanted Pre-Onboarding FE #3-1. 광고 대시 보드

## 목차

1. 프로젝트 소개
2. 역할
3. 프로젝트 요약
4. 폴더 구조
5. 구현
6. 프로젝트 설치 및 실행
7. 회의록
8. 프로젝트 결과물

## 1. 프로젝트 소개

> 개요 : 원티드 프리온보딩 5기 2주차 세 번째 팀 과제
>
> 주제 : 광고 플랫폼 대시 보드
>
> 기간 : 2022.07.013 ~ 2022.07.20

## 2. 역할

|                   이름                    | 직책 | 역할                                                                                |
| :---------------------------------------: | :--: | :---------------------------------------------------------------------------------- |
|  [추연빈](https://github.com/chuyeonbin)  | 팀장 | 📌카드컴포넌트 구현<br />📌광고관리 페이지 조립<br />                               |
| [엄일경](https://github.com/sunaerocket)  | 팀원 | 📌누적 막대형 차트 구현<br />📌광고 수정 페이지 조립<br />📌사이드바 / 헤더바<br /> |
| [임은지](https://github.com/salangdung-i) | 팀원 | 📌 대시보드 라인 차트 구현 <br />📌대시보드 페이지 조립<br />                       |
|  [오태권](https://github.com/ohtaekwon)   | 팀원 | 📌 대시보드 주요 지표 구현<br />                                                    |
|    [이진희](https://github.com/bebusl)    | 팀원 | 📌매체현황 테이블 구현<br />📌광고 추가/수정 폼 구현<br />📌광고 추가 페이지 조립   |
| [문성운](https://github.com/corgi-world)  | 팀원 | 📌http 통신 모듈 구현<br />📌react query 구현                                       |

## 3. 프로젝트 요약

![https://img.shields.io/badge/Laguage-Typescript-red](https://img.shields.io/badge/Laguage-Typescript-green?logo=Typescript&logoColor=#377549)

![https://img.shields.io/badge/Laguage-Typescript-red](https://img.shields.io/badge/Libarary-ReactQuery-green?logo=ReactQuery&logoColor=#377549)

![https://img.shields.io/badge/Laguage-Typescript-red](https://img.shields.io/badge/UILibarary-MUI-green?logo=MUI&logoColor=#377549)

![https://img.shields.io/badge/Laguage-Typescript-red](https://img.shields.io/badge/ChartLibarary-ApexCharts-green?logo=ApexCharts&logoColor=#377549)

![summary](https://raw.githubusercontent.com/ohtaekwon/ohtaekwon/master/img/week2_1/Summary2.png)

#### Server의 상태관리

- Server State를 `패칭`, `캐싱`, `동기화`, `업데이트` 작업이 필요
- Server State를 관리하기 위해, 적절한 `useQuery`를 사용하도록 기획
  - Query Key에 따라, query caching을 관리

#### UI 구현

- 전반적인 플랫폼의 UI는 실용적이고 빠르게 구현할 수 있도록, `Meterail-UI` 라이브러리 사용 기획
  - 다소 편리한 사용법, styled component 사용하여 커스텀이 가능함

#### 차트 구현

- `apexcharts` 라이브러리를 사용 기획
  - 권장 라이브러리보다 더 예쁜 디자인, 팀원들 사용 경험이 좋음

## 4. 프로젝트 구조

```bash
📁public
└──images
│ 	  └──Logo.png
├──favicon.ico
├── 📁src
│   ├── 📁components
│   │	├──📁adForm
│   │  	│	├─AdForm.tsx
│   │  	│	├─CurrencyField.tsx
│   │  	│	└─index.tsx
│   │	└─📁Card
│   │  		├─HeaderBar.tsx
│   │  		├─MuiDrawer.tsx
│   │  		└─SideBar.tsx
│   ├── 📁 database
│   │     	├─campaign.json
│   │     	├─index.js
│   │     	├─overall.json
│   │  		└─platform.json
│   ├── 📁 hooks
│   │    	└─useInput.ts
│   ├── 📁layouts
│   │     	└─DefaultLayout.tsx
│   ├── 📁pages
│   │		├─📁adAdd
│   │		│	└─index.tsx
│   │		├─📁adEdit
│   │		│	└─index.tsx
│   │		├─📁adManagement
│   │		│	├─index.tsx
│   │		│	└─MyListCard.tsx
│   │		├─📁adManagement
│   │		│	├─index.tsx
│   │		│	└─Wrapper.tsx
│   │		└──📁dashboard
│   │			├─Advertisement.tsx
│   │			├─index.tsx
│   │			├─Indicators.tsx
│   │			├─IntergratedAd.tsx
│   │			├─Loader.tsx
│   │			├─PlatformChart.tsx
│   │			├─PlatformChart.tsx
│   │			└─Wrapper.tsx
│   ├── 📁queries
│   │	├─movieService.ts
│   │	├─queryRequest.ts
│   │	└─service.ts
│   ├── 📁routes
│   │	└─DefultRouter.tsx
│   ├── 📁Styles
│   │	└─index.css
│   ├── 📁types
│   │	├─campaign.d.ts
│   │	├─overall.d.ts
│   │	└─platform.d.ts
│   ├── 📁utils
│   │    ├──📁constants
│   │    │	├──chart.ts
│	│    │	├──currency.ts
│   │    │	└──data.ts
│   │    └──📁helpers
│   │    │	├──chart.ts
│	│    │	├─compareValue.ts
│   │    │	└──formatters.ts
├── App.tsx
├── index.tsx
```

## 5. 기능 구현

### 메뉴

- [x] 메뉴에 각 페이지로 이동하는 탭이 포함 구현
- [x] 메뉴는 모바일 환경에서 480px이하 접히며, 헤더에 포함되고, `hamburger icon`으로 변경되며, 클릭 시 메뉴 탭을 볼 수 있도록 화면에 노출 구현

### 헤더

- [x] `유저 아바타`와 `유저이름`, `설정`, `알림 아이콘`을 포함 구현
  - [x] 설정과 알림 아이콘은 기능적인 요소 X

### 대시보드

- [x] 대시보드에는 `Line chart`와, `stacked bar chart` 구현

  - [x] ApexCharts 차트 라이브러리 사용

- [x] 통합 광고 현황의 데이터를 활용하여 통합 광고 현황 컴포넌트를 개발하세요.
- [x] 통합 광고 현황의 `드랍다운`을 클릭 할 때마다 `데이터가 변경`구현

  - [x] `uaeQuery`를 사용하여, 데이터 패칭

- [x] 주간 별 조회를 할 수 있어야 합니다. 조회 주간을 변경하면 두 개의 차트 데이터도 변경되어야 합니다.
- [x] `Line chart`의데이터는 `ROAS`와 `클릭수` 를 출력 구현
- [x] 매체 현황의 데이터를 활용하여 매체 현황 컴포넌트 개발 구현
  - [x] `PlatFormchart` / `PlatFormtable`

### 광고 관리

- [x] 광고 관리 페이지 상단의 `드랍다운`으로 `전체`, `현재 진행중`인 광고, `종료`된 광고를 `filtering` 구현
- [x] 수정 버튼을 클릭하여 `수정` 할 수 있고, 광고 만들기로 `생성`할 수 있어야 합니다.

## 6. 프로젝트 설치 및 실행

- Git Clone

```
$ git clone
```

- 프로젝트 실행

```
$ npm install
$ npm run server
$ npm start
```

## 7. 회의록

- [11일차 💬](https://www.notion.so/cf4d10bb3b504ab0ae08d1f4b2a53ab1?v=c1a46a3b94eb4f449c8874f9e6b5318d&p=9ec238e36cba4d339720e8b419840c4e)

- [12일차 💬 ](https://www.notion.so/cf4d10bb3b504ab0ae08d1f4b2a53ab1?v=c1a46a3b94eb4f449c8874f9e6b5318d&p=920a6e213d1e4747954057bfad06b9af)

- [15일차 💬](https://www.notion.so/cf4d10bb3b504ab0ae08d1f4b2a53ab1?v=c1a46a3b94eb4f449c8874f9e6b5318d&p=3da773db450949b5a660b22d12fa6dbd)

- [16일차 💬](https://www.notion.so/cf4d10bb3b504ab0ae08d1f4b2a53ab1?v=c1a46a3b94eb4f449c8874f9e6b5318d&p=a27e723d6d404e3bb3903ad4d491f8ea)

- [17일차 💬](https://www.notion.so/cf4d10bb3b504ab0ae08d1f4b2a53ab1?v=c1a46a3b94eb4f449c8874f9e6b5318d&p=7ccaf9de8e21448a992a0091ab6d43e9)

## 8. 프로젝트 결과물

## 대시 보드

![대시보드](https://raw.githubusercontent.com/ohtaekwon/ohtaekwon/master/img/week2_1/dashboard.png)

## 광고 관리

![광고관리](https://raw.githubusercontent.com/ohtaekwon/ohtaekwon/master/img/week2_1/adManagement.png)
