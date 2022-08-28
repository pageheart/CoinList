<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.text-right {
  text-align: right;
}

.nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-top: 3px solid #f3f3f3;
    border-bottom: 3px solid #f3f3f3;
}

.nav-link {
    display: block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #000;
}

.bold {
    font-weight: bold;
}

#cryptosWrapper {
    min-width: 720px;
    overflow-x: scroll;
}

.index-list-header {
    display: grid;
    grid-template-columns: repeat(13,minmax(0,1fr));
    border-radius: 0.25rem;
    --tw-bg-opacity: 1;
    background-color: rgba(241,245,249,var(--tw-bg-opacity));
    padding: 0.5rem 0.75rem;
    font-size: .875rem;
    line-height: 1.25rem;
    font-weight: 700;
    --tw-text-opacity: 1;
    color: rgba(100,116,139,var(--tw-text-opacity));
}

.index-list-items {
    display: grid;
    grid-template-columns: repeat(13,minmax(0,1fr));
    align-items: center;
    gap: 1rem;
    border-bottom-width: 1px;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
    border-bottom: 1px solid #000;
}

.index-list-items .more-txt-center {
    grid-column: 7;
    justify-content: end;
}

.inline-flex {
    display: inline-flex;
}

.items-center {
    align-items: center;
}

.col-span-6 {
    grid-column: span 6;
}
.col-span-5 {
    grid-column: span 5;
}
.col-span-4 {
    grid-column: span 4;
}
.col-span-3 {
    grid-column: span 3;
}
.col-span-2 {
    grid-column: span 2;
}

.col-5 {
    grid-column: 5;
}
.col-4 {
    grid-column: 4;
}
.col-3 {
    grid-column: 3;
}
.col-2 {
    grid-column: 2;
}

.upVal {
    color:#f00;
}

.downVal {
    color:#00f;
}

.selItem {
    display: flex;
    padding: 0.5rem 0.75rem;
    font-size: .875rem;
    line-height: 1.25rem;
    font-weight: 700;
}

.flex-center {
    justify-content: space-around;
}

.flex-end {
    justify-content: end;
}

.pl-5 {
    padding-left: 1.25rem;
}

#cryptos {
    overflow-y: scroll;
    max-height: 1050px;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
#cryptos::-webkit-scrollbar {
    display: none;
}

select {
    border-style: none;
}
</style>
