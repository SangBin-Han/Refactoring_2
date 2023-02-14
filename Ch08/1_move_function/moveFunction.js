/**
 * 8.1 함수 옮기기(Move Function)
 * 
 * - 1판에서의 이름: 메서드 이동
 * 
 * class Account {
 *  get overdraftCharge() {...}
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class AccountType {
 *  get overdraftCharge() {...}
 * }
 * 
 * 절차
 * 1. 선택한 함수가 현재 컨텍스트에서 사용 중인 모든 프로그램 요소를 살펴본다. 이 요소들 중에도 함께 옮겨야 할 게 있는지 고민해본다.
 * -> 호출되는 함수 중 함께 옮길 게 있다면 대체로 그 함수를 먼저 옮기는게 낫다. 얽혀 있는 함수가 여러 개라면 다른 곳에 미치는 영향이
 *    적은 함수부터 옮기도록 하자.
 * -> 하위 함수들의 호출자가 고수준 함수 하나뿐이면 먼저 하위 함수들을 고수준 함수에 인라인한 다음, 고수준 함수를 옮기고,
 *    옮긴 위치에서 개별 함수들로 다시 추출하자.
 * 2. 선택한 함수가 다형 메서드인지 확인한다.
 * -> 객체 지향 언어에서는 같은 메서드가 슈퍼클래스나 서브클래스에도 선언되어 있는지까지 고려해야 한다.
 * 3. 선택한 함수를 타깃 컨텍스트로 복사한다(이때 원래의 함수를 소스 함수: source function라 하고 복사해서 만든 새로운 함수를
 *    타깃 함수: target function라 한다). 타깃 함수가 새로운 터전에 잘 자리 잡도록 다듬는다.
 * -> 함수 본문에서 소스 컨텍스트의 요소를 사용한다면 해당 요소들을 매개변수로 넘기거나 소스 컨텍스트 자체를 참조로 넘겨준다.
 * -> 함수를 옮기게 되면 새로운 컨텍스트에 어울리는 새로운 이름으로 바꿔줘야 할 경우가 많다. 필요하면 바꿔준다.
 * 4. 정적 분석을 수행한다.
 * 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영한다.
 * 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정한다.
 * 7. 테스트한다.
 * 8. 소스 함수를 인라인(6.2절)할지 고민해본다.
 * -> 소스 함수는 언제까지라도 위임 함수로 남겨둘 수 있다. 하지만 소스 함수를 호출하는 곳에서 타깃 함수를 직접 호출하는 데 무리가 없다면 
 *    중간 단계(소스 함수)는 제거하는 편이 낫다.
 */

// ex1
function trackSummary_ex(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;
  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace
  };

  function calculateDistance() { // 총 거리 계산
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i-1], points[i]);
    }
    return result;
  }

  function distance(p1, p2) { } // 두 지점의 거리 계산
  function radians(degress) { } // 라디안 값으로 변환
  function calculateTime() { } // 총 시간 계산
}

// --------------- Refactoring ------------------

function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);
  return {
    time: totalTime,
    distance: totalDistance(points),
    pace: pace
  };

  function calculateTime() { } // 총 시간 계산
}

function totalDistance(points) { // 총 거리 계산
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i-1], points[i]);
  }
  return result;

}
function distance(p1, p2) { // 두 지점의 거리 계산
  // 하버사인 공식(haversine formula)은 다음 사이트를 참고하자.
  // http://www.movable-type.co.uk/scripts/latlong.html
  const EARTH_RADIUS = 3959; // 단위: 마일(mile)
  const dLat = radians(p2.lat) - radians(p1.lat);
  const dLon = radians(p2.lon) - radians(p1.lon);
  const a = Math.pow(Math.sin(dLat / 2), 2)
          + Math.cos(radians(p2.lat))
          * Math.cos(radians(p1.lat))
          * Math.pow(Math.sin(dLon / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return EARTH_RADIUS * c;

} 
function radians(degress) { // 라디안 값으로 변환
  return degrees * Math.PI / 180;
}

// ex2
class Account_Ex {
  get bankCharge() { // 은행 이자 계산
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  get overdraftCharge() { // 초과 인출 이자 계산
    if (this.type.isPremium) {
      const baseCharge = 10;
      if (this.daysOverdrawn <= 7)
        return baseCharge;
      else
        return baseCharge + (this.daysOverdrawn - 7) * 0.85;
    }
    else 
      return this.daysOverdrawn * 1.75;
  }
}

// --------------- Refactoring ------------------
// 계좌 종류에 따라 이자 책정 알고리즘이 달라지도록 수정

class Account {
  get bankCharge() { // 은행 이자 계산
    let result = 4.5;
    if (this._daysOverdrawn > 0) 
      result += this.type.overdraftCharge(this.daysOverdrawn);
    return result;
  }

  get overdraftCharge() { // 위임 메서드
    return this.type.overdraftCharge(this.daysOverdrawn);
  }
}

class AccountType {
  overdraftCharge(daysOverdrawn) { // 초과 인출 이자 계산
    if (this.isPremium) {
      const baseCharge = 10;
      if (daysOverdrawn <= 7)
        return baseCharge;
      else
        return baseCharge + (this.daysOverdrawn - 7) * 0.85;
    }
    else 
      return daysOverdrawn * 1.75;
  }
}

// --------------- Refactoring ------------------
// 바로 위 단계에서 계좌에서 가져와야 할 데이터가 많았다면
// daysOverdrawn이 아닌 계좌 자체를 넘겼을 것

class Account {
  get bankCharge() { // 은행 이자 계산
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  get overdraftCharge() { // 위임 메서드
    return this.type.overdraftCharge(this);
  }
}

class AccountType {
  overdraftCharge(account) { // 초과 인출 이자 계산
    if (this.isPremium) {
      const baseCharge = 10;
      if (account.daysOverdrawn <= 7)
        return baseCharge;
      else
        return baseCharge + (account.daysOverdrawn - 7) * 0.85;
    }
    else 
      return account.daysOverdrawn * 1.75;
  }
}
