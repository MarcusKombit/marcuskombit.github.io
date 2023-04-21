const symbols = [
    { group: "fruits", symbols: ["🍎", "🍌", "🍇", "🍊", "🍉"] },
    { group: "animals", symbols: ["🐶", "🐱", "🐻", "🦁", "🐯"] },
    { group: "emoticons", symbols: ["😀", "😍", "😂", "😎", "🤔"] },
  ];
  
  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");
  const spinButton = document.getElementById("spinButton");
  
  let spinning = false;
  
  function spin() {
    // Disable the spin button while the slots are spinning
    spinButton.disabled = true;
  
    // Generate random symbols for each slot
    var symbols1 = generateRandomSymbols();
    var symbols2 = generateRandomSymbols();
    var symbols3 = generateRandomSymbols();
  
    // Set the symbols for each slot
    setSymbols(slot1, symbols1);
    setSymbols(slot2, symbols2);
    setSymbols(slot3, symbols3);
  
    // Animate the symbols
    animateSymbols(slot1, symbols1);
    animateSymbols(slot2, symbols2);
    animateSymbols(slot3, symbols3, function() {
      // Re-enable the spin button when the slots stop spinning
      spinButton.disabled = false;
  
      // Check for a win
      if (checkForWin(symbols1, symbols2, symbols3)) {
        alert("Congratulations, you won!");
      }
    });
  }
  
  function animateSymbols(slot, symbols, callback) {
    // Set the animation duration based on the number of symbols
    var duration = 1000 + (symbols.length - 1) * 500;
  
    // Randomly select a group name
    var groupName = groups[Math.floor(Math.random() * groups.length)];
  
    // Animate each symbol
    for (var i = 0; i < symbols.length; i++) {
      // Create a new symbol element
      var symbol = document.createElement("div");
  
      // Add the symbol image
      symbol.style.backgroundImage = "url('" + symbols[i].url + "')";
  
      // Add the symbol group name as a child element
      var group = document.createElement("div");
      group.classList.add("symbol-group");
      group.textContent = groupName;
      symbol.appendChild(group);
  
      // Set the initial position of the symbol
      symbol.style.top = i * SYMBOL_HEIGHT + "px";
  
      // Add the symbol to the slot element
      slot.querySelector(".symbols").appendChild(symbol);
  
      // Animate the symbol to the final position
      symbol.animate([
        { transform: "translateY(-" + SYMBOL_HEIGHT * i + "px)" },
        { transform: "translateY(-" + SYMBOL_HEIGHT * i + "px)" }
      ], {
        duration: duration,
        easing: "cubic-bezier(0.5, 0, 0.5, 1)"
      });
    }
  
    // Call the callback function after the animation is complete
    setTimeout(callback, duration);
  }

function spinSlot(slot) {
  const symbolsCount = symbols.length;
  const duration = Math.floor(Math.random() * 2000) + 1000;

  return new Promise((resolve, reject) => {
    let counter = 0;
    const interval = setInterval(() => {
      const symbol = symbols[Math.floor(Math.random() * symbolsCount)].symbols[Math.floor(Math.random() * symbolsCount)];
      slot.querySelector(".symbols").textContent = symbol;

      if (++counter === 10) {
        clearInterval(interval);
        resolve(symbol);
      }
    }, duration / 10);
  });
}

spinButton.addEventListener("click", spin);