// 进行测试的主要代码
// describe("Player", function()
// {
//   /* tests */
//   it("should be able to play a Song", function() {
//     player.play(song);
//     expect(player.currentlyPlayingSong).toEqual(song);
//   });
//
// });
// describe是Jasmine的全局函数，用于创建一个测试套件，可以理解为一组测试用例的集合。
// describe函数接受两个参数（一个字符串和一个回调函数）。
// 字符串是这个测试套件的名字或标题，通常描述被测试内容，
// 用之前的比喻来说，describe就是一个故事，字符串就是这个故事的标题。回调函数是实现测试套件的代码块（称为describe块）。

// it也是Jasmine的全局函数，用来在describe块中创建一个测试用例（spec），
// 和describe一样，it接受两个参数（一个字符串一个回调函数），字符串参数是测试用例的名字或标题，回调函数是实现测试用例的代码块（称为it块


describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});


describe("正常、满减、半价三种情况互相比较",function () {
  it("正常testing", ()=> {

    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];  //输出样式
    let cartSelected = [
    {
      id: "ITEM0001",
      name: "黄焖鸡",
      price: 18,
      count: 1,
      sum: 0
    },
    {

      id: "ITEM0013",
      name: "肉夹馍",
      price: 6,
      count: 2,
      sum: 0
    },
    {

      id: "ITEM0022",
      name: "凉皮",
      price: 8,
      count: 1,
      sum: 0
    }
  ];  //菜单

    //输出样例
    let normal = [
    {
      id: "ITEM0001",
      name: "黄焖鸡",
      price: 18,
      count: 1,
      sum: 18
    },
    {
      id: "ITEM0013",
      name: "肉夹馍",
      price: 6,
      count: 2,
      sum: 12
    },
    {
      id: "ITEM0022",
      name: "凉皮",
      price: 8,
      count: 1,
      sum: 8
    },
    38,   //总价
    0     //优惠金额
  ];
  expect(splitString(inputs)).toEqual(cartSelected);    //菜单输出进行比较
  expect(sumEveryPrice(cartSelected)).toEqual(normal);  //正常进行比较
});

  it("正常、满减testing", ()=> {
    let normal = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 18
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 8
      },
      38,
      0
    ];
  let fullreduction = [
    {
      id: "ITEM0001",
      name: "黄焖鸡",
      price: 18,
      count: 1,
      sum: 18
    },
    {
      id: "ITEM0013",
      name: "肉夹馍",
      price: 6,
      count: 2,
      sum: 12
    },
    {
      id: "ITEM0022",
      name: "凉皮",
      price: 8,
      count: 1,
      sum: 8
    },
    32,
    6
  ];
  // sumDiscountOne(normal)  满减函数
  expect(sumDiscountOne(normal)).toEqual(fullreduction);
});


  it("正常、半价testing", ()=> {
    let normal = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 18
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 8
      },
      38,
      0
    ];
    let halfprice = [
    {
      id: "ITEM0001",
      name: "黄焖鸡",
      price: 18,
      count: 1,
      sum: 9
    },
    {
      id: "ITEM0013",
      name: "肉夹馍",
      price: 6,
      count: 2,
      sum: 12
    },
    {
      id: "ITEM0022",
      name: "凉皮",
      price: 8,
      count: 1,
      sum: 4
    },
    25,
    13
   ];
  // sumDiscountOne(normal)  半价函数
  expect(sumDiscountTwo(normal)).toEqual(halfprice);
});


  it("三种情况比较", ()=> {
    let normal = [
      {
        id: "ITEM0001",
        name: "黄焖鸡",
        price: 18,
        count: 1,
        sum: 18
      },
      {
        id: "ITEM0013",
        name: "肉夹馍",
        price: 6,
        count: 2,
        sum: 12
      },
      {
        id: "ITEM0022",
        name: "凉皮",
        price: 8,
        count: 1,
        sum: 8
      },
      38,
      0
    ];
  let fullreduction = [
    {
      id: "ITEM0001",
      name: "黄焖鸡",
      price: 18,
      count: 1,
      sum: 18
    },
    {
      id: "ITEM0013",
      name: "肉夹馍",
      price: 6,
      count: 2,
      sum: 12
    },
    {
      id: "ITEM0022",
      name: "凉皮",
      price: 8,
      count: 1,
      sum: 8
    },
    32,
    6
  ];
  let halfprice = [
    {
      id: "ITEM0001",
      name: "黄焖鸡",
      price: 18,
      count: 1,
      sum: 9
    },
    {
      id: "ITEM0013",
      name: "肉夹馍",
      price: 6,
      count: 2,
      sum: 12
    },
    {
      id: "ITEM0022",
      name: "凉皮",
      price: 8,
      count: 1,
      sum: 4
    },
    25,
    13
  ];
  expect(comparePrice(normal, fullreduction, halfprice)).toEqual(halfprice);
});

});



