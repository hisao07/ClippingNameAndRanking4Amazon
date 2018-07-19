/*
   Copyright 2018 Hisao Oshita
  
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
(($) => {
  "use strict"

  // check null or undefined
  function isNullOrUndefined(o) {
    return o === undefined || o === null;
  }

  // Get target
  const productTitle = document.getElementById("productTitle");
  const salesRank = document.getElementById("SalesRank");

  // Mark targer
  if (!isNullOrUndefined(productTitle))
    productTitle.style = "border: 5px solid yellow";
  if (!isNullOrUndefined(salesRank))
    salesRank.style = "border: 5px solid yellow";

  // Regist message listener
  browser.runtime.onMessage.addListener((request, sender, sendResponse) =>
    Promise.resolve({
      product: productTitle.textContent,
      ranking: salesRank.textContent
    }));

})();
