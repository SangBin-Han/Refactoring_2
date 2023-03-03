/**
 * 12.5 필드 내리기(Push Down Field)
 * 
 * - 반대 리팩터링: 필드 올리기(12.2절)
 * 
 * class Employee { // 자바 코드
 *  private String quota;
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
 *  protected String quota;
 * }
 * 
 * 절차
 * 1. 대상 필드를 모든 서브클래스에 정의한다.
 * 2. 슈퍼클래스에서 그 필드를 제거한다.
 * 3. 테스트한다.
 * 4. 이 필드를 사용하지 않는 모든 서브클래스에서 제거한다.
 * 5. 테스트한다.
 */