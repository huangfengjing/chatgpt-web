<script lang="ts" setup>
import { computed } from 'vue'
import { NModal } from 'naive-ui'
import { buyMemberCard } from '@/api'

interface Props {
  visible: boolean
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})

const handleSubscribe = async function (type: string) {
  const result = await buyMemberCard(type)
  window.open(result)
}

const memberTypes = [
  {
    type: 'WEEKLY',
    title: '周费会员',
    price: '29',
    qCont: 50,
    imgCount: 50,
    maxToken: 1024,
    timeUnit: '周',
  },
  {
    type: 'MONTHLY',
    title: '月费会员',
    price: '79',
    qCont: 500,
    imgCount: 500,
    maxToken: 1024,
    timeUnit: '月',
  },
  {
    type: 'LIFE_TIME',
    title: '终身会员',
    price: '168',
    qCont: '无限',
    imgCount: '无限',
    maxToken: '无限',
    timeUnit: '永久',
  },
]
</script>

<template>
  <NModal v-model:show="show" title="订阅" :auto-focus="false" preset="card" style="width: 95%; max-width: 960px">
    <div class="pricing pricing-palden">
      <div v-for="item in memberTypes" :key="item.type" class="pricing-item">
        <div class="pricing-deco">
          <svg
            id="Layer_1" class="pricing-deco-img" enable-background="new 0 0 300 100" height="100px"
            preserveAspectRatio="none" version="1.1" viewBox="0 0 300 100" width="300px" x="0px" xml:space="preserve"
            xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" y="0px"
          >
            <path
              class="deco-layer deco-layer--1"
              d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729&#x000A;	c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z"
              fill="#FFFFFF" opacity="0.6"
            />
            <path
              class="deco-layer deco-layer--2"
              d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729&#x000A;	c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z"
              fill="#FFFFFF" opacity="0.6"
            />
            <path
              class="deco-layer deco-layer--3"
              d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716&#x000A;	H42.401L43.415,98.342z"
              fill="#FFFFFF" opacity="0.7"
            />
            <path
              class="deco-layer deco-layer--4"
              d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428&#x000A;	c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z"
              fill="#FFFFFF"
            />
          </svg>
          <div class="pricing-price">
            <span class="pricing-currency">￥</span>{{ item.price }}
            <span class="pricing-period">/ {{ item.timeUnit }}</span>
          </div>
          <h3 class="pricing-title">
            {{ item.title }}
          </h3>
        </div>
        <ul class="pricing-feature-list">
          <li class="pricing-feature">
            提问次数：{{ item.qCont }}
          </li>
          <li class="pricing-feature">
            图片次数：{{ item.imgCount }}
          </li>
          <li class="pricing-feature">
            最长答案：{{ item.maxToken }}
          </li>
        </ul>
        <button class="pricing-action" @click="handleSubscribe(item.type)">
          订阅
        </button>
      </div>
    </div>
  </NModal>
</template>

<style lang="scss" scoped>
.pricing {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;
	-webkit-justify-content: center;
	justify-content: center;
	width: 100%;
	margin: 0 auto 3em;

	&-item {
		position: relative;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-align-items: stretch;
		align-items: stretch;
		text-align: center;
		-webkit-flex: 0 1 300px;
		flex: 0 1 300px;
	}

	&-action {
		color: inherit;
		border: none;
		background: none;

		&:focus {
			outline: none;
		}
	}
}

.pricing-feature-list {
	text-align: left;
}

.pricing-palden .pricing-item {
	font-family: 'Open Sans', sans-serif;
	cursor: default;
	color: #84697c;
	background: #fff;
	box-shadow: 0 0 10px rgba(46, 59, 125, 0.23);
	border-radius: 20px 20px 10px 10px;
	margin: 1em;
}

@media screen and (min-width: 66.250em) {
	.pricing-palden .pricing-item {
		margin: 1em -0.5em;
	}
	.pricing-item:nth-child(2) {
		margin: 0;
		z-index: 10;
		box-shadow: 0 0 20px rgba(46, 59, 125, 0.23);
	}
}

.pricing-palden {
	.pricing-deco {
		border-radius: 10px 10px 0 0;
		background: rgba(76, 70, 101, 0.99);
		padding: 4em 0 9em;
		position: relative;
	}

	.pricing-deco-img {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 160px;
	}

	.pricing-title {
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 5px;
		color: #fff;
	}

	.deco-layer {
		-webkit-transition: -webkit-transform 0.5s;
		transition: transform 0.5s;
	}

	.pricing-item {
		&:hover {
			.deco-layer--1 {
				-webkit-transform: translate3d(15px, 0, 0);
				transform: translate3d(15px, 0, 0);
			}

			.deco-layer--2 {
				-webkit-transform: translate3d(-15px, 0, 0);
				transform: translate3d(-15px, 0, 0);
			}
		}
	}

	.icon {
		font-size: 2.5em;
	}

	.pricing-price {
		font-size: 5em;
		font-weight: bold;
		padding: 0;
		color: #fff;
		margin: 0 0 0.25em 0;
		line-height: 0.75;
	}

	.pricing-currency {
		font-size: 0.15em;
		vertical-align: top;

	}

	.pricing-period {
		font-size: 0.15em;
		padding: 0 0 0 0.5em;

		font-style: italic;
	}

	.pricing__sentence {
		font-weight: bold;
		margin: 0 0 1em 0;
		padding: 0 0 0.5em;
	}

	.pricing-feature-list {
		margin: 0;
		padding: 0.25em 0 2.5em;
		list-style: none;
		text-align: center;
	}

	.pricing-feature {
		padding: 1em 0;
	}

	.pricing-action {
		font-size: 1.1em;
		margin: auto 3em 2em 3em;
		padding: 1em 2em;
		color: #fff;
		border-radius: 30px;
		background: #4d4766;
		-webkit-transition: background-color 0.3s;
		transition: background-color 0.3s;

		&:hover, &:focus {

			background-color: #100A13;

		}
	}

}

.pricing-palden .pricing-item--featured .pricing-deco {
	padding: 5em 0 8.885em 0;
}
</style>
