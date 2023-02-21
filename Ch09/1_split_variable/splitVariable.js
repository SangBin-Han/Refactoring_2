/**
 * 9.1 변수 쪼개기(Split Variable)
 * 
 * -1판에서의 이름: 매개변수로의 값 대입 제거
 * -1판에서의 이름: 임시변수 분리
 * 
 * let temp = 2 * (height + width);
 * console.log(temp);
 * temp = height * width;
 * console.log(temp);
 * 
 * --------------- Refactoring ------------------
 * 
 * const perimeter = 2 * (height + width);
 * console.log(perimeter);
 * const area = height * width;
 * console.log(area);
 * 
 * 절차
 * 1. 변수를 선언한 곳과 값을 처음 대입하는 곳에서 변수 이름을 바꾼다.
 * -> 이후의 대입이 항상 i = i + <무언가> 형태라면 수집 변수이므로 쪼개면 안 된다. 수집 변수는 총합
 *    계산, 문자열 연결, 스트림에 쓰기, 컬렉션에 추가하기 등의 용도로 흔히 쓰인다.
 * 2. 가능하면 이때 불변(immutable)으로 선언한다.
 * 3. 이 변수에 두 번째로 값을 대입하는 곳 앞까지의 모든 참조(이 변수가 쓰인 곳)를 새로운 변수 이름으로 바꾼다.
 */

function distanceTravelled_ex(scenario, time) {
  let result;
  let acc = scenario.primaryForce / scenario.mass; // 가속도(a) = 힘(F) / 질량(m)
  let primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * acc * primaryTime * primaryTime; // 전파된 거리
  let secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) { // 두 번째 힘을 반영해 다시 계산
    let primaryVelocity = acc * scenario.delay;
    acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result += primaryVelocity * secondaryTime
              + 0.5 * acc * secondaryTime * secondaryTime;
  }
  return result;
}

// --------------- Refactoring ------------------

function distanceTravelled_refactoring(scenario, time) {
  let result;
  const primaryAcceleration = scenario.primaryForce / scenario.mass; // 가속도(a) = 힘(F) / 질량(m)
  let primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * primaryAcceleration * primaryTime * primaryTime; // 전파된 거리
  let secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) { // 두 번째 힘을 반영해 다시 계산
    let primaryVelocity = primaryAcceleration * scenario.delay;
    const secondaryAcceleration = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result += primaryVelocity * secondaryTime
              + 0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
  }
  return result;
}

function discount_ex(inputValue, quantity) {
  if (inputValue > 50) inputValue = inputValue - 2;
  if (quantity > 100) inputValue = inputValue - 1;
  return inputValue;
}

// --------------- Refactoring ------------------

function discount_refactoring(inputValue, quantity) {
  let result = inputValue;
  if (inputValue > 50) result = result - 2;
  if (quantity > 100) result = result - 1;
  return result;
}