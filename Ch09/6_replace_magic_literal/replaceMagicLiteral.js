/**
 * 9.6 매직 리터럴 바꾸기(Replace Magic Literal)
 * 
 * - 1판에서의 이름: 마법 숫자를 기호 상수로 전환
 * 
 * function potentailEnergy(mass, height) {
 *  return mass * 9.81 * height;
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * const STANDARD_GRAVITY = 9.81;
 * function potentailEnergy(mass, height) {
 *  return mass * STANDARD_GRAVITY * height;
 * }
 * 
 * 절차
 * 1. 상수를 선언하고 매직 리터럴을 대입한다.
 * 2. 해당 리터럴이 사용되는 곳을 모두 찾는다.
 * 3. 찾은 곳 각각에서 리터럴이 새 상수와 똑같은 의미로 쓰였는지 확인하여, 같은 의미라면 상수로 대체한 후 테스트한다.
 */