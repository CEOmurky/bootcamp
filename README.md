# Bootcamp

## 사전 준비

- @angular/cli 설치
- eediom-sdk 설치
- material-cdk 설치

### eediom-sdk 설치

```
$ yarn add https://github.com/logpresso/eediom-sdk.git#v1.0.5: eediom에서 만든 sdk를 설치
```

### material-cdk 설치

```
material-cdk
$ yarn global add @angular/cli: angular-cli를 설치 

$ ng add @angular/material: material-cdk를 설치

? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink: 원하는 테마를 선택
? Set up HammerJS for gesture recognition?:  제스처 라이브러리 / YES or NO 둘다 괜찮음 
? Set up browser animations for Angular Material?: 머터리얼에 에니메이션을 추가할 수 있는데 그 기능에 대한 물음 / YES or NO 둘다 괜찮음
```

저는 위의 환경을 아래와 같이 설치 했습니다.

- 기본 테마
- HammerJS 설치
- Animation module 설치

```
Installed packages for tooling via npm.
? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview: https://material.angular.
io?theme=indigo-pink ]
? Set up HammerJS for gesture recognition? Yes
? Set up browser animations for Angular Material? Yes
```

설치 이후 이 문구가 뜨면 정상적으로 설치된 것입니다.

```
UPDATE src/main.ts (391 bytes)
UPDATE src/app/app.module.ts (502 bytes)
UPDATE angular.json (3864 bytes)
UPDATE src/index.html (488 bytes)
UPDATE src/styles.less (181 bytes)
```

위의 파일이 material-cdk에 의해 변경되었다는 것을 의미합니다.

## Grid

그리드 컴포넌트는 eedim-sdk에 정의되어 있습니다. 설명은 [그리드 미리보기](https://logpresso.github.io/eediom-sdk/?path=/story/grid-%EA%B7%B8%EB%A6%AC%EB%93%9C--plain)를 통해 보실 수 있고 notes를 사용법과 프로퍼티 등을 알 수 있습니다.

### gridModule import

eediom-sdk의 모듈을 각자 분리되어 있기 때문에 원하는 모듈을 사용하기 위해서는 `module` import 하는 과정이 필요합니다.

`app.module.ts`로 이동합니다.



## Chart

## 전역 필터
