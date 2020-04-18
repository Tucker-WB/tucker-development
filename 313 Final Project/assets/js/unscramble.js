// Unscramble takes a combinations of letters(i.e. a word)
// and 'binary' searches the dictionary for words that match.
// Notice that if the letters match between tempWord and word
// the letter gets deleted in order to avoid words with two
// or more of the same letter 
// Note includes() == contains()

// Example unscramble('aaple') would return apple because
// aaple.length == apple.length
// aaple.includes('a','p','p','l','e') returns TRUE 
// BUT if we replace matched letters with 0 
// 0aple.includes('a','p','p','l','e') returns FALSE

//=============================== CODE ============================================//

// var dictionary =["apple","app","aaple", "lapep", "cat",
//                  "friend","etc","tab", "paple", "papel"];

// function unscramble(word){
//     let head = 0;
//     let tail = dictionary.length - 1;    
//     var words = new Array();
//     while(head <= tail){
//         let tempWord1 = dictionary[head];
//         let tempWord2 = dictionary[tail];
//         if(tempWord1.length == word.length){
//             for(let i = 0; i<word.length; i++){//check dictionary[head]
//                 if(tempWord1.includes(word[i])){
//                     tempWord1 = tempWord1.replace(word[i], "0");
//                     if(i == word.length-1){
//                         words.push(dictionary[head]);
//                         break;
//                     }
//                 }
//                 else{break;}           
//             } 
//         }
//         if(tempWord2.length == word.length){
//             for(let i = 0; i<word.length; i++){//check dictionary[tail]
//                 if(tempWord2.includes(word[i])){
//                     tempWord2 = tempWord2.replace(word[i], "0");
//                     if(i == word.length-1){
//                         words.push(dictionary[tail]);
//                         break;
//                     }
//                 }
//                 else{break;}         
//             }  
//         } 
//         head++;tail--;       
//     }
//     return words;
// }

// let search = unscramble('ppale');

// for(let i = 0; i < search.length; i++){
//     console.log(search[i]);
// }