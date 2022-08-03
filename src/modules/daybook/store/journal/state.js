export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Finally, indeed.',
            picture: null,
        },
        {
            id: new Date().getTime() + 1000,
            date: new Date().toDateString(),
            text: 'Grogs fall with urchin.',
            picture: null,
        },
        {
            id: new Date().getTime() + 1500,
            date: new Date().toDateString(),
            text: 'The body traps.',
            picture: null,
        },
    ]
})
