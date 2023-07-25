/*
1.記得是 .onclick()=function(){}; 2. 接著接一個function，而非直接呼叫那個function，否則會沒有點按鈕也會執行

 
 */

// this variable is for creating id of every DELETE button
let delNo = 0;
let liNo = 0;
// 如果將它移出function就可以順利建立起 delete-btn0 /delete-btn1/delete-btn2...
// 但是假設我以後按了delete BTN 之後，我應該讓所有的標籤都改變嗎? 如: delete-btn0 /delete-btn1(刪除)/delete-btn2 。那麼2要變成 1嗎?

window.onload = () => {
    let addBTN = document.getElementById("addBTN");
    // 點 按鈕，call addToList (function)
    let input = document.getElementById("input-txt");

    let btnArray = [];
    let delArray = [];

    //無論是按鈕或Enter都可以輸入事件並呈現。
    addBTN.onclick = () => { addToList() };
    input.addEventListener("keypress", function(event) { if (event.key === "Enter") { addToList() } })


    function addToList() {
        // *** tag 增加 delete按鈕。可以刪除。
        // 1.獲取 input中的文字資料
        let input_TXT = input.value // console.log(inputTXT.value);

        // 2.找到要寫入to-do things的地方
        let doList = document.getElementById("dolist");

        //2-1然後增加 <>
        // li版
        let liS = document.createElement("li");

        // 3.得到tag，將 1.的內容放入 2.
        liS.innerHTML = input_TXT;
        // let liSclass = "delete-btn" + liNo;
        // liS.setAttribute("class", delete-btn);
        // liNo += 1;


        //4.將有文字的段落新增顯示 在預計存放to-do list 的位置
        //但是!! 要擺在第一位，而非添加在後頭。
        let firstList = document.querySelectorAll("li")[0];
        // console.log("firstList:", firstList); //<li>"a"</li>
        // console.log("liS:", liS);//<li>"b"</li>

        doList.insertBefore(liS, firstList);
        //同時增加按鈕。
        createButton(liS); // <li> tags


        //div版 (VS li版)
        // let divS = document.createElement("div");
        // divS.innerHTML = input_TXT;
        // !!document.querySelectorAll("div")[3];必須跟著看前面有多少的div變化[中]的數字。##
        // 結果第一個firstDiv ==undefined。
        //報錯的結果:
        //Uncaught DOMException: Failed to execute 'insertBefore' on 'Node': 
        // The node before which the new node is to be inserted is not a child of this node.

        //因為這個在增加div就需要更改[]，加上主題是list，於是利用<ul>。
        // let firstDiv = document.querySelectorAll("div")[3];
        // console.log("firstDiv:", firstDiv);
        // console.log("divS:", divS);
        // doList.insertBefore(divS, firstDiv);


        //5.會持續新增在項目的後方，應該如何呢?
        // doList.appendChild('liS')
        // 1.<li>並不會預定增加多少。==>但只需取得<li>的[0]。所以不必擔心。
        // 2.要在裡面同時建立<li>。
        // 4.就可以加入。

    };


    function createButton(liS) { // <li> tags 
        //創造buttons
        let delS = document.createElement("button");
        delS.innerHTML = "DONE";

        //btn需要id，若發生點事件，可以擷取。
        let delSId = "delete-btn" + delNo;
        delS.setAttribute("id", delSId); //#需要用 className而非class。// 等同delS.className = "delete-btn"; 
        //設定這個，ID才會隨著li增加而不同。
        ////這裡加上li 的class，讓他的class會等於 delete BTN的ID，這樣的用意是，
        // 當點擊delete BTN 獲取他的ID時，可以拿他的ID 去得到 LI 的標籤位置，進而刪除。 
        liS.setAttribute("class", delSId);

        // 儲存生成btn的ID
        btnArray.push(delSId);
        console.log("btnArray :", btnArray);
        // 這是要抓取 和button id相同的 Li class
        let itemInDel = document.getElementsByClassName(delSId)
            //寫[0]
        delArray.push(itemInDel[0]);
        //找到要加入 del btn的位置。
        let liIndex = document.querySelectorAll("li")[0];
        liIndex.appendChild(delS);

        let mybtn = document.getElementById(btnArray[delNo]);
        mybtn.addEventListener("click", function(event) { del(delArray, event.target.id); });

        // 加上 addEventListener
        // delArray.forEach(element => element.addEventListener("click", function(event) { console.log(event.target.id) }));
        //@### 當我用delArray去寫，不是我點下按鈕，而是只要點 <li>的範圍，就會觸動事件。

        /*
        delArray[delNo].addEventListener("click", function(event) {
            console.log("my event ", event);
            // del(delArray, delNo);
        });
        */

        delNo += 1;
    }

    function del(delArray, clickId) {
        let doList = document.getElementById("dolist");
        let btnClass = document.getElementsByClassName(clickId)[0];
        doList.removeChild(btnClass);

    };

    // ## 有btn 同時讓他能夠聽取事件， (或許在建立btn同時也將他們的id儲存於btnArray，但目前為了方便看，先。)
    // 1. 先存取每一個存在btn的ID
    //     

    //     console.log("btnArray :", btnArray);

    //     btnArray.forEach(element => console.log(document.getElementById(element).id));

    // };

    // console.log("delNo :", delNo); //就算放在function外面，delNo也不是0
    // 但是為甚麼? pass by refernce ? 所以當你改變時，也會改變到參考的原本數值。

    // 對我而言，user 將建立多少delete button是未知的事。於是單個建立變數似乎不太合理。
    // 但我又必須透過 找到各自按鈕的標籤然後替他們給一個人加上 事件監聽。
    // const delBtn0 = document.getElementById("delete-btn0");
    // const delBtn1 = document.getElementById("delete-btn1");

    // function 刪除(){我需要甚麼?}
    // 我應該要如何連結 <li>&<button>? 
    // doList.insertBefore(aSet, firstList);

    /*
    1.偵測目前點擊的是哪一個按鈕
    **透過找尋ID的方法。(但是...ID的建立要unique。且在BTN生成時，就必須加上去。) (1500解決)
    **找到之後，需要每一個btn都寫 AddEventListener 
    2.將當前按鈕對應到當前LI
    3.刪除此li與del_btn
    */


}

/* 
  function createListener(array) {
        let btnArray = [];
        let i = 0
        while (i < delNo) {
            btnArray[i] = document.getElementById("delete-btn" + i);
            console.log("starry starry night0", btnArray);
            i++;
        };
        i = 0;
        while (i < delNo) {
            btnArray[i].addEventListener('click', function(e) { DeleteEvent(e) });

            i++;
        };
    }

    // btnArray.forEach(
    //     element => 
    // console.log("starry starry night3", btnArray);

    function DeleteEvent(e) {
        // 看能不能用來儲存所有的 擷取Btn按鈕//但這樣是不是不太好，讓ARRAY儲存那麼大的ELEMENT?
        // 當按鈕被點擊....
        let getLiToDel = document.getElementsByClassName(e.target.id)[0];
        console.log("delete e.target.id:", e.target.id);
        console.log("delete getLiToDel:", getLiToDel);
        let doList = document.getElementById("dolist");
        doList.removeChild(getLiToDel);

    };

*/
