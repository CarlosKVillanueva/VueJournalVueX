

export default {
    name: 'daybook',
    component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
            path: '',
            name: 'no-entry',
            component: () => import(/* webpackChunkName: "DayBookNoEntry" */ '@/modules/daybook/views/NoEntrySelectedView'),
        },
        {
            path: ':id',
            name: 'entry',
            component: () => import(/* webpackChunkName: "DayBookEntry" */ '@/modules/daybook/views/EntryView'),
        }
    ]
}