<template>
  <div class="sidebar">
    <div class="sidebar-item" v-for="item in menuItems">
      <Icon icon="ant-design:setting-twotone" />

      777
      <!-- <img :src="item.icon" alt="icon" class="icon" /> -->
    </div>
  </div>
</template>

<script>
// import { SettingTwoTone } from '@ant-design/icons-vue';
export default {
  setup() {
    const menuItems = [
      { name: '账户', icon: '../src/assets/images/user.png' },
      { name: '管理设置', icon: '../src/assets/images/user.png' },
    ]
    return {
      menuItems
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: #ffffff;
  padding: 20px;
  display: hidden;
  width: 20px;
  height: 100%;
}


.sidebar-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.label {
  font-size: 16px;
}
</style>
