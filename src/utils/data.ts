import {
    FeedListItemContent,
    FeedListItemStatus,
} from '../components/feed-list/types';
import { OrdersDataWSResponse } from '../types/types';

export const MOCK_COMPLETED_ORDERS_LIST = [
    '034533',
    '034532',
    '034530',
    '034527',
    '034525',
];
export const MOCK_PROCESSING_ORDERS_LIST = ['034538', '034541', '034542'];
export const MOCK_TOTAL_COUNTER_VALUE = 28_752;
export const MOCK_DAILY_COUNTER_VALUE = 138;

export const MOCK_FEED_LIST_DATA: Array<FeedListItemContent> = [
    {
        name: 'Death Star Starship Main бургер',
        time: '2025-03-17T22:17:20.007Z',
        number: '034535',
        ingredients: {
            bunId: '643d69a5c3f7b9001cfa093d',
            ingredientsIds: [
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0945',
                '643d69a5c3f7b9001cfa0946',
                '643d69a5c3f7b9001cfa0947',
                '643d69a5c3f7b9001cfa0949',
            ],
        },
        status: FeedListItemStatus.COMPLETED,
        price: 480,
    },
    {
        name: 'Interstellar бургер',
        time: '2025-03-17T22:17:20.007Z',
        number: '034534',
        ingredients: {
            bunId: '643d69a5c3f7b9001cfa093d',
            ingredientsIds: [
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0945',
                '643d69a5c3f7b9001cfa0946',
                '643d69a5c3f7b9001cfa0947',
                '643d69a5c3f7b9001cfa0949',
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0943',
            ],
        },
        price: 560,
    },
    {
        name: 'Death Star Starship Main бургер',
        time: '2025-03-17T22:17:20.007Z',
        number: '034533',
        ingredients: {
            bunId: '643d69a5c3f7b9001cfa093d',
            ingredientsIds: [
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0943',
            ],
        },
        price: 510,
    },
    {
        name: 'Death Star Starship Main бургер',
        time: '2025-03-17T22:17:20.007Z',
        number: '034533',
        ingredients: {
            bunId: '643d69a5c3f7b9001cfa093d',
            ingredientsIds: [
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0943',
            ],
        },
        price: 510,
    },
    {
        name: 'Death Star Starship Main бургер',
        time: '2025-03-17T22:17:20.007Z',
        number: '034533',
        ingredients: {
            bunId: '643d69a5c3f7b9001cfa093d',
            ingredientsIds: [
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0943',
            ],
        },
        price: 510,
    },
    {
        name: 'Death Star Starship Main бургер',
        time: '2025-03-17T22:17:20.007Z',
        number: '034533',
        ingredients: {
            bunId: '643d69a5c3f7b9001cfa093d',
            ingredientsIds: [
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0943',
            ],
        },
        price: 510,
    },
];

export const data = [
    {
        _id: '60666c42cc7b410027a1a9b1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9b5',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9b6',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9b7',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9b4',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9b9',
        name: 'Соус традиционный галактический',
        type: 'sauce',
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9b8',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9bc',
        name: 'Плоды Фалленианского дерева',
        type: 'main',
        proteins: 20,
        fat: 5,
        carbohydrates: 55,
        calories: 77,
        price: 874,
        image: 'https://code.s3.yandex.net/react/code/sp_1.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9bb',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large:
            'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9ba',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9bd',
        name: 'Кристаллы марсианских альфа-сахаридов',
        type: 'main',
        proteins: 234,
        fat: 432,
        carbohydrates: 111,
        calories: 189,
        price: 762,
        image: 'https://code.s3.yandex.net/react/code/core.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9be',
        name: 'Мини-салат Экзо-Плантаго',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 6,
        price: 4400,
        image: 'https://code.s3.yandex.net/react/code/salad.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9b3',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9bf',
        name: 'Сыр с астероидной плесенью',
        type: 'main',
        proteins: 84,
        fat: 48,
        carbohydrates: 420,
        calories: 3377,
        price: 4142,
        image: 'https://code.s3.yandex.net/react/code/cheese.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9b2',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
    },
];

export const MOCK_WS_ORDERS_DATA: OrdersDataWSResponse = {
    success: true,
    orders: [
        {
            _id: '67d9de4c6fce7d001db5afa6',
            ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa093d',
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-03-18T20:57:48.900Z',
            updatedAt: '2025-03-18T20:57:49.633Z',
            number: 71569,
        },
        {
            _id: '67d9d6c46fce7d001db5af91',
            ingredients: [
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa0945',
                '643d69a5c3f7b9001cfa093c',
            ],
            status: 'done',
            name: 'Краторный био-марсианский антарианский бургер',
            createdAt: '2025-03-18T20:25:40.103Z',
            updatedAt: '2025-03-18T20:25:40.758Z',
            number: 71568,
        },
        {
            _id: '67d9d5b46fce7d001db5af8e',
            ingredients: [
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa093f',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093c',
            ],
            status: 'done',
            name: 'Краторный бессмертный spicy био-марсианский бургер',
            createdAt: '2025-03-18T20:21:08.843Z',
            updatedAt: '2025-03-18T20:21:09.447Z',
            number: 71567,
        },
        {
            _id: '67d9d2656fce7d001db5af77',
            ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa0940',
                '643d69a5c3f7b9001cfa0943',
            ],
            status: 'done',
            name: 'Space флюоресцентный метеоритный бургер',
            createdAt: '2025-03-18T20:07:01.071Z',
            updatedAt: '2025-03-18T20:07:01.756Z',
            number: 71566,
        },
        {
            _id: '67d9d08c6fce7d001db5af73',
            ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa0942',
            ],
            status: 'done',
            name: 'Флюоресцентный spicy био-марсианский бургер',
            createdAt: '2025-03-18T19:59:08.406Z',
            updatedAt: '2025-03-18T19:59:09.021Z',
            number: 71565,
        },
        {
            _id: '67d9d0436fce7d001db5af6d',
            ingredients: [
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa0941',
            ],
            status: 'done',
            name: 'Краторный био-марсианский бургер',
            createdAt: '2025-03-18T19:57:55.564Z',
            updatedAt: '2025-03-18T19:57:56.227Z',
            number: 71564,
        },
        {
            _id: '67d9d00b6fce7d001db5af6c',
            ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093e',
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-03-18T19:56:59.920Z',
            updatedAt: '2025-03-18T19:57:00.565Z',
            number: 71563,
        },
        {
            _id: '67d9cdfd6fce7d001db5af60',
            ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093e',
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-03-18T19:48:13.545Z',
            updatedAt: '2025-03-18T19:48:14.255Z',
            number: 71562,
        },
        {
            _id: '67d9cc896fce7d001db5af58',
            ingredients: [
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093e',
            ],
            status: 'done',
            name: 'Краторный люминесцентный бургер',
            createdAt: '2025-03-18T19:42:01.768Z',
            updatedAt: '2025-03-18T19:42:02.480Z',
            number: 71561,
        },
        {
            _id: '67d9c9a46fce7d001db5af4e',
            ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093e',
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-03-18T19:29:40.762Z',
            updatedAt: '2025-03-18T19:29:41.447Z',
            number: 71560,
        },
        {
            _id: '67d9c8e16fce7d001db5af4a',
            ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa0945',
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa093d',
            ],
            status: 'done',
            name: 'Space флюоресцентный антарианский бургер',
            createdAt: '2025-03-18T19:26:25.392Z',
            updatedAt: '2025-03-18T19:26:26.072Z',
            number: 71559,
        },
    ],
    total: 71195,
    totalToday: 173,
};
