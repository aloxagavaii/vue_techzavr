<template>
<main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">

      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

<BaseFormText v-model="formData.name" :error="formError.name" title="ФИО"
 placeholder="Введите ваше полное имя"/>

 <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки"
 placeholder="Введите ваш адрес"/>

 <BaseFormText v-model="formData.phone" :error="formError.phone" title="Телефон"
 placeholder="Введите ваш телефон"/>

 <BaseFormText v-model="formData.email" :error="formError.email" title="Email"
 placeholder="Введи ваш Email"/>

            <BaseFormTextarea title="Комментарий к заказу" v-model="formData.comment"
             :error="formError.comment" placeholder="Ваши пожелания"/>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label for="hhhh" class="options__label">
                  <input id="hhhh" class="options__radio sr-only" type="radio" name="delivery"
                   value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label for="jjjj" class="options__label">
                  <input id="jjjj" class="options__radio sr-only" type="radio" name="delivery"
                   value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label for="kkkk" class="options__label">
                  <input id="kkkk" class="options__radio sr-only" type="radio" name="pay"
                   value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label for="pppp" class="options__label">
                  <input id="pppp" class="options__radio sr-only" type="radio" name="pay"
                   value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="it in products" :key="it.product.id">
              <h3>{{ it.product.title }}</h3>
              <b>{{ it.product.price * it.amount }} ₽</b>
              <span>Артикул: {{ it.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total" >
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ $store.state.cartProducts.length }}</b>
             товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>

          <button v-if="!orderLoading" class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
          <div v-if="orderLoading">
      <img class="gif" src="../../public/img/Gear.gif" alt="order Loading"/>
    </div>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';

export default {
  components: { BaseFormText, BaseFormTextarea },
  filters: { numberFormat },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderLoading: false,
    };
  },
  methods: {
    order() {
      this.orderLoading = true;
      this.formError = {};
      this.formErrorMessage = '';
      setTimeout(() => {
        axios
          .post('https://vue-study.skillbox.cc/api/orders', {
            ...this.formData,
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          })
          .then((response) => {
            this.$store.commit('resetCart');
            this.$store.commit('updateOrderInfo', response.data);
            this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          })
          .catch((error) => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          })
          .then(() => {
            this.orderLoading = false;
          });
      }, 2000);
    },
  },
};
</script>

<style>
.gif {
  margin-left: 110px;
  margin-top: 20px;
}
</style>
