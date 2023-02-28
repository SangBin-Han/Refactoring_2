/**
 * 11.5 매개변수를 질의 함수로 바꾸기(Replace Parameter with Query)
 * 
 * - 반대 리팩터링: 질의 함수를 매개변수로 바꾸기(11.6절)
 * - 1판에서의 이름: 매개변수 세트를 메서드로 전환
 * 
 * availableVacation(anEmployee, anEmployee.grade);
 * 
 * function availableVacation(anEmployee, grade) {
 *  // 연휴 계산...
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * availableVacation(anEmployee)
 * 
 * function availableVacation(anEmployee) {
 *  const grade = anEmployee.grade;
 *  // 연휴 계산...
 * }
 * 
 * 절차
 * 1. 필요하다면 대상 매개변수의 값을 계산하는 코드를 별도 함수로 추출(6.1절) 해놓는다.
 * 2. 함수 본문에서 대상 매개변수로의 참조를 모두 찾아서 그 매개변수의 값을 만들어주는 표현식을 참조
 *    하도록 바꾼다. 하나 수정할 때마다 테스트한다.
 * 3. 함수 선언 바꾸기(6.5절)로 대상 매개변수를 없앤다.
 */
// --------------- 예시1 ------------------
// class Order {
//   get finalPrice() {
//     const basePrice = this.quantity * this.itemPrice;
//     let discountLevel;
//     if (this.quantity > 100) discountLevel = 2;
//     else discountLevel = 1;
//     return this.discountedPrice(basePrice, discountLevel);
//   }
//   discountedPrice(basePrice, discountLevel) {
//     switch (discountLevel) {
//       case 1: return basePrice * 0.95;
//       case 2: return basePrice * 0.9;
//     }
//   }
// }

// --------------- Refactoring ------------------

class Order {
  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    return this.discountedPrice(basePrice);
  }
  get discountLevel() {
    return (this.quantity > 100) ? 2 : 1;
  }
  discountedPrice(basePrice) {
    switch (this.discountLevel) {
      case 1: return basePrice * 0.95;
      case 2: return basePrice * 0.9;
    }
  }
}

