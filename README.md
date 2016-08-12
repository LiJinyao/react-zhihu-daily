# 知乎日报 with React.js
>声明：『知乎』是 知乎. Inc 的注册商标。本软件与其代码非由知乎创作或维护。软件中所包含的信息与内容皆违反版权与知乎用户协议。它是一个免费软件，使用它不收取您任何费用。其中的所有内容均可在知乎获取。

知乎日报API来自 [知乎日报 API 分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/知乎日报-API-分析)。

## live demo
[zhihudaily.lijinyao.com](https://zhihudaily.lijinyao.com/)

## Screen shot
![mobile](ScreenShot/mobile.jpg)
![desktop](ScreenShot/desktop.png)

## 运行
```
npm install
npm run build
node dist/zhihuDaily/app.js
```
## 读读日报API分析
### 日报推荐列表
- URL: `https://news-at.zhihu.com/api/7/explore?nightmode=0`
- 响应:

```
<a class="topic-cell" href="circlely://circle/456751">

<span class="avatar" style="font-size:32px;line-height:48px;color:#fff;background:#5e97f6;text-align:center">各</span>

<div class="content">
<span class="title">各种工作</span>
<span class="meta">
<i>8 文章</i>
<i>6 读者</i>
</span>
</div>
</a>
```
- 分析:

一个完整的html
### 日报主页
- URL: `https://news-at.zhihu.com/api/7/circle/id`，
id在获取日报推荐列表返回的HTML `a`元素的`href`中提取。
- 响应:

```
{
	"count": {
		"stories": 188,
		"editors": 1,
		"members": 4325
	},
	"status": 0,
	"description": "如果你们跟我一样，刚刚步入准爸妈的行列，欢迎加入《初为人父母》，这里木鸡汤、木医术，只为孕妈和宝宝收藏可以使生活更加美好、便利的物件及常识。\n\n#第一阶段# 新手爸妈上路，什么需要买买买。",
	"member_alias": "位新爸妈",
	"image": "http:\/\/pic1.zhimg.com\/63b9a6eef662f1de1d203ba0ab74e1e8_bs.jpg",
	"creator": {
		"id": 10005494,
		"name": "余柯儿"
	},
	"id": 341153,
	"thumbnail": "http:\/\/pic2.zhimg.com\/815b096f68976d4afc88c18bfd1349e9_t.jpg",
	"name": "初为人父母"
}
```
### 日报内容
-URL: `https://news-at.zhihu.com/api/7/circle/id/stories`，id同上。
-响应:

```
{
	"stories": [{
		"count": {
			"likes": 5,
			"comments": 3,
			"reposts": 8
		},
		"title": "怎么才能终身学习？像孩子一样就行",
		"poster": {
			"reason": "向孩子致敬",
			"id": 10005494,
			"avatar": "http:\/\/pic4.zhimg.com\/9d9e1f217_xs.jpg",
			"name": "余柯儿"
		},
		"time": 1470876552,
		"images": ["http:\/\/pic3.zhimg.com\/832a8f05ac30ee220f9b1933d89f6532.jpg"],
		"vote_status": 0,
		"type": 2,
		"id": 8582756,
		"external_url": "http:\/\/mp.weixin.qq.com\/s?__biz=MzAxODYzNjY5Ng==&mid=2650453861&idx=1&sn=e2851769901b495c86dc59f57e8b3135"
	},
	...
],
}
```
