import React from 'react';
import './greatbook.scss';
import SvgIcon from '@/components/SvgIcon';

class GreatBook extends React.Component {
    playMusic() {
        console.log('playmusic');
    }

    render() {
        return (
            <div className={'GreatBook-background'}>
                {
                    [1, 2, 3, 4].map(number => (
                            <div className={'content-box'} key={number}>
                                <div className={'title'}>
                                    <h4>高效学习书单</h4>
                                    <p>更多&gt;</p>
                                </div>
                                <div className={'content'}>
                                    <div className={'left'}>
                                        <img src={require('@/assets/image/book-cover.jpg')} alt="" />
                                        <SvgIcon iconClass={'music'} propClass={'music'} click={this.playMusic} />
                                    </div>
                                    <div className={'right-box'}>
                                        <h4>《刻意练习》</h4>
                                        <p>【试听】天才的练习方法是什么？</p>
                                        <p className={'tag'}>
                                            <span>个人成长</span>
                                            <span className={'pay'}>4.9简帛币</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                <div className={'bottom'}>
                    <p>我是有底线的人</p>
                </div>
            </div>
        );
    }
}

export default GreatBook;
