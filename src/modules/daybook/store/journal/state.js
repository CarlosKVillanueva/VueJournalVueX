export default () => ({
    isLoading: true,
    entries: [
        {
            id: '1',
            date: new Date().toDateString(),
            text: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, ' +
                'making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, ' +
                'combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. ' +
                'The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.A' +
                'll the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, ' +
                'making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, ' +
                'combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. ' +
                'The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
            picture: null,
        },
        {
            id: '2',
            date: new Date().toDateString(),
            text: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy',
            picture: null,
        },
        {
            id: '3',
            date: new Date().toDateString(),
            text: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
            picture: null,
        },
    ]
})
