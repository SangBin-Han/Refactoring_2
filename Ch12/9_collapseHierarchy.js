/**
 * 12.9 계층 합치기(Collapse Hierarchy)
 * 
 * class Employee {...}
 * class Salesperson extends Employee {...}
 * 
 * --------------- Refactoring ------------------
 * 
 * class Employee {...}
 * 
 * 절차
 * 1. 두 클래스 중 제거할 것을 고른다.
 *    -> 미래를 생각하여 더 적합한 이름의 클래스를 남기자. 둘 다 적절치 않다면 임의로 하나를 고른다.
 * 2. 필드올리기(12.2절)와 메서드 올리기(12.1절) 혹은 필드 내리기(12.5절)와 메서드 내리기(12.4절)를 적용하여
 *    모든 요소를 하나의 클래스로 옮긴다.
 * 3. 제거할 클래스를 참조하던 모든 코드가 남겨질 클래스를 참조하도록 고친다.
 * 4. 빈 클래스를 제거한다.
 * 5. 테스트한다.
 */