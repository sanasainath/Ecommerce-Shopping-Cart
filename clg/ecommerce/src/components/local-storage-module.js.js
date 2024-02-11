// local-storage-module.js

export const saveSelectedAddressToLocalStorage = (selectedAddress) => {
    localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
  };
  