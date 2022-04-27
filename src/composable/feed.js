// import { useStore } from 'vuex'
// import { computed, ref } from 'vue'
//
// export default (props) => {
//   const store = useStore()
//   console.log(store.getters)
//
//   const map = {
//     'feed/getIssues': { name: 'issues', param: props.fullName },
//     'feed/getLoadStatus': { name: 'isLoading', param: props.fullName },
//     'feed/getFormattedDate': { name: 'formattedDate', param: props.date }
//   }
//
//   const { issues, isLoading, formattedDate } = Object.fromEntries(
//     Object.keys(store.getters)
//       .filter(getter => getter.startsWith('feed/'))
//       .map(
//         getter => {
//           if (map[getter].param) {
//             return [map[getter].name, computed(() => {
//               return store.getters[getter](map[getter].param)
//             })]
//           } else {
//             return [map[getter].name, computed(() => { return store.getters[getter] })]
//           }
//         }
//       )
//   )
//
//   const visible = ref(false)
//   const toggleIssues = (isOpened) => {
//     console.log(issues)
//     if (isOpened && !issues.value) {
//       store.dispatch('feed/loadIssues', props.fullName)
//     }
//     visible.value = isOpened
//   }
//
//   return {
//     issues,
//     isLoading,
//     formattedDate,
//     toggleIssues,
//     visible
//   }
// }

import { useStore } from 'vuex'
import { computed, ref } from 'vue'

export default (props, emit) => {
  const store = useStore()

  const issues = computed(() => store.getters['feed/getIssues'](props.fullName))
  const isLoading = computed(() => store.getters['feed/getLoadStatus'](props.fullName))
  const formattedDate = computed(() => store.getters['feed/getFormattedDate'](props.date))

  const visible = ref(false)
  const toggleIssues = (isOpened) => {
    if (isOpened && !issues.value) {
      store.dispatch('feed/loadIssues', props.fullName)
    }
    visible.value = isOpened
  }

  return {
    issues,
    isLoading,
    formattedDate,
    toggleIssues,
    visible
  }
}
