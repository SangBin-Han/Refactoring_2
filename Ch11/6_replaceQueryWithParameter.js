/**
 * 11.6 질의 함수를 매개변수로 바꾸기(Replace Query with Parameter)
 * 
 * - 반대 리팩터링: 매개변수를 질의 함수로 바꾸기(11.5절)
 * 
 * targetTemperature(aPlan)
 * 
 * function targetTemperature(aPlan) {
 *  currentTemperature = thermostat.currentTemperature;
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * targetTemperature(aPlan, thermostat.currentTemperature)
 * 
 * function targetTemperature(aPlan, currentTemperature)
 * 
 * 절차
 * 1. 변수 추출하기(6.3절)로 질의 코드를 함수 본문의 나머지 코드와 분리한다.
 * 2. 함수 본문 중 해당 질의를 호출하지 않는 코드들을 별도 함수로 추출(6.1절)한다.
 *    -> 이 함수의 이름은 나중에 수정해야 하니 검색하기 쉬운 이름으로 짓는다.
 * 3. 방금 만든 변수를 인라인(6.4절)하여 제거한다.
 * 4. 원래 함수도 인라인(6.2절)한다.
 * 5. 새 함수의 이름을 원래 함수의 이름으로 고쳐준다.
 */
// --------------- 예시1 ------------------
// class HeatingPlan {
//   get targetTemperature() {
//     if (thermosetat.selectedTemperature > this._max) return this._max;
//     else if (thermostat.selectedTemperature < this._min) return this._min;
//     else return thermostat.selectedTemperature;
//   }
// }

// // 호출자
// if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
// else if (thePlan.targetTemperature < thermostat.currentTemperature) setToCool();
// else setOff();

// --------------- Refactoring ------------------

class HeatingPlan {
  targetTemperature(selectedTemperature) {
    if (selectedTemperature > this._max) return this._max;
    else if (selectedTemperature < this._min) return this._min;
    else return selectedTemperature;
  }
}

// 호출자
if (thePlan.targetTemperature(thermostat.selectedTemperature) > thermostat.currentTemperature) setToHeat();
else if (thePlan.targetTemperature(thermostat.selectedTemperature) < thermostat.currentTemperature) setToCool();
else setOff();


