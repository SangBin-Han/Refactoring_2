/**
 * 12.2 필드 올리기(Pull Up Field)
 * 
 * - 반대 리팩터링: 필드 내리기(12.5절)
 * 
 * class Employee {...} // 자바 코드
 * 
 * class Salesperson extends Employee {
 *  private String name;
 * }
 * 
 * class Engineer extends Employee {
 *  private String name;
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Employee {
 *  protected String name;
 * }
 * 
 * class Salesperson extends Employee {...}
 * class Engineer extends Employee {...}
 * 
 * 절차
 * 1. 후보 필드들을 사용하는 곳 모두가 그 필드들을 똑같은 방식으로 사용하는지 면밀히 살핀다.
 * 2. 필드들의 이름이 각기 다르다면 똑같은 이름으로 바꾼다(필드 이름 바꾸기(9.2절))
 * 3. 슈퍼클래스에 새로운 필드를 생성한다.
 *    -> 서브클래스에서 이 필드에 접근할 수 있어야 한다(대부분 언어에서는 protected로 선언하면 된다).
 * 4. 서브클래스의 필드들을 제거한다.
 * 5. 테스트한다.
 */