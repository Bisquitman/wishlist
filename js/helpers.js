export const createElement = (tagName, attrs) => {
  const elem = document.createElement(tagName);
  Object.assign(elem, attrs);
  return elem;
};

export const pluralizeYears = (age) => {
  let years = age % 100;

  if (years >= 11 && years <= 19) {
    return 'лет';
  } else {
    let lastDigit = years % 10;

    if (lastDigit === 1) {
      return 'год';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return 'года';
    } else {
      return 'лет';
    }
  }
};

export const handleImageFileSelection = (inputFile, image, inputHidden) => {
  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        image.src = reader.result;
        inputHidden.value = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  inputFile.addEventListener('change', handleFileInputChange);
};

export const createSelectDate = (
  selectDay,
  selectMonth,
  selectYear,
  birthdate,
) => {
  for (let day = 0; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day ? day : '';
    option.text = day ? day : '';
    selectDay.append(option);
  }

  const months = [
    '',
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ];

  for (let i = 0; i < months.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = months[i];
    selectMonth.append(option);
  }

  const currentYear = new Date().getFullYear();

  const optionYear = document.createElement('option');
  optionYear.value = '';
  optionYear.text = '';
  selectYear.append(optionYear);

  for (let year = currentYear; year >= currentYear - 200; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.text = year;
    selectYear.append(option);
  }

  if (birthdate) {
    const [day, month, year] = birthdate.split('/');
    selectDay.value = day;
    selectMonth.value = month;
    selectYear.value = year;
  }

  [selectDay, selectMonth, selectYear].forEach((dateSelect) => {
    dateSelect.addEventListener('change', ({ currentTarget }) => {
      currentTarget.blur();
    });
  });
};
