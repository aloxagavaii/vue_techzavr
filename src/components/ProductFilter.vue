<template>
<aside class="filter">
          <h2 class="filter__title">Фильтры</h2>

          <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
            <fieldset class="form__block">
              <legend class="form__legend">Цена</legend>
              <label for="min-price" class="form__label form__label--price">
                <input
                 id="min-price"
                  class="form__input"
                  type="text"
                  name="min-price"
                  v-model.number="currentPriceFrom"
                />
                <span class="form__value">От</span>
              </label>
              <label for="max-price" class="form__label form__label--price">
                <input
                 id="max-price"
                  class="form__input"
                  type="text"
                  name="max-price"
                  v-model.number="currentPriceTo"
                />
                <span class="form__value">До</span>
              </label>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Категория</legend>
              <label for="category1" class="form__label form__label--select">
                <select id="category1" class="form__select" type="text"
                 name="category" v-model.number="currentCategoryId">
                  <option value="0">Все категории</option>
                  <option :value="category.id"
                   v-for="category in categories" :key="category.id">
                   {{ category.title }}</option>
                </select>
              </label>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in ucolors" :key="color.id">
                  <label :for="color.id" class="colors__label">
                    <input
                     :id="color.id"
                       v-model.number="currentColor"
                      class="colors__radio sr-only"
                      type="radio"
                      name="color"
                      :value="color.id"
                    />
                    <span
                      class="colors__value"
                      :style="`background-color: ${color.code}`"
                    >
                    </span>
                  </label>
                </li>

              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ</legend>
              <ul class="check-list">
                <li class="check-list__item">
                  <label for="volume1" class="check-list__label">
                    <input
                     id="volume1"
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="8"
                      checked=""
                    />
                    <span class="check-list__desc">
                      8
                      <span>(313)</span>
                    </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label for="volume2" class="check-list__label">
                    <input
                     for="volume2"
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="16"
                    />
                    <span class="check-list__desc">
                      16
                      <span>(461)</span>
                    </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label for="volume3" class="check-list__label">
                    <input
                     for="volume3"
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="32"
                    />
                    <span class="check-list__desc">
                      32
                      <span>(313)</span>
                    </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label for="volume4" class="check-list__label">
                    <input
                     for="volume4"
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="64"
                    />
                    <span class="check-list__desc">
                      64
                      <span>(313)</span>
                    </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label for="volume5" class="check-list__label">
                    <input
                     for="volume5"
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="128"
                    />
                    <span class="check-list__desc">
                      128
                      <span>(313)</span>
                    </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label for="volume6" class="check-list__label">
                    <input
                     for="volume6"
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="264"
                    />
                    <span class="check-list__desc">
                      264
                      <span>(313)</span>
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <button class="filter__submit button button--primery" type="submit">
              Применить
            </button>
            <button class="filter__reset button button--second"
             type="button" @click.prevent="reset">
              Сбросить
            </button>
          </form>
        </aside>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: 0,
      categoriesData: null,
      colorsData: null,
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    ucolors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColor = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColor);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
    },
    loadCategories() {
      axios.get('https://vue-study.skillbox.cc/api/productCategories')
        .then((response) => { this.categoriesData = response.data; });
    },
    loadColors() {
      axios.get('https://vue-study.skillbox.cc/api/colors')
        .then((response) => { this.colorsData = response.data; });
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>
