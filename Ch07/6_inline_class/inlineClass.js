/**
 * 7.6 클래스 인라인하기(Inline Class)
 * 
 * - 반대 리팩터링: 클래스 추출하기(7.5절)
 * 
 * class Person {
 *  get officeAreaCode() {return this._telephoneNumer.areaCode;}
 *  get officeNumber() {return this._telephoneNumber.number;}
 * }
 * class TelephoneNumber {
 *  get areaCode() {return this._areaCode;}
 *  get number() {return this._number;}
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * class Person {
 *  get officeAreaCode() {return this._officeAreaCode;}
 *  get officeNumber() {return this._officeNumber;}
 * }
 * 
 * 절차
 * 1. 소스 클래스의 각 public 메서드에 대응하는 메서드들을 타깃 클래스에 생성한다. 이 메서드들은 단순히 작업을
 *    소스 클래스로 위임해야 한다.
 * 2. 소스 클래스의 메서드를 사용하는 코드를 모두 타킷 클래스의 위임 메서드를 사용하도록 바꾼다. 하나씩 바꿀 때마다 테스트한다.
 * 3. 소스 클래스의 메서드와 필드를 모두 타깃 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
 * 4. 소스 클래스를 삭제하고 조의를 표한다.
 */
class TrackingInformation_Ex {
  get shippingCompany() {return this._shippingCompany;} // 배송회사
  set shippingCompany(arg) {this._shippingCompany = arg;}
  get trackingNumber() {return this._trackingNumber;} // 추적 번호
  set trackingNumber(arg) {this._trackingNumber = arg;}
  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

class Shipment_Ex {
  get trackingInfo() {
    return this._trackingInformation.display;
  }
  get trackingInformation() {return this._trackingInformation;}
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}

// --------------- Refactoring ------------------

class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
  get trackingNumber() {return this._trackingNumber;}
  set trackingNumber(aTrackingNumber) {
    this._trackingNumber = aTrackingNumber;
  }
  get shippingCompany() {return this._shippingCompany;}
  set shippingCompany(arg) {this._shippingCompany = arg;}
}

function main() {
  aShipment.shippingCompany = request.vendor;
}
