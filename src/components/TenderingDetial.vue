<template>
    <!-- 需求详情页面 -->
    <div class="tendering-detial">
        <!-- 简介 -->
        <div class="require-intro require-item">
            <h4 class="require-title">{{list.projectType}}</h4>
            <h3><span v-if="list.projectArea">[{{list.projectArea.cityName}}]</span>{{list.projectName}}</h3>
            <ul>
                <li>项目编号：{{list.projectNum}}</li>
                <li v-if="list.plannedTime!==''">计划工期：{{list.plannedTime}}日历天</li>
                <li v-if="list.projectCost!==''">招标控制价：{{list.projectCost}}万元</li>
            </ul>
            <div class="status">
                <p v-if="list.status===0">正在寻找服务商…</p>
                <p v-if="list.status===1" class="confirm">服务商已确定</p>
                <span v-if="list.publishTime">{{list.publishTime.substring(0, 10)}}</span>
            </div>
        </div>

        <!-- 中间内容 -->
        <div class="require-main require-item" :class="isAll ? 'all' : ''">
            <ul>
                <li v-if="list.projectDesc">
                    <h4 class="require-title">项目描述</h4>
                    <p>{{list.projectDesc}}</p>
                </li>
                <li v-if="list.bidCondition">
                    <h4 class="require-title">招标条件</h4>
                    <p>{{list.bidCondition}}</p>
                </li>
                <li v-if="list.bidQualification">
                    <h4 class="require-title">投标资格</h4>
                    <p>{{list.bidQualification}}</p>
                </li>
                <li v-if="list.bidDocument">
                    <h4 class="require-title">招标文件获取</h4>
                    <p>{{list.bidDocument}}</p>
                </li>
            </ul>

            <div class="fold" @click="foldClick()">
                <span>{{isAll ? '全部收起' : '展开更多'}}</span><img src="../assets/images/vx_up@3x.png" alt="">
            </div>
        </div>

        <!-- 联系方式 -->
        <div class="require-contact require-item">
            <!-- 采购单位 -->
            <div class="contact-item">
                <h4 class="require-title">联系方式</h4>
                <h3>{{list.companyName}}</h3>
                <ul>
                    <li class="name">{{list.nickName}}<span class="contact-btn" @click="popShow">立即沟通</span></li>
                    <li class="address">{{list.provinceName}} {{list.cityName}} {{list.districtName}} {{list.address}}</li>
                </ul>
            </div>
            <!-- 代理单位 -->
            <div class="contact-item" v-if="list.agency">
                <h4 class="require-title">联系方式</h4>
                <h3><span>[代理]</span>{{list.agency}}</h3>
                <ul>
                    <li class="name">{{list.agencyContact}}<span class="contact-btn">立即沟通</span></li>
                    <li class="address">{{list.agencyOffice ? list.agencyOffice.provinceName : ''}} {{list.agencyOffice ? list.agencyOffice.cityName : ''}} {{list.agencyOffice ? list.agencyOffice.districtName : ''}} {{list.agencyAddress}}</li>
                </ul>
            </div>
        </div>

        <MessagePop
            v-model="ifPopShow"
            title1="请填写基本信息"
            title2="平台专业顾问会帮您获取更多资讯"
        />
    </div>
</template>

<script>
import MessagePop from './MessagePop'

export default {
    name: 'Tenderingdetial',
    components: {
        MessagePop
    },
    data () {
        return {
            isAll: false, // 展开收起
            list: {
            },
            ifPopShow: false,
        }
    },
    mounted () {
        let that = this;

        // 获取数据
        let serviceId = this.$route.query.serviceId;
        this.axios.get('api/project/v1/demands/'+serviceId).then(
            function(res) {
                that.list = res.data.data.basicServiceInfoDetail;
            }
        )
    },
    methods: {
        foldClick() {
            this.isAll = !this.isAll;
        },
        popShow () {
            // 如果已经提交过信息，那么提示
            console.log(typeof localStorage.getItem('hadSave'))
            if(localStorage.getItem('hadSave') && localStorage.getItem('hadSave') === 'true') {
                this.$toast({
                    content: '平台专业顾问将与您联系',
                    type: 'default',
                })
            } else {
                this.ifPopShow = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@function getRem($pixel){
  @return $pixel/100*1rem;
}
.tendering-detial {
    width: 100%;
    overflow: hidden;

    // 每一块
    .require-item {
        background: #fff;
        margin-bottom: getRem(4);
        padding: getRem(16);
        // 小标题
        .require-title {
            color: #1BBFC4;
            font-size: getRem(13);
            line-height: getRem(22);
            margin-bottom: getRem(4);
        }

        h3 {
            color: #000;
            font-size: getRem(16);
            line-height: getRem(22);
            span {
                color: #888;
            }
        }

        li {
            color: #888;
            font-size: getRem(14);
            line-height: getRem(20);
            margin-top: getRem(4);
        }
    }

    // 项目简介
    .require-intro {
        //
        .status {
            color: #F5A623;
            font-size: getRem(14);
            line-height: getRem(20);
            margin-top: getRem(8);
            overflow: hidden;
            p {
                float: left;
            }
            .confirm {
                color: #4B94EA;
            }
            span {
                color: #BBB;
                font-size: getRem(12);
                line-height: getRem(20);
                float: right;
            }
        }
    }

    //
    .require-main {
        height: getRem(200);
        overflow: hidden;
        position: relative;
        transition: all 0.3s ease-in-out;

        &.all {
            height: auto;
            .fold {
                img {
                    transform: rotate(0deg);
                }
            }
        }
        padding: getRem(16) getRem(12) getRem(46);
        li {
            color: #444;
            font-size: getRem(16);
            line-height: getRem(22);
            padding-bottom: getRem(16);
        }

        // 折叠
        .fold {
            width: 100%;
            height: getRem(46);
            background: #fff;
            cursor: pointer;
            color: #444;
            font-size: getRem(14);
            line-height: getRem(20);
            padding: getRem(9) getRem(10) getRem(17);
            text-align: center;
            position: absolute;
            bottom: getRem(0);
            left: 0;
            span, img {
                display: inline-block;
                vertical-align: middle;
            }
            img {
                width: getRem(22);
                height: getRem(22);
                transform: rotate(180deg);
                transition: all 0.3s ease-in-out;
            }
        }
    }

    // 联系方式
    .require-contact {
        padding: getRem(16) 0;
        .contact-item {
            border-bottom: 1px solid #DEE2E2;
            padding: getRem(12) getRem(16);
            &:last-child {
                border: none;
                padding-bottom: getRem(4);
            }
        }
        h3 {
            margin-bottom: getRem(8);
            @extend .ellipsis2;
        }
        li {
            margin: 0 0 getRem(4);
            padding-left: getRem(20);
            .contact-btn {
                color: #1BBFC4;
                cursor: pointer;
                margin-left: getRem(8);
            }

            &.name {
                background: url(../assets/images/wechat_name@3x.png) no-repeat left top;
                background-size: getRem(20) getRem(20);
            }
            &.address {
                background: url(../assets/images/wechat_house@3x.png) no-repeat left top;
                background-size: getRem(20) getRem(20);
            }
        }
    }
}
</style>


