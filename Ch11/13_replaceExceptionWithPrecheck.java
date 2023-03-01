/**
  11.13 예외를 사전확인으로 바꾸기(Replace Exception with Precheck)

  - 1판에서의 이름: 예외 처리를 테스트로 교체

  doulbe getValueForPeroid (int periodNumber) {
    try {
      return values[periodNumber];
    } catch (ArrayindexOutOfBoundsException e) {
      return 0;
    }
  }

  --------------- Refactoring ------------------

  double getValueForPeriod (int periodNumber) {
    return (periodNumber >= values.length) ? 0 : values[periodNumber];
  }

  절차
  1. 예외를 유발하는 상황을 검사할 수 있는 조건문을 추가한다. catch 블록의 코드를 조건문의 조건절
    중 하나로 옮기고, 남은 try 블록의 코드를 다른 조건절로 옮긴다.
  2. catch 블록에 어서션을 추가하고 테스트한다.
  3. try문과 catch 블록을 제거한다.
  4. 테스트한다.
 */
 // --------------- 예시1 ------------------
//  class ResourcePool {
//   public Resource get() {
//     Resource result;
//     try {
//       result = available.pop();
//       allocated.add(result);
//     } catch (NoSuchElementException e) {
//       result = Resource.create();
//       allocated.add(result);
//     }
//     return result;
//   }

//   private Deque<Resource> available;
//   private List<Resource> allocated;
//  }

// --------------- Refactoring ------------------

class ResourcePool {
  public Resource get() {
    Resource result = (available.isEmpty()) ? Resource.create() : available.pop();
      // } catch (NoSuchElementException e) { // 테스트 통과 후 삭제
      //   throw new AssertionError("도달 불가");
      // }
    allocated.add(result);
    return result;
  }

  private Deque<Resource> available;
  private List<Resource> allocated;
}