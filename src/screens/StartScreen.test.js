import React from 'react';
import {shallow} from 'enzyme';
import StartScreen from './StartScreen';
describe('StartScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
           const wrapper = shallow(<StartScreen/>);
            expect(wrapper).toMatchSnapshot();
        });
    });
});