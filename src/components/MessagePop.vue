<template>
    <!-- 提交信息弹窗 -->
    <div class="message-pop" v-if="ifShow">
        <div @click="popHide" class="shadow"></div>

        <div class="pop-main">
            <div class="head">
                <h3>{{title1}}</h3>
                <h3>{{title2}}</h3>
            </div>

            <div class="middle">
                <input v-model="name" type="text" placeholder="请输入姓名">
                <input v-model="phone"  type="tel" placeholder="请输入手机号，必填">
                <input v-model="email"  type="email" placeholder="请输入邮箱地址">
            </div>

            <div class="foot">
                <button @click="saveData" type="button">获取帮助</button>
            </div>

            <div @click="popHide" class="close"></div>
        </div>
    </div>
</template>

<script>
import Toast from './Toast'
console.log(Toast)

export default {
    name: 'MessagePop',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        title1: {
            type: String,
            default: ''
        },
        title2: {
            type: String,
            default: ''
        },
    },
    watch: {
        value (n, o) {
            this.ifShow = n;
            console.log(this.ifShow)
        }
    },
    data () {
        return {
            ifShow: this.value,
            name: '',
            phone: '',
            email: '',
        }
    },
    methods: {
        // 隐藏弹窗
        popHide () {
            this.ifShow = false;
            this.$emit('input', this.ifShow)
        },
        // 保存
        saveData () {
            let that = this;
            if(this.phone) {
                let data = {
                    type: 8,
                    linkman: this.name,
                    contactWay: this.phone,
                    mailbox: this.email,
                }
                this.axios.post('api/platform/v1/message', data).then(
                    // res => (that.list = res.data.data)
                    function(res) {
                        if(res.data.code === 200) {
                            // 隐藏弹窗，清空数据
                            that.ifShow = false;
                            that.$emit('input', that.ifShow);
                            that.name = '';
                            that.phone = '';
                            that.email = '';

                            that.$toast({
                                title: '',
                                content: '成功提交',
                                type: 'default',
                            })

                            // 已保存过标记
                            localStorage.setItem('hadSave', true)
                        }
                    }
                )
            } else {
                this.$toast({
                    title: '',
                    content: '请输入手机号',
                    type: 'default',
                    onShow: () => {
                    },
                    onHide: () => {
                    }
                })
            }

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

.message-pop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 9;

    .shadow {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.32);
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
    }

    .pop-main {
        width: getRem(287);
        background: #fff;
        border-radius: getRem(8);
        padding: getRem(28);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    h3 {
        color: #1BBFC4;
        font-size: getRem(14);
        line-height: getRem(22);
        text-align: center;
    }

    input {
        width: 100%;
        height: getRem(38);
        border: 1px solid #EBEBEB;
        border-radius: getRem(5);
        color: #444;
        font-size: getRem(16);
        line-height: getRem(22);
        display: block;
        margin-top: getRem(16);
        padding: getRem(8) getRem(12);
        &:first-child {
            margin-top: getRem(40);
        }
    }

    button {
        width: 100%;
        height: getRem(38);
        background: #1BBFC4;
        border-radius: getRem(5);
        color: #fff;
        font-size: getRem(16);
        display: block;
        margin-top: getRem(40);
    }

    .close {
        width: getRem(35);
        height: getRem(35);
        background: url(../assets/images/wechat_close2@3x.png) no-repeat;
        background-size: getRem(35) getRem(35);
        position: absolute;
        top: getRem(-45);
        right: getRem(-18);
    }
}
</style>


