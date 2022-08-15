// import cloudinary from "cloudinary";
import axios from "axios"
import uploadImage from "@/modules/daybook/helpers/uploadImage"

/*
cloudinary.config( {
    cloud_name: 'drc8ihmoo',
    api_key: '619746749165911',
    api_secret: 'Qx3pJmLfsfB0ApfEpy1q8BpoxoQ',
} )
*/

describe( 'Upload Image Test', () => {

    test( 'Must Load a file and return the url', async ( /*done*/ ) => {

        const { data } = await axios.get( 'https://res.cloudinary.com/drc8ihmoo/image/upload/v1657053169/k7yftfknd1ghs4kwunqy.jpg', {
            responseType: 'arraybuffer'
        } )

        const file = new File( [ data ], 'foto.jpg' )

        const url = await uploadImage( file )

        expect( typeof url ).toBe( 'string' )

        /*

        const segments = url.split( '/' )
        const imageId = segments[ segments.length - 1 ].replace( '.jpg', '' )
        cloudinary.v2.api.delete_resources( imageId, {}, () => {
            done()
        } )

        */
    } );
} );