function createDistribution() {
  let distribution = {
    range: {
      lowest: Number.MAX_SAFE_INTEGER,
      highest: 0
    },
    twoLetterList: {},
    letterCount: {}
  };

  for (const answer of window.wrappedJSObject.gameData.today.answers) {
    // Set range of word lengths
    distribution.range.lowest = Math.min(answer.length, distribution.range.lowest);
    distribution.range.highest = Math.max(answer.length, distribution.range.highest);

    // Build first letter list
    const firstLetters = answer.substring(0, 2);

    if (!(firstLetters in distribution.twoLetterList)) {
      distribution.twoLetterList[firstLetters] = {};
      // Need to add the first word's count
      distribution.twoLetterList[firstLetters] = 1;
    } else {
      const prevCount = distribution.twoLetterList[firstLetters];
      distribution.twoLetterList[firstLetters] = prevCount + 1;
    }

    // Build letter count list
    const firstLetter = answer.substring(0, 1);
    if (!(firstLetter in distribution.letterCount)) {
      distribution.letterCount[firstLetter] = {};
      // Need to add the first letter's count
      distribution.letterCount[firstLetter][answer.length] = 1;
    } else {
      if(!(answer.length in distribution.letterCount[firstLetter])) {
        distribution.letterCount[firstLetter][answer.length] = 1;
      } else {
        const prevCount = distribution.letterCount[firstLetter][answer.length];
        distribution.letterCount[firstLetter][answer.length] = prevCount + 1;
      }
    }
  }

  return distribution;
}