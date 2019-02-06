const data = {
    mainPageSlider: [
        {name: 1, url: './assets/1a.jpeg'},
        {name: 2, url: './assets/2a.jpeg'},
        {name: 3, url: './assets/3a.jpeg'},
        {name: 4, url: './assets/4a.jpeg'},
        {name: 5, url: './assets/5a.jpeg'},
    ],
    category: [
        {id: '1', name: 'Гарячі напої', parentId: '', childs: [
            {id: '9', name: 'Кава', parentId: '1', childs:[
                {id: '22', name: 'Чорна кава', parentId: '9', childs:[]},
            ]},
            {id: '10', name: 'Чай', parentId: '1', childs:[]},
        ]},

        {id: '4', name: 'Смаколики', parentId: '', childs: [
            {id: '11', name: 'Десерти', parentId: '4', childs:[
                {id: '15', name: 'Торти', parentId: '11', childs:[]},
                {id: '16', name: 'Морозиво', parentId: '11', childs:[]},
            ]},
            {id: '12', name: 'Бургери', parentId: '4', childs:[]},
        ]},
    ],
    items: [
        {id: '2', name: 'Лате', parentId: '9', price: 25},
        {id: '7', name: 'Американо', parentId: '9', price: 35},
        {id: '3', name: 'Еспрессо', parentId: '9', price: 37},
        {id: '14', name: 'Зелений чай', parentId: '10', price: 37},
        {id: '13', name: 'Чорний чай', parentId: '10', price: 37},
        {id: '5', name: 'Сендвіч', parentId: '12', price: 33},
        {id: '6', name: 'Шоколад', parentId: '15', price: 26},
        {id: '8', name: 'Морозиво', parentId: '16', price: 15},
    ],
    bills: [
        {number: '154', date: Date(2018, 11, 31), barista: 'Ivan', summ: '156', },
        {number: '155', date: Date(2018, 11, 31), barista: 'Ivan', summ: '156', },
        {number: '156', date: Date(2018, 11, 31), barista: 'Ivan', summ: '156', },
        {number: '157', date: Date(2018, 11, 31), barista: 'Ivan', summ: '156', },
        {number: '158', date: Date(2018, 11, 31), barista: 'Ivan', summ: '156', },
        {number: '159', date: Date(2018, 11, 31), barista: 'Ivan', summ: '156', },
    ]
}

export default data;