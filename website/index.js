'use strict';

// let values = ['Skole', 'Borger', 'Dagtilbud', 'DFDG', 'DREAM', 'FSIII', 'KY', 'Nøgletal', 'Aula', 'Ældre'];
// let values = ['Elevfravær\nSkole', 'Udgifter til dagpleje\nDagtilbud', 'Helbredstilstand\nFSIII', 'Anbringelsessted\nUdsatte børn og unge', 'Sagsbehandlingstid\nKY', 'Pendlermønstre\nDREAM'];

// let values = ['😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉', '😋', '😍']; 🏆 😭
// Emojies: https://www.w3schools.com/charsets/ref_emoji_smileys.asp

let values = ['      Elevfravær\nSkole & Daginstitutioner\n(Skole)', 
'Udgifter til dagpleje\nSkole & Daginstitutioner\n(Dagtilbud)', 
'Helbredstilstand\nSocial & Sundhed\n(FSIII)', 
'Anbringelsessted\nSocial & Sundhed\n(Udsatte børn og unge)', 
'  Sagsbehandlingstid\nArbejdsmarked og Beskæftigelse\n(KY)', 
'     Pendlermønstre\nArbejdsmarked & Beskæftigelse\n(DREAM)', 
' Økonomi\nTværgående\n(Tværgående)', 
'   Borger\nTværgående\n(Tværgående)', 
'Personale & Fravær\nTværgående\n(Tværgående)'];


// selecting all elements
let valueOne = document.getElementById('value-one');
let valueTwo = document.getElementById('value-two');
let valueThree = document.getElementById('value-three');
let result = document.getElementById('result');
const playBtn = document.getElementById('play-btn');

// Generate a click event and assign the 'spinValues' function
playBtn.addEventListener('click', spinValues);

function spinValues() {
  // Deactivate the play button so as not to allow the user to click several times.
  playBtn.disabled = true;

  /*
   * Generate the number of random attempts by calling 'randomAttempts' function
   * Later we'll use this value to compare with 'initValue' to stop 'setInterval' method
   */
  const attempts = randomAttempts(3, values.length);

  // initial values to compare with attempts to stop 'setInterval' method
  let initValue_one = 0,
    initValue_two = 0,
    initValue_three = 0;

  /*
   * words1, words2, words3
   * Declare these variables outside of setInterval scope to use in the victory function
   */
  let words1, words2, words3;

  /*
   * slotOne, slotTwo, slotThree
   * For each slot, using 'setInterval' method
   * Generate random emojis until the number of attempts is reached
   * When the last slot has loaded, the victory function is called up
   */
  let slotOne = setInterval(() => {
    words1 = values[randomNumber(values.length)].split('\n');
    valueOne.innerHTML = words1[0] + '<br>' + '<br>' + '<span class="smaller">' + words1[1] + '</span>' + '<br>' + '<span class="data">' + words1[2] + '</span>';
    initValue_one++;

    if (initValue_one == attempts) {
      clearInterval(slotOne);
      checkVictory(); // Check for victory after each slot has stopped spinning
      return null;
    }
  }, 100);

  let slotTwo = setInterval(() => {
    words2 = values[randomNumber(values.length)].split('\n');
    valueTwo.innerHTML = words2[0] + '<br>' + '<br>' + '<span class="smaller">' + words2[1] + '</span>' + '<br>' + '<span class="data">' + words2[2] + '</span>';
    initValue_two++;

    if (initValue_two == attempts) {
      clearInterval(slotTwo);
      checkVictory(); // Check for victory after each slot has stopped spinning
      return null;
    }
  }, 100);

  let slotThree = setInterval(() => {
    words3 = values[randomNumber(values.length)].split('\n');
    valueThree.innerHTML = words3[0] + '<br>' + '<br>' + '<span class="smaller">' + words3[1] + '</span>' + '<br>' + '<span class="data">' + words3[2] + '</span>';
    initValue_three++;

    if (initValue_three == attempts) {
      clearInterval(slotThree);
      checkVictory(); // Check for victory after each slot has stopped spinning
      playBtn.disabled = false;
      return null;
    }
  }, 100);

  function checkVictory() {
    if (words1[1] === words2[1] && words2[1] === words3[1]) {
      result.innerHTML = 'TILLYKKE! 🏆';
    } else {
      result.innerHTML = 'ØV!😭 Prøv igen!';
    }
  }
}

function randomNumber(length) {
  return Math.floor(Math.random() * length);
}

function randomAttempts(min, max) {
  return Math.floor(Math.random() * max + min);
}