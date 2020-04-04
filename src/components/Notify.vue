<template>
  <transition-group name="list" tag="ul" class="goods">
    <li class="item" v-for="message in messages" :key="message.productId">
      <div class="part part-main">
        <div class="good-picture">
          <img
            :src="`${message.primaryImageUrl.split('.')[0]}.${message.primaryImageUrl.split('.')[1]}_220x220_1.${message.primaryImageUrl.split('.')[2]}`"
          />
        </div>
        <div class="good-info">
          <div class="good-info-head">
            <span class="uniq-code">код: {{parseInt(message.code)}}</span>
            <div class="available">
              <span>Наличие</span>
              <span>{{message.isActive ? 'Есть в наличии' : "Нет в наличии"}}</span>
            </div>
          </div>
          <p class="good-info-title">{{message.title}}</p>
          <p class="good-info-add">
            <b>Могут понадобиться:</b>
            {{message.assocProducts}}
          </p>
        </div>
      </div>
      <div class="part part-about">
        <div class="about-top">
          <div class="price-club">
            <span>
              По карте
              <br />клуба
            </span>
            <span
              class="price"
            >{{(!message.showPriceAlt)?message.priceGold.toFixed(2):message.priceGoldAlt.toFixed(2)}} &#8381;</span>
          </div>
          <div class="price-reg">
            <span
              class="price"
            >{{(!message.showPriceAlt)?message.priceRetail.toFixed(2):message.priceRetailAlt.toFixed(2)}} &#8381;</span>
          </div>
          <p class="points-cost">Можно купить за 231,75 балла</p>
          <div class="options">
            <div
              class="option-item"
              :class="{active:!message.showPriceAlt}"
              @click="priceAlt(false, message.productId)"
            >За {{message.unitAlt}}</div>
            <div
              :class="{active:message.showPriceAlt}"
              v-if="message.unitFull != message.unitFullAlt"
              @click="priceAlt(true, message.productId)"
              class="option-item"
            >За {{(message.unitFull === 'упаковка')?'упаковку':message.unitFull}}</div>
          </div>
        </div>
        <div class="part-about-footer">
          <div class="reminder">
            <div class="part">
              <span class="icon">i</span>
            </div>
            <div class="part">
              <p>Продается {{(message.unitFull === 'упаковка')?'упаковками':(message.unitFull === 'метр погонный')?'погонными метрами':'поштучно'}}</p>
              <p
                v-if="message.unitFull != message.unitFullAlt"
              >1 {{message.unit}} = {{(message.unitRatio/message.unitRatioAlt).toFixed(2)}} {{message.unitAlt}}</p>
            </div>
          </div>
          <div class="order">
            <div class="amount">
              <span class="digit">{{message.orderAmount}}</span>
              <!-- <span class="digit">{{message.orderAmount}}</span> -->
              <div class="change-amount">
                <span @click="amountPlus(message.productId)">+</span>
                <span @click="amountMinus(message.productId)">-</span>
              </div>
            </div>
            <div class="button-order">
              <button :data-product-id="message.productId">в корзину</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </transition-group>
  <!-- <button
      class="btn btnPrimary"
      @click="loadMore"
      :disabled="maxLength === 0"
      :class="{btnDisabled: maxLength === 0}"
  >Load more</button>-->
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true
    }
    // priceShift: {
    //   type: Boolean,
    //   required: true
    // }
  },
  computed: {
    // maxLength () {
    //   return this.$store.getters.getMessageFilter.length
    // }
  },
  methods: {
    priceAlt(boolean, id) {
      this.$emit("priceAlt", boolean, id);
    },
    amountPlus(id) {
      this.$emit("amountPlus", id);
    },
    amountMinus(id) {
      this.$emit("amountMinus", id);
    }

    // loadMore() {
    //   this.$store.dispatch("loadMessages").catch(err => {
    //     console.log(err);
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
table {
  text-align: center;
}
td {
  display: flex;
  justify-content: space-between;
  padding: 12px 6px;
  font-size: 14px;
}

/* Animation */
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

button {
  margin-top: 20px;
  &.btnDisabled {
    cursor: default;
    opacity: 0.6;
  }
}
</style>
