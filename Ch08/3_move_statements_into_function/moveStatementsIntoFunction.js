/**
 * 8.3 문장을 함수로 옮기기(Move Statements into Function)
 * 
 * - 반대 리팩터링: 문장을 호출한 곳으로 옮기기(8.4절)
 * 
 * result.push(`<p>제목: ${person.photo.title}</p>`);
 * result.concat(photoData(person.photo));
 * 
 * function photoData(aPhoto) {
 *  return [
 *    `<p>위치: ${aPhoto.location}</p>`,
 *    `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
 *  ];
 * }
 * 
 * --------------- Refactoring ------------------
 * 
 * result.concat(photoData(person.photo));
 * 
 * function photoData(aPhoto) {
 *  return [
 *    `<p>제목: ${person.photo.title}</p>`,
 *    `<p>위치: ${aPhoto.location}</p>`,
 *    `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
 *  ];
 * }
 * 
 * 절차
 * 1. 반복 코드가 함수 호출 부분과 멀리 떨어져 있다면 문장 슬라이드하기(8.6절)를 적용해 근처로 옮긴다.
 * 2. 타깃 함수를 호출하는 곳이 한 곳뿐이면, 단순히 소스 위치에서 해당 코드를 잘라내어 피호출 함수로
 *    복사하고 테스트한다. 이 경우라면 나머지 단계는 무시한다.
 * 3. 호출자가 둘 이상이면 호출자 중 하나에서 '타깃 함수 호출 부분과 그 함수로 옮기려는 문장들을 함께'
 *    다른 함수로 추출(6.1절)한다. 추출한 함수에 기억하기 쉬운 임시 이름을 지어준다.
 * 4. 다른 호출자 모두가 방금 추출한 함수를 사용하도록 수정한다. 하나씩 수정할 때마다 테스트한다.
 * 5. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인(6.2절)한 후 원래 함수를 제거한다.
 * 6. 새로운 함수의 이름을 원래 함수의 이름으로 바꿔준다(함수 이름 바꾸기: 6.5절)
 * -> 더 나은 이름이 있다면 그 이름을 쓴다.
 */

function renderPerson_ex(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(`<p>제목: ${person.photo.title}</p>`); // 제목 출력
  result.push(emitPhotoData_ex(person.photo));
  return result.join("\n");
}

function photoDiv_ex(p) {
  return [
    "<div>",
    `<p>제목: ${p.title}</p>`, // 제목 출력
    emitPhotoData_ex(p),
    "</div>",
  ].join("\n");
}

function emitPhotoData_ex(aPhoto) {
  const result = [];
  result.push(`<p>위치: ${aPhoto.location}</p>`);
  result.push(`<p>날짜: ${aPhoto.date.toDateString()}</p>`);
  return result.join("\n");
}

// --------------- Refactoring ------------------

function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(zznew(person.photo));
  return result.join("\n");
}

function photoDiv(p) {
  return [
    "<div>",
    emitPhotoData(p),
    "</div>",
  ].join("\n");
}

function emitPhotoData(p) {
  return [
    `<p>제목: ${p.title}</p>`, // 제목 출력
    `<p>위치: ${p.location}</p>`,
    `<p>날짜: ${p.date.toDateString()}</p>`
  ].join("\n");
}