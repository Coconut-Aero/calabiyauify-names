
<script setup>
import { ref } from "vue"

const name = ref("")
const score = ref(null)
const comment = ref("")
const pic = ref("")
const meows = ref([])

function spawnMeow(e) {
  const id = Date.now() + Math.random()

  meows.value.push({
    id,
    x: e.clientX,
    y: e.clientY
  })

  setTimeout(() => {
    meows.value = meows.value.filter(m => m.id !== id)
  }, 900)
}

function calculate(){
      const rawName = name.value;

      if(!rawName){
        alert("请输入昵称喵！");
        return;
      }

      const normalizedName = rawName.trim().toLowerCase();
      /* =========================
        ① 卡拉彼丘强制100%检测
        ========================= */

      // 卡丘文化关键词
      const kqKeywords = [
        "卡丘","卡拉彼丘","超弦","弦化",
        "喵","猫娘","猫猫","calabiyau",
        "celestia","strinova"
      ];

      // 卡拉彼丘角色名（可自行扩展）
      const characterNames = [
        "明","信","白墨","星绘","心夏","香奈美",
        "米雪儿","米雪儿李","伊薇特","奥黛丽",
        "玛德蕾娜","拉薇","令","糖猫","千代",
        "忧雾","蕾欧娜","艾卡","芙拉薇娅",
        "绯莎","汐","玛拉","珐格兰丝","加拉蒂亚"
      ];

      const allKeywords = [...kqKeywords, ...characterNames];

      // 命中关键词直接100%
      for(const key of allKeywords){
        if(normalizedName.includes(key.toLowerCase())){
          score.value = 100;
          comment.value = "检测到强烈卡丘共振！你就是超绝可爱大卡奴喵！！";
          pic.value="/mi3.png";
          return;
        }
      }


      /* =========================
        ② 多重哈希计算（核心）
        ========================= */

      let hash1 = 0;
      let hash2 = 1;
      let hash3 = 7;

      for(let i=0;i<normalizedName.length;i++){
        const code = normalizedName.charCodeAt(i);

        // 基础累加
        hash1 += code * (i + 3);

        // 位运算扰动
        hash2 ^= (code << (i % 8));

        // 乘法扩散
        hash3 = (hash3 * 31 + code) % 100000;
      }

      /* =========================
        ③ 昵称特征加权
        ========================= */

      let bonus = 0;

      // 长度加权
      if(normalizedName.length <= 2) bonus += 8;
      else if(normalizedName.length >= 6) bonus += 12;

      // 含数字（中二度提升）
      if(/\d/.test(normalizedName)) bonus += 6;

      // 含英文（异界感）
      if(/[a-z]/.test(normalizedName)) bonus += 5;

      // 重复字符检测（猫化倾向）
      const unique = new Set(normalizedName);
      const repeatRate = 1 - unique.size / normalizedName.length;
      bonus += Math.floor(repeatRate * 20);

      // 含可爱符号
      if(/[~!@#$%^&*()_+=]/.test(normalizedName)) bonus += 10;


      /* =========================
        ④ 混合最终得分
        ========================= */

      score.value =
        (hash1 * 3 +
        hash2 * 5 +
        hash3 +
        bonus * 11) % 101;

      if(score.value < 0) score.value += 101;

      score.value = score.value;


      /* =========================
        ⑤ 等级判定
        ========================= */


    if(score.value < 10){
        comment.value = "不太像是卡丘猫娘喵~";
        pic.value = '/aika1.png';
    }
    else if(score.value < 20){
        comment.value = "猫娘程度很低喵，还需要修炼喵~";
        pic.value = "/cele1.png";
    }
    else if(score.value < 30){
        comment.value = "喵化进程 30%，尾巴在偷偷出现喵！";
        pic.value = "/aika2.png";
    }
    else if(score.value < 40){
        comment.value = "已经开始弦化进程了喵，耳朵已经可以竖起来了喵！";
        pic.value = "/aika5.png";
    }
    else if(score.value < 50){
        comment.value = "半喵化状态，萌态渐显喵~";
        pic.value = "/aika4.png";
    }
    else if(score.value < 60){
        comment.value = "猫娘指数过半了喵，魅力值飙升喵！";
        pic.value = "/mi4.png";
    }
    else if(score.value < 70){
        comment.value = "高浓度卡拉彼丘适配者！来自火力大喵的肯定喵！";
        pic.value = "/mi2.png";
    }
    else if(score.value < 80){
        comment.value = "几乎完成猫娘化，闪闪发光的喵！";
        pic.value = "/aika3.png";
    }
    else if(score.value < 90){
        comment.value = "猫娘指数超过80%了喵！完美喵化，魅力爆表了喵！";
        pic.value = "/mi5.png";
    }
    else{
        comment.value = "完全弦化成功！已经变成顶级卡丘猫娘喵！";
        pic.value = "/xnm1.png";
    }
  }
    // 图片+音效组合数组
    const effects = [
      { img: '/death.png', audio: '/death.mp3' },
      { img: '/win.png', audio: '/win.mp3' },
    ]

    const originalImg = '/title.png'
    const currentImg = ref(originalImg)

    function handleClick() {
      // 随机选择一个组合
      const choice = effects[Math.floor(Math.random() * effects.length)]

      // 播放音效
      const audio = new Audio(choice.audio)
      audio.currentTime = 0
      audio.play()

      // 切换图片
      currentImg.value = choice.img

      setTimeout(() => {
        currentImg.value = originalImg
      }, 2000)
    }

</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 px-4 py-10 sm:py-16 relative overflow-hidden" @click="spawnMeow">
    
    <main class="flex-grow flex flex-col items-center justify-start z-10">
      <div class="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700 text-center space-y-6 transition-all">
        
        <div class="flex flex-col items-center space-y-3">
          <div class="relative">
               <img
                :src="currentImg"
                class="w-16 h-16 object-contain drop-shadow-md animate-bounce-slow cursor-pointer"
                @click="handleClick"
              />
             <div class="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full border-2 border-white"></div>
          </div>
          <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600 dark:from-pink-400 dark:to-indigo-300">
            卡拉彼丘程度计算器喵~
          </h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm tracking-wide">
            输入昵称喵，检测你的猫娘指数喵~
          </p>
        </div>

        <div class="space-y-4">
          <input 
            v-model="name" 
            placeholder="请输入你的昵称喵~" 
            class="w-full px-5 py-3 rounded-xl border-2 border-pink-100 dark:border-gray-700 focus:border-pink-400 dark:focus:border-indigo-500 outline-none transition-all text-center bg-white/50 dark:bg-gray-900"
          />

          <button 
            @click.stop="calculate"
            class="w-full py-3.5 bg-gradient-to-r from-pink-400 to-indigo-500 hover:from-pink-500 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-200/50 transform hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            开始计算猫娘指数喵！
          </button>
        </div>

        <div v-if="score !== null" class="result-card mt-6 p-6 rounded-2xl bg-pink-50 dark:bg-gray-700/50 space-y-4 animate-fade-in">
          <div class="text-4xl font-black text-pink-500 dark:text-pink-400 italic">
            {{ score }}%
          </div>
          <div class="text-gray-700 dark:text-gray-200 font-medium">
            {{ comment }}
          </div>
          <div class="flex justify-center">
            <img :src="pic" class="rounded-lg max-w-[200px] " />
          </div>
        </div>
      </div>
    </main>

    <div
      v-for="m in meows"
      :key="m.id"
      class="meow pointer-events-none fixed text-pink-400 font-bold select-none z-50 animate-float-up"
      :style="{ left: m.x + 'px', top: m.y + 'px' }"
    >
      喵~
    </div>

          <footer class="mt-12 sm:mt-16 text-xs text-gray-400 dark:text-gray-500 transition-opacity duration-500 hover:opacity-80 text-center p-4">
        Made With ❤  | 由 
        <a
          href="https://github.com/Coconut-Aero"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-indigo-600 dark:text-indigo-400 underline hover:opacity-90"
        >
          Coconut-Aero
        </a>
        构建 ｜  <a
          href="https://github.com/Coconut-Aero/calabiyauify-names"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-indigo-600 dark:text-indigo-400 underline hover:opacity-90"
        > 项目地址 </a>
        <br />
        

      </footer>
  </div>

</template>

<style scoped>
/* 简单的淡入动画 */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 缓慢呼吸动画 */
.animate-bounce-slow {
  animation: bounceSlow 3s infinite;
}

@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* 喵~ 漂浮消失动画 */
.animate-float-up {
  animation: floatUp 1s ease-out forwards;
}

@keyframes floatUp {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-50px); opacity: 0; }
}
</style>