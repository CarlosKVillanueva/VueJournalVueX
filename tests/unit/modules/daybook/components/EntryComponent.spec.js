import { shallowMount } from "@vue/test-utils"
import EntryComponent from "@/modules/daybook/components/EntryComponent"
import { journalState } from "../../../mocks/test-journal-state"


describe( 'EntryComponent Suite Test', () => {

    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount( EntryComponent, {
       props: {
           entry: journalState.entries[ 0 ]
       },
        global: {
           mocks: {
               $router: mockRouter
           }
        }
    } )

    test('Should match Snapshot', () => {

        expect( wrapper.html() ).toMatchSnapshot()

    });

    test( 'Should redirect on entry-container click', () => {
        const entryContainer = wrapper.find( '.entry-container' )

        entryContainer.trigger( 'click' )

        expect( mockRouter.push).toHaveBeenCalledWith( {
            name: 'entry',
            params: {
                id: journalState.entries[ 0 ].id
            }
        })
    } );

    test('Test on computed props', () => {

        // expect( wrapper.vm.day ).toBe()
        expect( wrapper.vm.day ).toBe(13)
        expect( wrapper.vm.month ).toBe('Agosto')
        expect( wrapper.vm.yearDay ).toBe('2022, Sábado')


    });
} );