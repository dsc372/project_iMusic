// components/ranking_item/ranking_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData:{
      type:Object,
      value:{},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRankingItemTap(){
      wx.navigateTo({
        url:`/pages/more_music/more_music?type=ranking&id=${this.properties.itemData.id}`
      })
    }
  }
})
