import { shallowMount } from "@vue/test-utils"
import HomeView from "@/views/HomeView";


describe( 'Home View Test', () => {

    test( 'Must render the snapshot succesfully', () => {

        const wrapper = shallowMount( HomeView )

        expect( wrapper.html() ).toMatchSnapshot()
    } );
    
    test('On Button click, must redirect to "no-entry" ', () => {
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount( HomeView, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        } )
        wrapper.find( 'button' ).trigger( 'click' )

        expect( mockRouter.push ).toHaveBeenCalledWith({name: 'no-entry'})
    });
} );