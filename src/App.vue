<script setup>
import { useI18n } from 'vue-i18n'
import { useFavicon, usePreferredDark } from '@vueuse/core'
import UIModal from '~/components/UI/modal.vue'
import { useModalStore } from './store/modal'
const modalStore = useModalStore()
const { active } = toRefs(modalStore)
const store = useMainStore()
const { isSuperGame, gameStarted, currentQuestionNumber, totalGameTime, currentQuestion, currentPoints, easyMode } = storeToRefs(store)

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }
  window.addEventListener(`resize`, documentHeight)
  documentHeight()
})

useHead({
  title: 'Результат Квиза',
  meta: [{ name: 'description', content: 'Opinionated Vite Starter Template' }],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/img/favicon.svg',
    },
  ],
})
const logo = computed(() => {
  if (route.path === '/time_out') {
    return '/img/logo-sg.svg'
  }
  if (!gameStarted.value && route.path === '/end') {
    return '/img/logo-game.svg'
  }
  if (gameStarted.value && isSuperGame.value) {
    return '/img/logo-sg.svg'
  }
  if (gameStarted.value && !isSuperGame.value) {
    return '/img/logo-game.svg'
  }
  return '/img/logo.svg'
})

const goToStart = () => {
  currentQuestionNumber.value = 1
  totalGameTime.value = 0
  currentQuestion.value = null
  router.push('/')
  gameStarted.value = false
  currentPoints.value = 0
}
const getValidRoute = computed(() => useRoute().name === 'admin' || useRoute().name === 'newadmin')
onMounted(() => {
  if (window) {
    setTimeout(function () {
      window.scrollTo(0, 1)
    }, 0)
  }
  let msg = '%c Quiz App Made by TG @nopleas'
  let styles = ['font-size: 12px', 'font-family: monospace', 'background: white', 'display: inline-block', 'color: black', 'padding: 8px 19px', 'border: 1px dashed;'].join(';')
  console.log(msg, styles)
})
</script>

<template>
  <img
    v-if="!gameStarted || !easyMode"
    v-show="!getValidRoute"
    @click="goToStart"
    :src="logo"
    class="fixed left-40px top-40px z-1000 cursor-pointer lt-xxl:w-42px lt-xxl:h-28px lt-sm:top-12px lt-sm:left-21px lt-sm:w-26px lt-sm:h-21px" />
  <UIModal v-if="active" />
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
