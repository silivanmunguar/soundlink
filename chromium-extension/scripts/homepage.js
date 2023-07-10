let defaultService;

// get the user default setting from storage and mark the button as active
getDefaultService();

//get the user default setting button
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

// get user defualt setting from storage and add the active class to the button
function getDefaultService() {
  chrome.storage.sync.get("userSettings", (data) => {
    const userSettings = data.userSettings;
    if (userSettings.defaultService) {
      // add the active class to the button
      buttons.forEach((button) => {
        if (button.dataset.service === userSettings.defaultService) {
          button.classList.add("active");
          // create a checkmark
          createCheckmark(button);
        }
      });
    }
  });
  return null;
}

// get user default service from
function setDefaultService(defaultService) {
  // save user default setting to storage
  const userSettings = {
    defaultService: defaultService,
    blockedServices: [1],
  };

  chrome.storage.sync.set({ userSettings: userSettings }, () => {
    console.log("User settings saved to storage:", userSettings.defaultService);
  });
}

// handle the click event
function handleClick() {
  // remove the active class from all buttons
  buttons.forEach((button) => {
    button.classList.remove("active");
    // remove the checkmark if it exists
    if (button.querySelector(".checkmark")) {
      button.querySelector(".checkmark").remove();
    }
  });
  // get the clicked button
  const activebutton = this;
  // set the clicked button to active
  activebutton.classList.add("active");
  // create a checkmark
  createCheckmark(activebutton);
  // set the user default setting
  defaultService = this.dataset.service;
  // set the default service
  setDefaultService(defaultService);
}

function createCheckmark(activebutton) {
  // create a checkmark to show the user which button is active
  const checkmark = document.createElement("span");

  // add the checkmark class to the checkmark
  checkmark.classList.add("checkmark");

  // add the checkmark image to the checkmark
  checkmark.innerHTML = `<img src="../../assets/icons/icons8-checkmark-500.png" alt="checkmark" />`;

  // add the checkmark to the clicked button
  activebutton.appendChild(checkmark);
}
