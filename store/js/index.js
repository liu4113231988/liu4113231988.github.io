const app = Vue.createApp({
  name: "",
  setup() {
    const navigatorIcons = [
      { url: "https://z3.ax1x.com/2021/06/21/RE58oV.png", name: "百度" },
      { url: "https://z3.ax1x.com/2021/06/21/RE5dy9.png", name: "谷歌" },
    ];

    const menuIsShow = Vue.ref(false),
      kwResultShow = Vue.ref(false),
      //timeOfMenu = Vue.ref(0),
      menuNavigatorTitle = Vue.ref(""),
      kw = Vue.ref(""),
      currentNavigatorIconsIndex = Vue.ref(1),
      timeOfNavigatorWords = Vue.ref(0),
      navigatorIconsMax = Vue.ref(2),
      menusFistPageSrc = Vue.ref("");
    const menus = Vue.ref([]),
      items = Vue.reactive({
        comItemList: [],
        devItemList: [],
        tecItemList: [],
        finItemList: [],
        othItemList: [],
      }),
      //navigatorIcons = Vue.ref([]),
      kwResult = Vue.ref([]);

    const getNowTime = () => {
      var date = new Date();
      document.getElementById("hours_span").innerText =
        date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
      document.getElementById("minute_span").innerText =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    };

    const enter = (event) => {
      var el = event.currentTarget;
      el.style.animationName = "kwsl";
    };
    const leave = (event) => {
      var el = event.currentTarget;
      el.style.animationName = "kwsl2";
    };

    const updateTime = () => {
      window.setInterval(function () {
        document.getElementById("second_span").style.visibility = "visible";
        getNowTime();
      }, 1000);
    };

    const stopDefaultEvent = () => {
      console.log(111);
    };

    const requestBaidu = () => {
      //百度搜索参数：1.wd=？关键字 2.cl=3/2 网页搜索/图片搜索 3.json=1 返回值为json格式
      var baiduBaseUrl =
        "https://www.baidu.com/sugrec?p=3&pre=1&p=3&json=1&prod=pc&from=pc_web&wd=";

      var reqUrl =
        baiduBaseUrl +
        encodeURIComponent(kw.value) +
        "&sugsid=35105,31254,36012,35913,34584,35872,35948,35802,35315,26350,35882,35867,35879,22157&req=2&bs=" +
        encodeURIComponent(kw.value) +
        "&pbs=" +
        encodeURIComponent(kw.value) +
        "&csor=1&pwd=" +
        encodeURIComponent(kw.value);
      $.ajax({
        type: "get",
        url: reqUrl,
        dataType: "jsonp",
        success: function (result) {
          kwResult.value = result.g;
          showSearchResultAnimation();
        },
        error: function (result) {
          console.log(result);
        },
      });
    };
    const requestBaiduByKw = (value) => {
      var urlHeader =
        "https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=";
      var urlTail =
        "&fenlei=256&rsv_pq=ac99dcf400099d65&rsv_t=70c2mAusNS7LBXsP4aeeQ7VRutMN5gd%2F3AXgMYBouXO7n4KJTw7OEm5bSmQ&rqlang=cn&rsv_enter=1&rsv_dl=ts_6&rsv_sug3=6&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&prefixsug=12121&rsp=6&inputT=3318540&rsv_sug4=3318902";
      console.log(value);
      if (value != null && value != undefined) {
        var words = value.q || value;
        window.open(urlHeader + encodeURIComponent(words) + urlTail);
      } else if (kw.value != null && kw.value != undefined) {
        window.open(urlHeader + encodeURIComponent(kw.value) + urlTail);
      }
    };

    const menuHidden = () => {
      var el = document.getElementById("menu_div");
      if (menuIsShow.value) {
        el.style.animationName = "md2";
      }
    };

    const menuBtnReset = () => {
      var elementsByClassName = document.getElementsByClassName(
        "menu_navigation_btn"
      );
      for (let i = 0; i < elementsByClassName.length; i++) {
        elementsByClassName[i].style.transform = "scale(1)";
      }
    };

    const navigatorHidden = () => {
      var el2 = document.getElementById("navigation_words");
      el2.style.animationName = "nw";
    };

    const showNavigator = () => {
      // var el2 = document.getElementById("navigation_words");
      // el2.innerHTML =
      //   '当前搜索引擎 "' +
      //   navigatorIcons[currentNavigatorIconsIndex.value - 1].name +
      //   '"';
      // el2.style.animationName = "nw2";
      //timeOfNavigatorWords.value = 0;
    };

    const navigatorChange = (event) => {
      var el = event.currentTarget;
      if (currentNavigatorIconsIndex.value >= navigatorIconsMax.value) {
        currentNavigatorIconsIndex.value = 1;
      } else {
        currentNavigatorIconsIndex.value++;
      }
      //更换 图标
      el.style.backgroundImage =
        "url(" + navigatorIcons[currentNavigatorIconsIndex.value - 1].url + ")";
      //改变提示
      var el2 = document.getElementById("navigation_words");
      el2.innerHTML =
        '当前搜索引擎 "' +
        navigatorIcons[currentNavigatorIconsIndex.value - 1].name +
        '"';
      el2.style.animationName = "nw2";
      timeOfNavigatorWords.value = 0; // 显示时间 置 0
    };

    const showSearchResultAnimation = () => {
      if (kwResult.value != undefined) {
        kwResultShow.value = true;
        document.getElementById("key_word_show").style.animationName = "kws";
      }
      if (kwResult.value == undefined) {
        kwResultShow.value = false;
        document.getElementById("key_word_show").style.animationName = "kws2";
      }
    };

    const reset = () => {
      //menuHidden();
      if (kwResultShow.value) {
        document.getElementById("key_word_show").style.animationName = "kws2";
      }
    };

    const onInit = () => {
      var winWidth;
      var winHeight;
      //获取浏览器窗口宽度
      if (window.innerWidth) {
        winWidth = window.innerWidth;
      } else if (document.body && document.body.clientWidth) {
        winWidth = document.body.clientWidth;
      }
      //获取浏览器窗口高度
      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight;
      }
      if (
        document.documentElement &&
        document.documentElement.clientHeight &&
        document.documentElement.clientWidth
      ) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
      }
      getNowTime();
      //获取菜单导航列表
      //searchNavigationMenus();
      document.getElementById("index").style.width = winWidth;
      document.getElementById("index").style.height = winHeight;

      //首页被打开时 时间 是后显示出来的
      document.getElementById("hours_span").style.animationName = "hms";
      document.getElementById("minute_span").style.animationName = "hms";
      document.getElementById("second_span").style.animationName = "hms";
      //输入框阴影
      document.getElementById("search_input").style.animationName = "si";
    };

    const focusSearch = () => {
      if (kw.value) {
        showSearchResultAnimation();
      }
    };

    const blurSearch = () => {
      reset();
    };

    const loadItems = () => {
      $.ajax({
        type: "get",
        url: "../store/data/commonUse.json",
        dataType: "json",
        success: function (data) {
          //itemList.value = result.result;
          items.comItemList = data.result.Common;
          items.devItemList = data.result.Develop;
          items.tecItemList = data.result.Tech;
          items.finItemList = data.result.Finance;
          items.othItemList = data.result.Other;
        },
        error: function (result) {
          console.log(result);
        },
      });
    };

    Vue.onMounted(() => {
      onInit();
      updateTime();
      loadItems();
    });

    return {
      menuNavigatorTitle,
      items,
      menusFistPageSrc,
      leave,
      requestBaiduByKw,
      enter,
      requestBaidu,
      //navigatorChange,
      showNavigator,
      stopDefaultEvent,
      focusSearch,
      blurSearch,
      reset,
      menus,
      kw,
      kwResult,
    };
  },
});
app.component("card-item-list", {
  props: ["items"],
  methods: {
    requestNet(params) {
      window.open(params.url);
    },
  },
  template: `<div class="net_show_div" v-for="item in items" @click="requestNet(item)">
  <img :src=item.icon>
  <div class="net_url">
      <a :href=item.url target='_BLANK' style="text-after-overflow:ellipsis;text-align: center">{{item.netName}}</a>
  </div>
</div>`,
});
app.use(ElementPlus);
app.mount("#index");
