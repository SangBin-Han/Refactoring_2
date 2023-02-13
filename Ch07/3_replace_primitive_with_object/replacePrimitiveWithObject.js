/**
 * 7.3 기본형을 객체로 바꾸기(Replace Primitive with Object)
 * 
 * 1판에서의 이름
 * - 데이터 값을 객체로 전환
 * - 분류 부호를 클래스로 전환
 * 
 * orders.filter(o => "high" === o.priority || "rush" === o.priority)
 * 
 * --------------- Refactoring ------------------
 * 
 * orders.filter(o => o.priority.higherThan(new Priority("normal")))
 * 
 * 절차
 * 1. 아직 변수를 캡슐화하지 않았다면 캡슐화(6.6절) 한다.
 * 2. 단순한 값 클래스(value class)를 만든다. 생성자는 기존 값을 인수로 받아서 저장하고, 이 값을 반환하는 게터를 추가한다.
 * 3. 정적 검사를 수행한다.
 * 4. 값 클래스의 인스턴스를 새로 만들어서 필드에 저장하도록 세터*를 수정한다. 이미 있다면 필드의 타입을 적절히 변경한다.
 * *세터: 단계 1에서 변수를 캡슐화하면서 만든 세터를 말한다.
 * 5. 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터**를 수정한다.
 * **게터: 단계1에서 변수를 캡슐화하면서 만든 게터를 말한다.
 * 6. 테스트한다.
 * 7. 함수 이름을 바꾸면(6.5절) 원본 접근자의 동작을 더 잘 드러낼 수 있는지 검토한다.
 * -> 참조를 값으로 바꾸거나(9.4절) 값을 참조로 바꾸면(9.5절) 새로 만든 객체의 역할(값 또는 참조 객체)이 더 잘 드러나는지 검토한다.
 */

class Order_Ex {
  constructor(data) {
    this.priority = data.priority;
    // 나머지 초기화 코드 생략
  }
  get priority() {return this._priority;}
  set priority(aString) {this._priority = aString;}
}

function main_ex() {
  highPriorityCount = orders.filter(o => "high" === o.priority
                                    || "rush" === o.priority)
                            .length;
}

// --------------- Refactoring ------------------

class Order {
  constructor(data) {
    this.priority = data.priority;
    // 나머지 초기화 코드 생략
  }
  get priority() {return this._priority;}
  get priorityString() {return this._priority.toString();}
  set priority(aString) {this._priority = new Priority(aString);}
}

class Priority {
  constructor(value) {
    if (value instanceof Priority) return value;
    if (Priority.legalValues().includes(value))
      this._value = value;
    else
      throw new Error(`<${value}>는 유효하지 않은 우선순위입니다.`);
    this._value = value;
  }
  toString() {return this._value;}
  get _index() {return Priority.legalValues().findIndex(s => s === this._value);}
  static legalValues() {return ['low', 'normal', 'high', 'rush'];}
  equals(other) {return this._index === other._index;}
  higherThan(other) {return this._index > other._index;}
  lowerThan(other) {return this._index < other._index;}
}

function main() {
  highPriorityCount = orders.filter(o => o.priority.higherThan(new Priority("normal")))
                            .length;
}