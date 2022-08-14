import FabComponent from "@/modules/daybook/components/FabComponent";
import { shallowMount } from "@vue/test-utils"


describe( 'Fab Component Unit Test', () => {

    test( 'Must render Snapshot properly', () => {
        const wrapper = shallowMount( FabComponent )

        expect( wrapper.html() ).toMatchSnapshot()
    } );

    test( 'Must show default icon', () => {
        const wrapper = shallowMount( FabComponent )
        const iTag = wrapper.find( 'i' )

        expect( iTag.classes( 'fa-plus' ) ).toBeTruthy()
    } );

    test( 'Must show argumen icon: fa-circle', () => {
        const wrapper = shallowMount( FabComponent, {
            props: {
                icon: 'fa-circle'
            }
        } )
        const iTag = wrapper.find( 'i' )

        expect( iTag.classes( 'fa-circle' ) ).toBeTruthy()
    } );

    test( 'Must emit on:click event when click', () => {
        const wrapper = shallowMount( FabComponent )

        wrapper.find('button').trigger('click')

        // console.log(wrapper.emitted('on:click'))
        expect( wrapper.emitted('on:click') ).toHaveLength(1)
    } );


} );