import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';
import { formatPrice } from '../../../utils/formatPrice';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {

  const expectedType = 'icons';
  const expectedName = 'lol';
  const component = shallow(<OrderOption
    type={expectedType}
    name={expectedName}
  />);

  it('should return empty object if called withour required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render props', () => {
    expect(component).toBeTruthy();
  });

  it('should display title props name', () => {
    const componentName = component.find('.title').text();
    expect(componentName).toEqual(expectedName);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] },
  number: { currentValue: 1 },
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */

    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
      console.log(subcomponent.debug());
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */

        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }

      case 'icons': {
        /* test for icons*/

        it('contains div and Icons', () => {
          const divComponent = renderedSubcomponent.find('.component');
          expect(divComponent.length).toBe(1);

          const divNoneIcon = renderedSubcomponent.find('.icon').at(0);
          expect(divNoneIcon.text()).toBe(`<Icon />`);

          const divIcon = renderedSubcomponent.find('.icon').at(1);
          const Icon = divIcon.childAt(0);
          expect(divIcon.text()).toBe(
            `<Icon />${mockProps.values[1].name} (${formatPrice(
              mockProps.values[1].price
            )})`
          );
          expect(Icon.prop('name')).toBe(mockProps.values[1].icon);
        });

        it('should run setOptionValue with CLICK', () => {
          renderedSubcomponent.find('.icon').at(1).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'checkboxes': {
        /*test for checkbox */
        it('containst div.checkbox, label, input', () => {
          const divCheckbox = renderedSubcomponent.find('.checkboxes');
          expect(divCheckbox).toBeTruthy();

          const label = divCheckbox.find('.icon');
          expect(label.at(0).text()).toBe(
            `${mockProps.values[0].name}${formatPrice(mockProps.values[0].price)}`
          );
          expect(label.at(1).text()).toBe(
            `${mockProps.values[1].name}${formatPrice(mockProps.values[1].price)}`
          );

          const checkInput = divCheckbox.find('input');
          checkInput.forEach((node) => {
            expect(node.prop('type')).toBe('checkbox');
          });
          expect(checkInput.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(checkInput.at(0).prop('checked')).toBe(mockPropsForType.checkboxes.currentValue == mockProps.values[0].id);

          expect(checkInput.at(1).prop('value')).toBe(mockProps.values[1].id);
          expect(checkInput.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setrderOption on change', () => {
          const testInput = renderedSubcomponent.findWhere((element) => 
            element.prop('value') === testValue
          );
          testInput.simulate('change', { currentTarget: { checked: true } });

          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: [mockProps.currentValue, testValue],
          }); 
        });

        break;
      }

      case 'number': {
        /*test for number */
        it('contains div and input', () => {
          const checkDiv = renderedSubcomponent.find('.inputSmall');
          expect(checkDiv.length).toBe(1);
          expect(checkDiv.text()).toBe(mockProps.price);

          const input = checkDiv.find('input');
          expect(input.prop('type')).toBe('number');
          expect(input.prop('value')).toBe(mockPropsForType.number.currentValue);
          expect(input.prop('min')).toBe(mockProps.limits.min);
          expect(input.prop('max')).toBe(mockProps.limits.max);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber }});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber});
        });

        break;
      }

      case 'text': {
        /*test for text */
        it('contains input and  props type', () => {
          const input = renderedSubcomponent.find('.input');
          expect(input).toBeTruthy();
          expect(input.prop('type')).toBe('text');
        });

        it('should run setOrderOption funcion on change', () => {
          renderedSubcomponent.find('.input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });

        break;
      }

      case 'date': {
        /*test for date */
        it('contains DatePicker', () => {
          const datePicker = renderedSubcomponent.find(DatePicker);
          expect(datePicker.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          const datePicker = renderedSubcomponent.find(DatePicker);

          datePicker.simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });

        break;
      }
    }
  });
}