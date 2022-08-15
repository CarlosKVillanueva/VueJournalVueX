import { shallowMount } from "@vue/test-utils"
import EntryListComponent from "@/modules/daybook/components/EntryListComponent"
import { createStore } from "vuex"
import journal from "@/modules/daybook/store/journal"
import { journalState } from "../../../mocks/test-journal-state"


const createVueXStore = ( initialState ) => createStore( {
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
} )
describe( 'EntryList Suite Test', () => {

    const store = createVueXStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()

        wrapper = shallowMount( EntryListComponent, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        } )
    })


    test('Snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot()

    });
    
    test('Should call getEntriesByTerm without args and show 2 entries', () => {

        expect( wrapper.findAll( 'entry-stub' ).length ).toBe( 2 )
    });
    
    test('Must call getEntriesByTerm and filter entries', async () => {
        const input = wrapper.find( 'input' )
        await input.setValue( 'deportivo' )

        expect( wrapper.findAll( 'entry-stub' ).length ).toBe( 1 )
    });
    
    test('Button must redirect to /new', () => {
        wrapper.find('button').trigger('click')
        expect( mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: { id:'new' }})
    });
} );