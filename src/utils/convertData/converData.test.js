import { convertData } from './convertData';

describe('myConverter validator', () => {
  it('should return valid result', () => {
    const fields = {
      field1: {
        value: '555',
        disabled: true,
        error: null,
      },
      field2: {
        value: '222',
        disabled: false,
        error: 'Обязательное поле',
      },
      field3: {
        value: '333',
        disabled: false,
        error: null,
      },
    };

    const result = {
      field1: '555',
      field2: '222',
      field3: '333',
    };

    expect(convertData(fields)).toEqual(result);
  });
});
