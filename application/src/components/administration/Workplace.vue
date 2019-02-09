<template>
  <div>
    <b-jumbotron :header="msg" lead>
      <b-container class="bv-row" fluid>
        <b-row class="mb-2">
          <b-col style="display: flex;">
            <img
              height="50"
              src="../../assets/baseline-chevron_left-24px.svg"
              @click="returnCategory()"
            >
          </b-col>
          <b-col style="display: flex; justify-content: flex-end;">
            <b-button
              size="lg"
              variant="outline-success"
              class="mr-2"
              :disabled="!(tabItems.length>0)"
              @click="showModal"
            >Оплата</b-button>
            <b-button size="lg" variant="outline-warning" @click="clearTab()">Очистити чек</b-button>
          </b-col>
        </b-row>
        <b-row class="main-row">
          <b-col cols="2">
            <!-- <transition-group name="fade"> -->
              <div
                class="custom-button"
                v-for="(element, index) in categoryList"
                v-bind:key="index"
                @click="getCategory(element)"
              >{{element.name}}</div>
            <!-- </transition-group> -->
          </b-col>
          <b-col cols="10">
            <div class="b-row tab-row">
              <b-table
                striped
                hover
                :items="tabItems"
                :fields="fields"
                :small="false"
                :outlined="true"
                class="dataGrid"
              >
                <template slot="item" slot-scope="data" :class="{ active: true }">
                  <div
                    @click="setActiveStr(data.item);"
                    @contextmenu.prevent.stop="handleContextClick($event, data.item); "
                  >{{data.item.item}}</div>
                </template>
              </b-table>
            </div>
            <div class="b-row items-row">
              <div class="total">Загальна сума:{{total}}</div>
              <!-- <transition-group name="fade"> -->
                <div
                  class="custom-button items"
                  v-for="(el, i) in itemsList"
                  v-bind:key="i"
                  v-on:click="addItem(el)"
                >
                  <div>{{el.name}}</div>
                </div>
              <!-- </transition-group> -->
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>

    <vue-simple-context-menu
      :elementId="'myContextMenu'"
      :options="contextOptionsArray"
      :ref="'vueSimpleContextMenu1'"
      @optionClicked="contextOptionsClicked"
    ></vue-simple-context-menu>

    <b-modal
      ref="myModalRef"
      hide-footer
      hide-header
      title="Using Component Methods"
      id="printBill"
    >
      <div class="d-block text-center">
        <div class="container-fluide">
          <b-row>
            <b-col>
              <img src="../../assets/logo.png" height="130px">
              <table>
                <tr v-for="(el, i) in tabItems" v-bind:key="i">
                  <td>{{el.item}}</td>
                  <td>{{el.price}}</td>
                  <td>X</td>
                  <td>{{el.quantity}}</td>
                  <td>{{el.summ}}</td>
                </tr>
              </table>
            </b-col>
          </b-row>
          <b-row class="total-row">
            <p>Усього: {{total}} грн.</p>
          </b-row>
        </div>
        <b-button class="button-print" variant="success" @click="printBill()">Друк</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import testData from "../../utilities/testData.js";
import Data from './index.js'
export default {
  components: {},
  data() {
    return {
      categoryList: [],
      itemsList: [],
      tabItems: items, //[],
      msg: "",
      active: true,
      fields: [
        {
          key: "item",
          label: "Номенклатура",
          sortable: true
        },
        {
          key: "price",
          label: "Ціна",
          sortable: false
        },
        {
          key: "quantity",
          label: "Кількість"
        },
        {
          key: "summ",
          label: "Сума"
        }
      ],
      contextOptionsArray: [
        {
          name: "Duplicate",
          slug: "duplicate"
        },
        {
          name: "Edit",
          slug: "edit"
        },
        {
          name: "Delete",
          slug: "delete"
        }
      ]
    };
  },
  methods: {
    getAllItems() {
      Data.getAllItems(this)
    },
    addItem(element) {
      this.tabItems.push({
        id: element.id,
        item: element.name,
        price: element.price,
        quantity: 1,
        summ: element.price * 1,
        _rowVariant: ""
      });
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    printBill() {
      window.print();
      testData.bills.push(
        {number: '160', date: new Date, barista: 'Ivan', summ: this.total, },
      );
      console.log(testData.bills)
    },
    setActiveStr(currentItem) {
      this.tabItems.map(el => {
        if (el.id == currentItem.id) {
          el._rowVariant = el._rowVariant === "success" ? "" : "success";
        } else {
          el._rowVariant = "";
        }
      });
    },
    handleContextClick(event, el) {
      this.$refs.vueSimpleContextMenu1.showMenu(event, el);
    },
    contextOptionsClicked(event) {
      if ((event.option.slug == "delete", event)) {
        this.deleteTableRow(event.item.id);
      }
    },
    deleteTableRow(id) {
      for (var i = 0; i < this.tabItems.length; i++) {
        if (this.tabItems[i].id === id) {
          this.tabItems.splice(i, 1);
          break;
        }
      }
    },
    clearTab() {
      this.tabItems = [];
    },
    getCategory(category) {
      if (category.childs.length > 0) {
         this.categoryList = category.childs;
      } 
      // else {
        this.itemsList = testData.items.filter(item => {
          return item.parentId === category.id;
        });
      // }
    },
    returnCategory() {
      let parentId = this.categoryList[0].parentId;
      let parent = "";
      for (let i = 0; i < testData.category.length; i++) {
        getFiniteValue(testData.category[i]);
      }

      if (typeof parent === "object") {
        if (parent.parentId === "") {
          this.categoryList = testData.category;
        } else {
          let arr = testData.category.filter(elem => {
            return elem.id === parent.parentId;
          });
          // console.log(arr)
          this.categoryList = arr[0].childs;
        }
      }

      function getFiniteValue(obj) {
        getProp(obj);

        function getProp(o) {
          for (var prop in o) {
            if (typeof o[prop] === "object") {
              getProp(o[prop]);
            } else {
              if (o.id === parentId) {
                parent = o;
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    this.categoryList = testData.category.filter(el => {
      return el.parentId == "";
    });
    this.getAllItems();
  },
  computed: {
    total: function() {
      return this.tabItems.reduce(function(a, c) {
        return a + Number(c.summ || 0);
      }, 0);
    }
  }
};
const items = [
  {
    id: "1",
    item: "Лате",
    price: 40,
    quantity: 2,
    summ: 80,
    _rowVariant: "success"
  }
];
</script>

<style scoped>
#printBill table {
  width: 100%;
  margin-bottom: 1rem;
}
#printBill table > tr > td:first-child {
  padding: 10px;
  text-align: left;
}
#printBill table > tr > td {
  border: 1px solid grey;
}
#printBill p {
  font-weight: 700;
}
#printBill .total-row {
  justify-content: flex-end;
  padding: 0px 20px;
}
.jumbotron {
  display: flex;
}
article {
  padding: 0.5rem;
  border-radius: 0rem;
}
.card-img-top {
  border-radius: 0rem;
  height: 70%;
}
.btn-primary,
.btn-primary:not(:disabled):not(.disabled):active {
  color: #017493;
  border-color: #017493;
  background: white;
  border-radius: 0rem;
  font-weight: 600;
}
.card-text {
  color: #017493;
  font-weight: 600;
}
.btn-primary:focus,
.btn-primary:not(:disabled):not(.disabled):active:focus {
  box-shadow: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
span {
  display: contents;
}
.main-row {
  min-height: 85vh;
}
.custom-button {
  background: #ffb62a;
  width: 100%;
  height: 60px;
  margin: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-button:hover {
  background: #ffa800;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.custom-button.items {
  float: left;
  position: relative;
  width: 18%;
}
.custom-button.items > div {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-button.items:hover {
  background: #ffa800;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.tab-row {
  height: 45vh;
  overflow: auto;
}
.total {
  text-align: end;
  font-weight: 700;
}
.active {
  color: red;
}
.btn-secondary {
  color: black;
  background-color: inherit !important;
  border: none;
}
.vue-simple-context-menu__item:hover {
  background-color: #c3e6cb !important;
  color: #fff;
}
#printBill {
  border: 1px solid red;
}

@media print {
  html,
  body > #main {
    background: red;
    height: 85vh;
    page-break-after: avoid;
    page-break-before: avoid;
    padding: 50px 50px;
    margin: 50px 50px;
  }
  body * {
    visibility: hidden;
  }
  #printBill,
  #printBill * {
    visibility: visible;
  }
  #printBill .button-print {
    visibility: hidden;
  }
}
</style>
