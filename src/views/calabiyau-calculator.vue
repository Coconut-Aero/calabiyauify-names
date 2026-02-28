<template>
    <div @click="spawnMeow">
  <div class="page">
    <div class="container">

      <div class="title">🐱 卡拉彼丘程度计算器喵~</div>
      <div class="subtitle">
        输入昵称，检测你的猫娘同步率！
      </div>

      <input v-model="name" placeholder="请输入你的昵称喵~" />

      <button @click="calculate">
        开始计算卡拉彼丘程度喵！
      </button>

      <div class="result" v-if="score!==null">
        <div class="score">{{score}}%</div>
        <div class="comment">{{comment}}</div>
        <div class="cat">{{emoji}}</div>
      </div>

    </div>
  </div>
    <div
    v-for="m in meows"
    :key="m.id"
    class="meow"
    :style="{left:m.x+'px',top:m.y+'px'}"
    >
    喵~
    </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const name = ref("")
const score = ref(null)
const comment = ref("")
const emoji = ref("")


function calculate(){

  if(!name.value){
    alert("请输入昵称喵！");
    return;
  }

  let hash=0
  for(let i=0;i<name.value.length;i++){
    hash+=name.value.charCodeAt(i)*(i+1)
  }

  const result=(hash*7)%101
  score.value=result

  if(result<30){
    comment.value="你还是普通人类喵…刚进入卡丘宇宙~"
    emoji.value="🐾"
  }else if(result<60){
    comment.value="已经开始喵化！疑似猫娘觉醒中！"
    emoji.value="🐱"
  }else if(result<85){
    comment.value="高浓度卡拉彼丘适格者！战术卖萌启动！"
    emoji.value="😺"
  }else{
    comment.value="完全体猫娘同步率100%！似了喵！！"
    emoji.value="✨🐈‍⬛✨"
  }
}

const meows = ref([])

function spawnMeow(e){
  const id = Date.now()

  meows.value.push({
    id,
    x:e.clientX,
    y:e.clientY
  })

  setTimeout(()=>{
    meows.value =
      meows.value.filter(m=>m.id!==id)
  },1000)
}



</script>

<style scoped>
.page{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:linear-gradient(135deg,#ffe6f2,#e6f7ff);
}

.container{
  width:90%;
  max-width:420px;
  background:white;
  border-radius:20px;
  padding:28px;
  box-shadow:0 10px 30px rgba(0,0,0,0.1);
  text-align:center;
}

.title{
  font-size:1.6rem;
  font-weight:700;
  color:#ff6fa5;
}

.subtitle{
  color:#888;
  margin-bottom:20px;
}

input{
  width:100%;
  padding:12px;
  border-radius:12px;
  border:2px solid #ffd1e6;
}

button{
  margin-top:16px;
  width:100%;
  padding:12px;
  border:none;
  border-radius:12px;
  background:#ff6fa5;
  color:white;
  cursor:pointer;
}

.result{
  margin-top:22px;
  padding:16px;
  border-radius:14px;
  background:#fff5fb;
}

.score{
  font-size:2.4rem;
  font-weight:800;
  color:#ff4f9a;
}

.meow{
  position:fixed;
  color:#ff6fa5;
  font-weight:bold;
  pointer-events:none;
  animation:float 1s forwards;
}

@keyframes float{
  to{
    transform:translateY(-60px);
    opacity:0;
  }
}
</style>