var httd = new Httd();
let count = -1;
let meanSpeed=[];
var btnOpen = document.querySelector(".js-open");
var btnClose = document.querySelector(".js-close");
var btnAnother= document.querySelector(".js-another");
var modal = document.querySelector(".js-modal");
var modalChildren = modal.children;
var outText = document.querySelector(".outText");
var yourTier = document.querySelector(".yourTier");
var yourTierDescription = document.querySelector(".yourTierDescription");
const modalImage = document.querySelector(".modal-image");
var meanSpeedValue = document.querySelector(".meanSpeedValue");




function Httd() {
    this.arrStrs = new Array(
        // "홍창의는 레전드다",
        // "홍창의랑 롤하고 싶다",
        // "홍창의는 전설이다",
        // "홍창의 엉덩이 찰싹",
        // "홍창의 방 청소 해주면 백만원",
        // "홍창의가 최고야",
        // "홍창의 훵창의 홍촹의 훵췡이",
        // "홍창의가 홍창의 했다",
        // "창의야 사랑해",
        // "홍창의가 홍창의방에서 롤을 한다",

        "다 된 농사에 낫 들고 덤빈다.",
        "다 된 죽에 코 빠졌다.",
        "가난도 비단 가난.",
        "가래장부는 본고을 좌수도 몰라본다.",
        "가랑잎이 솔잎더러 바스락거린다고 한다.",
        "고기 새끼 하나 보고 가마솥 부신다.",
        "그 아버지에 그 아들.",
        "급하면 바늘허리에 실 매어 쓸까.",
        "나 많은 말이 콩 마다할까.",
        "나는 새에게 여기 앉아라 저기 앉아라 할 수 없다.",
        "누구네 제사날 기다리다가 사흘 굶은 거지 굶어 죽었다.",
        "눈을 떠도 코 베어 간다.",
        "눈이 아무리 밝아도 제 코는 안 보인다.",
        "달기는 엿집 할머니 손가락이라.",
        "달아나는 노루 보고 얻은 토끼를 놓았다.",
        "두 손뼉이 맞아야 소리가 난다.",
        "뒷집 짓고 앞집 뜯어 내란다.",
        "아가리 마구 난 창구멍인가.",
        "아는 걸 보니 소강절의 똥구멍에 움막 짓고 살았겠다.",
        "아직 이도 나기 전에 갈비를 뜯는다.",
        "자기 늙은 것은 몰라도 남 자라는 것은 안다.",
        "자식을 낳기보다 부모 되기가 더 어렵다.",
        "자식을 보기엔 아비만 한 눈이 없고 제자를 보기엔 스승만 한 눈이 없다.",
        "잔치는 잘 먹은 놈 잘 차렸다 하고 못 먹은 놈 못 차렸다 한다.",
        "답은 자퇴다.",
        "내가 만약 개발자였다면 좀 더 예쁘게 만들었을 것 같다.",
        "좋은 아이디어 있으면 알려주세요.",
        "꼭 속담만 제시되는 것은 아니랍니다.",
        "꽃다지 육쪽마늘 쭉쭉 커요.",
        "하얀 눈꽃처럼 여린 나의 사랑.",
        "내가 과연 챌린저를 달 수 있을까."
    );

    this.exString = "";
    this.inputString = "";
    this.speedCur = 0;
    this.speedMax = 0;

    this.accuracyTotal = 0; 
    this.accuracyCur = 0; 

    this.lengthTotal = 0; 
    this.lengthTotalTrue = 0; 
    this.lengthCurTrue = 0;

    this.timerInt;
    this.timerStopped = true;
    this.timerSec = 0;
    

    this.setHttd = function () {

     
        var idx = Math.floor(Math.random(1) * this.arrStrs.length);
        this.exString = this.arrStrs[idx];

        
        var objInputString = this.obj("httdInputString");
        var objExString = this.obj("exString");

        
        this.timerStopped = true;
        this.timerInt = window.clearInterval(httd.timerInt);
        this.timerSec = 0;

       
        objExString.innerHTML = this.exString;
        objInputString.value = "";
        objInputString.focus();
        meanSpeed.push(this.speedCur);
        count++;
        console.log(meanSpeed);

        if (count === 3) {
            let summ= 0;
            for(let n of meanSpeed) {
                summ+=n
            };
            showingTier(summ/3);
            $(modalImage).ready(function(){
                showModal();
                toggleClasses();
                showModalChildren();
                showMeanSpeed(Math.floor(summ/3));
            })

        };
        
        


    }
    this.keyUp = function () {
        var objInputString = this.obj("httdInputString");

        this.chkMiss();

       
        if (this.exString.length <= objInputString.value.length) {
         
            this.lengthTotal += this.exString.length;
            this.lengthTotalTrue += this.lengthCurTrue;

            this.accuracyCur = Math.floor(this.lengthCurTrue / this.exString.length * 100);
            this.accuracyTotal = Math.floor(this.lengthTotalTrue / this.lengthTotal * 100);
            this.obj("prnAccuracyCur").innerHTML = this.accuracyCur;
            this.obj("prnAccuracyTotal").innerHTML = this.accuracyTotal;
            this.obj("barAccuracyCur").style.width = this.accuracyCur + "%";
            this.obj("barAccuracyTotal").style.width = this.accuracyTotal + "%";

        
            this.speedCur = Math.floor(this.lengthCurTrue / this.timerSec * 6000);
            if (this.speedMax < this.speedCur) this.speedMax = this.speedCur;
            this.obj("prnSpeedCur").innerHTML = this.speedCur;
            this.obj("prnSpeedMax").innerHTML = this.speedMax;
            this.obj("barSpeedCur").style.width = this.speedCur / 10 + "%";
            this.obj("barSpeedMax").style.width = this.speedMax / 10 + "%";

            this.setHttd();
            return false;
        }
        return true;
    }
    this.obj = function (id) {
        return document.getElementById(id);
    }
    this.chkMiss = function () {
        var result = "";
        this.lengthCurTrue = 0;

        var objInputString = this.obj("httdInputString");
        this.inputString = objInputString.value;

        for (var i = 0; i < this.exString.length; i++) {
            if (this.exString.substring(i, i + 1) != this.inputString.substring(i, i + 1) && i < this.inputString.length)
                result += "<font color=red>" + this.exString.substring(i, i + 1) + "</font>";
            else {
                result += this.exString.substring(i, i + 1);
                this.lengthCurTrue++;
            }
        }
        var objExString = this.obj("exString");
        objExString.innerHTML = result;
    }
    this.chkTime = function () {
        if (this.timerStopped) {
            this.timerStopped = false;
            this.timerSec = 0;
            this.timerInt = window.setInterval("httd.addSec()", 10);
        }
    }
    this.addSec = function () {
        this.timerSec++;
    }
    
}

function hideModal() {
    dynamics.animate(
        modal, {
            opacity: 0,
            translateY: 100
        }, {
            type: dynamics.spring,
            frequency: 50,
            friction: 600,
            duration: 1500
        }
    );
}

function showModal() {
    // Define initial properties
    dynamics.css(modal, {
        opacity: 0,
        scale: 0.5
    });

    // Animate to final properties
    dynamics.animate(
        modal, {
            opacity: 1,
            scale: 1
        }, {
            type: dynamics.spring,
            frequency: 300,
            friction: 400,
            duration: 1000
        }
    );
}


function showBtn() {
    dynamics.css(btnOpen, {
        opacity: 0
    });

    dynamics.animate(
        btnOpen, {
            opacity: 1
        }, {
            type: dynamics.spring,
            frequency: 300,
            friction: 400,
            duration: 800
        }
    );
}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `${imgNumber}`;
    image.style= `width:104px; height:118.825px`;
    image.id = `abc`;
    modalImage.prepend(image);

}
function showMeanSpeed(number) {
    meanSpeedValue.innerText = `${number}타`;
}
// 롤티어########################################################################################
// function showingTier(number) {
//     this.tierName = new Array(
//         "브론즈","실버","골드","플레티넘","다이아","마스터","그랜드마스터","챌린저"
//     );
//     this.tierDescription = new Array(
//         "상위 90%","상위 70%","상위 36%","상위 10.5%","상위 3%","상위 0.05%","상위 0.035%","상위 0.015%"
//     );
//     console.log(number);
//     if(number > 280) {
//         yourTier.innerText=`${tierName[7]}`
//         yourTierDescription.innerText=`${tierDescription[7]}` 
//         meanSpeedValue.innerText= `${meanSpeed}`
//         paintImage(7)   
//     } else if(number>260) {
//         yourTier.innerText=`${tierName[6]}`
//         yourTierDescription.innerText=`${tierDescription[6]}`
//         paintImage(6)   
//     } else if(number>250) {
//         yourTier.innerText=`${tierName[5]}`
//         yourTierDescription.innerText=`${tierDescription[5]}`
//         paintImage(5)   
//     } else if(number>230) {
//         yourTier.innerText=`${tierName[4]}`
//         yourTierDescription.innerText=`${tierDescription[4]}`
//         paintImage(4)   
//     } else if(number>200) {
//         yourTier.innerText=`${tierName[3]}`
//         yourTierDescription.innerText=`${tierDescription[3]}`
//         paintImage(3)   
//     } else if(number>190) {
//         yourTier.innerText=`${tierName[2]}`
//         yourTierDescription.innerText=`${tierDescription[2]}`
//         paintImage(2)   
//     } else if(number>150) {
//         yourTier.innerText=`${tierName[1]}`
//         yourTierDescription.innerText=`${tierDescription[1]}`
//         paintImage(1)   
//     } else {
//         yourTier.innerText=`${tierName[0]}`
//         yourTierDescription.innerText=`${tierDescription[0]}`
//         paintImage(0)   
//     };


// }
function showingTier(number) {
    this.tierName = new Array(
        "똥","노예","평민","양반","왕"
    );
    this.tierDescription = new Array(
        "똥이었군요!","당신의 실력으로 보아 당신은 전생에 노예였음에 틀림없습니다..","당신은 전생에 평민이었군요! 천하지도, 귀하지도 않은 평범한 사람이었군요!","이정도 실력이면 당신은 양반은 되었을 것입니다!","당신의 실력은 전생에 왕이었음을 보여줍니다..!"
    );
    console.log(number);
    if(number > 280) {
        yourTier.innerText=`${tierName[4]}`
        yourTierDescription.innerText=`${tierDescription[4]}` 
        meanSpeedValue.innerText= `${meanSpeed}`
        paintImage("https://raw.githubusercontent.com/smp2103/howfast/master/%EC%99%95.PNG?token=AOM6PQDDCCDTXYKR7NF2YUK6Y5ZN2")   
    } else if(number>180) {
        yourTier.innerText=`${tierName[3]}`
        yourTierDescription.innerText=`${tierDescription[3]}`
        paintImage("https://raw.githubusercontent.com/smp2103/howfast/master/%EC%96%91%EB%B0%98.PNG?token=AOM6PQF3INXFC24S3YIXQUK6Y5ZO6")   
    } else if(number>130) {
        yourTier.innerText=`${tierName[2]}`
        yourTierDescription.innerText=`${tierDescription[2]}`
        paintImage("https://raw.githubusercontent.com/smp2103/howfast/master/%ED%8F%89%EB%AF%BC.PNG?token=AOM6PQHLRDZVRZ2YHMABDCK6Y5ZQE")   
    } else if (number>100) {
        yourTier.innerText=`${tierName[1]}`
        yourTierDescription.innerText=`${tierDescription[1]}`
        paintImage("https://raw.githubusercontent.com/smp2103/howfast/master/%EB%85%B8%EC%98%88.PNG?token=AOM6PQDAAQW4O74FCAPXYHK6Y5ZRE")   
    } else {
        yourTier.innerText=`${tierName[0]}`
        yourTierDescription.innerText=`${tierDescription[0]}`
        paintImage("https://raw.githubusercontent.com/smp2103/howfast/master/%EB%98%A5.PNG?token=AOM6PQB65ZCA4RZ2NSKNOTS6Y52XE")   

}




function showModalChildren() {
    // Animate each child individually
    for (var i = 0; i < modalChildren.length; i++) {
        var item = modalChildren[i];

        // Define initial properties
        dynamics.css(item, {
            opacity: 0,
            translateY: 30
        });

        // Animate to final properties
        dynamics.animate(
            item, {
                opacity: 1,
                translateY: 0
            }, {
                type: dynamics.spring,
                frequency: 300,
                friction: 400,
                duration: 1000,
                delay: 100 + i * 40
            }
        );
    }
}

function toggleClass(element, className) {
    const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
    if (check.test(element.className)) {
        element.className = element.className.replace(check, " ").trim();
    } else {
        element.className += " " + className;
    }


}

function toggleClasses() {

    toggleClass(btnOpen, "is-active");
    toggleClass(modal, "is-active");
}



// Open nav when clicking sandwich button
btnClose.addEventListener("click", function () {
    hideModal();
    dynamics.setTimeout(toggleClasses, 500);
    dynamics.setTimeout(showBtn, 500);
    meanSpeed=[];
    count=0;
    const deleteImage = modalImage.firstChild;
    modalImage.removeChild(deleteImage);
    
    
});
