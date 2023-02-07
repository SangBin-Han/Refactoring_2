/**
 * 6.7 변수 이름 바꾸기(Rename Variable)
 * 
 * let a = height * width;
 * 
 * --------------- Refactoring ------------------
 * 
 * let area = height * width;
 * 
 * 절차
 * 1. 폭넓게 쓰이는 변수라면 변수 캡슐화하기(6.6절)를 고려한다.
 * 2. 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서, 하나씩 변경한다.
 * -> 다른 코드베이스에서 참조하는 변수는 외부에 공개된 변수이므로 이 리팩터링을 적용할 수 없다.
 * -> 변수 값이 변하지 않는다면 다른 이름으로 복제본을 만들어서 하나씩 점진적으로 변경한다. 하나씩 바꿀 때마다 테스트한다.
 * 3. 테스트한다.
 */

function ex1() {
  let tpHd = "untitled";

  result += `<h1>${tpHd}</h1>`;
  tpHd = obj['articleTitle'];
}

function refactoring1() {
  let _title = "untitled";
  result += `<h1>${title()}</h1>`;

  setTitle(obj['articleTitle']);

  function title() {return _title;}
  function setTitle(arg) {_title = arg;}
}

// 상수 이름 바꾸기
function ex2() {
  const cpyNm = "애크미 구스베리";
}

function refactoring2() {
  const companyName = "애크미 구스베리";
  const cpyNm = companyName;
  // 1. 기존 이름(복제본)을 참조하는 코드들을 새 이름으로 점진적으로 수정
  // 2. 전부 수정 후 복제본 삭제
}