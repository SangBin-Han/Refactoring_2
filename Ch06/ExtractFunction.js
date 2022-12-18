/**
 * 6.1 함수 추출하기(Extract Function)
 * 
 * 반대 리팩터링: 함수 인라인하기(6.2)
 * 1판에서의 이름: 메서드 추출
 * 
 * 여기서는 함수라고 표현했으나, 
 * 객체 지향 언어의 메서드나, 절차형 언어의 프로시저/서브루틴에도 똑같이 적용.
 * 
 * Q1. 코드를 언제 독립된 함수로 묶어야 할까?
 * => '목적과 구현을 분리'하는 방식이 가장 합리적일 듯.
 * => 코드를 보고 무슨 일을 하는지 파악하는 데 한참이 걸린다면 그 부분을 함수로 추출한 뒤 
 * '무슨 일'에 걸맞는 이름을 짓는다. 이렇게 해두면 나중에 코드를 다시 읽을 때 함수의 목적이 눈에 확 들어오고, 
 * 본문 코드(그 함수가 목적을 이루기 위해 구체적으로 수행하는 일)에 대해서는 더 이상 신경 쓸 일이 거의 없다.
 * 
 * Q2. 코드 덩어리를 추출한 함수의 이름을 잘 지으려면 어떻게 해야할까?
 * 1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다('어떻게'가 아닌 '무엇을' 하는지가 드러나야 한다.)
 * 2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.
 * 3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수가 없는지 검사한다. 
 * 있다면 매개변수로 전달한다.
 * 4. 변수를 다 처리했다면 컴파일한다.
 * 5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다(즉, 추출한 함수로 일을 위임한다).
 * 6. 테스트한다.
 * 7. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 
 * 있다면 방금 추출한 새 함수를 호출하도록 바꿀지 검토한다(인라인 코드를 함수 호출로 바꾸기: 8.5).
 * 
 * Q3. 값을 반환할 변수가 여러 개라면?
 * => 추출할 코드를 다르게 재구성하는 방향으로 처리. 저자는 함수가 값 하나만 반환하는 방식을 선호하기에,
 * 각각을 반환하는 함수 여러 개로 만든다.
 */

class beforeRefactoring {
  printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding();
  
    // 세부사항 출력
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);

    function printBanner() {}
    function calculateOutstanding() {
      return 100000;
    }
  }
}

class afterRefactoring {
  Clock = {
    // today: '2022-05-20'
    today: new Date()
  }
  
  constructor() {}
  
  printOwing(invoice) {
    printBanner();
    const outstanding = calculateOutstanding(invoice);
    recordDueDate(invoice, this.Clock);
    printDetails(invoice, outstanding);
  
    function calculateOutstanding(invoice) {
      let result = 0;
      for (const o of invoice.orders) {
        result += o.amount;
      }
      return result;
    }
    function recordDueDate(invoice, Clock) {
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    }
    function printBanner() {
      console.log("*******************");
      console.log("**** 고객 채무 ****");
      console.log("*******************");
    }
    function printDetails(invoice, outstanding) {
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
    }
  }
}

class Fetcher {
  constructor(endPoint, options = {}) {
    this.endPoint = endPoint;
    this.options = options;
  }
  set(endPoint, options) {
    this.endPoint = endPoint;
    this.options = options;
  }
  get() {
    return fetch(this.endPoint, this.options)
      .then((response) => response.json())
      .catch((error) => console.log(`오류: ${error}`));
  }
}

const invoiceFetcher = new Fetcher("invoice.json");
const invoice = await invoiceFetcher.get();

// const ex1 = new beforeRefactoring();
const ex1 = new afterRefactoring();
ex1.printOwing(invoice);