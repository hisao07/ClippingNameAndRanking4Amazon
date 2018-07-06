(($) => {
  // marking target
  // const productTitle = document.getElementById("productTitle");
  const productTitle = $("#productTitle");
  productTitle.css("border", "5px solid yellow");
  // const salesRank = document.getElementById("SalesRank");
  const salesRank = $("#SalesRank");
  salesRank.css("border", "5px solid yellow");

  // clipping data
  function parseSalesRank(salesRank) {
    var ret =  salesRank.match(/売れ筋ランキング:?\s+(.+)\s\(/);
    return ret[1];
  }

  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const product = productTitle.text().trim();
    console.log(product);
    const ranking = parseSalesRank(salesRank.text().trim());
    console.log(ranking);
    window.prompt("見つかったよ。", product + "/" + ranking);
  });

})(jQuery);
