## ConcertMate

콘서트 메이트는 공연일정을 확인하고 개인 아이디에 찜한 공연일정을 캘린더로 확인 할 수 있는 웹사이트입니다.
예매일전에 알람이 오도록 구현할 예정입니다.(예매일이 적힌 api를 구할 수 없어서 공연시작일 기준으로 알람이 오도록 구현했습니다.)
chat gpt를 이용한 도우미를 이용하여 원하는 음악장르나 가수 또는 정보를 알 수 있게 구현하였습니다.
콘서트 세부정보에서 댓글을 달 수 있게 구현 할 것입니다.
회원들끼리 정보나 대화를 나눌 수 있는 간단한 게시판을 구현할 것 입니다.

## 사용한 라이브러리와 프레임워크

React기반으로 타입스크립트와 NextJs 프레임워크를 사용하여 구현 했습니다. <br />
mysql를 db로 사용하기 위해 mysql2 라이브러리를 사용했습니다. <br />
react-calendar 라이브러리로 켈린더에 찜한 공연일자를 표시할 수 있다. <br />
KOPIS 공연예술통합전상망에서 제공하는 API를 사용하고 있는데 데이터를 XML형식으로 가져오기 때문에 변환을 위한 xml2js 라이브러리 사용. <br />
Typescript로 개발

## 문제점

공공 api중 예매일자를 제공해주는 api가 없다. 때문에 예매일자를 알려주는 알람서비스는 공연시작일 기준으로 1주일전 1일전 당일 알림이 가게 구현하도록 변경했다.
공연일이 토요일 일요일처럼 타임이 두개인 경우가 있기 때문에 찜하기로 자동으로 일정이 등록되는게 아니라 캘린더를 개인이 편집하도록 변경하는 방향으로 생각중.
일단 타임이 여러개여도 찜하면 모두 캘린더에 표시 되도록 구현할 예정. 그 후 편집으로 본인의 날자가 아닌것은 삭제할 수 있게 구현함.
회원의 거래정보를 받아올 방법이 없기 때문에 이런 방법으로 구현할 예정.
KOPIS 장르 검색할때 파라미터는 가이드를 참고해서 사용해야함.
