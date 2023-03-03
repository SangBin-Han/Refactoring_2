/**
 * 12.4 메서드 내리기(Push Down Method)
 * 
 * - 반대 리팩터링: 메서드 올리기(12.1절)
 * 
 * class Employee {
 *  get quota {...}
 * }
 * 
 * class Engineer extends Employee {...}
 * class Salesperson extends Employee {...}
 * 
 * --------------- Refactoring ------------------
 * 
 * class Employee {...}
 * 
 * class Engineer extends Employee {...}
 * class Salesperson extends Employee {
 *  get quota {...}
 * }
 * 
 * 절차
 * 1. 대상 메서드를 모든 서브클래스에 복사한다.
 * 2. 슈퍼클래스에서 그 메서드를 제거한다.
 * 3. 테스트한다.
 * 4. 이 메서드를 사용하지 않는 모든 서브클래스에서 제거한다.
 * 5. 테스트한다.
 */