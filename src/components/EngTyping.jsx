const dataSet = [
  "가나다",
  "abc",
  "아베쎄",
  "굿",
  // ... 추가적인 데이터셋 아이템들
];

export const getRandomItem = () => {
  if (dataSet.length === 0) {
    return "게임 끝";
  }

  const randomIndex = Math.floor(Math.random() * dataSet.length);
  const randomItem = dataSet[randomIndex];

  // dataSet 배열에서 해당 문자열을 제거
  dataSet.splice(randomIndex, 1);

  return randomItem;
};
