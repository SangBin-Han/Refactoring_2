/**
 * 11.9 함수를 명령으로 바꾸기(Replace Function with Command)
 * 
 * - 반대 리팩터링: 명령을 함수로 바꾸기(11.10절)
 * - 1판에서의 이름: 메서드를 메서드 객체로 전환
 * 
 * function score(candidate, medicalExam, scoringGuide) {
 *  let result = 0;
 *  let healthLevel = 0;
 *  // 긴 코드 생략
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Scorer {
 *  constructor(candidate, medicalExam, scoringGuide) {
 *    this._candidate = candidate;
 *    this._medicalExam = medicalExam;
 *    this._scoringGuide = scoringGuide;
 *  }
 *  
 *  execute() {
 *    this._result = 0;
 *    this._healthLevel = 0;
 *    // 긴 코드 생략
 *  }
 * }
 * 
 * 절차
 * 1. 대상 함수의 기능을 옮길 빈 클래스를 만든다. 클래스 이름은 함수 이름에 기초해 짓는다.
 * 2. 방금 생성한 빈 클래스로 함수를 옮긴다(8.1절)
 *    -> 리팩터링이 끝날 때까지는 원래 함수를 전달 함수 역할로 남겨두자.
 *    -> 명령 관련 이름은 사용하는 프로그래밍 언어의 명명규칙을 따른다. 규칙이 딱히 없다면 "execute"
 *       나 "call" 같이 명령의 실행 함수에 흔히 쓰이는 이름을 택하자.
 * 3. 함수의 인수들 각각은 명령의 필드로 만들어 생성자를 통해 생성할지 고민해본다.
 */
// --------------- 예시1 ------------------
// function score(candidate, medicalExam, scoringGuide) {
//   let result = 0;
//   let healthLevel = 0;
//   let highMedicalRiskFlag = false;

//   if (medicalExam.isSmoker) {
//     healthLevel += 10;
//     highMedicalRiskFlag = true;
//   }
//   let certificationGrade = "regular";
//   if (scoringGuide.stateWithLowCertification(candidate.originState)) {
//     certificationGrade = "low";
//     result -= 5;
//   }
//   // 비슷한 코드가 한참 이어짐
//   result -= Math.max(healthLevel - 5, 0);
//   return result;
// }

// --------------- Refactoring ------------------

function score(candidate, medicalExam, scoringGuide) {
  return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  execute() {
    this._result = 0;
    this._healthLevel = 0;
    this._highMedicalRiskFlag = false;

    this.scoreSmoking();
    this._certificationGrade = "regular";
    if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
      this._certificationGrade = "low";
      this._result -= 5;
    }
    // 비슷한 코드가 한참 이어짐
    this._result -= Math.max(this._healthLevel - 5, 0);
    return this._result;
  }

  scoreSmoking() {
    if (this._medicalExam.isSmoker) {
      this._healthLevel += 10;
      this._highMedicalRiskFlag = true;
    }
  }
}