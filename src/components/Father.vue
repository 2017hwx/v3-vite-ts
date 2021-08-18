<template>
  <h2>父组件</h2>
  <h3>name:{{ firstName }}</h3>
  <Child :msg="msg" />
</template>

<script lang="ts">
import {
  ref,
  reactive,
  toRefs,
  watch,
  watchEffect,
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
} from "vue";
import Child from "./Child.vue";

const componentName = "Father";

const applog = function (...args: any[]) {
  console.log(componentName, ...args);
};

export default defineComponent({
  name: componentName,
  components: {
    Child,
  },
  setup: (props, context) => {
    //在beforeCreate之前，组件还为实例化，
    //this是undefined, 不能通过this来访问data/computed/methods/props。
    applog("--props:", props); //msg: "hello,vue3"
    //context：上下文对象，可以通过es6语法解构 setup(props, {attrs, slots, emit})
    //attrs: 获取当前组件标签上所有没有通过props接收的属性的对象, 相当于 this.$attrs
    //slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
    //emit: 用来分发自定义事件的函数, 相当于 this.$emit
    applog("--attrs:", context.attrs); //msg2: "哈哈哈"
    applog("--slots:", context.slots); //msg2: "哈哈哈"
    applog("--emit:", context.emit); //msg2: "哈哈哈"

    onBeforeMount(() => {
      applog("--onBeforeMount");
    });

    onMounted(() => {
      applog("--onMounted");
    });

    onBeforeUpdate(() => {
      applog("--onBeforeUpdate");
    });

    onUpdated(() => {
      applog("--onUpdated");
    });

    onBeforeUnmount(() => {
      applog("--onBeforeUnmount");
    });

    onUnmounted(() => {
      applog("--onUnmounted");
    });

    onErrorCaptured(() => {
      applog("--onErrorCaptured");
    });

    onRenderTracked(() => {
      applog("--onRenderTracked");
    });

    onRenderTriggered(() => {
      applog("--onRenderTriggered");
    });

    const user: any = reactive({
      firstName: "he",
      lastName: "wenxiu",
      fullName: computed(() => {
        return user.firstName + user.lastName;
      }),
    });
    const fullName2 = computed({
      get() {
        return user.firstName + "_" + user.lastName;
      },
      set(val: string) {
        const names = val.split("_");
        user.firstName = names[0];
        user.lastName = names[1];
      },
    });

    const msg = ref("i am father");
    return { msg, ...toRefs(user), fullName2 };
  },
});
</script>

<style scoped>
</style>
