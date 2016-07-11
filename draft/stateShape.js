/**
 * 说明：
 * @param news 一个包含每日新闻的数组。每一个元素都是某一天的新闻。
 * top_stories包含在stories中，要注意通过id过滤。
 *
 */


{
  news: {
    isFetching: true,
    items:[
      {
        date: "20160710",
        stories: [
          {
            images: [
              "http://pic1.zhimg.com/7b515707a62e40bdbbe284e58450bde0.jpg"
            ],
            type: 0,
            id: 8542317,
            ga_prefix: "071017",
            title: "知乎好问题 · 做好哪些小事可以帮助个人成长？"
          },
          //....
        ],
        top_stories: [
          {
            image: "http://pic2.zhimg.com/6bd2193beb2d04e9de6da8763f02e139.jpg",
            type: 0,
            id: 8542317,
            ga_prefix: "071017",
            title: "知乎好问题 · 做好哪些小事可以帮助个人成长？"
          },
          //...
        ]
      }
    ]
  },
  stories: [
    {
      isFetching = true,
      //...a story
    }
  ]
}
