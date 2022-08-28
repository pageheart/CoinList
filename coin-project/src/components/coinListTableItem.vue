<template>
  <div v-if="itemVisible">
    <div class="index-list-items">
      <div class="flex items-center col-span-3">
        <div class="watchlistStar" @click="watchlistStarClick(coin.id, coin.name)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path :class="{'bookmark':bookmark}" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
        <div class="inline-flex items-center " @click="openPopup">{{coin.name}}</div>
      </div>
      <div class="text-right col-span-2 ">
        {{ coin.symbol }}
      </div>
      <div class="text-right col-span-2 ">
        <span class="minus">{{a_currency}}{{ coin.current_price | numberFormatMoney(2) }}</span>
      </div>
      <div class="text-right" :class="[Number(coin.price_change_percentage_1h_in_currency) > 0?'upVal':'downVal']">{{ coin.price_change_percentage_1h_in_currency | numberFormatFixed(2) }}%</div>
      <div class="text-right" :class="[Number(coin.price_change_percentage_24h_in_currency) > 0?'upVal':'downVal']">{{ coin.price_change_percentage_24h_in_currency | numberFormatFixed(2) }}%</div>
      <div class="text-right" :class="[Number(coin.price_change_percentage_7d_in_currency) > 0?'upVal':'downVal']">{{ coin.price_change_percentage_7d_in_currency | numberFormatFixed(2) }}%</div>
      <div class="text-right col-span-3">{{a_currency}}{{ coin.total_volume | numberFormatMoney(2) }}</div>
    </div>
    <coinDetailPopup :id="coin.id" :visible.sync="visible" :currency="currency" />
  </div>  
</template>

<script>
import common from '../js/common.js'
import coinDetailPopup from './coinDetailPopup.vue'

export default {
  name: 'coinListTableItem',
  data() {
    return {
      bookmark: false,
      visible: false,
      itemVisible: true
    }
  },
  props: {
    coin:undefined,
    currency:undefined
  },
  components: {
    coinDetailPopup
  },
  computed: {
    a_currency: function() {
      return (this.currency == 'krw') ? '￦' : '$';
    }
  },
  created() {
    let getBookMark = common.getCookie("bookmark");
    if(getBookMark) {
      getBookMark.split(',').forEach(el=>{
        if(el == this.coin.id) {
          this.bookmark = true;
        }
      });
    }
  },
  methods: {
    openPopup() {
      this.visible=!this.visible;
    },
    watchlistStarClick(id, nm) {
      this.bookmark = !this.bookmark;
      let getBookMark = common.getCookie("bookmark");
      let setBookMark = '';
      let msg = '';
      if(!this.bookmark) {
        getBookMark.split(',').forEach(el=>{
          if(el != id) {
            if(setBookMark == '') setBookMark = el;
            else setBookMark = setBookMark + ',' + el;
          }
        });
        msg = nm + " 북마크가 해제되었습니다.";
        if(this.$router.history.current.path == "/mark") this.itemVisible = false;
      }
      else {
        if(getBookMark) {
          setBookMark = getBookMark + ',' + id;
        }
        else {
          setBookMark = id;
        }
        msg = nm + " 북마크가 추가되었습니다.";
      }
      common.setCookie("bookmark",setBookMark,1);
      alert(msg);
    }
  },
  filters: {
    numberFormatMoney: (value, numFix) => {
        value = parseFloat(value);
        if (!value) return '0';
        value = value.toFixed(numFix).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
        let valueArr = value.split('.');
        return Number(valueArr[1]) > 0 ? value : valueArr[0];
    },
    numberFormatFixed: (value, numFix) => {
      return value.toFixed(numFix);
    }
  }
}
</script>

<style scoped>
.watchlistStar {
    width: 1.5rem;
    cursor: pointer;
    padding-right: 0.25rem;
    --tw-text-opacity: 1;
    color: rgba(226,232,240,var(--tw-text-opacity));
    transition-timing-function: cubic-bezier(.4,0,.2,1);
}

.flex {
    display: flex;
}

.bookmark {
    fill: rgb(245, 198, 106);
}
</style>
