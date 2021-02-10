<template>
  <div class="home">
    <luckDraw type="roulette" :pl="pl"></luckDraw>
  </div>
</template>

<script>
// @ is an alias to /src
import luckDraw from '@/components/luckDraw.vue'

export default {
  name: 'Home',
  components: {
    luckDraw
  },
  data () {
    return {
      pl: [
        {
          draw_id: '1',
          num: '1',
          prize_id: '0',
          prize_name: '乌有',
          prize_type: 2,
          isPrize: 1
        },
        {
          draw_id: '2',
          num: '1',
          prize_id: '0',
          prize_name: '夕',
          prize_type: 1,
          isPrize: 1
        },
        {
          draw_id: '3',
          num: '1',
          prize_id: '0',
          prize_name: 'kokodayo',
          prize_type: 3,
          isPrize: 1
        },
        {
          draw_id: '4',
          num: '1',
          prize_id: '0',
          prize_name: '嵯峨',
          prize_type: 1,
          isPrize: 1
        }
      ]
    }
  }
}
</script>
