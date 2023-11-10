<script setup>
import { gameGetQuestionAnswers } from '~/api'
import lodash from 'lodash'
const store = useMainStore()
const { totalGameTime, superGameError, showSuperGameEnd, currentPoints, gameStarted, isSuperGame, easyMode, currentQuestionNumber, currentQuestion } = storeToRefs(store)
const { counter, pause, resume, reset, isActive } = useInterval(1000, {
  controls: true,
})
pause()

const router = useRouter()

const resultCounter = ref(null)

const startResultCount = () => {
  showSuperGameEnd.value = false
  showCountingModal.value = true
  setTimeout(() => {
    isSuperGame.value = false
    emits('answered', true)
    emits('timerReset')
  }, 20500)
}

const onPressDeleteOrBackspace = async (idx) => {
  letterModel.value[idx] = ''
  let newInput = document.getElementById(`input__${idx - 1}`)
  newInput?.focus()
}

const emits = defineEmits(['answered', 'timerStop', 'timerReset'])
const props = defineProps({
  question: [Object],
  questionNumber: [Number],
  time: [Number],
})
const show = ref(true)
const totalTime = ref(15)

const draggableElement = ref(null)

const dragStart = (item, index, ev, isClick = false) => {
  console.log(ev, item, index)
  const element = ev.target

  if (!ev.dataTransfer) {
    draggableElement.value = null
    draggableElement.value = {
      item,
      index,
    }
  } else {
    ev.dataTransfer.clearData()
    ev.dataTransfer.dropEffect = 'move'
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('type', 'question_drag')
    ev.dataTransfer.setData('item', JSON.stringify(item))
    ev.dataTransfer.setData('index', JSON.stringify(index))
  }

  console.log(444, element, index)

  if (index === null || index === undefined) {
    if (isClick) {
      element.classList.add('clicked')
    } else {
      element.classList.add('hide')
    }
  }
}

const dragEnd = (id, ev) => {
  const element = ev.srcElement
  const index = positionAnswers.value.findIndex((v) => v && v.id === id)
  console.log('index', index)
  if (index === -1) {
    element.classList.remove('hide')
    element.classList.remove('over')
  }
}

const dragOver = (ev) => {
  const element = ev.srcElement
  element.classList.add('over')
}

const dragLeave = (ev) => {
  const element = ev.srcElement
  element.classList.remove('over')
}

const stickerDrag = (i, ev) => {
  console.log(i)
  let type = null
  if (ev.dataTransfer) {
    type = ev.dataTransfer.getData('type')
  } else if (draggableElement.value) {
    type = 'question_drag'
  }
  if (!type || type !== 'question_drag') {
    console.error('Unknown type')
    return
  }

  let index = null
  let item = null

  if (ev.dataTransfer) {
    item = JSON.parse(ev.dataTransfer.getData('item'))
    index = JSON.parse(ev.dataTransfer.getData('index'))
  } else if (draggableElement.value) {
    item = draggableElement.value.item
    index = draggableElement.value.index
  }
  console.log(index, positionAnswers.value[i])
  ev.target.classList.remove('over')
  console.log(ev)

  if (index !== null && index !== undefined) {
    const copy = lodash.cloneDeep(positionAnswers.value[i])
    if (copy !== undefined) {
      positionAnswers.value[index] = copy
    } else {
      positionAnswers.value[index] = null
    }
    positionAnswers.value[i] = item
    return
  }
  if (index === null && positionAnswers.value[i]) {
    return
  }
  positionAnswers.value[i] = item
  if (
    positionAnswers.value[0] !== null &&
    positionAnswers.value[0] !== undefined &&
    positionAnswers.value[1] !== null &&
    positionAnswers.value[1] !== undefined &&
    positionAnswers.value[2] !== null &&
    positionAnswers.value[2] !== undefined
  ) {
    answerEmit(positionAnswers.value)
  }
}

const answers = ref([])
const positionAnswers = ref([])

const getAnswers = async () => {
  const result = await gameGetQuestionAnswers(props.question.id)
  if (!result.success) {
    return
  }

  answers.value = result.data
}

const openedLetterIndex = ref(0)

const openRandomLetter = () => {
  if (totalGameTime.value - 10 < 0) {
    return
  }

  if (!props.question.meta.value[openedLetterIndex.value] || openedLetterIndex.value >= props.question.meta.value.length) {
    letterHandler()
    return
  }

  if (letterModel.value[openedLetterIndex.value]) {
    openedLetterIndex.value++
  }

  letterModel.value[openedLetterIndex.value] = props.question.meta.value[openedLetterIndex.value].answer
  totalGameTime.value -= 10
  openedLetterIndex.value++
  letterHandler()
}

const getAnswerById = (id) => {
  return answers.value.find((v) => v.id === id)
}

const letterModel = ref([])
const revealLetters = ref(false)

const selectedAnswer = ref(null)

const showCountingModal = ref(false)

const answerEmitting = ref(false)

const answerEmit = async (answer) => {
  answerEmitting.value = true
  selectedAnswer.value = answer
  emits('timerStop')
  await getAnswers()
  if (answer && !Array.isArray(answer) && !getAnswerById(answer.id).isCorrect) {
    selectedAnswer.value.wrong = true
    setTimeout(() => {
      emits('answered', false)
    }, 2000)
    answerEmitting.value = false
    return
  }

  if (answer && Array.isArray(answer)) {
    let correct = true
    answers.value.forEach((v) => {
      const a = answer.findIndex((t) => t.id === v.id)
      if (a === -1 || v.correctPos !== a + 1) {
        correct = false
      }
    })
    setTimeout(() => {
      emits('answered', correct)
    }, 2000)
    answerEmitting.value = false
    return
  }

  setTimeout(() => {
    emits('answered', true)
  }, 2000)
  answerEmitting.value = false
}

const letterHandler = (el, index) => {
  let correct = true
  props.question.meta.value.forEach((v, index) => {
    if (!letterModel.value[index] || (letterModel.value[index] && v.answer.toLowerCase() !== letterModel.value[index].toLowerCase())) {
      correct = false
    }
  })
  superGameError.value = !correct
  let finished = true
  props.question.meta.value.forEach((v, index) => {
    if (!letterModel.value[index]) {
      finished = false
    } else {
      finished = true
    }
  })
  if (finished) {
    if (correct) {
      currentPoints.value += 5
    }
    emits('timerStop')
    revealLetters.value = true
    showSuperGameEnd.value = true
  } else if (el && el.target && letterModel.value[index]) {
    el.target.blur()
    if (props.question.meta.easy) {
      el.target.parentElement.parentElement.parentElement.children[index + 1].children[0].children[0].focus()
    } else {
      el.target.parentElement.parentElement.parentElement.children[index + 1].children[1].children[0].focus()
    }
  }
}

const countingInfo = computed(() => {
  return Math.random() > 0.5
    ? {
        image: '/img/characters/belinsky.png',
        text: 'Наша игра призвана популяризировать русский язык, как культурный феномен, ведь как говорил Виссарион Белинский: «Русский язык — один из богатейших языков в мире, в этом нет никакого сомнения»',
      }
    : {
        image: '/img/characters/gorky.png',
        text: 'Наша игра призвана популяризировать русский язык, как культурный феномен, ведь как говорил Максим Горький: «Русский язык неисчерпаемо богат,и всё обогащается  с поражающей быстротой»',
      }
})

const goToStart = () => {
  currentQuestionNumber.value = 1
  totalGameTime.value = 0
  currentQuestion.value = null
  router.push('/')
  gameStarted.value = false
  currentPoints.value = 0
}

const cardHaveImage = computed(() => (props?.question?.meta?.image ? true : false))
</script>
<template>
  <div class="flex flex-col w-screen items-center relative z-1 card-wrapper" style="max-height: var(--doc-height)">
    <!-- <div v-if="question.meta && !question.meta.easy" class="flex items-center scale-90 sm:hidden w-100%" :class="{ 'pointer-events-none!': answerEmitting }">
      <div class="timer bg-white lt-xxxl:h-55px! lt-xxxl:max-w-310px q-shadow-sm lt-xxxl:p-10px!">
        <img class="w-24px h-24px lt-xxxl:w-18px lt-xxxl:h-18px" src="/img/clock.png" alt="таймер" />
        <div class="time lt-xxxl:h-13px! lt-xxxl:w-90%! lt-xxxl:min-w-80%! bg-#D1EAD8!">
          <div v-if="question.type !== 'VALUE'" class="inner h-full bg-#71CB8A trs" :style="`width: ${100 - (100 * time) / totalTime}%`"></div>
          <div v-else class="inner h-full bg-#71CB8A trs" :style="`width: ${100 - (100 * time) / totalGameTime}%`"></div>
        </div>
        <p class="text-22px lt-xxxl:text-16px w-35px lt-xxxl:w-20px text-end" v-if="question.type !== 'VALUE'">
          {{ totalTime - time }}
        </p>
        <p class="text-22px lt-xxxl:text-16px w-35px lt-xxxl:w-20px text-end" v-else>
          {{ totalGameTime - time }}
        </p>
      </div>
      <div style="width: 3.2vw"></div>

      <div class="gap-1vw sm:gap-2vw flex">
        <div class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
          <p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">{{ currentPoints }}</p>
          <p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">баллы</p>
        </div>

        <div v-if="question.type !== 'VALUE'" class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
          <p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">+{{ totalGameTime }}</p>
          <p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px px-12px">доп.сек</p>
        </div>
      </div>
    </div> -->
    <!-- <div v-if="question.meta && question.meta.easy" class="flex items-center scale-90 sm:hidden w-full justify-between" :class="{ 'pointer-events-none!': answerEmitting }">
      <div @click="goToStart" class="timer bg-white lt-xxxl:h-55px! w-unset! q-shadow-sm p-25px! w-98px! h-82px! px-12px! cursor-pointer">
        <img src="/img/logo.svg" class="w-46px h-30px" />
      </div>
      <div class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
        <p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">{{ currentPoints }}</p>
        <p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">баллыфывцыйф</p>
      </div>
    </div> -->
    <div
      class="card p-42px lt-sm:p-27px pb-48px w-770px lt-lg:p-20px lt-sm:w-610px lt-sm:scale-90 lg:scale-100! max-w-full lt-sm:mt--15px lt-md:mt-36px"
      :class="[
        { 'w-1120px! max-w-1120px! lt-lg:max-w-650px! lt-sm:max-w-full!': question.type === 'POSITION' },
        //   { 'q-shadow-md__light-green': question.type === 'VALUE' },
        //   { 'q-shadow-md': question.type !== 'VALUE' },
        { 'pointer-events-none!': answerEmitting },
        { fullvhcard: cardHaveImage },
        { 'max-h-[calc(90vh-50px)]': !cardHaveImage },
      ]">
      <div class="easy-card_header" v-if="question.meta && question.meta.easy">
        <div @click="goToStart" class="lt-xxxl:h-55px! w-unset! w-98px! h-82px! cursor-pointer flex items-center justify-center">
          <img src="/img/logo.svg" class="w-46px h-30px" />
        </div>
        <div class="w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px flex flex-col items-center justify-center">
          <p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">{{ currentPoints }}</p>
          <p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">баллы</p>
        </div>
      </div>
      <div v-if="question.meta && !question.meta.easy" class="hard-card_header" style="gap: 20px">
        <div class="lt-xxxl:h-55px! lt-xxxl:max-w-50vw timer lt-xxxl:p-10px!">
          <img class="w-24px h-24px lt-xxxl:w-18px lt-xxxl:h-18px" src="/img/clock.png" />
          <div class="time lt-xxxl:h-13px! lt-xxxl:w-90%! lt-xxxl:min-w-80%! bg-#D1EAD8!">
            <div v-if="question.type !== 'VALUE'" class="inner h-full bg-#71CB8A trs" :style="`width: ${100 - (100 * time) / totalTime}%`"></div>
            <div v-else class="inner h-full bg-#71CB8A trs" :style="`width: ${100 - (100 * time) / totalGameTime}%`"></div>
          </div>
          <p class="text-22px lt-xxxl:text-16px w-35px lt-xxxl:w-20px text-end" v-if="question.type !== 'VALUE'">
            {{ totalTime - time }}
          </p>
          <p class="text-22px lt-xxxl:text-16px w-35px lt-xxxl:w-20px text-end" v-else>
            {{ totalGameTime - time }}
          </p>
        </div>
        <!-- <div class="gap-1vw sm:gap-2vw flex"> -->

        <div v-if="question.type !== 'VALUE'" class="w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px flex flex-col items-center">
          <p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">+{{ totalGameTime }}</p>
          <p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% px-12px">доп.сек</p>
        </div>
        <div class="w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px flex flex-col items-center">
          <p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">{{ currentPoints }}</p>
          <p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130%">баллы</p>
        </div>
      </div>

      <!-- <div v-if="question.meta && !question.meta.easy" class="flex lt-sm:hidden justify-between">
        <div class="timer bg-white lt-xxxl:h-55px! lt-xxxl:max-w-310px q-shadow-sm lt-xxxl:p-10px!">
          <img class="w-24px h-24px lt-xxxl:w-18px lt-xxxl:h-18px" src="/img/clock.png" alt="таймер" />
          <div class="time lt-xxxl:h-13px! lt-xxxl:w-220px! lt-xxxl:min-w-220px! bg-#D1EAD8!">
            <div v-if="question.type !== 'VALUE'" class="inner h-full bg-#71CB8A trs" :style="`width: ${85 - (85 * time) / totalTime}%`"></div>
            <div v-else class="inner h-full bg-#71CB8A trs" :style="`width: ${85 - (85 * time) / totalGameTime}%`"></div>
          </div>
          <p class="text-22px lt-xxxl:text-16px w-35px lt-xxxl:w-20px text-end" v-if="question.type !== 'VALUE'">
            {{ totalTime - time }}
          </p>
          <p class="text-22px lt-xxxl:text-16px w-35px lt-xxxl:w-20px text-end" v-else>
            {{ totalGameTime - time }}
          </p>
        </div>
        <div class="flex gap-1vw">
          <div class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
            <p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">{{ currentPoints }}</p>
            <p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">баллы</p>
          </div>

          <div v-if="question.type !== 'VALUE'" class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
            <p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">+{{ totalGameTime }}</p>
            <p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px px-12px">доп.сек</p>
          </div>
        </div>
      </div> -->
      <!-- <div v-if="question.meta && question.meta.easy" class="flex items-center lt-sm:hidden">
        <div @click="goToStart" class="timer bg-white lt-xxxl:h-55px! q-shadow-sm p-25px! max-w-98px! h-82px! cursor-pointer relative pb-6px">
          <img src="/img/logo.svg" class="w-46px h-30px" />
        </div>
        <div class="flex-1"></div>
        <div class="bg-white w-98px lt-xxxl:w-76px lt-xxxl:h-55px! py-12px border-2px border-#C9C9C9 flex flex-col items-center justify-center q-shadow-sm">
          <p class="text-22px lt-xxxl:text-16px font-500 text-#1E2947 leading-130%">{{ currentPoints }}</p>
          <p class="text-18px lt-xxxl:text-14px text-#C9C9C9 leading-130% mt-2px">баллы</p>
        </div>
      </div> -->
      <div class="">
        <template v-if="question.meta" class="cardInside">
          <div class="flex flex-col mt-30px mb-12px lt-2xl:mb-20px lt-sm:mt-0!">
            <p v-if="question.type !== 'VALUE'" class="font-500 text-18px lt-xxxl:text-14px text-#A5A9B5">{{ questionNumber }} вопрос из 10</p>
            <p v-else class="font-500 text-18px lt-xxxl:text-14px text-#A5A9B5">Суперигра</p>
            <p v-html="question.meta.title" class="text-36px lt-sm:text-18px lt-md:text-22px font-700 leading-130% mt-16px title"></p>
            <div class="relative">
              <img
                v-if="question.meta.image && question.type !== 'POSITION'"
                class="w-full h-20vh lt-sm:h-136px lt-md:h-168px object-cover q-shadow-sm mt-24px lt-sm:mt-14px"
                :src="`https://api.рускод.рф/${question.meta.image}`" />
              <p class="absolute bottom-14px lt-sm:left-8px lt-sm:bottom-8px lt-sm:right-unset right-14px text-white text-14px lt-sm:text-8px leading-130%" v-if="question.meta.imageComment">
                {{ question.meta.imageComment }}
              </p>
            </div>
            <p v-if="question.meta.comment" v-html="question.meta.comment" class="font-500 text-26px lt-sm:text-17px leading-130% text-#1E2947 mt-20px lt-sm:mt-20px subtitle"></p>
            <p v-else class="font-500 text-26px lt-md:text-18px lt-sm:text-14px leading-130% text-#1E2947 mt-20px lt-sm:mt-18px">Выберите Ответ</p>
          </div>
          <!-- TODO: переносы -->
          <div v-if="question.type === 'DEFAULT'" class="flex flex-wrap gap-16px subtitle" :class="{ 'mt-20px!': question.meta && question.meta.comment }">
            <div
              v-for="answer in question.answers"
              @click="answerEmit(answer)"
              class="q-answer q-shadow-sm flex items-center justify-center max-h-70px lt-sm:max-h-7vh overflow-hidden lt-md:w-full! lt-md:max-h-5.5vh answer-button"
              :class="[
                { 'correct q-shadow-sm__green': getAnswerById(answer.id) && getAnswerById(answer.id).isCorrect },
                { 'wrong q-shadow-sm__red': selectedAnswer && answer.id === selectedAnswer.id && selectedAnswer.wrong },
              ]">
              <p v-html="answer.meta.title" class="text-20px lt-xxxl:text-14px leading-130% text-center py-22px p-18px lt-sm:px-12px answer-button_text"></p>
            </div>
          </div>
          <div v-else-if="question.type === 'VALUE'" class="">
            <p class="font-500 text-26px lt-xxxl:text-22px leading-34px">Шифр:</p>
            <div class="flex items-start gap-x-9px mt-10px lt-sm:flex-wrap">
              <div class="flex flex-col items-center gap-y-8px" v-for="(letter, index) in question.meta.value">
                <p v-if="!question.meta.easy" class="font-500 text-26px lt-xxxl:text-22px leading-34px">
                  {{ letter.question }}
                </p>
                <div
                  class="h-7vh max-h-66px w-11.5vw max-w-66px flex items-center border-1px border-dashed border-#1E2947 text-#1E2947 mb-10px"
                  :class="[
                    { 'correct q-shadow-sm__green': revealLetters && letterModel[index] === letter.answer },
                    { 'wrong q-shadow-sm__red': revealLetters && letterModel[index] !== letter.answer },
                  ]">
                  <input
                    class="h-full w-full text-center text-26px lt-xxxl:text-22px font-100 placeholder:text-#787F91 uppercase hover:placeholder:text-#fff focus:placeholder:text-#fff"
                    :id="`input__${index}`"
                    maxlength="1"
                    v-model="letterModel[index]"
                    placeholder="+"
                    @input="letterHandler($event, index)"
                    @keydown.delete="onPressDeleteOrBackspace(index)" />
                </div>
              </div>
            </div>
            <template v-if="question.meta && !question.meta.easy">
              <button v-if="totalGameTime - 10 > 0" @click="openRandomLetter" class="flex items-center p-12px gap-x-12px border-1px border-#D1EAD8 mt-38px lt-xxxl:mt-22px bg-white">
                <p class="text-#1E2947 text-16px leading-20px font-500">Открыть букву</p>
                <div class="bg-#FFEAE7 w-82px h-32px flex items-center justify-center text-#C01E00">
                  <p class="font-700 text-15px leading-20px">-10 сек</p>
                </div>
              </button>
            </template>
          </div>
          <div v-else-if="question.type === 'POSITION'" class="flex flex-col lt-lg:flex-row flex-wrap lt-lg:gap-x-8px lt-sm:w-95%">
            <div class="flex flex-wrap gap-16px lt-lg:flex-col lt-lg:w-[calc(100%/2-4px)]">
              <div
                v-for="(position, index) in question.meta.positions"
                class="bg-white q-answer q-shadow-sm w-[calc(100%/3-12px)]! lt-lg:w-full! lt-lg:max-h-60px lt-sm:max-h-38px flex items-center max-w-334px! max-h-74px!">
                <p class="text-20px lt-xxxl:text-18px lt-sm:text-14px leading-26px text-center py-22px px-18px lt-sm:px-10px lt-sm:py-14px w-full pointer-events-none position-card_question">
                  {{ position.title }}
                </p>
              </div>
            </div>
            <div class="flex flex-wrap gap-16px mt-18px lt-lg:mt-0 lt-lg:flex-col lt-lg:w-[calc(100%/2-4px)]">
              <div
                class="bg-white border-1px border-dashed border-#1E2947 h-74px max-w-334px! lt-lg:max-h-60px! w-[calc(100%/3-12px)]! lt-lg:w-full! cursor-grab! flex items-center justify-center lt-sm:max-h-38px! lt-sm:py-12px lt-sm:px-10px position-card_slot"
                :class="[
                  { 'q-answer q-shadow-sm': positionAnswers[zone - 1] },
                  {
                    'correct q-shadow-sm__green': positionAnswers[zone - 1] && getAnswerById(positionAnswers[zone - 1].id) && getAnswerById(positionAnswers[zone - 1].id).correctPos === zone,
                  },
                  {
                    'wrong q-shadow-sm__red': positionAnswers[zone - 1] && getAnswerById(positionAnswers[zone - 1].id) && getAnswerById(positionAnswers[zone - 1].id).correctPos !== zone,
                  },
                ]"
                v-for="zone in 3"
                @dragover.prevent="dragOver"
                @dragleave="dragLeave"
                @drop="stickerDrag(zone - 1, $event)"
                draggable="true"
                @dragstart="dragStart(positionAnswers[zone - 1], zone - 1, $event)"
                @click="stickerDrag(zone - 1, $event)">
                <p class="text-20px lt-xxxl:text-18px lt-sm:py-12px lt-sm:px-10px lt-sm:text-14px leading-23px text-center pointer-events-none">
                  {{ positionAnswers[zone - 1] ? positionAnswers[zone - 1].meta.title : '' }}
                </p>
              </div>
            </div>
            <div class="flex flex-wrap gap-16px lt-lg:gap-6px mt-18px w-full">
              <div
                class="bg-white q-answer w-[calc(100%/3-12px)]! lt-lg:w-[calc(100%/2-3px)]! hover:scale-100! lt-lg:border-none cursor-grab lt-sm:max-h-38px"
                v-for="(answer, index) in question.answers"
                draggable="true"
                @dragend="dragEnd(answer.id, $event)"
                @dragstart="dragStart(answer, null, $event)"
                @click.self="dragStart(answer, null, $event, true)">
                <div class="flex items-center justify-center py-22px p-18px lt-sm:py-12px lt-sm:px-10px pointer-events-none">
                  <IconDrag class="lt-lg:w-4px lt-lg:h-10px" />
                  <p class="text-20px lt-xxxl:text-18px lt-sm:text-14px leading-130% text-center ml-10px">{{ answer.meta.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <TheModalBottom v-model="showSuperGameEnd">
        <div class="absolute bottom-0 left-50% translate-x-[-50%] z-1010101001">
          <img class="absolute right-[-35%] lt-lg:right-[-15%] lt-lg:bottom-50% bottom-0 z-1 w-700px lt-lg:w-500px" src="/img/characters/pushkin-bg.png" />
          <div
            class="flex lt-sm:flex-col h-full lt-lg:max-h-166px! lt-sm:max-h-310px! lt-lg:min-h-166px items-center justify-between p-55px lt-lg:p-36px! gap-x-44px w-886px max-w-screen! lt-lg:w-672px min-h-223px relative z-2"
            :class="[{ 'bg-#D1EAD8': !superGameError }, { 'bg-#FFEAE7': superGameError }]">
            <div class="translate-y--10px">
              <p class="text-#08882C font-500 text-36px sm:text-30px lt-lg:text-30px leading-130%" :class="{ 'text-#C01E00': superGameError }">
                {{ !superGameError ? 'Красавчик!' : 'Правильный ответ:' }}
              </p>
              <p v-if="question.meta && question.meta.comment" class="text-26px leading-130% mt-18px lt-lg:text-18px lt-lg:mt-11px">
                <span v-for="(letter, idx) in question.meta.value">{{ letter.answer }}</span> — {{ question.meta.comment }}
              </p>
            </div>
            <button
              @click="startResultCount"
              class="p-22px w-332px lt-sm:p-10px lt-xxxl:p-16px text-center lt-sm:mt-24px lt-sm:h-40px flex items-center max-w-82vw justify-center justify-items-center content-center items-center translate-y--11px"
              :class="[
                { 'bg-white q-shadow-sm__light-green text-#08882C border-1px border-#08882C': !superGameError },
                { 'bg-#FFEAE7! q-shadow-sm__red text-#C01E00 border-1px border-#C01E00': superGameError },
              ]">
              <p class="font-500 text-20px sm:text-17px leading-26px lt-sm:text-14px whitespace-nowrap justify-self-center">Узнать результаты</p>
            </button>
          </div>
        </div>
      </TheModalBottom>
      <TheModalBottom v-model="showCountingModal">
        <div class="flex w-screen justify-center items-end">
          <img class="w-700px lt-lg:w-600px lt-lg:ml-[-130px] lt-xxxl:w-500px object-contain" :src="countingInfo.image" />
          <div
            class="relative bg-white p-42px lt-lg:p-24px w-760px lt-xxxl:w-568px lt-lg:max-w-500px min-h-420px lt-lg:min-h-350px q-shadow-md__light-green mb-300px -ml-150px lt-lg:ml-[-280px] lt-lg:mb-450px lt-sm:scale-85 lt-sm:mb-300px lt-sm:min-h-fit translate-x-6px">
            <p class="font-500 text-36px lt-lg:text-30px lt-xxxl:text-28px lt-sm:text-20px leading-130%">
              Пару минут, мы считаем результаты<span class="lg:hidden">, а пока почитай, для чего мы сделали этот квиз</span>
            </p>
            <p class="text-26px lt-xxxl:text-22px lt-lg:text-18px lt-sm:text-14px leading-130% mt-32px lt-lg:mt-18px">
              {{ countingInfo.text }}
            </p>

            <div class="count-time bg-#D1EAD8!">
              <div class="inner h-full bg-#71CB8A"></div>
            </div>
          </div>
          <a href="https://kantiana.ru" target="_blank" class="fixed bottom-40px left-50% translate-x-[-50%] color-white z-100">
            <img src="/img/bfu-white.svg" />
          </a>
        </div>
      </TheModalBottom>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card-wrapper {
  margin-top: 4svh;
  @media (max-width: 740px) {
    align-self: flex-start;
  }
}
.easy-card {
  &_header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
.hard-card {
  &_header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
.position-card {
  &_question {
    max-height: 74px !important;
    @media (max-width: 400px) {
      padding: 14px 0 !important;
    }
  }
  &_slot {
    max-height: 74px !important;
  }
}
.title {
  @media (max-height: 790px) and (min-width: 600px) {
    font-size: 24px;
  }
  @media (max-height: 640px) and (min-width: 600px) {
    font-size: 18px;
  }
}
.subtitle {
  @media (max-height: 790px) and (min-width: 600px) {
    font-size: 24px;
    margin-top: 18px !important;
  }
  @media (max-height: 640px) and (min-width: 600px) {
    font-size: 18px;
  }
}
.answer-button {
  &_text {
    @media (max-height: 790px) {
      padding: 16px 12px !important;
    }
  }
}
.card {
  background-color: #fbfbfb;
  overflow: hidden;
}

.time {
  background-color: #71cb8a;
  min-width: 260px;
  max-width: 260px;
  width: 260px;
  height: 8px !important;
  clip-path: polygon(
    0% 2px,
    2px 2px,
    2px 0%,
    calc(100% - 2px) 0%,
    calc(100% - 2px) 2px,
    100% 2px,
    100% calc(100% - 2px),
    calc(100% - 2px) calc(100% - 2px),
    calc(100% - 2px) 100%,
    2px 100%,
    2px calc(100% - 2px),
    0% calc(100% - 2px)
  );

  .inner {
    transition: all 0.05s;
  }
}

.timer {
  display: flex;
  gap: 9px;
  align-items: center;
  justify-content: space-between;
  padding: 25.5px 24px;
  width: 385px;
  // @apply lt-sm: w-285px;
  height: 72px;
  @media (max-width: 460px) {
    padding: 10px 0 !important;
  }
}

.count-time {
  margin-top: 34px;
  background-color: #71cb8a;
  width: 100%;
  height: 14px;
  clip-path: polygon(
    0% 4px,
    4px 4px,
    4px 0%,
    calc(100% - 4px) 0%,
    calc(100% - 4px) 4px,
    100% 4px,
    100% calc(100% - 4px),
    calc(100% - 4px) calc(100% - 4px),
    calc(100% - 4px) 100%,
    4px 100%,
    4px calc(100% - 4px),
    0% calc(100% - 4px)
  );

  .inner {
    animation: loading 20s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  }
}

@keyframes loading {
  0% {
    width: 100%;
  }

  100% {
    width: 0%;
  }
}

.hide {
  opacity: 0;
}

.over {
  @apply bg-#DFDEE24D border-none;
}

.clicked {
  @apply opacity-50 pointer-events-none;
  box-shadow: 2px 2px 0 #000;
}

@media screen and (max-height: 900px) {
  .cardInside {
    * {
      transform: scale(0.9, 0.8);
    }
  }
}

.fullvhcard {
  @media (max-height: 844px) and (max-width: 600px) {
    min-height: 88.8vh !important;
  }
}
</style>
