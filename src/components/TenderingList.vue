<template>
    <!-- 招标询价列表页面 -->
    <div class="tendering-list">
        <!-- 搜索 -->
        <TopSearch
            placeholder="请输入您要查询的招标信息"
            v-model="searchText"
            @clearSearch="clearSearch"
            @keydown.enter="search"
        />

        <!-- 列表 -->
        <TenderingItem
            :list="list"
            @popShow="popShow"
        />

        <MessagePop
            v-model="ifPopShow"
            title1="请填写基本信息"
            title2="平台专业顾问会帮您获取更多资讯"
        />
    </div>
</template>

<script>
import TopSearch from './TopSearch'
import TenderingItem from './TenderingItem'
import MessagePop from './MessagePop'
// import axios from 'axios'

export default {
    name: 'TenderingList',
    components: {
        TopSearch, TenderingItem, MessagePop
    },
    data () {
        return {
            searchText: '',
            list: [],
            ifPopShow: false,
        }
    },
    mounted () {
        this.getData();
    },
    methods: {
        getData () {
            let that = this;
            let startPublishTime = this.$route.query.startPublishTime;
            let endPublishTime = this.$route.query.endPublishTime;

            this.axios.get('api/project/v1/demands/list', {params: {startPublishTime: startPublishTime, endPublishTime: endPublishTime, caseName: this.searchText}}).then(
                res => (that.list = res.data.data)
            )
        },
        // 获取搜索框文本
        search () {
            console.log(this.searchText)
            this.getData();
        },
        // 清空搜索框
        clearSearch() {
            this.searchText = '';
            this.getData();
        },
        popShow () {
            this.ifPopShow = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.tendering-list {
    overflow: hidden;

}
</style>


