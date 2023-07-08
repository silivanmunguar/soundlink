//get the user default setting button
function handleClick(id) {
  defaultService = id;
  console.log("default service set to: ", defaultService);
}

// save user default setting to storage
const userSettings = {
  defaultService: defaultService,
  blockedServices: [1],
};

chrome.storage.sync.set({ userSettings: userSettings }, () => {
  console.log("User settings saved to storage:", userSettings);
});
