import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Swal from 'sweetalert2'

import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mocks/test-journal-state'

import EntryView from '@/modules/daybook/views/EntryView.vue'

const createVuexStore = ( initialState ) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }
            }
        }
    })


jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))


describe('EntryView Test Suite', () => {

    const store = createVuexStore( journalState )
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-N9NLxm3sIT3QyyVjqWL'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })



    test('debe de sacar al usuario porque el id no existe', () => {

        // eslint-disable-next-line no-unused-vars
        const wrapper = shallowMount( EntryView, {
            props: {
                id: 'Este ID no existe en el STORE'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ],
            }
        })

        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })


    })


    test('Must show the entry properly', () => {

        expect(wrapper.html()).toMatchSnapshot()
        expect( mockRouter.push ).not.toHaveBeenCalled()

    })

    test('Should delete the entry and getout', (done) => {

        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) )

        wrapper.find('.btn-danger').trigger('click')


        expect( Swal.fire ).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })


        setTimeout( () => {

            expect( store.dispatch ).toHaveBeenCalledWith('journal/deleteEntry', '-N9NLxm3sIT3QyyVjqWL')
            expect( mockRouter.push ).toHaveBeenCalled()
            done()

        }, 1 )

    })

})