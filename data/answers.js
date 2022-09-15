function getAnswers() {
  let answers = [];
  const answerList = document.querySelector(".sb-wordlist-items-pag");
  for (const answer of answerList.children) {
    answers = answers.concat(answer.textContent);
  }
  return answers;
}