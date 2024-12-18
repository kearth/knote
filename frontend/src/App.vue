<script setup>
import Siderbar from './components/Sidebar.vue'
import FileExplorer from './components/FileExplorer.vue'
import Editor from './components/Editor.vue'
</script>

<template>
  <!-- <img id="logo" alt="Wails logo" src="./assets/images/logo-universal.png" /> -->
  <Siderbar />
  <FileExplorer />
  <Editor />
</template>

<style>
#logo {
  display: block;
  width: 50%;
  height: 50%;
  margin: auto;
  padding: 10% 0 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-origin: content-box;
}
</style>
