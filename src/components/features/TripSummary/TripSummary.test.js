import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate without crashing', () => {
    const component = shallow(<TripSummary
      id='abc'
      image='image.jpg'
      name='lol'
      cost='$500'
      days={7}
      tags={['skiing', 'spa', 'pool']}
    />);
    expect(component).toBeTruthy();
    console.log(component.debug());
  });

  it('should generate correct address', () => {
    const expectedAddress = '/trip/abc';
    const expectedId = 'abc';
    const component = shallow(<TripSummary id={expectedId} tags={[]} />);

    expect(component.find('Link').prop('to')).toEqual(expectedAddress);
  });

  it('should render correct alt and image', () => {
    const expectedAlt = '123';
    const expectedImage = 'image.jpg';
    const component = shallow(<TripSummary image={expectedImage} name={expectedAlt} tags={[]} />);

    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct props', () => {
    const expectedName = 'Adam';
    const expectedCost = '$750';
    const expectedDays = 5;
    const component = shallow(<TripSummary name={expectedName} days={expectedDays} cost={expectedCost} tags={[]} />);

    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details').childAt(0).text()).toEqual(`${expectedDays} days`);
    expect(component.find('.details').childAt(1).text()).toEqual(`from ${expectedCost}`);
  });

  it('should render correct array tags', () => {
    const firstTagOfArray = 'skiing';
    const secondTagOfArray = 'spa';
    const thirdTagOfArray = 'pool';
    const expectedArray = [firstTagOfArray, secondTagOfArray, thirdTagOfArray];
    const component = shallow(<TripSummary tags={expectedArray} />);

    expect(component.find('.tag').at(0).text()).toEqual(expectedArray[0]);
    expect(component.find('.tag').at(1).text()).toEqual(expectedArray[1]);
    expect(component.find('.tag').at(2).text()).toEqual(expectedArray[2]);
  });

  it('should not render tags if tags area is empty', () => {
    const emptyArray = [];
    const component = shallow(<TripSummary tags={emptyArray} />);

    expect(component.find('.tag').exists()).toEqual(false);
  });
});