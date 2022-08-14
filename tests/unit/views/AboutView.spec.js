import { shallowMount } from "@vue/test-utils"
import AboutView from "@/views/AboutView";


describe( 'About View Test', () => {

    test( 'Must render the snapshot succesfully', () => {

        const wrapper = shallowMount( AboutView )

        expect( wrapper.html() ).toMatchSnapshot()
    } );
} );