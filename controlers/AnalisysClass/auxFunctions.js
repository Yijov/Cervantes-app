/*cuenta las veces que una  palabla ha ocurrido en un conjunto 
de arreglos de parrafor divididos por palabra resultado de la funcion splitToWords en spliter,js
retorna un conjunto de objetos con cada palabra y su numero de veces que aparece
*/

//max number of characters per sentence.
const maxNumOfCharactersPerSentence = 160;

function repitedWordsCounter(splitedOriginalText) {
  let result = [];

  let textArr = splitedOriginalText;
  let arr = [...new Set(splitedOriginalText)];
  arr.map((word) => {
    if (word !== "") {
      result.push({
        word: word,
        times: textArr.filter((c) => c === word).length,
      });
    }
  });

  return result;
}

//Gets the estandard diviation of  paragraph´s sentences length

function getStandardDeviation(array) {
  const n = array.length;
  if (n === 0) {
    let result = [];
    return result;
  } else {
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(
      array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
    );
  }
}
//verifies if a sentence has  more that the alowed length
function checkGreaterthen(num) {
  return num >= maxNumOfCharactersPerSentence;
}

//Splits intoparagraph a very long string

function paragraphSpliter(string) {
  return string
    .trim()
    .split(/\n/g)
    .map((element) => element.trim());
}

function splitToWords(string) {
  //returns an array paragraphs separated by words
  return string
    .toLowerCase()
    .replace(/[\n]/gi, " ")
    .replace(/["#$@%(),:.;“”¿?<>¡!]/gi, "")
    .split(" ");
}

module.exports = {
  repitedWordsCounter,
  getStandardDeviation,
  checkGreaterthen,
  paragraphSpliter,
  splitToWords,
};
