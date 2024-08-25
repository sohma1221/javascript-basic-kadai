const img = document.querySelectorAll('img');
const parentResult = document.getElementById('parentResult');
const childResult = document.getElementById('childResult');
const floor2 = document.getElementById('floor2');
const floor6 = document.getElementById('floor6');
const allTrump = [];
const parentHand = [];
const childHand = [];
const handsNumBox = [];
const spadeTotal = 13;
for(let i = 1; i <= spadeTotal; i++){
  allTrump.push({suit:'spade',num:i,url:'images/s' + [i] + '.png'})
}
for(let i = 1; i <= spadeTotal; i++){
  allTrump.push({suit:'dia',num:i,url:'images/d' + [i] + '.png'})
}
for(let i = 1; i <= spadeTotal; i++){
  allTrump.push({suit:'heart',num:i,url:'images/h' + [i] + '.png'})
}
for(let i = 1; i <= spadeTotal; i++){
  allTrump.push({suit:'clover',num:i,url:'images/c' + [i] + '.png'})
}
const shuffle = (array) => {
  const cloneArray = [...array];
  const result = cloneArray.reduce((_,cur,idx) => {
    let rand = Math.floor(Math.random() * (idx + 1));
    cloneArray[idx] = cloneArray[rand]
    cloneArray[rand] = cur;
    return cloneArray
  })
  return result;
}
function handsCheck(arr){
  let hands;
  let isFlush = true;
  let isStraight = true;
  let isRoyalStraight = false;
  const rank = [0,1,2,3,4,5,6,7,8,9]
  arr.sort(function(a,b){
    if(a.num<b.num) return -1;
    if(a.num > b.num) return 1;
    return 0;
  });
  for(let i = 0; i<arr.length-1; i++){
    flg1 = (arr[i].suit == arr[i+1].suit);
    flg2 = ((arr[i+1].num - arr[i].num) ==1);
    if(!flg1) isFlush = false;
    if(!flg2) isStraight = false;
    }
    isRoyalStraight = (arr[0].num==1&&arr[1].num==10&&arr[2].num==11&&arr[3].num==12&&arr[4].num==13);
  if(isFlush) {  
    hands =rank[5];
    if(isStraight) hands =rank[8];
    if(isRoyalStraight) hands =rank[9];
    return hands;
  }else{
    if(isStraight||isRoyalStraight) {
      return hands = rank[4];
    }else{
        let cnt = 0;
        let maxnum = 3;
        for(let max = maxnum; max>=0; max--){
          let i = maxnum - max; 
          for(let j=1; j<=max+1; j++){
            if(arr[i].num==arr[i+j].num) cnt++;
          }
        }
        switch(cnt){
          case 6:
            return hands= rank[7];
          case 4:
            return hands= rank[6];
          case 3:
            return hands= rank[3];
          case 2:
            return hands= rank[2];
          case 1:
            return hands= rank[1];
          default:
            return hands = rank[0];
        }
    }
  }
  }
function gamaeStart(){
  const shuffleAllTrump = shuffle(allTrump);
  const parentImg = document.querySelectorAll('#floor3 img');
  const childImg = document.querySelectorAll('#floor5 img');
  const parentHandLength = 5;
  for(let i = 0; i < parentHandLength * 2; i++){
    if(i < parentHandLength){
      parentHand.push(shuffleAllTrump[i]);
    }else{
      childHand.push(shuffleAllTrump[i]);
    }
  }
  for(let i = 0; i < parentHandLength; i++){
    parentImg[i].src = parentHand[i].url;
  }
  for(let i = 0; i < parentHandLength; i++){
    childImg[i].src = childHand[i].url;
  }
  const parentHandNum =[];
  const childHandNum = [];
  for(let i = 0; i < parentHand.length;i++){
    parentHandNum.push(parentHand[i].num)
  }
  for(let i = 0; i < parentHand.length;i++){
    childHandNum.push(childHand[i].num)
  }
  const parentNumMax = Math.max.apply(null,parentHandNum)
  const childNumMax = Math.max.apply(null,childHandNum)
  floor2.innerText = handsCheck(parentHand);
  floor6.innerText = handsCheck(childHand);
  const text1 = Number(document.getElementById('floor2').textContent);
  const text2 = Number(document.getElementById('floor6').textContent);
  if(text1 == text2 && text1 != 0){
    parentResult.innerText ='引分';
    childResult.innerText ='引分';
  }else if(text1 > text2){
    parentResult.innerText = '勝ち';
    childResult.innerText = '負け';
  }else if(text1 < text2){
    parentResult.innerText = '負け';
    childResult.innerText = '勝ち';
  }else if(parentNumMax > childNumMax){
    parentResult.innerText = '勝ち';
    childResult.innerText = '負け';
  }else if(parentNumMax < childNumMax){
    parentResult.innerText = '負け';
    childResult.innerText = '勝ち';
  }else{
    parentResult.innerText ='引分';
    childResult.innerText ='引分';
  }
  function text (str){
  switch(Number(str.innerText)){
    case 0 :
      str.innerText = '役なし';
      break;
    case 1 :
      str.innerText = 'ワンペア';
      break
    case 2 :
      str.innerText = 'ツーペア';
      break;
    case 3 :
      str.innerText = 'スリーオブアカインド';
      break;
    case 4 :
      str.innerText = 'ストレート';
      break;
    case 5 :
      str.innerText = 'フラッシュ';
      break;
    case 6 :
      str.innerText = 'フルハウス'
      break;
    case 7 :
      str.innerText = 'フォーカード';
      break;
    case 8 :
      str.innerText = 'ストレートフラッシュ';
      break;
    case 9:
      str.innerText = 'ロイヤルフラッシュ';
    }
  }
  text(floor2);
  text(floor6);
  parentHand.length = 0;
  childHand.length = 0;
}