import { _decorator, Component, Node } from 'cc';

import { VirtualList } from '../../common';
import { Talent } from '../../model';
import { TalentItem } from './item';

const { ccclass, property } = _decorator;

@ccclass('TalentCanvas')
export class TalentCanvas extends Component {

    private m_List: Talent[] = [
        {
            value: 1,
            level: 1,
            title: '生命',
            desc: '生命上限+275'
        },
        {
            value: 2,
            level: 1,
            title: '近战护甲',
            desc: '近战小怪伤害-280'
        },
        {
            value: 3,
            level: 1,
            title: '强力',
            desc: '攻击力+55'
        },
        {
            value: 4,
            level: 2,
            title: '生命',
            desc: '生命上限+275'
        },
        {
            value: 5,
            level: 2,
            title: '近战护甲',
            desc: '近战小怪伤害-280'
        },
        {
            value: 6,
            level: 2,
            title: '强力',
            desc: '攻击力+55'
        },
        {
            value: 7,
            level: 3,
            title: '生命',
            desc: '生命上限+275'
        },
        {
            value: 7,
            level: 3,
            title: '近战护甲',
            desc: '近战小怪伤害-280'
        },
        {
            value: 9,
            level: 3,
            title: '强力',
            desc: '攻击力+55'
        },
        {
            value: 10,
            level: 4,
            title: '生命',
            desc: '生命上限+275'
        },
        {
            value: 11,
            level: 4,
            title: '近战护甲',
            desc: '近战小怪伤害-280'
        },
        {
            value: 12,
            level: 4,
            title: '强力',
            desc: '攻击力+55'
        },
    ];

    start() {
        const virtualList = this.node.getChildByName('virtual-scroll-view').getComponent(VirtualList<Talent>);
        virtualList.setList(this.m_List, (node, item) => {
            node.getComponent(TalentItem).setData(item);
        });
    }

    update(deltaTime: number) {

    }
}
