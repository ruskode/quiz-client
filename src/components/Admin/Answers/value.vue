<template>
    <div class="answers-default">
        <p class="answers-default__title">Ответ к супер игре</p>
        <div>Текущий ответ: 
            <span v-for="(letters, idx) in questionState.meta.value">{{ letters.answer }}</span>
        </div>
       
        <div class="answers-default_content zx">
            <el-input v-model="inputState"></el-input>
        </div>
        <UIButton @click="handleSaveQuestion()">Сохранить ответ к супер-игре</UIButton>
    </div>
</template>

<script setup>
import { useAdminStore } from '~/store/admin';
const adminStore = useAdminStore()
const { deleteAnswer, saveAnswer, updateAnswer, updateQeustion } = useAdminStore()
const props = defineProps({
    options: {
        type: Array
    },
    question: {
        type: Object
    }
})

const state = ref([])
const questionState = ref({})
const stateCorrectIndex = ref(-1)
const inputState = ref("")
watch(() => inputState.value, () => {
    questionState.value.meta.value =[]
    for (let i = 0; i < inputState.value.length; i++) {
          questionState.value.meta.value.push({answer: inputState.value[i]})
        }
},
    
)

const handleSaveQuestion = async () => {
    await updateQeustion(questionState.value)
}
watch(() => props.options, () => {
    if (props.options) {
        state.value = props.options
        stateCorrectIndex.value = state.value.findIndex(item => item?.isCorrect)
    }
}, {
    immediate: true
})

watch(() => props.question, () => {
    if (props.question) {
        questionState.value = props.question
    }
}, {
    immediate: true
})
</script>

<style lang="scss" scoped>
.answers-default {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;

    &_content {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 30px;
    }

    &_item {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 10px;

        &__delete {
            cursor: pointer;
        }

        &__button {
            padding: 2px 6px;
            border-radius: 10px;
            width: 30px;
            height: 30px;
            background: rgb(182, 182, 182);

            &--active {
                background: rgb(21, 121, 21) !important;
            }
        }
    }
}
</style>