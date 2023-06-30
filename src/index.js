document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.getElementById("dog-bar");
    const dogInfo = document.getElementById("dog-info");
    const filterButton = document.getElementById("good-dog-filter");
  
    // Fetch all pups from the server
    fetch("http://localhost:3000/pups")
      .then(response => response.json())
      .then(pups => {
        // Populate the dog bar with pup names
        pups.forEach(pup => {
          const span = document.createElement("span");
          span.textContent = pup.name;
  
          span.addEventListener("click", () => {
            // Show pup's info when clicked
            showPupInfo(pup);
          });
  
          dogBar.appendChild(span);
        });
      });
  
    function showPupInfo(pup) {
      // Clear previous pup's info
      dogInfo.innerHTML = "";
  
      // Create elements for pup's info
      const img = document.createElement("img");
      img.src = pup.image;
  
      const h2 = document.createElement("h2");
      h2.textContent = pup.name;
  
      const button = document.createElement("button");
      button.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
      button.addEventListener("click", () => {
        // Toggle good/bad dog status
        toggleGoodDog(pup, button);
      });
  
      // Append elements to dog info container
      dogInfo.appendChild(img);
      dogInfo.appendChild(h2);
      dogInfo.appendChild(button);
    }
  
    function toggleGoodDog(pup, button) {
      // Toggle the isGoodDog status
      pup.isGoodDog = !pup.isGoodDog;
  
      // Update the button text
      button.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
  
      // Update the pup's status on the server
      fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isGoodDog: pup.isGoodDog })
      });
    }
  
    filterButton.addEventListener("click", () => {
      // Toggle filter button text
      filterButton.textContent =
        filterButton.textContent === "Filter good dogs: OFF"
          ? "Filter good dogs: ON"
          : "Filter good dogs: OFF";
  
      // Show/hide pups based on filter
      const spans = dogBar.getElementsByTagName("span");
      const isFilterOn = filterButton.textContent === "Filter good dogs: ON";
  
      for (const span of spans) {
        const pupName = span.textContent;
        const pup = pups.find(p => p.name === pupName);
  
        if (isFilterOn && !pup.isGoodDog) {
          span.style.display = "none";
        } else {
          span.style.display = "inline";
        }
      }
    });
  });
  