<script setup>
const store = useMainStore()
const { currentQuestionNumber, currentQuestion, currentPoints, totalGameTime, isSuperGame, gameStarted } = storeToRefs(store)

const router = useRouter()

const goToStart = () => {
  currentQuestionNumber.value = 1
  totalGameTime.value = 0
  currentQuestion.value = null
  router.push('/')
  isSuperGame.value = false
  gameStarted.value = false
  currentPoints.value = 0
}

const titlePhrase = ['Время вышло, кончилось, истекло, пролетело', 'Время тю-тю!', 'Ой, ой... Время вышло!', '«Финита ля комедия!»', 'Время на вопрос кончилось!']
const phraseToUse = titlePhrase[Math.floor(Math.random() * titlePhrase.length)]
</script>
<template>
  <div class="final h-screen">
    <a href="https://kantiana.ru" target="_blank">
      <img src="/img/bfu-white.svg" class="final_bfuLogo" />
    </a>
  </div>
  <img :src="`/img/characters/pushkin 5.png`" class="final_timeout_pusskin-full" />
  <div class="final_timeout">
    <img :src="`/img/characters/pushkin_hand.png`" class="final_timeout_pusskin-hand" />
    <div class="final_timeout_window q-shadow-md__light-green window">
      <p class="final_timeout_window_title text-black">{{ phraseToUse }}</p>
      <p class="final_timeout_window_description text-black">Не расстраивайся, ты можешь пройти квиз заново и проверить свои знания</p>
      <button @click="goToStart" class="final_timeout_window_button bg-#71CB8A q-shadow-sm__lightest-green">
        <p class="final_timeout_window_button-title text-white">Начать заново</p>
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.final {
  background-color: #1e2947;
  background-image: url('/img//time-bg.svg');
  background-size: cover;
  &_bfuLogo {
    position: fixed;
    top: 36px;
    right: 3%;
    color: white;
  }
  &_timeout {
    position: absolute;
    // bottom: 0;

    transform: translateX(-50%);
    top: 54%;
    left: 50%;
    width: 600px;
    max-width: 600px;
    &_pusskin {
      &-full {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-56%);
        width: 38.6vw;
        height: 88vh;
        z-index: 0;
      }
      &-hand {
        position: absolute;
        // display: flex;
        left: 50%;
        bottom: 0;
        // translate: 64.5% -84.5%;
        // transform: translate(6.4dvw, 18.8dvh);
        transform: translate(8.68dvw, 4.93dvh);
        width: 8vw;
        height: 42vh;
        z-index: 91919;
      }
    }
    &_window {
      display: flex;
      position: absolute;
      flex-direction: column;
      padding: 42px;
      padding-bottom: 30px;
      background: white;
      z-index: 2;
      top: 0;
      // max-height: 345px;
      height: fit-content;
      width: 33vw;
      left: 50%;
      transform: translateX(-50%);
      &_title {
        font-weight: 500;
        font-size: 36px;
        line-height: 130%;
      }
      &_description {
        font-weight: 400;
        font-size: 26px;
        line-height: 130%;
        margin-top: 18px;
      }
      &_button {
        //   padding: 20px;
        margin-top: 32px;
        width: 360px;
        height: 68px;
        padding: 16px 0;
        text-align: center;
        &-title {
          font-size: 20px;
          //  padding: 5px;
          text-align: center;
          margin: 0;
        }
      }
    }
  }
}
// @media (max-height: 1060px) and (max-width: 1750px) {
//   .final_timeout_window {
//     width: 40vw;
//   }
//   .final_timeout_window_title {
//     font-size: 24px;
//   }
//   .final_timeout_window_description {
//     font-size: 20px;
//     margin-top: 4%;
//   }
//   .final_timeout_window_button {
//     padding: 25px;
//     margin-top: 30px;
//   }
//   .final_timeout_window_button_title {
//     font-size: 23px;
//     padding: 5px;
//     margin: 0;
//   }
//   // .final_timeout_pusskin-full{
//   // 	width: 425vw;
//   // }
//   .final_timeout_pusskin-hand {
//     // width: 9vw;
//     // translate: 63% -84.5%;
//   }
// }
@media (max-width: 1700px) {
  .final_timeout_window_title {
    font-size: 30px;
  }
  .final_timeout_window_description {
    font-size: 20px;
    margin-top: 4%;
  }
  .final_timeout_window_button {
    padding: 18px;
    margin-top: 20px;
  }
  .final_timeout_window_button_title {
    font-size: 20px;
    padding: 3px;
    margin: 0;
  }
  .final {
    &_timeout {
      &_pusskin {
        &-full {
          position: absolute;
          bottom: 0;
          left: 50%;
          // transform: translateX(-62%);
          width: 38.6vw;
          height: 88vh;
          z-index: 0;
        }
        &-hand {
          position: absolute;
          // display: flex;
          left: 50%;
          bottom: 0;
          // translate: 64.5% -84.5%;
          // transform: translate(6.4dvw, 18.8dvh);
          transform: translate(8.7dvw, 4.93dvh);
          width: 8vw;
          height: 42vh;
          z-index: 91919;
        }
      }
    }
  }
}
@media (max-width: 1450px) {
  .final_timeout_window {
    width: 41vw !important;
    padding: 7%;
  }
  .final_timeout_window_title {
    font-size: 25px;
  }
  .final_timeout_window_description {
    font-size: 20px;
    margin-top: 4%;
  }
  .final_timeout_window_button {
    padding: 22px;
    margin-top: 22px;
  }
  .final_timeout_window_button_title {
    font-size: 20px;
    padding: 3px;
    margin: 0;
  }
  .final {
    &_timeout {
      &_pusskin {
        &-full {
          position: absolute;
          bottom: 0;
          left: 50%;
          // transform: translateX(-68%);
          width: 38.6vw;
          height: 88vh;
          z-index: 0;
        }
        &-hand {
          position: absolute;
          // display: flex;
          left: 50%;
          bottom: 0;
          // translate: 64.5% -84.5%;
          // transform: translate(6.4dvw, 18.8dvh);
          // transform: translate(4.1dvw, 4.93dvh);
          width: 8vw;
          height: 42vh;
          z-index: 91919;
        }
      }
    }
  }
}

// @media (max-height: 778px) and (max-width: 1376px) {
//   .final_timeout_window {
//     width: 41vw;
//     padding: 7%;
//   }
//   .final_timeout_window_title {
//     font-size: 21px;
//   }
//   .final_timeout_window_description {
//     font-size: 17px;
//     margin-top: 4%;
//   }
//   .final_timeout_window_button {
//     padding: 11px;
//     margin-top: 20px;
//   }
//   .final_timeout_window_button_title {
//     font-size: 23px;
//     padding: 5px;
//     margin: 0;
//   }
// }
@media (max-width: 1280px) {
  .final_timeout_window {
    width: 41vw !important;
    padding: 7%;
  }
  .final_timeout_window_title {
    font-size: 22px;
  }
  .final_timeout_window_description {
    font-size: 18px;
    margin-top: 4%;
  }
  .final_timeout_window_button {
    padding: 1px !important;
    margin-top: 20px;
    width: 250px;
    height: 50px;
  }
  .final_timeout_window_button-title {
    font-size: 18px;
    padding: 5px;
    margin: 0;
  }
  .final {
    &_timeout {
      &_pusskin {
        &-full {
          position: absolute;
          bottom: 0;
          left: 46%;
          // transform: translateX(-68%);
          width: 47vw;
          height: 88vh;
          z-index: 0;
        }
        &-hand {
          position: absolute;
          // display: flex;
          left: 50%;
          bottom: 0;
          // translate: 64.5% -84.5%;
          // transform: translate(6.4dvw, 18.8dvh);
          transform: translate(6.68dvw, 4.93dvh);
          width: 10.5vw;
          height: 42vh;
          z-index: 91919;
        }
      }
    }
  }
}
// @media (max-height: 810px) and (max-width: 1290px) {
//   .final_timeout_window {
//     width: 41vw;
//     padding: 7%;
//   }
//   .final_timeout_window_title {
//     font-size: 24px;
//   }
//   .final_timeout_window_description {
//     font-size: 20px;
//     margin-top: 4%;
//   }
//   .final_timeout_window_button {
//     padding: 11px;
//     margin-top: 15px;
//   }
//   .final_timeout_window_button_title {
//     font-size: 23px;
//     padding: 3px;
//     margin: 0;
//   }
// }
// @media (max-height: 730px) and (max-width: 1290px) {
//   .final_timeout_window {
//     width: 41vw;
//     padding: 7%;
//   }
//   .final_timeout_window_title {
//     font-size: 22px;
//   }
//   .final_timeout_window_description {
//     font-size: 18px;
//     margin-top: 3%;
//   }
//   .final_timeout_window_button {
//     padding: 11px;
//     margin-top: 15px;
//   }
//   .final_timeout_window_button_title {
//     font-size: 23px;
//     padding: 3px;
//     margin: 0;
//   }
// }
// @media (max-height: 610px) and (max-width: 1290px) {
//   .final_timeout_window {
//     width: 41vw;
//     padding: 7%;
//   }
//   .final_timeout_window_title {
//     font-size: 20px;
//   }
//   .final_timeout_window_description {
//     font-size: 17px;
//     margin-top: 2%;
//   }
//   .final_timeout_window_button {
//     padding: 0;
//     margin-top: 2%;
//   }
//   .final_timeout_window_button_title {
//     font-size: 23px;
//     padding: 0px;
//     margin: 0;
//   }
// }
// @media (max-height: 874px) and (max-width: 1162px) {
//   .final_timeout_window {
//     width: 41vw;
//     padding: 7%;
//   }
//   .final_timeout_window_title {
//     font-size: 26px;
//   }
//   .final_timeout_window_description {
//     font-size: 20px;
//     margin-top: 3%;
//   }
//   .final_timeout_window_button {
//     padding: 11px;
//     margin-top: 15px;
//   }
//   .final_timeout_window_button_title {
//     font-size: 23px;
//     padding: 3px;
//     margin: 0;
//   }
// }
// @media (max-height: 874px) and (max-width: 1162px) {
//   .final_timeout_window {
//     width: 45vw;
//     padding: 7%;
//   }
//   .final_timeout_window_title {
//     font-size: 23px;
//   }
//   .final_timeout_window_description {
//     font-size: 18px;
//     margin-top: 3%;
//   }
//   .final_timeout_window_button {
//     padding: 11px;
//     margin-top: 15px;
//   }
//   .final_timeout_window_button_title {
//     font-size: 23px;
//     padding: 3px;
//     margin: 0;
//   }
//   .final_timeout_pusskin-full {
//     width: 65vw;
//   }
//   .final_timeout_pusskin-hand {
//     // width: 10vw;
//     // translate: 76% -84.5%;
//   }
// }
// @media (max-height: 1190px) and (max-width: 830px) {
//   .final_timeout_window {
//     width: 65vw;
//     padding: 7%;
//   }
//   .final_timeout_window_title {
//     font-size: 27px;
//   }
//   .final_timeout_window_description {
//     font-size: 22px;
//     margin-top: 3%;
//   }
//   .final_timeout_window_button {
//     padding: 10px;
//     margin-top: 18px;
//   }
//   .final_timeout_window_button_title {
//     font-size: 18px;
//     padding: 3px;
//     margin: 0;
//   }
//   .final_timeout_pusskin-full {
//     width: 65vw;
//   }
//   .final_timeout_pusskin-hand {
//     // width: 14vw;
//     // translate: 77% -84.5%;
//   }
// }
@media (max-width: 1110px) {
  .final_timeout_window {
    width: 45vw;
    padding: 7%;
  }
  .final_timeout_window_title {
    font-size: 19px;
  }
  .final_timeout_window_description {
    font-size: 15px;
    margin-top: 3%;
  }
  .final_timeout_window_button {
    padding: 0px;
    margin-top: 10px;
  }
  .final_timeout_window_button_title {
    font-size: 18px;
    padding: 3px;
    margin: 0;
  }
  .final {
    &_timeout {
      &_pusskin {
        &-full {
          position: absolute;
          bottom: 0;
          left: 46%;
          // transform: translateX(-68%);
          width: 50vw;
          height: 88vh;
          z-index: 0;
        }
        &-hand {
          position: absolute;
          // display: flex;
          left: 50%;
          bottom: 0;
          // translate: 64.5% -84.5%;
          // transform: translate(6.4dvw, 18.8dvh);
          transform: translate(7.35dvw, 4.93dvh);
          width: 10.5vw;
          height: 42vh;
          z-index: 91919;
        }
      }
    }
  }
}
// 	@media  (max-height: 1040px){
// 		.final_timeout_window_title{
// 			font-size: 25px;
// 		}
// 		.final_timeout_window_description{
// 			font-size: 19px;
// 			margin-top: 4%;
// 		}.final_timeout_window_button{
// 			padding: 13px;
// 			margin-top: 22px;
// 		}.final_timeout_window_button_title{
// 			font-size: 23px;
// 			padding: 5px;
// 			margin: 0;
// 		}
// 	}
// 	@media  (max-height: 870px){
// 		.final_timeout_window {
// 			padding: 6%;
// 		}
// 		.final_timeout_window_title{
// 			font-size: 24px;
// 		}
// 		.final_timeout_window_description{
// 			font-size: 17px;
// 			margin-top: 4%;
// 		}.final_timeout_window_button{
// 			padding: 17px;
// 			margin-top: 25px;
// 		}
// 	}

// 	@media  (max-width: 1610px) {

// 	}.final_timeout_window_button{
// 			padding: 15px;
// 			margin-top: 22px;
// 		}
// 	@media  (max-width: 1450px) {
// 		.final_timeout_window {
// 			width: 41vw;
// 			padding: 7%;
// 		}
// 		.final_timeout_window_title{
// 			font-size: 27px;
// 		}
// 		.final_timeout_window_description{
// 			font-size: 20px;
// 			margin-top: 4%;
// 		}.final_timeout_window_button{
// 			padding: 17px;
// 			margin-top: 25px;
// 		}
// 	}
// 	@media  (max-width: 1230px) {
// 		.final_timeout_window {
// 			width: 41vw;
// 			padding: 7%;
// 		}
// 		.final_timeout_window_title{
// 			font-size: 27px;
// 		}
// 		.final_timeout_window_description{
// 			font-size: 20px;
// 			margin-top: 3%;
// 		}.final_timeout_window_button{
// 			padding: 10px;
// 			margin-top: 15px;
// 		}
// 	}
@media (max-width: 940px) {
  .final_timeout {
    width: 100dvw;
  }
  .final_timeout_window {
    width: 60vw !important;
    padding: 16px 18px !important;
  }
  .final_timeout_window_title {
    font-size: 20px !important;
  }
  .final_timeout_window_description {
    font-size: 16px !important;
    margin-top: 3%;
  }
  .final_timeout_window_button {
    padding: 0px;
    margin-top: 22px;
    max-width: 37dvw;
  }
  .final_timeout_window_button_title {
    font-size: 18px !important;
    padding: 3px;
    margin: 0;
  }
  .final {
    &_timeout {
      &_pusskin {
        &-full {
          position: absolute;
          bottom: 0;
          left: 46%;
          // transform: translateX(-68%);
          width: 90vw !important;
          height: 88vh;
          z-index: 0;
        }
        &-hand {
          position: absolute;
          // display: flex;
          left: 50%;
          bottom: 0;
          // translate: 64.5% -84.5%;
          // transform: translate(6.4dvw, 18.8dvh);
          transform: translate(16.3dvw, 4.93dvh);
          width: 19vw;
          height: 42vh;
          z-index: 91919;
        }
      }
    }
  }
}
// @media (max-width: 683px) {
//   .final_timeout_window {
//     width: 65vw;
//     padding: 5%;
//   }
//   .final_timeout_window_title {
//     font-size: 24px;
//   }
//   .final_timeout_window_description {
//     font-size: 18px;
//     margin-top: 4.5%;
//   }
//   .final_timeout_pusskin-full {
//     width: 40.7vw;
//   }
//   .final_timeout_window_button {
//     padding: 2px;
//     margin-top: 10px;
//   }
//   .final_timeout_window_button-title {
//     font-size: 16px;
//   }

//   .final_timeout_pusskin-full {
//     width: 65vw;
//   }
//   .final_timeout_pusskin-hand {
//     // width: 13vw;
//     // translate: 84.5% -84.5%;
//   }
// }
// @media (max-width: 576px) {
//   .final_timeout_window {
//     width: 65vw;
//     display: flex;
//     justify-content: space-around;
//   }
//   .final_timeout_window_title {
//     font-size: 23px;
//   }
//   .final_timeout_window_description {
//     font-size: 16px;
//   }
//   .final_timeout_pusskin-full {
//     width: 65vw;
//   }
//   .final_timeout_pusskin-hand {
//     // width: 14vw;
//     // translate: 78% -84.5%;
//   }
// }
@media (max-width: 450px) {
  .final_bfuLogo {
    transform: scale(0.75) translateX(-60%);
    top: unset;
    right: unset;
    left: 50%;
    bottom: 10px;
    z-index: 120392183;
  }
  .final_timeout {
    top: 62svh;
  }
  .final_timeout_window {
    top: 0;
    width: 76vw !important;
  }
  .final_timeout_window_title {
    font-size: 16px !important;
  }
  .final_timeout_window_description {
    font-size: 14px !important;
    margin-top: 16px;
  }
  .final_timeout_window_button {
    width: 48dvw !important;
    height: 40px !important;
  }
  .final_timeout_window_button-title {
    font-size: 14px !important;
    padding: 3px;
    margin: 0;
  }
  .final {
    &_timeout {
      &_pusskin {
        &-full {
          position: absolute;
          bottom: 0;
          left: 46%;
          transform: translateX(-60%);
          width: 100dvw !important;
          height: 70.5svh !important;
          // height: 67.5svh !important;
          z-index: 0;
        }
        &-hand {
          position: absolute;
          // display: flex;
          left: 50%;
          bottom: 0;
          // translate: 64.5% -84.5%;
          // transform: translate(6.4dvw, 18.8dvh);
          transform: translate(14.7dvw, 5.4dvh);
          width: 22.5vw;
          height: 34svh;
          z-index: 91919;
        }
      }
    }
  }
}
@media (max-width: 300px) {
  .final_bfuLogo {
    transform: scale(0.75) translateX(-60%);
    top: unset;
    right: unset;
    left: 50%;
    bottom: 10px;
    z-index: 120392183;
  }
  .final_timeout {
    top: 63svh;
  }
  .final_timeout_window {
    top: 0;
    width: 80vw !important;
  }
  .final_timeout_window_title {
    font-size: 16px !important;
  }
  .final_timeout_window_description {
    font-size: 12px !important;
    margin-top: 15px;
  }
  .final_timeout_window_button {
    width: 48dvw !important;
    height: 40px !important;
  }
  .final_timeout_window_button-title {
    font-size: 12px !important;
    padding: 3px;
    margin: 0;
  }
  .final {
    &_timeout {
      &_pusskin {
        &-full {
          position: absolute;
          bottom: 0;
          left: 46%;
          transform: translateX(-60%);
          width: 100dvw !important;
          height: 67.5svh !important;
          z-index: 0;
        }
        &-hand {
          position: absolute;
          // display: flex;
          left: 50%;
          bottom: 0;
          // translate: 64.5% -84.5%;
          // transform: translate(6.4dvw, 18.8dvh);
          transform: translate(14.7dvw, 5.4dvh);
          width: 22.5vw;
          height: 32svh;
          z-index: 91919;
        }
      }
    }
  }
}
// @media (max-height: 670px) and (max-width: 380px) {
//   .final_bfuLogo {
//     top: 44px;
//     width: 150px;
//   }
//   .final_timeout_window {
//     width: 60vw;
//   }
//   .final_timeout_window_title {
//     font-size: 16px;
//   }
//   .final_timeout_window_description {
//     font-size: 14px;
//     margin-top: 15px;
//   }
//   .final_timeout_pusskin-full {
//     position: absolute;
//     min-width: 98vw;
//     translate: -40%;
//   }
//   .final_timeout_pusskin-hand {
//     // width: 20vw;
//     // translate: 39% -84.5%;
//   }
// }
// @media (max-width: 310px) {
//   .final_timeout_window_title {
//     font-size: 14px;
//   }
//   .final_timeout_window_description {
//     font-size: 12px;
//     margin-top: 15px;
//   }
//   .final_timeout_window_button {
//     padding: 0px;
//     font-size: 15px;
//   }
// }
.spell {
  font-family: 'Snell';
  transform: translateX(-50%) rotate(-2deg);
  white-space: nowrap;
}
</style>
