import { createStore } from "vuex"
import journal from "@/modules/daybook/store/journal"
import { journalState } from "../../../../mocks/test-journal-state"


const createVueXStore = ( initialState ) => createStore( {
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
} )

describe( 'Journal Suite Test - VueX', () => {

    test( 'This is the initial state', () => {
        const store = createVueXStore( journalState )
        const { isLoading, entries } = store.state.journal

        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )
        // console.log( store.state )
    } );

    /* ---------- Mutations ---------- */

    test( 'Mutations: setEntries', () => {
        const store = createVueXStore( { isLoading: true, entries: [] } )

        store.commit( 'journal/setEntries', journalState.entries )

        expect( store.state.journal.entries.length ).toBe( 2 )
        expect( store.state.journal.isLoading ).toBeFalsy()
    } );

    test( 'Mutations: updateEntries', () => {

        const store = createVueXStore( journalState )

        const updatedEntry = {
            id: '-N9NLxm3sIT3QyyVjqWL',
            date: 1660413519208,
            picture: "https://res.cloudinary.com/drc8ihmoo/image/upload/v1660417788/curso-vue/htlpq41u6otibycb1d5r.jpg",
            text: "Slam Dunk, el mejor anime deportivo de la historia!!!!"
        }

        store.commit( 'journal/updateEntry', updatedEntry )

        expect( store.state.journal.entries.find( entry => entry.id === updatedEntry.id ) ).toEqual( updatedEntry )
        expect( store.state.journal.entries.length ).toBe( 2 )
    } );

    test( 'Mutations: AddEntry ', () => {
        const store = createVueXStore( journalState )

        const addEntry = {
            id: 'ABC-123',
            date: new Date().getTime(),
            text: 'Hola Mundo'
        }

        store.commit( 'journal/addEntry', addEntry )

        expect( store.state.journal.entries.length ).toBe( 3 )
        expect( store.state.journal.entries.find( entry => entry.id === addEntry.id ) ).toBeTruthy()

    } );

    test( 'Mutations: DeleteEntry ', () => {
        const store = createVueXStore( journalState )

        store.commit( 'journal/deleteEntry', 'ABC-123' )

        expect( store.state.journal.entries.length ).toBe( 2 )
        expect( store.state.journal.entries.find( entry => entry.id === 'ABC-123' ) ).toBeFalsy()
    } );

    /* ---------- Getters ---------- */

    test( 'Getters: getEntriesByTerm', () => {
        const store = createVueXStore( journalState )

        const [ entry1, entry2 ] = journalState.entries

        expect( store.getters[ 'journal/getEntriesByTerm' ]( '' ).length ).toBe( 2 )
        expect( store.getters[ 'journal/getEntriesByTerm' ]( 'entrada' ).length ).toBe( 1 )

        expect( store.getters[ 'journal/getEntriesByTerm' ]( 'anime' ) ).toEqual( [ entry1 ] )
        expect( store.getters[ 'journal/getEntriesByTerm' ]( 'entrada' ) ).toEqual( [ entry2 ] )


    } );

    test( 'Getters: getEntriesByID', () => {
        const store = createVueXStore( journalState )

        const [ entry1, entry2 ] = journalState.entries

        expect( store.getters[ 'journal/getEntriesByID' ]( '-N9NLxm3sIT3QyyVjqWL' ) ).toEqual( entry1 )
        expect( store.getters[ 'journal/getEntriesByID' ]( '-N9NddS6do-w3n7VfVUp' ) ).toEqual( entry2 )

    } );

    /* ---------- Actions ---------- */

    test( 'Actions: loadEntries', async () => {
        const store = createVueXStore( { isLoading: true, entries: [] } )

        await store.dispatch( 'journal/loadEntries' )

        // console.log(store.state.journal.entries)
        expect( store.state.journal.entries.length ).toBe( 2 )

    } );

    test( 'Actions: updateEntry', async () => {
        const store = createVueXStore( journalState )

        const updatedEntry = {
            id: '-N9NLxm3sIT3QyyVjqWL',
            date: 1660413519208,
            picture: "https://res.cloudinary.com/drc8ihmoo/image/upload/v1660417788/curso-vue/htlpq41u6otibycb1d5r.jpg",
            text: "Slam Dunk, el mejor anime deportivo de la historia!!!!",
            otroCampo: {
                a: 1
            }
        }

        await store.dispatch( 'journal/updateEntry', updatedEntry )

        expect( store.state.journal.entries.length ).toBe( 2 )
        expect(
            store.state.journal.entries.find( e => e.id === updatedEntry.id )
        ).toEqual( {
            id: '-N9NLxm3sIT3QyyVjqWL',
            date: 1660413519208,
            picture: "https://res.cloudinary.com/drc8ihmoo/image/upload/v1660417788/curso-vue/htlpq41u6otibycb1d5r.jpg",
            text: "Slam Dunk, el mejor anime deportivo de la historia!!!!"
        } )
    } );

    let idABorrar

    test( 'Actions: createEntry', async () => {
        const store = createVueXStore( journalState )

        const newEntry = { date: new Date().getTime(), text: 'Nueva entrada de test' }

        const id = await store.dispatch( 'journal/createEntry', newEntry )

        newEntry.id = id

        idABorrar = id

        // console.log( store.state.journal.entries )

        expect( typeof id ).toBe( 'string' )
        expect( store.state.journal.entries.length ).toBe( 3 )
        expect( store.state.journal.entries.find( e => e.id === newEntry.id ) ).toBeTruthy()

    } );

    test( 'Actions: deleteEntry', async ( ) => {
        const store = createVueXStore( journalState )

        await store.dispatch( 'journal/deleteEntry', idABorrar )

        expect( store.state.journal.entries.length ).toBe( 2 )
        expect( store.state.journal.entries.find( e => e.id !== idABorrar ) )
    } );
} );