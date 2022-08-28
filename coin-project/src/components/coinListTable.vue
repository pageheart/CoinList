<template>
<div>
  <nav class="nav"><router-link to="/home" class="nav-link bold">가상자산 시세목록</router-link><router-link to="/mark" class="nav-link">북마크 목록</router-link></nav>
  <div class="selItem flex-end">
    <select v-model="currency" @change="currencyChange()">
      <option value="krw">KRW 보기</option>
      <option value="usd">USD 보기</option>
    </select>
  </div>
  <div class="cryptosWrapper">
    <div class="index-list-header">
      <div class="col-span-6 pl-5 inline-flex items-center">자산</div>
      <div class="inline-flex items-center flex-center">Price</div>
      <div class="inline-flex items-center flex-center">1H</div>
      <div class="inline-flex items-center flex-center">24H</div>
      <div class="inline-flex items-center flex-center">7D</div>
      <div class="inline-flex items-center col-span-3 flex-end">24H Volume</div>
    </div>
    <div id="cryptos">
      <coinListTableItem v-for="item in itemList" :coin="item" :key="item.id" :currency="currency" />
      <div class="index-list-items" v-if="moreDivDisplay">
        <div class="more-txt-center" @click="moreBtnEvt">더보기</div>
      </div>
    </div>
  </div>
  <loadingSpinner :loadingBool="loadingBool" />
</div>
</template>

<script>
import coinListTableItem from './coinListTableItem.vue'
import loadingSpinner from './loadingSpinner.vue'

export default {
  name: 'coinListTable',
  data() {
    return { 
      itemList: undefined, 
      currency: 'krw',
      pageCnt: 1,
      moreDivDisplay: true,
      loadingBool: false
    }
  },
  components: {
    coinListTableItem,
    loadingSpinner
  },
  methods: {
    apiCall() {
      this.loadingBool = true;
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency='+this.currency+'&order=market_cap_desc&per_page=50&page='+this.pageCnt+'&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
      .then(r => {                    
          if(r.ok) {
              return r.json();
          }
          throw new Error();
      })
      .then(j => {
        if(j.length > 0) {
          if(this.itemList == undefined)
            this.itemList = j;
          else 
            for(let i=0; i<j.length; i++) {
              this.itemList.push(j[i]);
            }
        }
        else {
          this.moreDivDisplay = false;
        }
        this.loadingBool = false;
      })
      .catch(e=>{
        console.log(e);
        this.loadingBool = false;
      })
    },
    currencyChange() {
      this.moreDivDisplay = true;
      this.pageCnt = 1;
      this.itemList = undefined;
      this.apiCall();
    },
    moreBtnEvt() {
      this.pageCnt++;
      this.apiCall();
    }
  },
  created() {
    this.apiCall()
  }
}
</script>
