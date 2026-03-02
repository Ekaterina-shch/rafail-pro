export const initPhoneMasks = () => {
  const inputs = document.querySelectorAll('.input-phone');

  const cleanPhoneNumber = (value) => value.replace(/\D/g, '');

  const formatPhoneNumber = (value) => {
    const numbers = cleanPhoneNumber(value).substring(0, 10); // Ограничиваем 10 цифрами
    let formatted = '';

    if (numbers.length > 0) {
      formatted += `(${numbers.substring(0, 3)}`;
    }
    if (numbers.length >= 4) {
      formatted += `) ${numbers.substring(3, 6)}`;
    }
    if (numbers.length >= 7) {
      formatted += ` - ${numbers.substring(6, 8)}`;
    }
    if (numbers.length >= 9) {
      formatted += ` - ${numbers.substring(8, 10)}`;
    }
    return formatted;
  };

  const onPhoneInput = (e) => {
    const input = e.target;
    const selectionStart = input.selectionStart; // Запоминаем позицию курсора
    const oldLength = input.value.length;

    input.value = formatPhoneNumber(input.value);

    // Логика, чтобы курсор не прыгал в конец при редактировании в середине
    if (e.inputType !== 'deleteContentBackward') {
      const newLength = input.value.length;
      const pos = selectionStart + (newLength - oldLength);
      input.setSelectionRange(pos, pos);
    }
  };

  const onPhoneKeyDown = (e) => {
    const input = e.target;
    // Если стираем последнюю цифру, очищаем поле полностью
    if (e.key === 'Backspace' && cleanPhoneNumber(input.value).length === 1) {
      input.value = '';
    }
  };

  const onPhonePaste = (e) => {
    const pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      const pastedText = cleanPhoneNumber(pasted.getData('Text')).slice(-10);
      e.target.value = formatPhoneNumber(pastedText);
      e.preventDefault();
    }
  };

  inputs.forEach((input) => {
    input.addEventListener('input', onPhoneInput);
    input.addEventListener('keydown', onPhoneKeyDown);
    input.addEventListener('paste', onPhonePaste);
  });
};

export const getFormattedPhoneNumber = (input, countryCode = '+7') => {
  const numbers = input.value.replace(/\D/g, '');
  return numbers ? `${countryCode} ${input.value.trim()}` : '';
};
