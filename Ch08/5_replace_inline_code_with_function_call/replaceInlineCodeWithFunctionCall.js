/**
 * 8.5 인라인 코드를 함수 호출로 바꾸기(Replace Inline Code with Function Call)
 * 
 * let appliesToMass = false;
 * for(const s of states) {
 *  if (s==="MA") appliesToMass = true;
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * appliesToMass = states.includes("MA");
 * 
 * 절차
 * 1. 인라인 코드를 함수 호출로 대체한다.
 * 2. 테스트한다.
 */