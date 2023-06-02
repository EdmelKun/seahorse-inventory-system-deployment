export const disableCharInput = (e: any, fieldID: string) => {
  if (fieldID === 'contactNum') {
    if (
      (!/^[0-9]$/.test(e.key) && e.key !== 'Backspace') ||
      e.target.value.length > 10 ||
      (e.target.value.length < 2 && e.key === 'Backspace') ||
      (e.target.value.length === 0 && e.key !== '0')
    ) {
      e.preventDefault();
    }
  } else if (fieldID === 'zipCode') {
    if (!/^[0-9]$/.test(e.key) || e.target.value.length >= 5) {
      e.preventDefault();
    }
  } else {
    let allowedChars = /^[0-9]+$/;

    const inputValue = e.target.value + e.key;

    if (fieldID === 'retailPrice' || fieldID === 'wholesalePrice') {
      allowedChars = /^(?!0[0-9])\d*(\.\d{0,2})?$/;
    }

    if (/^0/.test(inputValue) && /0{2,}/.test(inputValue)) {
      e.preventDefault();
      return;
    }

    if (/^0[0-9]/.test(inputValue)) {
      e.preventDefault();
      return;
    }

    if (!allowedChars.test(e.key)) {
      e.preventDefault();
    }
  }
};

export const validateInput = (e: any, fieldID: string, handleChange: any) => {
  let inputValue = e.target.value;

  inputValue = inputValue.replace(/[^0-9.]/g, '');

  const parts = inputValue.split('.');
  if (parts.length > 1) {
    // Keep up to 2 decimal places
    inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
  }
  inputValue = parseFloat(inputValue).toString();

  if (parseFloat(inputValue) < 0) {
    inputValue = '0';
  } else if (parseFloat(inputValue) > 1000000) {
    inputValue = '1000000';
  }

  handleChange({
    target: {
      id: fieldID,
      value: Number(inputValue),
    },
  });
};
