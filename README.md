# [etribeModal](https://github.com/soyfully/modal-library)

사용자가 지정한 모달 엘리먼트의 포지션을 뷰포트의 센터에 맞춰줄 수 있는 라이브러리입니다.

## Basic usage
```html
<!-- js -->
<script type="text/javascript">
    new EtribeModal({
        'selector' : document.querySelector('.layerPopup'),
    });
</script>
```

## Documentation
### Options

| 속성 | 기능 | 기본값 |
|---|:---|---|
| `selector` | 센터 정렬할 엘리먼트의 컨테이너를 셀렉터로 지정해줍니다. | `엘리먼트를 필수로 지정해줘야합니다.` |
| `scrollLock` | 모달이 띄워졌을 때 스크롤을 방지합니다. | `false` |
| `useDimm` | 라이브러리의 기본 dimm의 사용 여부. | `true` |
| `dimmCss` | 라이브러리 기본 dimm에 적용할 css 리스트를 작성합니다. | |
| `selectDimm` | 사용자가 만들어놓은 dimm을 사용하길 원한다면 지정해줍니다. | |

## API

#### destroy()
> 모달의 센터 정렬 및 스크롤, dimm 등을 해제합니다.

```html
<!-- js -->
<script type="text/javascript">
    var el = new EtribeModal({
        'selector' : document.querySelector('.layerPopup'),
        'scrollLock' : true,
        'useDimm' : true, // 기본값 true
        'dimmCss' : 'background-color:black; opacity:0.6;',
    });

    el.destroy();
</script>
```