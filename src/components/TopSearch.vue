<template>
    <!-- 顶部搜索组件 -->
    <div class="top-search">
        <div class="search">
            <div class="icon"></div>
            <input
                ref="input"
                type="text"
                :placeholder="placeholder"
                :value="value"
                v-on="listeners"
            />
            <div v-if="clearShow" @click="clear()" class="clear"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopSearch',
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入您要查询的信息'
        },
    },
    data () {
        return {
            // value: '',
            // clearShow: false,
        }
    },
    watch: {
    },
    computed: {
        clearShow () {
            if(this.value !== '') {
                return true
            } else {
                return false
            }
        },
        listeners () {
            return {
                // Pass all component listeners directly to input
                ...this.$listeners,
                // Override input listener to work with v-model
                input: event => this.$emit('input', event.target.value)
            }
        }
    },
    methods:{
        clear () {
            // this.value = '';
            // this.$refs.input.focus();
            this.$emit('clearSearch')
        }
    }
}
</script>

<style lang="scss" scoped>
@function getRem($pixel){
  @return $pixel/100*1rem;
}

input::-webkit-input-placeholder{
    color:#BBBBBB;
}

.top-search {
    width: 100%;
    height: getRem(54);
    background: #fff;
    overflow: hidden;
    padding: getRem(12) getRem(16);
    .search {
        width: getRem(343);
        height: getRem(30);
        position: relative;
    }
    .icon {
        width: getRem(20);
        height: getRem(20);
        background: url(../assets/images/wechat_fd@3x.png) no-repeat;
        background-size: contain;
        position: absolute;
        top: getRem(5);
        left: getRem(8);
    }
    input {
        width: getRem(343);
        height: getRem(30);
        border: getRem(1) solid #EBEBEB;
        border-radius: getRem(15);
        display: block;
        font-size: getRem(14);
        line-height: getRem(28);
        padding-left: getRem(40);
    }
    .clear {
        width: getRem(20);
        height: getRem(20);
        background: url(../assets/images/wechat_closs@3x.png) no-repeat;
        background-size: contain;
        position: absolute;
        top: getRem(5);
        right: getRem(5);
    }
}
</style>


