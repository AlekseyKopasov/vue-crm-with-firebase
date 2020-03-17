<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line"
        v-for="cur in currencies"
        :key="cur"
        >
          <span>{{ getCurrency(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['quotes'],
  data: () => ({
    currencies: ['USDRUB', 'USDUSD', 'USDEUR']
  }),
  computed: {
    base () {
      return this.$store.getters.info.bill / (this.quotes.USDRUB / this.quotes.USDUSD)
    }
  },
  methods: {
    getCurrency (currency) {
      console.log(Math.floor(this.base * this.quotes[currency]))
      return Math.floor(this.base * this.quotes[currency])
    }
  }
}
</script>
