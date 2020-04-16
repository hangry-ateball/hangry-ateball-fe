import React from 'react';
import {shallow} from 'enzyme';
import ContactCard from './ContactCard';
describe('StartScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
           const wrapper = shallow(<ContactCard/>);
            expect(wrapper).toMatchSnapshot();
        });
    });
});