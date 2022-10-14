// components/recommandSong_item/recommandSong_item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    }
  },
  data: {

  },
  methods:{
    onSongItemTap(){
      wx.navigateTo({
        url: `/packagePlayer/pages/music_player/music_player?id=${this.properties.itemData.id}`,
      })
    }
  }

})
