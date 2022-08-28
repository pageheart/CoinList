<template>
  <div class="detailPopup" v-if="visible">
    <div class="detailContent" >
      <div class="pop_head">
        <div class="tit">
          <img :src="detailData ? detailData.image.thumb : ''" width="24" height="24" alt="코인 이미지">
          <span class="ml5">{{detailData ? detailData.localization.ko : ''}}</span>
        </div>
      </div>
      <span class="pop_close" @click="popupClose"></span>
      <div class="info-grid">
        <div class="grid-first-tab pl10" style="border:1px solid">시가총액 Rank</div>
        <div class="pl10 col-span-2" style="padding: 20px;border-top:1px solid;border-bottom:1px solid;border-right:1px solid;">&nbsp;Rank #{{detailData ? detailData.market_cap_rank : ''}}</div>
        <div class="col-span-2 txt-end">
          <span class="current-price">{{a_currency}}{{current_price | numberFormatMoney(2) }}</span> 
          <span class="ml5" :class="[Number(price_change_percentage_24h_in_currency) > 0?'upVal':'downVal']">{{price_change_percentage_24h_in_currency | numberFormatFixed(2) }}%</span>
        </div>
        <div class="grid-first-tab pl10" style="border-left:1px solid;border-right:1px solid;border-bottom:1px solid;">웹사이트</div>
        <div class="pl10 col-span-2" style="padding: 20px;border-right:1px solid;border-bottom:1px solid;">&nbsp;<a :href="detailData ? detailData.links.official_forum_url[0] : ''" target="_blank">{{detailData ? detailData.links.official_forum_url[0] : ''}}</a></div>
        <div class="col-4 txt-end">
          <div>시가총액</div>
          <div>{{a_currency}}{{total_volume | numberFormatMoney(2) }}</div>
        </div>
        <div class="txt-end">
          <div>24시간 거래대금</div>
          <div>{{a_currency}}{{market_cap_change_24h_in_currency | numberFormatMoney(2) }}</div>
        </div>
      </div>
      <div class="info-grid grid-calc">
        <div class="col-span-5">가격계산</div>
        <div class="col-2 txt-end">
          BTC <input type="text" v-model="btc" class="txt-end" @keyup="btcCal">
        </div>
        <div class="txt-center col-3">⇄</div>
        <div class="col-span-2">
          {{currency.toUpperCase()}} <input type="text" v-model="price" class="txt-end" @keyup="priceCal">
        </div>
      </div>
      <div class="pop_cont">
        <div class="layer-auto-trading-scroll-box" data-height="486" v-html="handleNewLine(description)"></div>
      </div>
    </div>
    <loadingSpinner :loadingBool="loadingBool" />
  </div>
</template>

<script>
import loadingSpinner from './loadingSpinner.vue'

export default {
  name: 'coinDetailPopup',
  data() {
    return { 
      loadingBool: false,
      detailData: undefined,
      btc: undefined,
      price: undefined
    }
  },
  watch: {
    visible: function() {
      this.apiCall();
    },
    price: function() {
      let price = this.price + '';
      if(price.charAt(0) != '.') {
        if(this.currency == "krw") {
          if(price.charAt(0) == 0) {
            price = price.substr(1);
          }
          price = this.numberCheck(price, 'onlyNum');
        }
        else {
          price = this.numberCheck(price);
        }
      }
      else {
        price = '';
      }
      this.price = price;
    },
    btc: function() {
      let btc = this.btc + '';
      if(btc.charAt(0) != '.') {
        btc = this.numberCheck(btc);
      }
      else {
        btc = '';
      }
      this.btc = btc;
    }
  },
  components: {
    loadingSpinner
  },
  props: {
    visible: undefined,
    id: undefined,
    currency: undefined
  },
  computed: {
    a_currency: function() {
      return (this.currency == 'krw') ? '￦' : '$';
    },
    current_price: function() {
      return this.detailData ? (this.currency == 'krw') ? this.detailData.market_data.current_price.krw : this.detailData.market_data.current_price.usd : '';
    },
    price_change_percentage_24h_in_currency: function() {
      return this.detailData ? (this.currency == 'krw') ? this.detailData.market_data.price_change_percentage_24h_in_currency.krw : this.detailData.market_data.price_change_percentage_24h_in_currency.usd : '';
    },
    total_volume: function() {
      return this.detailData ? (this.currency == 'krw') ? this.detailData.market_data.total_volume.krw : this.detailData.market_data.total_volume.usd : '';
    },
    market_cap_change_24h_in_currency: function() {
      return this.detailData ? (this.currency == 'krw') ? this.detailData.market_data.market_cap_change_24h_in_currency.krw : this.detailData.market_data.market_cap_change_24h_in_currency.usd : '';
    },
    description: function() {
      return this.detailData ? (this.currency == 'krw') ? this.detailData.description.ko : this.detailData.description.en : '';
    }
  },
  methods: {
    apiCall() {
      this.loadingBool = true;
      fetch('https://api.coingecko.com/api/v3/coins/'+this.id)
      .then(r => {                    
          if(r.ok) {
              return r.json();
          }
          throw new Error();
      })
      .then(j => {
        console.log(j);
        this.detailData = j;
        this.loadingBool = false;
      })
      .catch(e=>{
        console.log(e);
        this.loadingBool = false;
      })
    },
    popupClose() {
      this.$emit('update:visible', false);
    },
    handleNewLine(str) {    
       return String(str).replace(/(?:\r\n|\r|\n)/g,"</br>");
    },
    numberCheck(val, chk) {
      let code = 0;
      let reNum = '';
      let bool = false;
      val = val+'';
      for(let i=0; i<val.length; i++) {
        code = val.charCodeAt(i);
        bool = ((code >= 48 && code <= 57) || code == 46 || code == 44);

        if(bool) {
          reNum += val.charAt(i);
        }
      }
      val = reNum;

      let price = val.split('.');
      if(price.length > 1) {
        price[1] = price[1].replace(/,/g,'');
        val = price[0] +'.'+ (price[1].length > 8 ? price[1].substr(0,8) : price[1]);
      }

      val = val.replace(/,/g,'');
      if(val.indexOf('.') > 0) {
        if(chk == 'onlyNum')
          val = val.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        else
          val = val.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'.'+val.split('.')[1];
      }
      else {
        val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      return val;
    },
    btcCal() {
      let btc = this.btc.replace(/,/g,'');
      this.price = Number(btc) * Number(this.current_price);
      console.log(this.price)
    },
    priceCal() {
      let price = this.price.replace(/,/g,'');
      this.btc = Number(price) / Number(this.current_price);
      console.log(this.btc)
    }
  },
  filters: {
    numberFormatMoney: (value, numFix) => {
        value = parseFloat(value);
        if (!value) return '0';
        else {
          value = value.toFixed(numFix).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
          let valueArr = value.split('.');
          return (Number(valueArr[1]) > 0 ? value : valueArr[0]);
        }
    },
    numberFormatFixed: (value, numFix) => {
      return value ? value.toFixed(numFix) : '';
    }
  }
}
</script>

<style scoped>
.detailPopup {
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: fixed;
    inset: 0px;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease 0s;
    z-index: 10;
    display: flex;
    opacity: 1;
}

.detailContent {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 90%;
    max-height: calc(100vh - 10rem);
    overflow: auto;
    border-radius: 8px;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 10%) 0px 6px 20px;
}

.pop_head .tit {
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    padding-bottom: 0;
    margin: 10px 0 10px 10px;
    color: #222;
}

.pop_close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 25px;
    height: 25px;
    border: 0;
    cursor: pointer;
    display: inline-block;
}

.pop_close:before {
    transform: rotate(45deg);
    top: 7px;
}

.pop_close:after {
    transform: rotate(-45deg);
    top: 6px;
}

.pop_close:before, .pop_close:after {
    content: '';
    position: relative;
    display: block;
    background-color: #888;
    width: 100%;
    height: 1px;
}

.layer-auto-trading-scroll-box {
    overflow-y: auto;
    max-height: 486px;
    text-align: left;
    padding: 5px 10px 10px 15px;
    border-top: 1px solid #000;
}

.mr5 {
    margin-right: 5px;
}
.ml5 {
    margin-left: 5px;
}
.ml10 {
    margin-left: 10px;
}
.pr5 {
    padding-right: 5px;
}
.pl5 {
    padding-left: 5px;
}
.pl10 {
    padding-left: 10px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(5,minmax(0,1fr));
    align-items: center;
    border-bottom-width: 1px;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
}

.grid-first-tab {
    font-weight: bold;
    background-color: #88888861;
    padding: 20px;
}

.bold {
    font-weight: bold;
}

.txt-center {
    text-align: center;
}

.txt-end {
    text-align: end;
}

.grid-calc {
    background-color: #88888861;
    margin: 8px;
    grid-template-columns: 23% 25% 4% 25% 23%;
}

.current-price {
    font-size: 25px;
    font-weight: bold;
}
</style>