import React, { useCallback, useState } from 'react';
import './Declaration.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../Inputs/TextInput/TextInput';
import { SelectInput } from '../Inputs/SelectInput/SelectInput';
import { SwitchInput } from '../Inputs/SwitchInput/SwitchInput';
import { CheckboxInput } from '../Inputs/CheckboxInput/CheckboxInput';
import { FileInput } from '../Inputs/FileInput/FileInput';
import { convertData } from '../utils/convertData/convertData';

function validateRequireness(value) {
  const error = value === '' ? ['Поле является обязательным'] : [];
  return error;
}

const textFieldNames = [
  'year',
  'submittedBefore',
  'comment',
  'promocode',
  'name',
  'phone',
].map((item) => `order[${item}]`);

const boolFieldNames = [
  'foreignBrokers',
  'interactive_brokers',
  'etoro',
  'bcs_cyprus',
  'saxo_bank',
  'freedom_finance_global',
  'open_broker',
  'just2trade',
  'freedom_finance_europe',
  'other_broker',
  'exante',
  'bnp_paribas',
  'domestic_brokers_foreign_dividends',
  'deductions',
  'investment',
  'loss_transfer',
  'property',
  'social',
  'standart',
  'property_sale',
].map((item) => `order[${item}]`);

const fileFieldNames = [
  'rf_broker_foreign_dividends_reports[]',
  'activity_reports[]',
  'dividend_report',
  'foreign_non_ib_broker_reports[]',
];

const promocodeName = ['promocode'];

function createInitialFields(fieldNames, initialValue) {
  return fieldNames.reduce((accumulator, fieldName) => {
    const initialParams = {
      value: initialValue,
      disabled: false,
      errors: [],
    };
    accumulator[fieldName] = initialParams;
    return accumulator;
  }, {});
}
const textFields = createInitialFields(textFieldNames, '');
const boolFileds = createInitialFields(boolFieldNames, false);
const fileFields = createInitialFields(fileFieldNames, []);
const promocodeField = createInitialFields(promocodeName, '');
const initialFields = {
  ...textFields, ...boolFileds, ...fileFields, ...promocodeField,
};

const validators = {
  'order[year]': [validateRequireness],
  'order[submittedBefore]': [validateRequireness],
  'order[name]': [validateRequireness],
  'order[phone]': [validateRequireness],
};

export function Declaration() {
  const [fields, setFields] = useState(
    initialFields,
  );
  const navigate = useNavigate();
  function validateField(name) {
    const { value } = fields[name];
    const fieldValidators = validators[name] ?? [];
    const isFieldInvalid = fieldValidators.some((validator) => {
      const validationResult = validator(value);
      if (validationResult.length) {
        setFields((prevData) => ({
          ...prevData,
          [name]: {
            ...prevData[name],
            errors: validationResult,
          },
        }));
      }
      return Boolean(validationResult.length);
    });
    return isFieldInvalid;
  }

  function validateForm() {
    let formHasErrors = false;
    const fieldOptions = Object.keys(fields);
    fieldOptions.forEach((fieldName) => {
      if (validateField(fieldName)) {
        formHasErrors = true;
      }
    });
    return formHasErrors;
  }

  const YearOptions = ['', '2017', '2018', '2019', '2020', '2021', '2022'];
  const YesNoOptions = ['', 'Да', 'Нет'];
  const brokersNames = [
    {
      id: 'order[interactive_brokers]',
      label: '',
      icon: '/images/BrokersIcons/email_ib_logo_new.png',
    },
    {
      id: 'order[saxo_bank]',
      label: '',
      icon: '/images/BrokersIcons/saxo 3 1.png',
    },
    {
      id: 'order[just2trade]',
      label: '',
      icon: '/images/BrokersIcons/j2t.png',
    },
    {
      id: 'order[exante]',
      label: '',
      icon: '/images/BrokersIcons/EXANTE 1.png',
    },
    {
      id: 'order[etoro]',
      label: '',
      icon: '/images/BrokersIcons/eToro-logo-image 1.png',
    },
    {
      id: 'order[freedom_finance_europe]',
      label: '',
      icon: '/images/BrokersIcons/ffin br.png',
    },
    {
      id: 'order[freedom_finance_global]',
      label: '',
      icon: '/images/BrokersIcons/Logo_st.png',
    },
    {
      id: 'order[bnp_paribas]',
      label: '',
      icon: '/images/BrokersIcons/bnp paribas.png',
    },
    {
      id: 'order[bcs_cyprus]',
      label: '',
      icon: '/images/BrokersIcons/BCS Cyprus 1.png',
    },
    {
      id: 'order[open_broker]',
      label: '',
      icon: '/images/BrokersIcons/open.png',
    },
    {
      id: 'order[other_broker]',
      label: 'Иной зарубежный брокер',
      icon: null,
    },
  ];

  const taxDeductions = [
    {
      id: 'order[investment]',
      label: 'Инвестиционные (вычеты по ИИС)',
      icon: null,
    },
    {
      id: 'order[loss_transfer]',
      label: 'При переносе убытков: от операций с ценными бумагами и ПФИ, от участия в инвест. товариществе',
      icon: null,
    },
    {
      id: 'order[property]',
      label: 'Имущественные: при строительстве/приобретении жилья, при погашении процентов по кредитам и т.д.',
      icon: null,
    },
    {
      id: 'order[social]',
      label: 'Социальные: на обучение, на лечение, на благотворительность,  на добровольное страхование жизни и т.д.',
      icon: null,
    },
    {
      id: 'order[standart]',
      label: 'Стандартные: на детей, инвалиды, ветераны, ликвидаторы аварии на Чернобыльской АЭС и т.д.',
      icon: null,
    },
  ];
  const handleChange = useCallback((event) => {
    const {
      value, name, type, checked,
    } = event.target;
    setFields((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: type === 'checkbox' ? checked : value,
        errors: [],
      },
    }));
  }, []);

  const handleMaskedInputChange = useCallback((event) => {
    const {
      value, name,
    } = event.target;
    const computedValue = value.replaceAll('_', '');
    setFields((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: computedValue,
        errors: [],
      },
    }));
  }, []);

  const handleFilesChange = useCallback((name, files) => {
    setFields((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: files,
      },
    }));
  }, []);

  const handleDeleteFile = (name, fileToDelete) => {
    setFields((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: prevData[name].value.filter((file) => file !== fileToDelete),
      },
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const isFormInvalid = validateForm();
    if (isFormInvalid) {
      console.log('Форма содержит ошибки');
    } else {
      fetch('/api/users/552c4028-c4c0-4ab7-9937-47023d0bcd05/declaration_orders', {
        headers: {
        },
        body: convertData(fields),
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
      })
        .then((result) => {
          if (result.status >= 400 && result.status < 500) {
            return result.json();
          } if (result.status >= 500) {
            alert('Внутренняя ошибка сервера');
          } else {
            navigate('/orders');
          }
        })
        .then((data) => {
          const dataObj = data.error.data;
          const fieldNames = Object.keys(dataObj);
          setFields((prevData) => {
            const newFields = fieldNames.reduce((accum, fieldName) => {
              const errorArray = data.error.data[fieldName];
              return {
                ...accum,
                [fieldName]: {
                  ...accum[fieldName],
                  errors: errorArray,
                },
              };
            }, prevData);
            return newFields;
          });
        });
    }
  }

  function handleBlur(event) {
    const { name } = event.target;
    validateField(name);
  }
  return (
    <div className="declaration">
      <h1 className="heading">Новый заказ</h1>
      <p className="declaration-text">
        ВАЖНО! Все данные должны быть указаны корректно и максимально подробно.
        <br />
        После выполнения заказа все изменения в декларации, инициированные клиентом,
        будут оплачиваться дополнительно.
        <br />
        Например, добавление налоговых вычетов, иных доходов (подлежащих декларированию) и т.д.
      </p>
      <Form onSubmit={handleSubmit}>
        <SelectInput
          text="Год декларации"
          name="order[year]"
          handleChange={handleChange}
          options={YearOptions}
          handleBlur={handleBlur}
          errors={fields['order[year]'].errors}
        />
        <SelectInput
          text="Ранее подавалась декларация за указанный год:"
          name="order[submittedBefore]"
          handleChange={handleChange}
          options={YesNoOptions}
          handleBlur={handleBlur}
          errors={fields['order[submittedBefore]'].errors}
        />
        <SwitchInput
          text="Доходы по зарубежным брокерам"
          name="order[foreignBrokers]"
          handleChange={handleChange}
          value={fields['order[foreignBrokers]'].value}
        />
        <Collapse in={fields['order[foreignBrokers]'].value}>
          <div className="container-wrapper">
            <CheckboxInput
              options={brokersNames}
              handleChange={handleChange}
              className="checkbox-icons"
            />
            <Collapse in={fields['order[interactive_brokers]'].value}>
              <div className="container-wrapper">
                <FileInput
                  onChange={handleFilesChange}
                  name="activity_reports[]"
                  files={fields['activity_reports[]'].value}
                  heading="Загрузите csv-отчеты Interactive Brokers"
                  text="Отчеты 'Активность':"
                  description="Загрузите отчеты 'Активность' Interactive Brokers на русском языке в формате csv за отчетный год, а также за все доступные предыдущие годы."
                  linkName="Инструкция по скачиванию отчетов 'Активность' "
                  link="https://docs.google.com/document/d/e/2PACX-1vT-zS1O5SSCKKkPZv2SNgqghl-aonG8cx5AWkmHBcBrSFrITlHaOiftFN6oDfNTlMGGFePP4SOR-aQj/pub"
                  handleClick={handleDeleteFile}
                  acceptedTypes={['text/csv']}
                />
                <FileInput
                  onChange={handleFilesChange}
                  name="dividend_report"
                  files={fields.dividend_report.value}
                  text="Отчет 'Дивиденды' (опционально)"
                  description="Загрузите отчет 'Дивиденды' Interactive Brokers в формате csv за отчетный год. При отсутствии данного отчета дивиденды будут рассчитаны из отчета 'Активность'."
                  linkName="Инструкция по скачиванию отчета 'Дивиденды'"
                  link="https://docs.google.com/document/d/e/2PACX-1vQH5Djz4iypEHPtbARwm3n6C5zycFGHbhOFUrT6zKqc28yfK49MxJ_dT0NLgTQyDETkFxPbUcXFy43a/pub"
                  handleClick={handleDeleteFile}
                  acceptedTypes={['text/csv']}
                />
              </div>
            </Collapse>
            <Collapse in={fields['order[saxo_bank]'].value
            || fields['order[just2trade]'].value
            || fields['order[exante]'].value
            || fields['order[etoro]'].value
            || fields['order[freedom_finance_global]'].value
            || fields['order[freedom_finance_europe]'].value
            || fields['order[bnp_paribas]'].value
            || fields['order[bcs_cyprus]'].value
            || fields['order[open_broker]'].value
            || fields['order[other_broker]'].value}
            >
              <div>
                <FileInput
                  onChange={handleFilesChange}
                  name="foreign_non_ib_broker_reports[]"
                  files={fields['foreign_non_ib_broker_reports[]'].value}
                  heading="Загрузите отчеты брокеров (не Interactive Brokers)"
                  text="Отчеты брокеров:"
                  description="Отчет должен содержать данные об операциях. Формат: pdf, xls, xlsx, doc, docx, csv."
                  className="container-wrapper"
                  handleClick={handleDeleteFile}
                  acceptedTypes={['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv']}
                />
              </div>
            </Collapse>
          </div>
        </Collapse>
        <SwitchInput
          text="Иностранные дивиденды по брокерам РФ:"
          label="Пример: дивиденды от Apple по брокеру Тинькофф."
          name="order[domestic_brokers_foreign_dividends]"
          handleChange={handleChange}
        />
        <Collapse in={fields['order[domestic_brokers_foreign_dividends]'].value}>
          <div>
            <FileInput
              handleClick={handleDeleteFile}
              onChange={handleFilesChange}
              name="rf_broker_foreign_dividends_reports[]"
              files={fields['rf_broker_foreign_dividends_reports[]'].value}
              heading="Загрузите отчет о дивидендах по брокеру РФ"
              text="Отчет о дивидендах:"
              description="Отчет должен содержать данные о дивидендах:
              дата, величина, удержанный налог. Формат: pdf, xls, xlsx,
              doc, docx."
              className="container-wrapper"
              acceptedTypes={['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv']}
            />
          </div>
        </Collapse>
        <SwitchInput
          text="Налоговые вычеты:"
          name="order[deductions]"
          handleChange={handleChange}
        />
        <Collapse in={fields['order[deductions]'].value}>
          <div className="container-wrapper">
            <CheckboxInput
              options={taxDeductions}
              handleChange={handleChange}
              className="checkbox-labels"
            />
          </div>
        </Collapse>
        <SwitchInput
          text="Была ли продажа имущества"
          name="order[property_sale]"
          handleChange={handleChange}
        />
        <TextInput
          text="Комментарий"
          label="Иные доходы к декларированию или другая важная информация"
          value={fields['order[comment]'].value}
          name="order[comment]"
          handleChange={handleChange}
          type="textarea"
          handleBlur={handleBlur}
          errors={fields['order[comment]'].errors}
        />
        <TextInput
          text="Промокод"
          value={fields.promocode.value}
          name="promocode"
          handleChange={handleChange}
          errors={fields.promocode.errors}
        />
        <TextInput
          text="Имя"
          value={fields['order[name]'].value}
          name="order[name]"
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={fields['order[name]'].errors}
        />
        <TextInput
          text="Номер телефона"
          value={fields['order[phone]'].value}
          name="order[phone]"
          handleChange={handleMaskedInputChange}
          handleBlur={handleBlur}
          errors={fields['order[phone]'].errors}
          mask={['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        />
        <Form.Group>
          <div className="declaration-button">
            <Button type="submit">Отправить заявку</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
