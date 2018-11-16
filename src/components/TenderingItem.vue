<template>
    <div class="tendering-item">
        <div v-for="item in list" :key="item.serviceId" @click="itemClick(item.serviceId)" class="item">
            <!-- <router-link :to="'/tendering-detial?serviceId='+item.serviceId">

            </router-link> -->
            <div class="item-top">
                <p class="category">{{item.schemaName}}{{item.serviceId}}</p>
                <span class="time">{{item.createTime.substring(0, 10)}}</span>
            </div>
            <h3>{{item.projectName}}</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TenderingItem',
    props: {
        list: {
            type: Array,
            default: []
        },
    },
    data () {
        return {
            viewArray: [],
        }
    },
    mounted () {
        // 判断是否超过24点，凌晨刷新次数
        let nowDate = new Date()
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth()+1;
        let date = nowDate.getDate();
        let zero = new Date(year+'/'+month+'/'+date+' 24:00').getTime();
        if(zero <= nowDate.getTime()) {
            // 第二天凌晨
            this.viewArray = [];
            localStorage.setItem('viewArray', JSON.stringify(this.viewArray));
        }

        // 获取localStorage存的数据
        let viewArray = JSON.parse(localStorage.getItem('viewArray'));
        console.log(viewArray)
        if(viewArray && viewArray.length > 0) {
            this.viewArray = viewArray || [];
        }
    },
    methods: {
        itemClick (serviceId) {
            // 如果当前已经看了5条
            var canView = false;
            if(this.viewArray.length >= 5) {
                this.viewArray.forEach(el => {
                    if(serviceId === el) {
                        canView = true;
                        return
                    }
                });

                // 如果当前点击的是已经看过的，那可以再看；
                if(canView) {
                    this.$router.push({ name: 'TenderingDetial', query: { serviceId: serviceId }})
                } else {
                    // 否则去判断是否提交过信息，提交过就文字提示；未提交过就弹窗填信息
                    if(localStorage.getItem('hadSave') && localStorage.getItem('hadSave') === 'true') {
                        this.$toast({
                            content: '平台专业顾问将与您联系',
                            type: 'default',
                        })
                    } else {
                        this.$emit('popShow')
                    }
                }
            }
            // 如果看的不到5条
            else {
                // 当前查看的项存为数组
                this.viewArray.push(serviceId);
                // 去重
                this.viewArray = [...new Set(this.viewArray)];
                // 存次数
                localStorage.setItem('viewArray', JSON.stringify(this.viewArray));
                // 跳转
                this.$router.push({ name: 'TenderingDetial', query: { serviceId: serviceId }})
            }
            // console.log(this.viewArray)
            // console.log(window.localStorage.getItem('viewArray'))
        }
    }
}
</script>

<style lang="scss" scoped>
@function getRem($pixel){
  @return $pixel/100*1rem;
}

.tendering-item {
    margin-top: getRem(8);
}
.item {
    width: 100%;
    height: getRem(72);
    background: #fff;
    margin-bottom: getRem(4);
    padding: getRem(12) getRem(16);
    .item-top {
        font-size: getRem(13);
        line-height: getRem(22);
        overflow: hidden;
        .category {
            color: #1BBFC4;
            float: left;
        }
        .time {
            color: #888888;
            float: right;
        }
    }
    h3 {
        color: #444444;
        font-size: getRem(16);
        line-height: getRem(22);
        margin-top: getRem(4);
        @extend .ellipsis;
    }
}
</style>


