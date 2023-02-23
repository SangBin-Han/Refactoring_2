/**
 * 10.4 조건부 로직을 다형성으로 바꾸기(Replace Conditional with Polymorphism)
 * 
 * 절차
 * 1. 다형적 동작을 표현하는 클래스들이 아직 없다면 만들어준다. 이왕이면 적합한 인스턴스를 알아서 
 *    만들어 반환하는 팩터리 함수도 함께 만든다.
 * 2. 호출하는 코드에서 팩터리 함수를 사용하게 한다.
 * 3. 조건부 로직 함수를 슈퍼클래스로 옮긴다.
 *    -> 조건부 로직이 온전한 함수로 분리되어 있지 않다면 먼저 함수로 추출(6.1절)한다.
 * 4. 서브클래스 중 하나를 선택한다. 서브클래스에서 슈퍼클래스의 조건부 로직 메서드를 오버라이드한다.
 *    조건부 문장 중 선택된 서브클래스에 해당하는 조건절을 서브클래스 메서드로 복사한 다음 적절히 수정한다.
 * 5. 같은 방식으로 각 조건절을 해당 서브클래스에서 메서드로 구현한다.
 * 6. 슈퍼클래스 메서드에는 기본 동작 부분만 남긴다. 혹은 슈퍼클래스가 추상 클래스여야 한다면, 이 메서드를
 *    추상으로 선언하거나 서브클래스에서 처리해야 함을 알리는 에러를 던진다.
 */
function ex() {
  switch (bird.type) {
    case '유럽 제비':
      return "보통이다";
    case '아프리카 제비':
      return (bird.numberOfCoconuts > 2) ? "지쳤다" : "보통이다";
    case '노르웨이 파랑 앵무':
      return (bird.voltage > 100) ? "그을렸다" : "예쁘다";
    default:
      return "알 수 없다";
  }
}
class EuropeanSwallow_ex {
  get plumage() {
    return "보통이다";
  }
  // ...
}
class AfricanSwallow_ex {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? "지쳤다" : "보통이다";
  }
  // ...
}
class NorwegianBlueParrot_ex {
  get plumage() {
    return (this.voltage > 100) ? "그을렸다" : "예쁘다";
  }
  // ...
}

// --------------- 예시1 ------------------

function plumages_origin(birds) {
  return new Map(birds.map(b => [b.name, plumage(b)]));
}

function speeds_origin(birds) {
  return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]));
}

function plumage_origin(bird) { // 깃털 상태
  switch (bird.type) {
    case '유럽 제비':
      return "보통이다";
    case '아프리카 제비':
      return (bird.numberOfCoconuts > 2) ? "지쳤다" : "보통이다";
    case '노르웨이 파랑 앵무':
      return (bird.voltage > 100) ? "그을렸다" : "예쁘다";
    default: 
      return "알 수 없다";
  }
}

function airSpeedVelocity_origin(bird) { // 비행속도
  switch (bird.type) {
    case '유럽 제비':
      return 35;
    case '아프리카 제비':
      return 40 - 2 * bird.numberOfCoconuts;
    case '노르웨이 파랑 앵무':
      return (bird.isNailed) ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }

}

// --------------- Refactoring ------------------

function plumages(birds) {
  return new Map(birds
                 .map(b => createBird(b))
                 .map(bird => [bird.name, bird.plumage]));
}

function speeds(birds) {
  return new Map(birds
                 .map(b => createBird(b))
                 .map(bird => [bird.name, bird.airSpeedVelocity]));
}

function createBird(bird) {
  switch (bird.type) {
    case '유럽 제비':
      return new EuropeanSwallow(bird);
    case '아프리카 제비':
      return new AfricanSwallow(bird);
    case '노르웨이 파랑 앵무':
      return new NorwegianBlueParrot(bird);
    default: 
      return new Bird(bird);
  }
}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject)
  }

  get plumage() {
    return "알 수 없다";
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return "보통이다";
  }
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? "지쳤다" : "보통이다";
  }
  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return (this.voltage > 100) ? "그을렸다" : "예쁘다";
  }
  get airSpeedVelocity() {
    return (this.isNailed) ? 0 : 10 + this.voltage / 10;
  }
}

// --------------- 예시2: 변형 동작을 다형성으로 표현하기 ------------------

function rating(voyage, history) { // 투자등급
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRist(voyage);
  const chr = captainHistoryRist(voyage, history);
  if (vpf * 3 > (vr + chr * 2)) return "A";
  else return "B";
}

function voyageRist(voyage) { // 항해 경로 위험요소
  let result = 1;
  if (voyage.length > 4) result += 2;
  if (voyage.length > 8) result += voyage.length - 8;
  if (["중국", "동인도"].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}

function captainHistoryRist(voyage, history) { // 선장의 항해 이력 위험요소
  let result = 1;
  if (history.length < 5) result +=4;
  result += history.filter(v => v.profit < 0).length;
  if (voyage.zone === "중국" && hasChina(history)) result -= 2;
  return Math.max(result, 0);
}

function hasChina(history) { // 중국을 경유하는가?
  return history.some(v => "중국" === v.zone);
}

function voyageProfitFactor(voyage, history) { // 수익 요인
  let result = 2;
  if (voyage.zone === "중국") result += 1;
  if (voyage.zone === "동인도") result += 1;
  if (voyage.zone === "중국" && hasChina(history)) {
    result += 3;
    if (history.length > 10) result += 1;
    if (history.length > 12) result += 1;
    if (history.length > 18) result -= 1;
  }
  else {
    if (history.length > 8) result += 1;
    if (voyage.length > 14) result -= 1;
  }
  return result;
}