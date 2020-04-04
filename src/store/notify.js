export default {
  state: {
    messages: [],
  },
  mutations: {
    setMessage(state, payload) {
      state.messages = payload;
    },
    orderAmountPlus(state, id) {
      state.messages.forEach((el) => {
        if (el.productId === id) {
          el.orderAmount++;
        }
      });
    },
    orderAmountMinus(state, id) {
      state.messages.forEach((el) => {
        if (el.productId === id && el.orderAmount > 1) {
          el.orderAmount--;
        }
      });
    },
    showPrice(state, payload) {
      state.messages.forEach((el) => {
        if (el.productId === payload.id) {
          el.showPriceAlt = payload.boolean;
        }
      });
    },
    // setMessageMain(state, payload) {
    //   state.messagesMain = payload;
    // },
    // loadMessages(state, payload) {
    //   state.messagesMain = [...state.messagesMain, ...payload];
    // }
  },
  actions: {
    setMessage({ commit }, payload) {
      commit("setMessage", payload);
    },
    orderAmountPlus({ commit }, id) {
      commit("orderAmountPlus", id);
    },
    orderAmountMinus({ commit }, id) {
      commit("orderAmountMinus", id);
    },
    showPrice({ commit }, payload) {
      commit("showPrice", payload);
    },
  },
  getters: {
    getMessage(state) {
      return state.messages;
    },
  },
};
