import React, { Component } from 'react';
import { Tabs, WhiteSpace, Button } from 'antd-mobile';
import GreatBook from '../../GreatBook';
import './vip.scss';
import SvgIcon from "../../../components/SvgIcon";

const tabs = [
    { title: '精读VIP' },
    { title: '好书精读' }
];

const style = {
    card: 'card',
    content: 'content-padding',
    center: 'text-align',
    title: 'card-title',
    cardIcon: 'card-icon',
    cardB: 'card-icon-Wrapper'
};

class Vip extends Component {
    constructor() {
        super();
        this.state = {
            needFixed: false
        };
    }

    componentDidMount() {
        // 初始化页面时，滚动条置顶
        window.scrollTo(0, 0);
        this.initScrollFuc();
    }

    initScrollFuc() {
        const fixedTop = this.openAcount.offsetTop;
        window.onscroll = () => {
            const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            //控制元素块A随鼠标滚动固定在顶部
            if (scrollTop >= fixedTop) {
                this.setState({ needFixed: true });
            } else if (scrollTop < fixedTop) {
                this.setState({ needFixed: false });
            }
        };
    }

    render() {
        return (
            <div className="vip-wrapper">
                <div>
                    <Tabs
                        tabs={tabs}
                        initialPage={0}
                        animated={false}
                        useOnPan={false}
                        swipeable={false}
                    >
                        <div className={style.content}>
                            <div className={style.card}>
                                <p>藏书馆精读VIP -- 让你成为更好的自己</p>
                                <h2>99元/年，每天不到0.3元</h2>
                                <p className={style.center}>
                                    <Button size={"small"} inline type={'primary'} style={{ borderRadius: '20px' }}>加入我们</Button>
                                </p>
                                <ul className={style.cardB}>
                                    <li className="text-align icon-item">
                                        <SvgIcon iconClass="book_icon" propClass={style.cardIcon} color={'#ffdba2'} />
                                        <p className={style.title}>好书精选</p>
                                    </li>
                                    <li className="text-align">
                                        <SvgIcon iconClass="collections_bookmark" propClass={style.cardIcon} color={'#ffdba2'} />
                                        <p className={style.title}>不限借阅</p>
                                    </li>
                                    <li className="text-align">
                                        <SvgIcon iconClass="export" propClass={style.cardIcon} color={'#ffdba2'} />
                                        <p className={style.title}>笔记导出</p>
                                    </li>
                                    <li className="text-align">
                                        <SvgIcon iconClass="read" propClass={style.cardIcon} color={'#ffdba2'} />
                                        <p className={style.title}>原文朗读</p>
                                    </li>
                                </ul>
                            </div>
                            <div className={`card-tip ${this.state.needFixed ? "fixed" : ""}`} ref={(node) => { this.openAcount = node; }}>
                                <div>
                                    <p>订阅藏书馆精读VIP</p>
                                    <p><span style={{ textDecoration: 'line-through', color: '#666', paddingRight: '5px' }}>原价365元</span><span style={{ color: 'red' }}>99元</span></p>
                                </div>
                                <div>
                                    <Button size={"small"} inline type={'primary'} style={{ borderRadius: '20px' }}>开通</Button>
                                </div>
                            </div>
                            <div className="reference">
                                <h3>{`52本精读<持续更新中>`}</h3>
                                {
                                    [1, 2, 3].map(i => (
                                        <div key={i}>
                                            <p className="ref-type">自我管理</p>
                                            <div className="ref-box">
                                                {[1, 2, 3, 4].map((value, index) => (
                                                    <ul className="ref-scroll" key={index}>
                                                        <li className="ref-des">
                                                            <div className="left" />
                                                            <div className="right">
                                                                <h4 className="ref-title">《微习惯》</h4>
                                                                <p className="ref-abs">简单到不可能失败的自我管理法则</p>
                                                                <p className="ref-label">会员免费</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <GreatBook />
                        </div>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Vip;
