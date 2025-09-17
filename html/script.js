window.addEventListener("DOMContentLoaded", () => {
  const dispenser = document.getElementById("dispenser");
  const leftGlove = document.getElementById("leftGlove");
  const rightGlove = document.getElementById("rightGlove");
  const character = document.getElementById("character");
  const branding = document.getElementById("branding");

  // Step 1: Show dispenser
  dispenser.style.animation = "dispenserIn 1s forwards";
  
  // Step 2: Drop gloves after dispenser appears
  setTimeout(() => {
    leftGlove.style.animation = "glovesDrop 1s forwards";
    rightGlove.style.animation = "glovesDrop 1s forwards";
  }, 1000);

  // Step 3: Man walks in after gloves drop
  setTimeout(() => {
    character.style.animation = "walkIn 6s forwards linear";
    character.classList.add("walk");
  }, 2500);

  // Step 4: Stop walking, pick gloves, start waving
  character.addEventListener("animationend", (e) => {
    if (e.animationName === "walkIn") {
      character.classList.remove("walk");
      character.classList.add("wave");

      // Hide dropped gloves (as if he wore them)
      leftGlove.style.display = "none";
      rightGlove.style.display = "none";

      // Step 5: Show branding
      branding.style.animation = "showBrand 1s forwards";
    }
  });
});
