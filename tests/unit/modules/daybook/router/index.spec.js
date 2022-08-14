import dayBookRouter from "@/modules/daybook/router";


describe( 'Router Unit Testing', () => {
    test( 'Router must be configured this way', async () => {
        expect( dayBookRouter ).toMatchObject( {
            name: 'daybook',
            component: expect.any( Function ),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any( Function ),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any( Function ),
                    props: expect.any( Function )
                }
            ]
        } )

        /*
        Forma poco Flexible
         expect( ( await dayBookRouter.children[ 0 ].component() ).default.name ).toBe( 'NoEntrySelected' )
         expect( ( await dayBookRouter.children[ 1 ].component() ).default.name ).toBe( 'EntryView' )
         */
        const promiseRoutes = []
        dayBookRouter.children.forEach( child => promiseRoutes.push( child.component() ) )

        const routes = ( await Promise.all( promiseRoutes ) ).map( r => r.default.name )

        expect( routes ).toContain( 'EntryView' )
        expect( routes ).toContain( 'NoEntrySelected' )

        // console.log(routes)
    } );

    test( 'Must return the route id', () => {
        const route = {
            params: {
                id: 'ABC-123'
            }
        }
        //Forma Rigida
        //expect(dayBookRouter.children[1].props( route )).toEqual({ id: 'ABC-123' })

        const entryRoute = dayBookRouter.children.find( route => route.name === 'entry' )

        expect(entryRoute.props(route)).toEqual({id: 'ABC-123' })
    } );
} );