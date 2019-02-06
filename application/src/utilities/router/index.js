import HomePage from '../../HomePage.vue'
import Workplace from '../../components/administration/Workplace.vue'
import Diagram from '../../components/administration/Diagram.vue'
import ItemPage from '../../components/items/Item.vue'
import CartPage from '../../components/orderAndCart/Cart.vue'
import itemsList from '../../components/items/itemsList.vue'
import Authentication from '../../components/authentication/Authentication.vue'

export default [
	{ path: '/', component: HomePage},
	{ path: '/workplace', component: Workplace },
	{ path: '/auth', component: Authentication },
	{ path: '/diagram', component: Diagram },
	{ path: '/category/:categoryId', component: itemsList },
	{ path: '/cart', component: CartPage },
	{ path: '/items/:id', component: ItemPage },
]