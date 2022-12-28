<template>
<span>
<li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img :src="product.image" :alt="product.title"
                />
              </a>
              <h3 class="catalog__title">
                <a href="#"> {{product.title}} </a>
              </h3>
              <span class="catalog__price"> {{ product.price }} ₽ </span>
              <ul class="colors colors--black">
                <li class="colors__item">
                  <label for="radio1" class="colors__label">
                    <input
                      id="radio1"
                      class="colors__radio sr-only"
                      type="radio"
                      value="#73B6EA" v-model="color"
                    />
                    <span
                      class="colors__value"
                      style="background-color: #73b6ea"
                    >
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label for="radio2" class="colors__label">
                    <input
                      id="radio2"
                      class="colors__radio sr-only"
                      type="radio"
                      value="#8BE000" v-model="color"
                    />
                    <span
                      class="colors__value"
                      style="background-color: #8be000"
                    >
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                   <label for="radio3" class="colors__label">
                    <input
                      id="radio3"
                      class="colors__radio sr-only"
                      type="radio"
                      value="#000" v-model="color"
                    />
                    <span class="colors__value" style="background-color: #000">
                    </span>
                  </label>

                </li>
              </ul>
            </li>
</span>
</template>
<script>
export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  props: ['product'],

};
</script>
